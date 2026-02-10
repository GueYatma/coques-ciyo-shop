import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
        pearl: {
          50: '#0f172a',
          100: '#1e293b',
          200: '#334155',
        },
        neon: {
          500: '#5b7cfa',
          400: '#7ea2ff',
          300: '#b4c8ff',
        },
        ember: {
          500: '#ff6b7a',
          400: '#ff93a6',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 20px 45px rgba(15, 23, 42, 0.12)',
        float: '0 35px 80px rgba(59, 130, 246, 0.16)',
      },
      backgroundImage: {
        grid: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
} satisfies Config
