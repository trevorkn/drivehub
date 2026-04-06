/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // important for toggling dark mode using a class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBg: "#1f2a44",
      },
    },
  },
  plugins: [],
}

