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

export const metadata: Metadata = {
  title: "Jayce Clarke | Software Engineer",
  description:
    "Portfolio for Jayce Clarke, a software engineer at PointOne building AI evaluation infrastructure, previously at SpaceX, and a University of Michigan Computer Engineering graduate."
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
