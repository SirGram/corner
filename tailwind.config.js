/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor: {
        custom: 'url(/cursor.svg) 16 16, auto',
      },
      colors: {
        base: {
          100: "#0a0a0a",
          200: "#2d2d2d",
          300: "#484848",
        },
        primary: "#1e293b",
        secondary: "#f5f5f5",
        accent: "#f5f5f5",
        text: "#1e293b",
        darkText: "#f5f5f5",
        border: "#767676",
      },
      borderRadius: {
        base: "0.5rem",
      },
      borderWidth: {base: "1px" ,}
    },
  },
  plugins: [],
};
