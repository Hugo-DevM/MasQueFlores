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
        // Rosa carmesí profundo — color de las rosas del logo
        primary: {
          50:  "#fdf2f5",
          100: "#faddea",
          200: "#f5b8cf",
          300: "#ee85a8",
          400: "#e04a78",
          500: "#c8174a",  // color principal — rosa del logo
          600: "#a81240",
          700: "#870e34",
          800: "#620a26",
          900: "#3e0618",
        },
        // Dorado elegante — acento de lujo
        gold: {
          400: "#d4aa4a",
          500: "#b8912e",
          600: "#96741e",
        },
        // Carbón profundo — para fondos y texto elegante
        charcoal: {
          800: "#1c1118",
          900: "#110a0e",
        },
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        body: ["'Jost'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
