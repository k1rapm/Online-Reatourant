/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: { max: "400px" },
      md: { max: "600px" },
      lg: "1024px",
    },
    extend: {},
  },
  plugins: [],
};
