import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "#FCFBF726",
        fontPrimary: "#F9F1E2",
        fontSec: "#D8D6CF",
        yellow: "#FFD700",
        black: "#1A1203",
      },
      backgroundImage: {
        header:
          "linear-gradient(90deg, rgba(85, 81, 57, 0.0847) 0%, rgba(187, 178, 125, 0.0462) 100%)",
        second:
          "linear-gradient(180deg, rgba(252, 251, 240, 0.015) 0%, rgba(224, 224, 222, 0.025) 100%)",
        primary:
          "linear-gradient(180deg, rgba(94, 93, 89, 0.0088) 17.45%, rgba(49, 48, 45, 0.88) 32.17%)",
        about:
          "linear-gradient(180deg, rgba(64, 53, 0, 0.0726) 5%, rgba(18, 15, 0, 0.165) 77%)",
        footer:
          "linear-gradient(180deg, rgba(26, 22, 0, 0.1675) 0%, rgba(26, 22, 0, 0.268) 100%)",
        faq: "linear-gradient(180deg, rgba(64, 53, 0, 0.0275) 5%, rgba(18, 15, 0, 0.0625) 77%)",
        profile:
          "linear-gradient(180deg, rgba(64, 53, 0, 0.0726) 5%, rgba(18, 15, 0, 0.165) 77%)",
        blurBg:
          "linear-gradient(179.99deg, rgba(51, 51, 51, 0.45) 0.01%, rgba(47, 47, 47, 0.45) 76.07%)",
      },
      fontFamily: {
        mooli: ["Mooli", "sans-serif"],
        merriweather: ["Merriweather", "Merriweather Sans"],
        alata: ["Alata", "sans-serif"],
      },
      keyframes: {
        slideInLeft: {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        slideInLeft: "slideInLeft 1s ease-out forwards",
        slideInRight: "slideInRight 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;