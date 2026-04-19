/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6366f1",  // indigo
        success: "#22c55e",  // green
        warning: "#f59e0b",  // amber
        error: "#ef4444",    // red
      },
    },
  },
  plugins: [],
}
