/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palet diambil langsung dari template Google Sheets Teman Wedding,
        // supaya website dan produk terasa satu identitas.
        forest: {
          DEFAULT: '#214E42', // header sheet / sel hijau tua
          deep: '#183A31',
        },
        sage: {
          DEFAULT: '#6B8F71', // sel hijau sedang (KPI)
          soft: '#9DAE94', // warna amplop
          pale: '#A9B9A0',
        },
        mint: '#E8F0EA', // sel hijau muda (otomatis)
        paper: '#FFFDF8', // sel krem (diisi pengguna) & kartu
        cream: '#F8F3E9', // kotak petunjuk
        canvas: '#F6F2EA', // latar halaman
        kraft: '#E5DED0', // latar "meja" flat-lay
        line: '#D9D1C1',
        ink: '#20332C',
        muted: '#52645B',
      },
      fontFamily: {
        // Self-hosted lewat @fontsource (tanpa request ke Google Fonts).
        serif: ['"Newsreader Variable"', 'Georgia', 'Cambria', 'serif'],
        sans: [
          '"Jost Variable"',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      boxShadow: {
        // Bayangan kertas di atas meja: satu-satunya bayangan di situs.
        paper:
          '0 1px 0 rgba(32, 51, 44, 0.04), -12px 22px 32px -20px rgba(32, 51, 44, 0.42)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both',
      },
    },
  },
  plugins: [],
}
