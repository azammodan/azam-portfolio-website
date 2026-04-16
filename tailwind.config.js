/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        desktop: {
          bg:        'var(--desktop-bg)',
          surface:   'var(--desktop-surface)',
          border:    'var(--desktop-border)',
          border2:   'var(--desktop-border2)',
          text:      'var(--desktop-text)',
          muted:     'var(--desktop-muted)',
          subtle:    'var(--desktop-subtle)',
          bar:       'var(--desktop-bar)',
        }
      },
      boxShadow: {
        window: '0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)',
        'window-dark': '0 8px 32px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
        dock: '0 4px 24px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        window: '10px',
      },
      keyframes: {
        'window-open': {
          '0%':   { opacity: '0', transform: 'scale(0.94) translateY(6px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'window-close': {
          '0%':   { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.94) translateY(6px)' },
        },
        'spotlight-in': {
          '0%':   { opacity: '0', transform: 'scale(0.97) translateY(-8px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      animation: {
        'window-open':  'window-open 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'window-close': 'window-close 0.15s ease-in forwards',
        'spotlight-in': 'spotlight-in 0.18s cubic-bezier(0.34,1.2,0.64,1) forwards',
        shimmer: 'shimmer 2s linear infinite',
      }
    },
  },
  plugins: [],
}
