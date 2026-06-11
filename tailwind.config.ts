import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dq: {
          pink: "#FF2D6D",
          orange: "#FFB62B",
          teal: "#00C2BB",
          navy: "#0B1D3A",
          sand: "#FFF7ED",
          white: "#FFFFFF",
          border: "#E7EEF2",
          muted: "#5B677A",
        },
        navy: "#0B1D3A",
        teal: { DEFAULT: "#00C2BB", dark: "#00AFA8" },
        pink: "#FF2D6D",
        orange: "#FFB62B",
        sand: { DEFAULT: "#FFF7ED", deep: "#F5EDE0" },
        border: "#E7EEF2",
        muted: "#5B677A",
      },
      fontFamily: {
        heading: ["var(--font-montserrat)", "var(--font-sora)", "Inter", "Arial", "sans-serif"],
        body: ["var(--font-sora)", "var(--font-inter)", "Inter", "Arial", "sans-serif"],
      },
      borderRadius: {
        dqsm: "12px",
        dqmd: "18px",
        dqlg: "28px",
        dqxl: "36px",
        dqfull: "999px",
      },
      boxShadow: {
        card: "0 18px 50px rgba(11, 29, 58, 0.10)",
        hover: "0 24px 70px rgba(11, 29, 58, 0.14)",
      },
      maxWidth: {
        dq: "1180px",
      },
      backgroundImage: {
        "dq-brand": "linear-gradient(135deg, #FF2D6D 0%, #FFB62B 48%, #00C2BB 100%)",
        "dq-teal": "linear-gradient(135deg, #00C2BB 0%, #00AFA8 100%)",
        "dq-pink": "linear-gradient(135deg, #FF2D6D 0%, #FF5C8B 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
