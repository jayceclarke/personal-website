import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

// Self-hosted at build time by next/font: no request to Google at runtime,
// and the fallback fonts are metric-adjusted so swapping in causes no shift.
const sans = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-sans"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Jayce Clarke | Software Engineer",
  description:
    "Portfolio for Jayce Clarke, a software engineer at PointOne and University of Michigan Computer Engineering graduate, shipping production software from Android apps to AI evaluation infrastructure."
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
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
