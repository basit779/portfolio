import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        bg:       "#07070A",
        surface:  "#0E0E12",
        surface2: "#15151B",
        accent:   "#3ECF8E",
        cyan:     "#22D3EE",
        violet:   "#8B5CF6",
        t1:       "#F4F4F6",
        t2:       "#A2A2AF",
        t3:       "#8A8A98",
        border:   "rgba(255,255,255,0.07)",
        "border-hover": "rgba(255,255,255,0.16)",
      },
      boxShadow: {
        glow:      "0 0 0 1px rgba(62,207,142,0.18), 0 8px 40px -8px rgba(62,207,142,0.35)",
        "glow-soft": "0 0 60px -10px rgba(62,207,142,0.25)",
        card:      "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 20px 60px -25px rgba(0,0,0,0.8)",
      },
      keyframes: {
        "aurora-1": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%":     { transform: "translate(8%,-6%) scale(1.15)" },
          "66%":     { transform: "translate(-6%,8%) scale(0.92)" },
        },
        "aurora-2": {
          "0%,100%": { transform: "translate(0,0) scale(1.05)" },
          "33%":     { transform: "translate(-10%,6%) scale(0.9)" },
          "66%":     { transform: "translate(7%,-9%) scale(1.2)" },
        },
        "aurora-3": {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%":     { transform: "translate(6%,10%) scale(1.18)" },
        },
        "grid-pan": {
          "0%":   { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 60px" },
        },
        blink:    { "0%,49%": { opacity: "1" }, "50%,100%": { opacity: "0" } },
        marquee:  { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        shimmer:  { "0%": { backgroundPosition: "200% center" }, "100%": { backgroundPosition: "-200% center" } },
        float:    { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        "pulse-ring": {
          "0%":   { transform: "scale(0.8)", opacity: "0.6" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        dash: { to: { strokeDashoffset: "-1000" } },
      },
      animation: {
        "aurora-1": "aurora-1 22s ease-in-out infinite",
        "aurora-2": "aurora-2 26s ease-in-out infinite",
        "aurora-3": "aurora-3 30s ease-in-out infinite",
        "grid-pan": "grid-pan 8s linear infinite",
        blink:      "blink 1.05s step-end infinite",
        marquee:    "marquee 32s linear infinite",
        shimmer:    "shimmer 6s linear infinite",
        float:      "float 6s ease-in-out infinite",
        dash:       "dash 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
