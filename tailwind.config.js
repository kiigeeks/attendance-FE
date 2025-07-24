/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blackPrimary': '#303030',
        'grayPrimary': '#C1C1C1',
        'graySecondary': '#161616',
        'redPrimary': '#C93131',
        'whitePrimary': '#F0F3F5',
        'whiteSecondary': '#EEE',
        'yellowPrimary': '#FCEABB',
        'yellowSecondary': '#F8B500',
        'bluePrimary': '#25A4FF',
        'greenPrimary': '#238549',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      fontSize: {
        xxs: '10px',
      }
    },
  },
  plugins: [],
}

