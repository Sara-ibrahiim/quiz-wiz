/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Base colors for light theme
        primaryDark: "#0D1321",
        primaryLight: "#f2f2f2",
        secondaryLight: "#FFEDDF",
        accent: "#C5D86D",
        borderColor: "#b3b3b3",

        // Additional colors for dark theme
        darkBackground: "#121212",
        darkSurface: "#1E1E1E",
        lightText: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
