/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Archivo HTML principal
    "./src/**/*.{js,jsx}" // Todos los componentes React
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3d819d", // Color principal (azul del header)
        secondary: "#2c5d73" // Color secundario (hover de botones)
      },
      container: {
        center: true, // Centra el contenedor
        padding: "1rem" // Padding lateral en móviles
      }
    }
  },
  plugins: [],
}
