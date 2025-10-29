/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spiderman-red': '#E62429',
        'spiderman-dark': '#1a1a1a',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        spiderman: {
          "primary": "#E62429",
          "secondary": "#1a1a1a",
          "accent": "#DC143C",
          "neutral": "#000000",
          "base-100": "#1a1a1a",
        },
      },
    ],
  },
}

