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
        canvas: {
          light: '#FAFAFA',
          DEFAULT: '#FAFAFA',
          dark: '#0F172A',
        },
        text: {
          light: '#0F172A',
          DEFAULT: '#0F172A',
          dark: '#F8FAFC',
        },
        accent: {
          DEFAULT: '#0EA5E9',
        },
        gradient: {
          from: '#1E293B',
          to: '#3B82F6',
          'to-dark': '#2563EB',
        },
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
      spacing: {
        0: '0',
        2: '8px',
        4: '16px',
        6: '24px',
        8: '32px',
        12: '48px',
        16: '64px',
        24: '96px',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Lexend', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'theme-toggle': 'theme-toggle 0.5s ease-in-out',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'gradient-shift': 'sheen 2.5s ease-in-out infinite',
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
        },
        sheen: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
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
        },
        '.icon-btn-sm': {
          'width': '2rem',
          'height': '2rem',
          'border-radius': '9999px',
          'display': 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'transition': 'all 0.2s ease',
          '&:hover': {
            'transform': 'translateY(-2px)',
          },
          '&:active': {
            'transform': 'translateY(0)',
          }
        },
        '.icon-btn-lg': {
          'width': '3rem',
          'height': '3rem',
          'border-radius': '9999px',
          'display': 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'transition': 'all 0.2s ease',
          '&:hover': {
            'transform': 'translateY(-2px)',
          },
          '&:active': {
            'transform': 'translateY(0)',
          }
        },
        '.icon-btn-primary': {
          'background': 'linear-gradient(90deg, #1E293B, #3B82F6, #2563EB)',
          'background-size': '200% 100%',
          'color': 'white',
          'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          '&:hover': {
            'animation': 'sheen 2.5s ease-in-out infinite',
            'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
          '.dark &': {
            'background': 'linear-gradient(90deg, #1E293B, #3B82F6, #2563EB)',
          }
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover', 'dark'])
    }
  ],
}
