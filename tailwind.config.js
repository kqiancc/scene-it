/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        blink: {
          "50%": { opacity: 0 },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
        blink: "blink 1s ease-in-out infinite",
        shrink: "shrink 0.5s ease-in-out forwards",
        grow: "grow 0.5s ease-in-out forwards",
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "11rem",
        "12xl": "12rem",
        "13xl": "13rem",
        "14xl": "14rem",
        "15xl": "15rem",
      },
    },

    fontFamily: {
      sans: ["IBM Plex Sans"],
    },
  },

  plugins: [require("daisyui")],

  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [
      {
        sceneit: {
          primary: "#FF79C6", //accents and title, bright
          secondary: "#8BE9FD", //typed text, should be dark
          "base-100": "#0E1419", //background, dark
          "base-content": "#FFFFFF", //text color, bright
        },
        sceneitLight: {
          primary: "#FF79C6", //accents and title 008639 - green
          secondary: "#FFB86C", //typed text FFB86C - orange, 04c1eb - blue
          "base-100": "#F1EBE6", //background
          "base-content": "#000000", //text color
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dracula",
  },
};
