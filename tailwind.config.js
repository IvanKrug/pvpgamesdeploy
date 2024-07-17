/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pvp: {
          verde: '#9EFB06',
          azul: {
            800: '#311189',
            900: '#0D0423',
          }
        }
      }
    }
  },
  plugins: [],
}