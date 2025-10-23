/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#f3f4f6",
        accent: "#10b981",
        danger: "#ef4444",
      },
      boxShadow: {
        card: "0 4px 10px rgba(0, 0, 0, 0.1)",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
};
