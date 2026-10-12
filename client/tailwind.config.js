/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf9f1',
          100: '#f6f1de',
          200: '#ece0bd',
          300: '#dec993',
          400: '#ceac66',
          500: '#b89244',
          600: '#9e7536',
          700: '#7f592d',
          800: '#67472a',
          900: '#553c26',
        },
        rosewine: {
          50: '#fcf4f5',
          100: '#fae9eb',
          200: '#f5d6da',
          300: '#ecb5bd',
          400: '#de8997',
          500: '#cb5f72',
          600: '#b44458',
          700: '#973547',
          800: '#7e2e3d',
          900: '#6a2b37',
        },
        emeraldgreen: {
          800: '#064e3b',
          900: '#022c22',
          950: '#011c15'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
