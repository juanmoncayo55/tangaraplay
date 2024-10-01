/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "azulBrillante1": "#28B1F2",
        "azulBrillante2": "#00FFFF",
        "azulBrillante3": "#01FCFE",
        "backgroundAzulOscuro": "#2B3960",
        "clEFEFEF": "#EFEFEF",
        "cl379f": "#379FFE",
        "pruebaGradiente": "linear-gradient(to right red, blue)"
      }
    },
  },
  plugins: [],
}

