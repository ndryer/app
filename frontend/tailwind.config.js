/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6', // Brand color: blue-500 (Electric Blue)
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        accent: {
          light: '#60a5fa', // blue-400
          DEFAULT: '#3b82f6', // blue-500
          dark: '#2563eb', // blue-600
        },
        navy: {
          light: '#1e293b', // slate-800
          DEFAULT: '#0f172a', // slate-900 (Deep Navy)
          dark: '#020617', // slate-950
        },
        dark: {
          100: '#cfd1d9',
          200: '#a2a5b9',
          300: '#7d7f96',
          400: '#4a4e69',
          500: '#2a2d43',
          600: '#1f2231',
          700: '#171a27',
          800: '#10121b',
          900: '#090a10',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Lexend', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'theme-toggle': 'theme-toggle 0.5s ease-in-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'theme-toggle': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        }
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      scrollSnapType: {
        x: 'x mandatory',
        y: 'y mandatory',
        both: 'both mandatory',
        none: 'none',
      },
      scrollSnapAlign: {
        start: 'start',
        center: 'center',
        end: 'end',
      },
      scrollSnapStop: {
        normal: 'normal',
        always: 'always',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scroll-snap-type-x': {
          'scroll-snap-type': 'x mandatory',
        },
        '.scroll-snap-type-y': {
          'scroll-snap-type': 'y mandatory',
        },
        '.scroll-snap-align-start': {
          'scroll-snap-align': 'start',
        },
        '.scroll-snap-align-center': {
          'scroll-snap-align': 'center',
        },
        '.scroll-snap-align-end': {
          'scroll-snap-align': 'end',
        },
        '.scroll-snap-mandatory': {
          'scroll-snap-stop': 'always',
        }
      }
      addUtilities(newUtilities, ['responsive'])
    }
  ],
}
