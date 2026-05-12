import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        chassis: {
          950: "#05070b",
          900: "#080d14",
          850: "#0b111b",
          800: "#101826",
          700: "#1a2636"
        },
        signal: {
          cyan: "#51d6ff",
          green: "#79f2a6",
          amber: "#ffc857",
          red: "#ff6b6b"
        }
      },
      boxShadow: {
        glow: "0 0 36px rgba(81, 214, 255, 0.16)",
        module: "0 24px 80px rgba(0, 0, 0, 0.32)"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: [
          "IBM Plex Mono",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace"
        ]
      }
    }
  },
  plugins: []
};

export default config;
