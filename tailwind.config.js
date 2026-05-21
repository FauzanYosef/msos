/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./dist/**/*.html', './src/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#B68D40',
        secondary: '#8C6A2F',
        accent: '#D4A373',
        background: '#FFFDF7',
        cream: '#F7F3E9',
        ink: '#2B2B2B',
        muted: '#5C5C5C'
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        premium: '0 24px 80px rgba(43, 43, 43, 0.12)',
        gold: '0 18px 44px rgba(182, 141, 64, 0.22)',
        soft: '0 14px 40px rgba(43, 43, 43, 0.08)'
      },
      backgroundImage: {
        'academic-radial':
          'radial-gradient(circle at 20% 20%, rgba(212, 163, 115, 0.30), transparent 34%), radial-gradient(circle at 78% 8%, rgba(182, 141, 64, 0.18), transparent 28%), linear-gradient(135deg, #FFFDF7 0%, #F7F3E9 100%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-16px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.52', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.06)' }
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(22px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease forwards',
        marquee: 'marquee 24s linear infinite'
      }
    }
  },
  plugins: []
};
