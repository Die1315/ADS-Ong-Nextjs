/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#68D2DF",
        secondary: "#6393EB",
        accent: "#63EBAF",
        black: "#131311"
      },
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"]
      }
    },
  },
  plugins: [],
}