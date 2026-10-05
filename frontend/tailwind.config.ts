import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030712", // Deep void black
        surface: "#080d1a",    // Dark navy obsidian
        surfaceLight: "#0f172a", // Radiant slate
        borderDark: "#1e293b",
        radiantBlue: {
          DEFAULT: "#00d2ff",
          50: "#f0fdf4",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#00d2ff",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        electricIndigo: "#3b82f6",
        neonCyan: "#00f5ff",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
      boxShadow: {
        'radiant-glow': '0 0 35px -5px rgba(0, 210, 255, 0.25)',
        'radiant-sm': '0 0 15px rgba(0, 210, 255, 0.15)',
        'blue-glow': '0 0 40px -10px rgba(59, 130, 246, 0.3)',
      },
      backgroundImage: {
        'radiant-gradient': 'radial-gradient(circle at 50% 0%, rgba(0, 210, 255, 0.15), transparent 70%)',
        'mesh-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 180, 255, 0.25), transparent 100%)',
      }
    },
  },
  plugins: [],
};
export default config;
