/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0078D4',
          light: '#C7E0F4',
          lighter: '#F0F6FA',
          dark: '#106EBE',
        },
      },
    },
  },
  plugins: [],
};