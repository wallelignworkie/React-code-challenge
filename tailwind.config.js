/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        EPrimary: "#374151", // Custom gray
        ESecondary: "#FBBF24", // Example: Yellow
        EDanger: "#DC2626", // Example: Red
        customGray: {
          ELight: "#E5E7EB",
          EDEFAULT: "#6B7280",
          EDark: "#4B5563",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
