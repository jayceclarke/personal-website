import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayce Clarke | Hardware/Software Systems Builder",
  description:
    "Portfolio for Jayce Clarke, a Computer Engineering student at the University of Michigan focused on FPGA/RTL, embedded systems, computer architecture, and low-level software."
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
