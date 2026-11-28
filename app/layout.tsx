import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import type { CSSProperties, ReactNode } from "react";
import "./globals.css";

// Self-hosted at build time by next/font: no request to Google at runtime,
// and the fallback fonts are metric-adjusted so swapping in causes no shift.
const sans = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans"
});

// The hero name skips next/font's generic fallback for its own width-matched
// ones (see globals.css), so it needs the bare family name on its own.
const sansPrimary = sans.style.fontFamily.split(",")[0].trim();

// next/font's generated fallback for a monospace face is a scaled Arial, which
// can't match per-character widths. The Courier-metric face in globals.css
// shares Plex Mono's 0.6em advance, so mono text keeps its exact width.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono",
  adjustFontFallback: false,
  fallback: ["IBM Plex Mono Metric Fallback", "ui-monospace", "monospace"]
});

const title = "Jayce Clarke | Software Engineer";
const description =
  "Portfolio for Jayce Clarke, a software engineer at PointOne building AI evaluation infrastructure, previously at SpaceX, and a University of Michigan Computer Engineering graduate.";

// The link-preview card (public/og.png) and the icons in app/ are generated
// by scripts/generate-share-assets.mjs; rerun it after changing what they say.
const shareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Jayce Clarke. Software Engineer at PointOne, ex-SpaceX. B.S.E. Computer Engineering, Michigan ’26."
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jayceclarke.xyz"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Jayce Clarke",
    type: "website",
    images: [shareImage]
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [shareImage]
  }
};

export const viewport: Viewport = {
  themeColor: "#f4f2ed"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable}`}
      style={{ "--font-sans-primary": sansPrimary } as CSSProperties}
    >
      <body>{children}</body>
    </html>
  );
}
