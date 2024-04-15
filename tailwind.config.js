/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        colorPrimary: "rgb(0, 163, 255)",
      },
    },
  },
  plugins: [],
};
