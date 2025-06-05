/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Token-based color system with CSS custom properties
        token: {
          // Primary palette
          primary: {
            50: 'var(--token-primary-50)',
            100: 'var(--token-primary-100)',
            200: 'var(--token-primary-200)',
            300: 'var(--token-primary-300)',
            400: 'var(--token-primary-400)',
            500: 'var(--token-primary-500)',
            600: 'var(--token-primary-600)',
            700: 'var(--token-primary-700)',
            800: 'var(--token-primary-800)',
            900: 'var(--token-primary-900)',
            950: 'var(--token-primary-950)',
          },
          // Secondary palette
          secondary: {
            50: 'var(--token-secondary-50)',
            100: 'var(--token-secondary-100)',
            200: 'var(--token-secondary-200)',
            300: 'var(--token-secondary-300)',
            400: 'var(--token-secondary-400)',
            500: 'var(--token-secondary-500)',
            600: 'var(--token-secondary-600)',
            700: 'var(--token-secondary-700)',
            800: 'var(--token-secondary-800)',
            900: 'var(--token-secondary-900)',
            950: 'var(--token-secondary-950)',
          },
          // Accent palette
          accent: {
            50: 'var(--token-accent-50)',
            100: 'var(--token-accent-100)',
            200: 'var(--token-accent-200)',
            300: 'var(--token-accent-300)',
            400: 'var(--token-accent-400)',
            500: 'var(--token-accent-500)',
            600: 'var(--token-accent-600)',
            700: 'var(--token-accent-700)',
            800: 'var(--token-accent-800)',
            900: 'var(--token-accent-900)',
            950: 'var(--token-accent-950)',
          },
          // Success palette
          success: {
            50: 'var(--token-success-50)',
            100: 'var(--token-success-100)',
            200: 'var(--token-success-200)',
            300: 'var(--token-success-300)',
            400: 'var(--token-success-400)',
            500: 'var(--token-success-500)',
            600: 'var(--token-success-600)',
            700: 'var(--token-success-700)',
            800: 'var(--token-success-800)',
            900: 'var(--token-success-900)',
            950: 'var(--token-success-950)',
          },
          // Warning palette
          warning: {
            50: 'var(--token-warning-50)',
            100: 'var(--token-warning-100)',
            200: 'var(--token-warning-200)',
            300: 'var(--token-warning-300)',
            400: 'var(--token-warning-400)',
            500: 'var(--token-warning-500)',
            600: 'var(--token-warning-600)',
            700: 'var(--token-warning-700)',
            800: 'var(--token-warning-800)',
            900: 'var(--token-warning-900)',
            950: 'var(--token-warning-950)',
          },
          // Error palette
          error: {
            50: 'var(--token-error-50)',
            100: 'var(--token-error-100)',
            200: 'var(--token-error-200)',
            300: 'var(--token-error-300)',
            400: 'var(--token-error-400)',
            500: 'var(--token-error-500)',
            600: 'var(--token-error-600)',
            700: 'var(--token-error-700)',
            800: 'var(--token-error-800)',
            900: 'var(--token-error-900)',
            950: 'var(--token-error-950)',
          },
          // Neutral palette
          neutral: {
            50: 'var(--token-neutral-50)',
            100: 'var(--token-neutral-100)',
            200: 'var(--token-neutral-200)',
            300: 'var(--token-neutral-300)',
            400: 'var(--token-neutral-400)',
            500: 'var(--token-neutral-500)',
            600: 'var(--token-neutral-600)',
            700: 'var(--token-neutral-700)',
            800: 'var(--token-neutral-800)',
            900: 'var(--token-neutral-900)',
            950: 'var(--token-neutral-950)',
          },
          // Surface palette
          surface: {
            50: 'var(--token-surface-50)',
            100: 'var(--token-surface-100)',
            200: 'var(--token-surface-200)',
            300: 'var(--token-surface-300)',
            400: 'var(--token-surface-400)',
            500: 'var(--token-surface-500)',
            600: 'var(--token-surface-600)',
            700: 'var(--token-surface-700)',
            800: 'var(--token-surface-800)',
            900: 'var(--token-surface-900)',
            950: 'var(--token-surface-950)',
          },
          // Semantic colors
          bg: {
            primary: 'var(--token-bg-primary)',
            secondary: 'var(--token-bg-secondary)',
            tertiary: 'var(--token-bg-tertiary)',
          },
          text: {
            primary: 'var(--token-text-primary)',
            secondary: 'var(--token-text-secondary)',
            tertiary: 'var(--token-text-tertiary)',
          },
          border: {
            primary: 'var(--token-border-primary)',
            secondary: 'var(--token-border-secondary)',
          },
          interactive: {
            primary: 'var(--token-interactive-primary)',
            'primary-hover': 'var(--token-interactive-primary-hover)',
            'primary-active': 'var(--token-interactive-primary-active)',
            secondary: 'var(--token-interactive-secondary)',
            'secondary-hover': 'var(--token-interactive-secondary-hover)',
            'secondary-active': 'var(--token-interactive-secondary-active)',
          },
        },

        // Legacy color system (for backward compatibility)
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
        // Token-based spacing system (8px scale)
        0: 'var(--space-0)',
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        8: 'var(--space-8)',
        10: 'var(--space-10)',
        12: 'var(--space-12)',
        16: 'var(--space-16)',
        20: 'var(--space-20)',
        24: 'var(--space-24)',

        // Legacy spacing (for backward compatibility)
        'legacy-2': '8px',
        'legacy-4': '16px',
        'legacy-6': '24px',
        'legacy-8': '32px',
        'legacy-12': '48px',
        'legacy-16': '64px',
        'legacy-24': '96px',
      },
      borderRadius: {
        // Token-based radius system
        'token-sm': 'var(--radius-sm)',
        'token-md': 'var(--radius-md)',
        'token-lg': 'var(--radius-lg)',
        'token-xl': 'var(--radius-xl)',
        'token-full': 'var(--radius-full)',
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
    function ({ addUtilities }) {
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
          'background': 'var(--gradient-secondary)',
          'background-size': '200% 100%',
          'color': 'white',
          'box-shadow': '0 4px 6px -1px var(--token-shadow-primary), 0 2px 4px -1px var(--token-shadow-primary)',
          '&:hover': {
            'animation': 'sheen 2.5s ease-in-out infinite',
            'box-shadow': '0 10px 15px -3px var(--token-shadow-secondary), 0 4px 6px -2px var(--token-shadow-secondary)',
          },
        },

        // Token-based utility classes
        '.bg-token-primary': {
          'background-color': 'var(--token-bg-primary)',
        },
        '.bg-token-secondary': {
          'background-color': 'var(--token-bg-secondary)',
        },
        '.bg-token-tertiary': {
          'background-color': 'var(--token-bg-tertiary)',
        },
        '.text-token-primary': {
          'color': 'var(--token-text-primary)',
        },
        '.text-token-secondary': {
          'color': 'var(--token-text-secondary)',
        },
        '.text-token-tertiary': {
          'color': 'var(--token-text-tertiary)',
        },
        '.border-token-primary': {
          'border-color': 'var(--token-border-primary)',
        },
        '.border-token-secondary': {
          'border-color': 'var(--token-border-secondary)',
        },
        '.bg-interactive-primary': {
          'background-color': 'var(--token-interactive-primary)',
        },
        '.bg-interactive-primary-hover': {
          'background-color': 'var(--token-interactive-primary-hover)',
        },
        '.bg-interactive-secondary': {
          'background-color': 'var(--token-interactive-secondary)',
        },
        '.bg-interactive-secondary-hover': {
          'background-color': 'var(--token-interactive-secondary-hover)',
        },
        '.bg-gradient-primary': {
          'background': 'var(--gradient-primary)',
        },
        '.bg-gradient-primary-light': {
          'background': 'var(--gradient-primary-light)',
        },
        '.bg-gradient-secondary': {
          'background': 'var(--gradient-secondary)',
        },
        '.bg-gradient-secondary-dark': {
          'background': 'var(--gradient-secondary-dark)',
        },
        '.bg-gradient-header': {
          'background': 'var(--gradient-header)',
        },
        '.bg-gradient-button': {
          'background': 'var(--gradient-button)',
        },
        '.bg-gradient-button-hover': {
          'background': 'var(--gradient-button-hover)',
        },
        '.bg-gradient-accent': {
          'background': 'var(--gradient-accent)',
        },
        '.bg-gradient-timeline': {
          'background': 'var(--gradient-timeline)',
        },
        '.shadow-token-primary': {
          'box-shadow': '0 1px 3px 0 var(--token-shadow-primary), 0 1px 2px 0 var(--token-shadow-primary)',
        },
        '.shadow-token-secondary': {
          'box-shadow': '0 4px 6px -1px var(--token-shadow-secondary), 0 2px 4px -1px var(--token-shadow-secondary)',
        }
      }
      addUtilities(newUtilities, ['responsive', 'hover', 'dark'])
    }
  ],
}
