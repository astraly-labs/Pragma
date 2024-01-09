/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
        mono: ["IBM Plex Mono"],
      },
      animation: {
        blob: "blob 9s infinite",
        marquee: "marquee 30s linear infinite",
        marquee2: "marquee2 30s linear infinite",
      },
      colors: {
        transparent: "transparent",
        white: "#ffffff",
        darkGreen: "#042420",
        green: "#00473880",
        lightGreen: "#B5F0E5",
        mint: "#15FF81",
        lightBlur: "#B5F0E51F",
        codeColor: "#98A2B3",
        greenFooter: "#1B63521F",
        LightGreenFooter: "#B5F0E580",
        whiteTrans: "#FFFFFF26",
      },
      invert: {
        25: ".25",
        60: ".6",
        75: ".75",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(24px, -40px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-16px, 16px) scale(0.9)",
          },
          "100%": {
            transform: "tranlate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
