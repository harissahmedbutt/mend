import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Primary ink — a warm near-black, never pure #000.
          navy:         '#1A1816',
          'navy-mid':   '#2B2826',
          'navy-light': '#48433F',
          // Warm off-white page background.
          cream:        '#F9F8F6',
          'cream-dark': '#F0EDE9',
          // Warm footer tone (slightly deeper than cream).
          'cream-warm': '#ECE9E3',
          // Muted/secondary text where text-gray-500 isn't warm enough.
          muted:        '#6A7282',
        },
        // Muted pastel cards — always soft, never saturated. Cycle in order.
        pastel: {
          sage:  '#DDE4D8',
          tan:   '#EFE7DA',
          blue:  '#D8E3EC',
          stone: '#E7E4DD',
          rose:  '#EEE1DC',
        },
      },
      borderRadius: {
        // Large card/surface radius.
        brand: '24px',
      },
      fontFamily: {
        sans: [
          'var(--font-source-sans)',
          '"Source Sans 3"',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        // Display/heading serif.
        serif: [
          'var(--font-source-serif)',
          '"Source Serif 4"',
          'ui-serif',
          'Georgia',
          'serif',
        ],
      },
      fontSize: {
        'xs':  ['0.8125rem', { lineHeight: '1.2rem' }],
        'sm':  ['0.9375rem', { lineHeight: '1.375rem' }],
        'base':['1.0625rem', { lineHeight: '1.625rem' }],
        'lg':  ['1.1875rem', { lineHeight: '1.75rem' }],
      },
      animation: {
        'fade-in':    'fadeIn 0.5s ease-out forwards',
        'slide-up':   'slideUp 0.5s ease-out forwards',
        'slide-left': 'slideInLeft 0.4s ease-out forwards',
        'slide-right':'slideInRight 0.4s ease-out forwards',
        'scale-in':   'scaleIn 0.25s ease-out forwards',
        'marquee':    'marquee 55s linear infinite',
      },
      keyframes: {
        fadeIn:       { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:      { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInLeft:  { '0%': { opacity: '0', transform: 'translateX(-20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(20px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        scaleIn:      { '0%': { opacity: '0', transform: 'scale(0.96)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        marquee:      { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
