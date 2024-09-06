/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 0 15px rgba(255, 255, 255, 0.7)",
        "glow-blue": "0 0 15px rgba(230, 246, 255, 0.8)",
      },
      backgroundColor: {
        glow: "rgba(255, 255, 255, 0.3)",
        "glow-blue": "rgba(230, 246, 255, 0.5)",
      },
      colors: {
        "custom-green": "#d3f8e2",
        "custom-blue": "#dbe8fa",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to top, #bde7c6, #68bef5,#68bef5)",
      },
      fontSize: {
        tiny: "10px",
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
