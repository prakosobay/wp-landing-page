import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
// Font self-hosted (ikut di-bundle, tanpa request ke Google Fonts).
import '@fontsource-variable/newsreader/opsz.css'
import '@fontsource-variable/newsreader/opsz-italic.css'
import '@fontsource-variable/jost/wght.css'
import './index.css'
import App from './App.jsx'

const root = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Hasil build sudah berisi HTML pre-render: cukup "hidupkan" (hydrate).
// Saat `npm run dev`, #root masih kosong: render biasa.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}
