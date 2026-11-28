#!/usr/bin/env node
/**
 * Regenerates the favicon set and the link-preview image:
 *
 *   app/icon.svg        "JC" monogram, paper on ink (the browser-tab icon)
 *   app/favicon.ico     the same at 16, 32 and 48px, for clients without SVG
 *   app/apple-icon.png  180x180, full bleed (iOS rounds the corners itself)
 *   public/og.png       1200x630 Open Graph / Twitter card image
 *
 * Usage: npx next build && node scripts/generate-share-assets.mjs
 *
 * Everything is drawn by headless Chromium (Playwright), so the output is the
 * same on every run. The card is set in the site's real fonts: the woff2 files
 * next/font emits into .next/static/media, inlined from the built CSS, which is
 * why it needs a build first. Colours come from the tokens in app/globals.css.
 *
 * Playwright is not a dependency of the site. Either install it here without
 * saving it (`npm i --no-save playwright`) or globally (`npm i -g playwright`);
 * the script looks in `npm root -g` itself, since require() does not. Then
 * fetch the browser once: `npx playwright install chromium`.
 */
import { execSync } from "node:child_process";
import { createRequire } from "node:module";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Playwright from this project, else from the global root (not on require()'s path). */
function loadPlaywright() {
  try {
    return createRequire(import.meta.url)("playwright");
  } catch {}
  try {
    const globalRoot = execSync("npm root -g", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    return createRequire(join(globalRoot, "noop.js"))("playwright");
  } catch {}
  return null;
}

const playwright = loadPlaywright();
if (!playwright) {
  console.error(
    "Playwright is needed to render the assets. Install it, then its browser:\n" +
      "  npm i --no-save playwright   (or: npm i -g playwright)\n" +
      "  npx playwright install chromium"
  );
  process.exit(1);
}
const { chromium } = playwright;

/* ------------------------------------------------------------------------
   Tokens, read from the stylesheet so the assets never drift from the site.
   ------------------------------------------------------------------------ */
const css = readFileSync(join(ROOT, "app/globals.css"), "utf8");
const token = (name) => {
  const m = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!m) throw new Error(`--${name} not found in app/globals.css`);
  return m[1];
};
const PAPER = token("paper");
const INK = token("ink");
const INK_3 = token("ink-3");

/* ------------------------------------------------------------------------
   Monogram: Instrument Sans Bold "J" and "C" as outlines (an SVG favicon
   can't load web fonts), copied from the glyf table of the font's static
   Bold instance on Google Fonts. Font units: 1000/em, y down, baseline at 0,
   cap height 720. J's ink starts at x=0 and C sits 51 units after it, a
   little tighter than the font's own spacing so the pair reads as one mark.
   ------------------------------------------------------------------------ */
const JC = {
  width: 1102,
  cap: 720,
  d:
    "M124 10Q86 10 51 5Q16 -1 0 -9L0 -127Q18 -120 43 -115Q68 -110 94 -110Q150 -110 176 -128" +
    "Q201 -147 201 -196L201 -720L355 -720L355 -189Q355 -89 296 -39Q237 10 124 10Z" +
    "M767 10Q689 10 623 -17Q557 -45 509 -95Q460 -145 433 -213Q406 -282 406 -363Q406 -444 433 -511" +
    "Q459 -578 508 -627Q556 -677 622 -703Q688 -730 767 -730Q856 -730 928 -695Q999 -661 1045 -598" +
    "Q1090 -536 1100 -452L950 -452Q937 -529 887 -568Q837 -608 768 -608Q707 -608 661 -579" +
    "Q614 -550 588 -495Q562 -441 562 -364Q562 -286 589 -229Q615 -173 662 -142Q709 -112 770 -112" +
    "Q835 -112 885 -151Q935 -190 950 -267L1102 -267Q1089 -183 1043 -120Q997 -58 926 -24" +
    "Q855 10 767 10Z"
};

/**
 * The mark centred on a square. `capRatio` is the cap height as a share of
 * the side: 1/2 puts the letters on whole pixels at 16 and 32px (8px tall,
 * baseline on the 12th row at 16px). `radius` is a share of the side too.
 */
function monogramSvg({ capRatio, radius = 0 }) {
  const side = JC.cap / capRatio;
  const x = (side - JC.width) / 2;
  const y = (side + JC.cap) / 2;
  const r = radius ? ` rx="${+(side * radius).toFixed(2)}"` : "";
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${side} ${side}">`,
    `<rect width="${side}" height="${side}"${r} fill="${INK}"/>`,
    `<path transform="translate(${x} ${y})" fill="${PAPER}" d="${JC.d}"/>`,
    `</svg>`,
    ""
  ].join("\n");
}

