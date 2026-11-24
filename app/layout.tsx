import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayce Clarke | Software Engineer",
  description:
    "Portfolio for Jayce Clarke, a software engineer at PointOne building AI evaluation infrastructure and production systems, with a University of Michigan Computer Engineering background."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
