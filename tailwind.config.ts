import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F8F5EF",
        "background-secondary": "#EFE8DE",
        "brand-dark": "#392A23",
        "brand-gold": "#B59A68",
        "brand-gold-light": "#C9B288",
        "brand-charcoal": "#242424",
        "brand-grey": "#888888",
        "brand-cream": "#F4EFEA",
        "brand-border": "#E5DCD0",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        cormorant: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out forwards",
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-subtle": "pulseSubtle 3s infinite ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
