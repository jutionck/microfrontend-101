/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // Include remote microfrontend components for CSS generation
    "../login-app/src/**/*.{js,ts,jsx,tsx}",
    "../todo-app/src/**/*.{js,ts,jsx,tsx}",
  ],
}