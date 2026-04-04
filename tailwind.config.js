/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        background: "var(--color-background)",
        text: "var(--color-text)",
        "bg-primary": "var(--bg-primary)",
        "bg-tertiary": "var(--bg-tertiary)",
      },
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderColor: {
        DEFAULT: "var(--color-text)",
      },
      borderRadius: {
        lg: "32px",
      },
      boxShadow: {
        hover: "var(--shadow-hover)",
      }
    },
  },
  plugins: [],
}
