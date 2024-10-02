/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "flex-furniture": {
          50: "#f0f7ff",
          100: "#dfeeff",
          200: "#b8deff",
          300: "#79c4ff",
          400: "#32a6fe",
          500: "#078cf0",
          600: "#006dcd",
          700: "#0056a6",
          800: "#034a89",
          900: "#093e71",
          950: "#020d19",
        },
      },
    },
  },
  plugins: [],
};
