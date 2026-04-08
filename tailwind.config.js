/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
        mono: ['var(--font-dm-mono)', 'monospace'],
      },
      colors: {
        ink: {
          50:  '#f5f3f0',
          100: '#e8e4de',
          200: '#d0c8be',
          300: '#b5a899',
          400: '#9a8876',
          500: '#7d6a59',
          600: '#64523f',
          700: '#4a3b2c',
          800: '#31251a',
          900: '#1a1108',
        },
        sky: {
          accent: '#2B9ED4',
          light:  '#E8F5FC',
          dark:   '#1a6f97',
        },
        parchment: '#FAF8F5',
        cream: '#F2EDE6',
      },
      boxShadow: {
        'calendar': '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)',
        'card': '0 4px 20px rgba(0,0,0,0.08)',
        'ring': 'inset 0 2px 4px rgba(0,0,0,0.1)',
      },
      borderRadius: {
        'calendar': '12px',
      },
      keyframes: {
        'page-flip': {
          '0%': { transform: 'rotateX(0deg)', opacity: '1' },
          '50%': { transform: 'rotateX(-90deg)', opacity: '0.3' },
          '100%': { transform: 'rotateX(0deg)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(12px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-ring': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(43,158,212,0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(43,158,212,0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'page-flip': 'page-flip 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slide-up 0.4s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'pulse-ring': 'pulse-ring 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
}
