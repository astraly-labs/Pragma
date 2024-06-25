/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  important: true,
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular"],
      },
      lineHeight: {
        loose: "3.75rem",
      },
      animation: {
        blob: "blob 9s infinite",
        marquee: "marquee 30s linear infinite",
        marquee2: "marquee2 30s linear infinite",
      },
      width: {
        xlarge: "450px",
      },
      colors: {
        transparent: "transparent",
        white: "#ffffff",
        darkGreen: "#042420",
        green: "#00473880",
        lightGreen: "#B5F0E5",
        mint: "#15FF81",
        lightBlur: "#B5F0E51F",
        xlightBlur: "#FFFFFF0D",
        codeColor: "#98A2B3",
        greenFooter: "#1B63521F",
        LightGreenFooter: "#B5F0E580",
        whiteTrans: "#FFFFFF26",
        redDown: "#E52258",
        lightBackground: "#0000001F",
      },
      invert: {
        25: ".25",
        60: ".6",
        75: ".75",
      },
      screens: {
        smolScreen: "380px",
        // => @media (min-width: 640px) { ... }
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

  plugins: [
    require("@tailwindcss/typography"),
    plugin(function ({ addBase }) {
      addBase({
        h1: {
          fontSize: "60px",
          fontWeight: "300",
          lineHeight: "70px",
          letterSpacing: "-1.2px",
          "@media (max-width: 640px)": {
            fontSize: "36px",
            lineHeight: "46px",
          },
        },
        h2: {
          fontSize: "48px",
          fontWeight: "300",
          lineHeight: "60px",
          letterSpacing: "-0.96px",
          "@media (max-width: 640px)": {
            fontSize: "30px",
            lineHeight: "38px",
          },
        },
        h3: {
          fontSize: "36px",
          fontWeight: "400",
          lineHeight: "46px",
        },
        h4: {
          fontSize: "30px",
          fontWeight: "400",
          lineHeight: "38px",
          "@media (max-width: 640px)": {
            fontSize: "24px",
            lineHeight: "32px",
          },
        },
        h5: {
          fontSize: "24px",
          fontWeight: "400",
          lineHeight: "32px",
          "@media (max-width: 640px)": {
            fontSize: "20px",
            lineHeight: "25px",
          },
        },
      });
    }),
  ],
};
