/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {center:true},
      boxShadow: {
        'full': '0 0px 20px 0px',
        //shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      colors: {
        darkviolet: {
          50: "#b7b7c9",
          100: "#8b8ca8",
          200: "#636484",
          300: "#585975",
          400: "#4d4e67",
          500: "#424458",
          600: "#373949",
          700: "#2c2d3b",
          800: "#21222C",
          900: "#16171d"
        }
      }
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
          {
            'text-shadow': (value) => ({
              textShadow: value,
            }),
          },
          { values: theme('textShadow') }
      )
    }),
  ],
}