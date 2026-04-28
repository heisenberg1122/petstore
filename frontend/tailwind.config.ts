import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#081120',
          900: '#0c172a',
          800: '#10233e'
        },
        sand: {
          50: '#fffdf6',
          100: '#fff7df'
        },
        coral: '#ff7b54',
        mint: '#49c5b6'
      },
      boxShadow: {
        glow: '0 20px 60px rgba(255, 123, 84, 0.22)'
      }
    }
  },
  plugins: []
} satisfies Config;
