/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        ecopatch: {
          primary: "#10b981", // emerald-500
          "primary-focus": "#059669", // emerald-600
          "primary-content": "#ffffff",

          secondary: "#065f46", // emerald-800
          "secondary-focus": "#064e3b", // emerald-900
          "secondary-content": "#ffffff",

          accent: "#34d399", // emerald-400
          "accent-focus": "#6ee7b7", // emerald-300
          "accent-content": "#022c22", // emerald-950

          neutral: "#374151", // gray-700
          "neutral-focus": "#1f2937", // gray-800
          "neutral-content": "#ffffff",

          "base-100": "#ffffff", // white
          "base-200": "#f9fafb", // gray-50
          "base-300": "#f3f4f6", // gray-100
          "base-content": "#1f2937", // gray-800

          info: "#3b82f6", // blue-500
          success: "#10b981", // emerald-500
          warning: "#f59e0b", // amber-500
          error: "#ef4444", // red-500
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
    rtl: false,
    prefix: "",
    logs: true,
  },
};
