import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";
import aspectRatio from "@tailwindcss/aspect-ratio";
import { Config } from "tailwindcss";

const customColors = (cssVar: string) => ({
  DEFAULT: `rgb(var(${cssVar}))`,
  50: `rgb(var(${cssVar}-50))`,
  100: `rgb(var(${cssVar}-100))`,
  200: `rgb(var(${cssVar}-200))`,
  300: `rgb(var(${cssVar}-300))`,
  400: `rgb(var(${cssVar}-400))`,
  500: `rgb(var(${cssVar}-500))`,
  600: `rgb(var(${cssVar}-600))`,
  700: `rgb(var(${cssVar}-700))`,
  800: `rgb(var(${cssVar}-800))`,
  900: `rgb(var(${cssVar}-900))`,
});

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // or 'media' or 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xl: "40px",
        "2xl": "128px",
      },
    },

    extend: {
      colors: {
        primary: customColors("--c-primary"),
        secondary: customColors("--c-secondary"),
        neutral: customColors("--c-neutral"),
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [typography, forms, aspectRatio],
};


export default config;