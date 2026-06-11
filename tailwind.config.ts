import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0B1D3A",
        teal: { DEFAULT: "#00C2BB", dark: "#00AFA8" },
        pink: "#FF2D6D",
        orange: "#FFB62B",
        sand: { DEFAULT: "#FFF7ED", deep: "#F5EDE0" },
        border: "#E7EEF2",
        muted: "#5B677A",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "Inter", "Arial", "sans-serif"],
        body: ["var(--font-sora)", "Inter", "Arial", "sans-serif"],
      },
      borderRadius: {
        dqsm: "12px",
        dqmd: "18px",
        dqlg: "28px",
        dqfull: "999px",
      },
      boxShadow: {
        card: "0 18px 50px rgba(11, 29, 58, 0.10)",
      },
      maxWidth: {
        dq: "1180px",
      },
    },
  },
  plugins: [],
};

export default config;
