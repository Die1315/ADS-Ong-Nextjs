/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundPosition: {
        'top-xl': 'center -300px',
        'top-lg': 'center -200px'
      },
      backgroundImage: {
        'login-hero': "url('https://res.cloudinary.com/de9uql5fm/image/upload/v1677758224/login-hero_txli5s.jpg')",
        'register-hero': "url('https://res.cloudinary.com/de9uql5fm/image/upload/v1677758224/register-hero_xwgyrl.jpg')",
      },
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