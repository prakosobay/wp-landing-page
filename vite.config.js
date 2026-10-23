import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Base path untuk GitHub Pages.
 *
 * - Di GitHub Actions, workflow mengisi VITE_BASE_PATH otomatis menjadi
 *   "/<nama-repositori>/" (lihat .github/workflows/deploy.yml), jadi Anda
 *   TIDAK perlu mengetik nama repositori di sini.
 * - Build manual untuk repositori "https://<username>.github.io/<nama-repositori>/":
 *     VITE_BASE_PATH=/<nama-repositori>/ npm run build
 * - Repositori user site "<username>.github.io": gunakan VITE_BASE_PATH=/
 * - Jika VITE_BASE_PATH tidak diisi, dipakai "./" (path relatif) yang aman
 *   untuk preview lokal maupun hosting statis di subfolder mana pun.
 */
const base = process.env.VITE_BASE_PATH || './'

export default defineConfig({
  base,
  plugins: [react()],
})
