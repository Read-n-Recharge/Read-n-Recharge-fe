/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 15px rgba(255, 255, 255, 0.7)",
        'glow-blue': '0 0 15px rgba(230, 246, 255, 0.8)',
      },
      backgroundColor: {
        glow: "rgba(255, 255, 255, 0.3)",
        'glow-blue': 'rgba(230, 246, 255, 0.5)'
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ["hover"],
      backgroundColor: ["hover"],
    },
  },
  plugins: [],
};
