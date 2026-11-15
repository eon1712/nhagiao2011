module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#F7F3EB",
          light: "#FAF7F2",
          dark: "#EFE9DE",
        },
        chalk: {
          DEFAULT: "#16211C",
          surface: "#1B2A23",
          light: "#253830",
        },
        ink: {
          primary: "#1A1917",
          muted: "#4A4742",
          faint: "#827E76",
        },
        terracotta: {
          DEFAULT: "#C85A32",
          hover: "#B04D28",
          light: "#DF7A55",
        },
        gold: {
          DEFAULT: "#C59B27",
          hover: "#AA851E",
          light: "#DEB649",
        },
        gridLine: "rgba(26, 25, 23, 0.12)",
      },
      fontFamily: {
        display: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        body: ["var(--font-be-vietnam)", "Be Vietnam Pro", "sans-serif"],
        mono: ["var(--font-jetbrains)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "float-gentle": "floatGentle 6s ease-in-out infinite",
        "pulse-slow": "pulseSlow 4s ease-in-out infinite",
        "shimmer-gold": "shimmerGold 2.5s ease-in-out infinite",
      },
      keyframes: {
        floatGentle: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(1.5deg)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: 0.8, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.03)" },
        },
        shimmerGold: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
