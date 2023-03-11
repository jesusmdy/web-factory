/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1e88e5",
        "secondary": "#ff5722",
        "success": "#4caf50",
        "info": "#00acc1",
        "warning": "#ff9800",
        "error": "#f44336",
        'black': '#1b1c1d'
      }
    },
  },
  plugins: [],
}
