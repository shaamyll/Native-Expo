/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors : {
        primary: '#1a1730',
        secondary:"#f4f4f5"
      },
       fontFamily: {
        inter: ['Inter'],
        'inter-bold': ['InterBold'],
        'inter-semibold': ['InterSemiBold'],
      },
    },
  },
  plugins: [],
};
