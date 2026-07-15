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
        brand: {
          red: "#CC0000",
          dark: "#152238",
        },
      },
      fontFamily: {
        display: ["'Bebas Neue'", "cursive"],
        heading: ["'Rajdhani'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;