/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "raisin-black": "#231F20",
        "persian-red": "#C44536",
        "verdigris": "#7EBDC2",
        "vanilla": "#F3DFA2",
        "linen": "#EFE6DD",
        "dark-slate-gray": "#305252",
        "davys-gray": "#575A5E",
      },
      fontFamily: {
        "Switzer": ["Switzer", "sans-serif"],
        "Manrope": ["Manrope", "sans-serif"],
      },
      boxShadow: {
        "place": "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;",
        "modal": "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;"
      }
    },
  },
  plugins: [],
}

