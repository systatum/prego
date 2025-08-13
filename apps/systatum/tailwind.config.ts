import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,html}",
    "./node_modules/@systatum/coneto/**/*.{js,ts,jsx,tsx,mdx,html}",
  ],
  theme: {},
  plugins: [],
};

export default config;
