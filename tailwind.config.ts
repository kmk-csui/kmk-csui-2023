import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['var(--font-jakarta)'],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
} satisfies Config;
