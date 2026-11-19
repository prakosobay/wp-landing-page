import { renderToString } from 'react-dom/server'
import App from './App.jsx'

/** Dipakai scripts/prerender.mjs untuk menulis HTML halaman saat build. */
export const render = () => renderToString(<App />)
