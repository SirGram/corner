/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      cursor: {
        custom: "url(/cursor.svg) 10 10, auto",
      },
      animation: {
        spin: "spin 1s linear infinite",
      },
      keyframes: {
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      colors: {
        base: {
          100: "#ffffff",
          200: "#f0f0f0",
          300: "#d7d7d7",
        },
        primary: "#bd6464",
        secondary: "#f5f5f5",
        accent: "#d3331e",
        text: "#1e293b",
        border: "#a4a4a4",

        darkBase: {
          100: "#000000",
          200: "#0e0e0e",
          300: "#363636",
        },
        darkPrimary: "#da0000",
        darkSecondary: "#21242b",
        darkAccent: "#2d3644",
        darkText: "#f5f5f5",
        darkBorder: "#2c2c2c",
      },
      borderRadius: {
        base: "0.5rem",
      },
      borderWidth: { base: "1px" },
    },
  },
  plugins: [],
};
