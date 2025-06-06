/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'kalam': ['Kalam', 'cursive'],
        'caveat': ['Caveat', 'cursive'],
        'architects': ['Architects Daughter', 'cursive'],
        'indie': ['Indie Flower', 'cursive'],
        'sans-serif': ['sans-serif'],
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}