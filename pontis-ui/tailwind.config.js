/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   secondary: {
      //     50: "#fefefd",
      //     100: "#fdfdfb",
      //     200: "#faf9f4",
      //     300: "#f6f6ee",
      //     400: "#f0efe1",
      //     500: "#e9e8d4",
      //     600: "#d2d1bf",
      //     700: "#afae9f",
      //     800: "#8c8b7f",
      //     900: "#727268",
      //   },
      //   primary: {
      //     50: "#f5f6f7",
      //     100: "#ebedef",
      //     200: "#ced1d6",
      //     300: "#b1b5be",
      //     400: "#767e8d",
      //     500: "#3b465c",
      //     600: "#353f53",
      //     700: "#2c3545",
      //     800: "#232a37",
      //     900: "#1d222d",
      //   },
      // },
      fontFamily: {
        sans: ["Space Grotesk", "ui-sans-serif", "system-ui"],
        mono: ["iA Writer Duospace", "ui-monospace", "SFMono-Regular"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