/** Packs PNGs into one .ico (PNG entries, supported everywhere since Vista). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map(({ size, png }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size % 256, 0);
    e.writeUInt8(size % 256, 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}

/* ------------------------------------------------------------------------
   The site's fonts, from the build: every next/font @font-face rule for
   Instrument Sans and IBM Plex Mono, with its woff2 inlined as a data URL.
   ------------------------------------------------------------------------ */
function builtFontFaces() {
  const staticDir = join(ROOT, ".next/static");
  const files = [];
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (p.endsWith(".css")) files.push(p);
    }
  };
  try {
    walk(staticDir);
  } catch {
    throw new Error("No .next/static found. Run `npx next build` first.");
  }

  const faces = new Set();
  for (const file of files.sort()) {
    const text = readFileSync(file, "utf8");
    for (const rule of text.match(/@font-face\s*{[^}]*}/g) ?? []) {
      if (!/font-family:\s*["']?(Instrument Sans|IBM Plex Mono)["']?\s*;/.test(rule)) continue;
      const inlined = rule.replace(/url\(([^)]+\.woff2)\)/g, (_, url) => {
        const woff2 = readFileSync(resolve(dirname(file), url.replace(/["']/g, "")));
        return `url(data:font/woff2;base64,${woff2.toString("base64")})`;
      });
      if (inlined !== rule) faces.add(inlined);
    }
  }
  if (faces.size === 0) {
    throw new Error("No Instrument Sans / IBM Plex Mono faces in the build. Run `npx next build` first.");
  }
  return [...faces].join("\n");
}

/* ------------------------------------------------------------------------
   The card: the hero, recomposed for 1200x630. Only what the hero says:
   the degree line in mono, the name, the ink rule, the title line.
   ------------------------------------------------------------------------ */
function cardHtml(fontFaces) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
${fontFaces}
html, body { margin: 0; background: ${PAPER}; }
.card {
  box-sizing: border-box;
  width: 1200px;
  height: 630px;
  padding: 72px 80px 76px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${PAPER};
  color: ${INK};
  font-family: "Instrument Sans";
  -webkit-font-smoothing: antialiased;
}
.meta {
  margin: 0;
  font-family: "IBM Plex Mono";
  font-size: 36px;
  line-height: 1;
  color: ${INK_3};
}
.name {
  margin: 0 0 0 -0.012em;
  padding-bottom: 0.13em;
  font-size: 156px;
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.04em;
}
.foot {
  padding-top: 28px;
  border-top: 2px solid ${INK};
}
.title {
  margin: 0;
  font-size: 50px;
  font-weight: 500;
  line-height: 1.25;
  letter-spacing: -0.015em;
}
</style></head><body>
<main class="card">
  <p class="meta">B.S.E. Computer Engineering, Michigan&nbsp;’26</p>
  <div>
    <h1 class="name">Jayce Clarke</h1>
    <div class="foot"><p class="title">Software Engineer @&nbsp;PointOne · Ex-SpaceX</p></div>
  </div>
</main>
</body></html>`;
}

async function renderSquare(browser, svg, size) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  const src = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
  await page.setContent(
    `<style>html,body{margin:0;background:transparent}img{display:block}</style><img src="${src}" width="${size}" height="${size}">`
  );
  await page.locator("img").evaluate((img) => img.decode());
  const png = await page.screenshot({ omitBackground: true });
  await page.close();
  return png;
}

async function main() {
  const out = (p) => join(ROOT, p);
  const wrote = (p) => console.log(`  wrote ${relative(ROOT, p)}`);

  const iconSvg = monogramSvg({ capRatio: 1 / 2, radius: 3 / 32 });
  writeFileSync(out("app/icon.svg"), iconSvg);
  wrote(out("app/icon.svg"));

  const fontFaces = builtFontFaces();
  const browser = await chromium.launch();
  try {
    const sizes = [16, 32, 48];
    const pngs = [];
    for (const size of sizes) pngs.push({ size, png: await renderSquare(browser, iconSvg, size) });
    writeFileSync(out("app/favicon.ico"), ico(pngs));
    wrote(out("app/favicon.ico"));

    // iOS masks the corners and pads nothing, so: full bleed, smaller letters.
    const appleSvg = monogramSvg({ capRatio: 2 / 5 });
    writeFileSync(out("app/apple-icon.png"), await renderSquare(browser, appleSvg, 180));
    wrote(out("app/apple-icon.png"));

    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.setContent(cardHtml(fontFaces));
    await page.evaluate(() => document.fonts.ready);
    const loaded = await page.evaluate(() =>
      [...document.fonts].filter((f) => f.status === "loaded").map((f) => `${f.family} ${f.weight}`)
    );
    for (const need of ["Instrument Sans", "IBM Plex Mono"]) {
      if (!loaded.some((f) => f.startsWith(need))) {
        throw new Error(`${need} did not load; the card would be set in a fallback font.`);
      }
    }
    await page.screenshot({ path: out("public/og.png") });
    wrote(out("public/og.png"));
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
