/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-green': '#00AE1C',
        'dark-green': '#187727',
        'bright-green': '#0CD52B',
        'error-red': '#FF5620',
        'secondary-gray': '#323749',
        'metal-gray': '#737373',
        'light-gray': '#DEDFE5',
        'common-white': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
