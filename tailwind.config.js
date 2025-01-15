/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "Switzer": ["Switzer", "sans-serif"],
    },
    extend: {
      colors: {
        "raisin-black": "#231F20",
        "persian-red": "#C44536",
        "verdigris": "#7EBDC2",
        "vanilla": "#F3DFA2",
        "linen": "#EFE6DD",
      },
    },
  },
  plugins: [],
}

