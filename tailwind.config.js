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
        // Add more custom sizes as needed
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
        typeroyale: {
          primary: "#663399", //accents and title, bright
          secondary: "#4C4452", //typed text, should be dark
          "base-100": "#111111ff", //background, dark
          "base-content": "#E8D5B5", //text color, bright
          "--rounded-box": "4px",
          "--rounded-btn": "4px",
          "--rounded-badge": "4px",
        },
      },
      {
        rain: {
          primary: "#ca9ff5", //accents and title, bright
          secondary: "#f5cee4", //typed text, should be dark
          "base-100": "#ffeede", //background, dark
          "base-content": "#ADD3FF", //text color, bright
        },
      },

      "acid",
      "aqua",
      "autumn",
      "bumblebee",
      "black",
      "business",
      "coffee",
      "corporate",
      "cupcake",
      "cyberpunk",
      "cmyk",
      "dark",
      "dracula",
      "emerald",
      "fantasy",
      "forest",
      "garden",
      "halloween",
      "lemonade",
      "light",
      "lofi",
      "luxury",
      "night",
      "pastel",
      "retro",
      "synthwave",
      "valentine",
      "winter",
      "wireframe",
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "typeroyale",
  },
};
