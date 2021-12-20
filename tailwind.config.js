module.exports = {
  // mode: 'jit',
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mainwhitebg: "F9FAFB",
        maingreen: {
          100: "#19B586",
          200: "#3EC19A",
          300: "#E1F1EE",
        },
        mainorange: {
          100: "#FFA43A",
          200: "#FFBE39",
        },
        flashwhite: "#F3F3F3",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
};
