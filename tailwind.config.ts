import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        forest: "var(--forest)",
        "forest-hover": "var(--forest-hover)",
        olive: "var(--olive)",
        border: "var(--border)",
        "strong-border": "var(--strong-border)",
        muted: "var(--muted)",
        surface: "var(--surface)",
        "surface-muted": "var(--surface-muted)",
        "on-forest": "var(--on-forest)",
        danger: "var(--danger)",
        success: "var(--success)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;
