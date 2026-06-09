import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xsm: '430px',
        sm: '650px',
        lg: '1080px'
      },
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        neutral: {
          50: '#f5f5f5',
          300: '#c2c2c2',
          600: '#595959',
          700: '#404040',
          900: '#1a1a1a',
        },
        seat: {
          vip: '#ffc107',
          r: '#9c27b0',
          s: '#2196f3',
          a: '#4caf50',
          ok: '#4caf50',
          warn: '#ff9800',
          info: '#2196f3',
        },
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          '"Fira Sans"',
          '"Droid Sans"',
          '"Helvetica Neue"',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}

export default config
