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
            maxWidth: "1280px",
          },
        },
        {
          "@media (min-width: 1024px) ": {
            ".container": {
              paddingLeft: "8.75rem",
              paddingRight: "8.75rem",
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
      },
    },
    fontFamily: {
      sans: ["IBM Plex Sans", "sans-serif"],
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
    },
  },
} satisfies Config;
