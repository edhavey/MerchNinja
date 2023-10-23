/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#F8EDD2",
          DEFAULT: "#DAA520",
          500: "#DAA520",
          900: "#41310A"
        },
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
