/** @type {import('tailwindcss').Config} */

export default {
  content: [
    
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js" // Add Flowbite's content here
  ],
  theme: {
    extend: {},
  },
  plugins: [    require('flowbite/plugin'),] // Use Flowbite's plugin],
}