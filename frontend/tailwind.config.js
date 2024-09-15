const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["ui-serif", "Georgia"],
      },
      gridTemplateColumns: {
        custom: "1.8fr 1fr",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), flowbite.plugin()],
};
