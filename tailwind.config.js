/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
      },
      keyframes: {
        'spin-opposite': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
      },
    },
      animation: {
        'spin-opposite-slow': 'spin-opposite 2s linear infinite',
      },
      inset: {
        '3/2': '150%',
        '4/3': '133.333333%',
        '5/4': '125%',
        '11/10': '110%',
      }
    },
  },
  plugins: [],
};
