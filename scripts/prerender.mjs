/**
 * Pre-render: menyisipkan HTML hasil render React ke dist/index.html,
 * sehingga isi halaman sudah ada sebelum JavaScript berjalan
 * (lebih baik untuk mesin pencari, preview link, dan tampilan awal).
 *
 * Dijalankan otomatis oleh `npm run build` setelah build client dan SSR.
 */
import { readFileSync, writeFileSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const ssrDir = resolve('dist-ssr')
const htmlFile = resolve('dist/index.html')
const placeholder = '<div id="root"></div>'

const { render } = await import(pathToFileURL(resolve(ssrDir, 'entry-server.js')).href)
const html = readFileSync(htmlFile, 'utf8')

if (!html.includes(placeholder)) {
  throw new Error(`Prerender gagal: ${placeholder} tidak ditemukan di dist/index.html`)
}

writeFileSync(htmlFile, html.replace(placeholder, `<div id="root">${render()}</div>`))
rmSync(ssrDir, { recursive: true, force: true })

console.log('✓ prerender: dist/index.html berisi HTML halaman lengkap')
