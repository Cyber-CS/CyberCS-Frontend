import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "../../libs/react-ui/src/**/*.{ts,tsx}",
  ],
  presets: [
    require("./tailwindcss/data-attributes"),
    require("./tailwindcss/sizing"),
  ],

  plugins: [
    plugin(({ addComponents }) => {
      addComponents([
        {
          ".container": {
            paddingLeft: "1rem",
            paddingRight: "1rem",
            marginLeft: "auto",
            marginRight: "auto",
            width: "100%",
            maxWidth: "1580px",
          },
        },
        {
          "@media (min-width: 1024px) ": {
            ".container": {
              paddingLeft: "5rem",
              paddingRight: "5rem",
            },
          },
        },
      ]);
    }),
  ],
  theme: {
    extend: {
      animation: {
        shake: "shake 250ms",
        anim: "anim 1s",
        popIn: "popIn 300ms ease-in-out",
        popOut: "popOut 300ms ease-in-out",
        slideIn: 'slideIn 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideOut: 'slideOut 350ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "30%, 50%": {
            transform: "translateX(-5px)",
          },
          "80%": {
            transform: "translateX(5px)",
          },
        },
        anim: {
          "0%": {
            transform: "translateY(0) rotate(0)",
            opacity: "0",
            borderRadius: "35%",
          },
          "100%": {
            transform: " translateY(-125rem) rotate(1360deg)",
            opacity: "1",
            borderRadius: "40%",
          },
        },
        popIn: {
          from: { transform: "translateY(0.5)", opacity: "0" },
          to: { transform: "translateY(1)", opacity: "1" },
        },
        popOut: {
          from: { transform: "translateY(1)", opacity: "1" },
          to: { transform: "translateY(0.5)", opacity: "0" },
        },
        slideIn: {
          from: { transform: "translateY(12px)" },
          to: { transform: "translateY(0)" },
        },
        slideOut: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(100px)" },
        },
      },
    },
    fontFamily: {
      sans: ["IBM Plex Sans", "sans-serif"],
      mono: ["PT Mono", "monospace"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      white: "#FFFFFF",
      black: "#000000",
      gray: {
        50: "#C7C7C7",
        100: "#797976",
        150: "#9d9d9d",
        200: "#63615C",
        250: "#a1a1a1",
        300: "#747474",
        400: "#4b4a4a",
        500: "#948F8A",
        600: "#606060",
        700: "#353434",
        800: "#1e1e1d",
        900: "#2D2B24",
      },
      red: {
        300: "#e74f4f",
        500: "#b70000",
      },
      orange: {
        300: "#d57d15",
      },
      blue: {
        100: "#bbdaff",
        300: "#09b5ad",
      },
    },
  },
} satisfies Config;
