import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'disc-blue': '#7289da',
        'disc-white': '#B9BBBE',
        'disc-lgray': '#2E3036',
        'disc-mgray': '#292B2F',
        'disc-anothergray': '#40444B',
        'disc-dgray': '#222327',
        'disc-black': '#202225',
      },
    },
  },
  plugins: [],
};
export default config;
