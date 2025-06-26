/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        space: {
          black: '#050505',
          dark: '#0a0a0a',
          blue: '#3366ff',
          purple: '#6633cc',
          teal: '#33cccc',
          green: '#33cc66',
          yellow: '#ffcc33',
          orange: '#ff9933',
          red: '#ff3366',
        },
        text: {
          light: '#f8f8f8',
          dim: '#b0b0b0',
        }
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
      },
      fontSize: {
        'xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.4' }],
        'sm': ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', { lineHeight: '1.5' }],
        'base': ['clamp(1rem, 0.9rem + 0.5vw, 1.125rem)', { lineHeight: '1.6' }],
        'lg': ['clamp(1.125rem, 1rem + 0.625vw, 1.25rem)', { lineHeight: '1.6' }],
        'xl': ['clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)', { lineHeight: '1.5' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 1vw, 2rem)', { lineHeight: '1.4' }],
        '3xl': ['clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)', { lineHeight: '1.3' }],
        '4xl': ['clamp(2.25rem, 1.8rem + 2.25vw, 3rem)', { lineHeight: '1.2' }],
        '5xl': ['clamp(3rem, 2.4rem + 3vw, 4rem)', { lineHeight: '1.1' }],
        '6xl': ['clamp(3.75rem, 3rem + 3.75vw, 5rem)', { lineHeight: '1' }],
      },
      spacing: {
        '1': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.375rem)',
        '2': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
        '3': 'clamp(0.75rem, 0.6rem + 0.75vw, 1.125rem)',
        '4': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
        '5': 'clamp(1.25rem, 1rem + 1.25vw, 1.875rem)',
        '6': 'clamp(1.5rem, 1.2rem + 1.5vw, 2.25rem)',
        '8': 'clamp(2rem, 1.6rem + 2vw, 3rem)',
        '10': 'clamp(2.5rem, 2rem + 2.5vw, 3.75rem)',
        '12': 'clamp(3rem, 2.4rem + 3vw, 4.5rem)',
        '16': 'clamp(4rem, 3.2rem + 4vw, 6rem)',
        '20': 'clamp(5rem, 4rem + 5vw, 7.5rem)',
        '24': 'clamp(6rem, 4.8rem + 6vw, 9rem)',
      },
      maxWidth: {
        'xs': '100%',
        'sm': '100%',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
        '3xl': '1800px',
      },
      minHeight: {
        'touch': '44px',
        'touch-comfortable': '48px',
      },
      minWidth: {
        'touch': '44px',
        'touch-comfortable': '48px',
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        '3xl': '40px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'rotate': 'rotate 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}
