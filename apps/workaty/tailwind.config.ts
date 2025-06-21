module.exports = {
  darkMode: false,
  content: ["./app/**/*.{html,js,ts,jsx,tsx,vue,astro}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("tw-animate-css")],
};
