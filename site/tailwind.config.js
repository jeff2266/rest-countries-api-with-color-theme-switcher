import { createThemes } from 'tw-colors'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito sans', 'sans-serif']
      }
    },
  },
  plugins: [
    createThemes({
      light: {
        'element': 'hsl(0, 0%, 100%)',
        'background': 'hsl(0, 0%, 98%)',
        'text': 'hsl(200, 15%, 8%)'
      },
      dark: {
        'element': 'hsl(209, 23%, 22%)',
        'background': 'hsl(207, 26%, 17%)',
        'text': 'hsl(0, 0%, 100%)'
      }
    })
  ],
}

