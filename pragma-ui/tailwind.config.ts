import plugin from "tailwindcss/plugin";

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular"],
      },
      lineHeight: {
        loose: "3.75rem",
      },
      invert: {
        25: ".25",
        60: ".6",
        75: ".75",
      },
      animation: {
        blob: "blob 9s infinite",
        marquee: "marquee 30s linear infinite",
        marquee2: "marquee2 30s linear infinite",
      },
      width: {
        xlarge: "450px",
      },
      screens: {
        smolScreen: "380px",
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
      colors: {
        darkGreen: "hsl(var(--dark-green))",
        green: "hsl(var(--green))",
        lightGreen: "hsl(var(--light-green))",
        mint: "hsl(var(--mint))",
        lightBlur: "hsl(var(--light-blur))",
        xlightBlur: "hsl(var(--xlight-blur))",
        codeColor: "hsl(var(--code-color))",
        greenFooter: "hsl(var(--green-footer))",
        lightGreenFooter: "hsl(var(--light-green-footer))",
        whiteTrans: "hsl(var(--white-trans))",
        redDown: "hsl(var(--red-down))",
        lightBackground: "hsl(var(--light-background))",
        purple: "hsl(var(--purple))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [
    require("tailwindcss-animate"),
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

export default config;
