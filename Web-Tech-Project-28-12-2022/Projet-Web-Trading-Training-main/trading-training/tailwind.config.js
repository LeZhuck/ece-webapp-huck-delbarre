/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily :{
        'poppins': 'Poppins'
      },
      colors :{
        'main-green': '#46DBC4',
        'second-bg' : '#1E1E1E',
        'parag-color': '#e0e0e0',
        'cyan': '#9cdbff',
        'blue': '#0070f3',
        
      }
    },
  },
  
  plugins: [ require('tailwind-scrollbar'),],
}
