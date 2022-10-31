/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  theme: {
    screens: { xxs: '490px', xs: '540px' },
    extend: {
      colors: {
        brightRed: 'hsl(12, 88%, 59%)',
        brightRedLight: 'hsl(12, 88%, 69%)',
        brightRedSupLight: 'hsl(12, 88%, 95%)',
        darkBlue: 'hsl(228, 39%, 23%)',
        darkGrayishBlue: 'hsl(227, 12%, 61%)',
        veryDarkBlue: 'hsl(233, 12%, 13%)',
        veryPaleRed: 'hsl(13, 100%, 96%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
        veryBlack: 'hsl(0, 0, 9%)',
        veryCard: 'hsl(0,0, 16%)'
        // xfurniture: 'rgb(245 158 11)',//amber-500
        // furniture: 'hsl(38, 92%,40%)'
      }
    }
  },
  plugins: []
};
