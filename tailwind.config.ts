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
        primary: {
          DEFAULT: "#1a3a5c",
          dark: "#0f2840",
          light: "#2d5a8a",
        },
        accent: {
          DEFAULT: "#d4a441",
          dark: "#b8892e",
          light: "#e6bc5c",
        },
      },
    },
  },
  plugins: [],
};

export default config;
