const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        pfd: ["Playfair Display", "sans-serif"],
        sans: ["Mulish", "sans-serif"],
        read: ["ui-serif", "Georgia"],
      },
      gridTemplateColumns: {
        custom: "1.8fr 1fr",
      },
      lineHeight: {
        12: "3rem",
      },
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        blue: "var(--color-blue)",
        "light-blue": "var(--color-light-blue)",
        "btn-primary": "var(--color-btn-primary)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        border: "var(--color-border)",
      },
      keyframes: {
        "fade-in-pulse": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in-pulse":
          "fade-in-pulse 0.3s forwards cubic-bezier(0.8, 0.02, 0.45, 0.91)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    flowbite.plugin(),
    require("@tailwindcss/typography"),
  ],
};
