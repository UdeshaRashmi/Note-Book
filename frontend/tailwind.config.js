/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        olive: {
          50: '#f6fbf4',
          100: '#eef9e8',
          200: '#d7efc9',
          300: '#bfe59b',
          400: '#9ed060',
          500: '#7fb330',
          600: '#5f8f23',
          700: '#486e1b',
          800: '#355214',
          900: '#20360d'
        },
        cream: {
          50: '#fffdf8',
          100: '#fff9ef',
          200: '#fff1d7',
          300: '#ffe6b8',
          400: '#ffd980',
          500: '#ffc94b',
          600: '#e6a827',
          700: '#b8751d',
          800: '#8f5417',
          900: '#602f0f'
        },
        sand: {
          50: '#fbfaf8',
          100: '#f7f6f3',
          200: '#efece6',
          300: '#e6dfd5',
          400: '#d8cfc0',
          500: '#c6b8a6',
          600: '#9f8a73',
          700: '#7b6350',
          800: '#594539',
          900: '#3a2a23'
        },
        accent: {
          50: '#fff8f2',
          100: '#fff1e6',
          200: '#ffd9b8',
          300: '#ffbf8a',
          400: '#ff9b46',
          500: '#ff7a12',
          600: '#e85f0f',
          700: '#b9450b',
          800: '#8b3308',
          900: '#5c2205'
        }
      }
    },
  },
  plugins: [],
}

