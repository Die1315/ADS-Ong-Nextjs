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
        'pattern': "url('https://res.cloudinary.com/de9uql5fm/image/upload/v1681394890/background_o8csro.svg')",
        'recover': "url(https://res.cloudinary.com/de9uql5fm/image/upload/v1682526747/pexels-rodnae-productions-6646890_q1b40f.jpg)"
      },
      width: {
        '120': '500px',
      },
      minWidth: {
        '20': '20vw',
        '30': '30vw'
      },
      maxWidth: {
        '20': '20vw',
        '30': '30vw'
      },
      maxHeight: {
        '50': '50vh',
        '80': '80vh',
        '85': '85vh',
        '90': '90vh',
        '50%': '50%',
        '70%': '70%',
      },
      minHeight: {
        '50': '50vh',
        '80': '80vh',
        '85': '85vh',
        '90': '90vh',
        '50%': '50%',
        '70%': '70%',
      },
      zIndex: {
        '100': '9999999',
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
      },
      transitionDelay: {
        '0': '0ms',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}