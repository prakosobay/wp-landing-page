/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#52796F',
          dark: '#354F52',
          deeper: '#2B4144',
          soft: '#CAD8CF',
          pale: '#F4F7F3',
        },
        canvas: '#FAFAF7',
        ink: '#26332F',
        // Sedikit lebih gelap dari #68756F agar kontras teks kecil memenuhi WCAG AA.
        muted: '#5C6963',
      },
      fontFamily: {
        // Hanya font sistem: tanpa request jaringan eksternal.
        sans: [
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          '"Iowan Old Style"',
          '"Palatino Linotype"',
          'Palatino',
          'Georgia',
          'Cambria',
          'serif',
        ],
      },
      boxShadow: {
        card: '0 1px 2px rgba(38, 51, 47, 0.04), 0 8px 24px -12px rgba(38, 51, 47, 0.12)',
        lift: '0 2px 4px rgba(38, 51, 47, 0.05), 0 18px 36px -14px rgba(38, 51, 47, 0.22)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
      },
    },
  },
  plugins: [],
}
