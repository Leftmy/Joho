/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        github: {
          dark: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          subtle: '#21262d',
          hover: '#8b949e26',
          text: '#c9d1d9',
          muted: '#8b949e',
          accent: '#58a6ff',
          glow: '#38bdf8',
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px -2px rgba(56, 189, 248, 0.15)',
        'glow-md': '0 0 20px -3px rgba(56, 189, 248, 0.25)',
        'glow-purple': '0 0 20px -3px rgba(168, 85, 247, 0.25)',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'Menlo', 'Monaco', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
