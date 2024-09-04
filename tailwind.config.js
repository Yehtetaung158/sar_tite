/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        darkPrimary:"#495057",
        darkBg:"#212529",
        primary:"#2ec4b6",
        secondary:"#cbf3f0",
        darkText1:"#ced4da",
        darkText2:"#f8f9fa",
        darkSecondary:"#adb5bd",
        primaryHoverbg:"#06d6a0"
      }
    },
  },
  vatiants:{},
  plugins: [],
}

