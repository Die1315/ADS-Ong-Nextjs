/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5CE1E6",
        secondary: "#FFDE59",
        light: "#f7f7f7",
        dark: "#131311"
      },
      fontFamily: {
        Ubuntu: ["Ubuntu", "sans-serif"],
        Raleway: ["Raleway", "sans-serif"]
      }
    },
  },
  plugins: [],
}