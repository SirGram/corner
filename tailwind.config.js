import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      cursor: {
        custom: 'url(/cursor.svg) 10 10, auto',
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      keyframes: {
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      colors: {
        base: {
          100: "#ffffff",
          200: "#f0f0f0",
          300: "#d7d7d7",
        },
        primary: "#c10000",
        secondary: "#f5f5f5",
        accent: "#f5f5f5",
        text: "#1e293b",
        border: "#a4a4a4",

        darkBase:{
          100: "#000000",
          200: "#1e1e1e",
          300: "#454545",
        },
        darkPrimary: "#f5f5f5",
        darkSecondary: "#1e293b",
        darkAccent: "#1e293b",
        darkText: "#f5f5f5",
        darkBorder: "#767676",
      },
      borderRadius: {
        base: "0.5rem",
      },
      borderWidth: {base: "1px" ,}
    },
  },
  plugins: [],
};
