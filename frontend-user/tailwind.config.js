// tailwind.config.js
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0EA5E9",
        secondary: "#14B8A6",
        accent: "#F59E0B",
        success: "#22C55E",
        danger: "#EF4444",
        background: "#F8FAFC",
        card: "#FFFFFF",
        textPrimary: "#0F172A",
        textSecondary: "#64748B",
        border: "#E2E8F0",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
}
