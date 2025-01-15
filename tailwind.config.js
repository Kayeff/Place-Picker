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
      },
      fontFamily: {
        "Switzer": ["Switzer", "sans-serif"],
      },
      boxShadow: {
        "place": "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;"
      }
    },
  },
  plugins: [],
}

