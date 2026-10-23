import { useState } from 'react'
import { Info } from 'lucide-react'
import { isRealLink } from '../utils/links.js'

/**
 * Tombol CTA untuk tujuan eksternal (pemesanan, add-on, dll).
 *
 * - Link valid  -> <a> yang membuka tujuan di tab baru.
 * - Placeholder -> <button> yang TIDAK menavigasi ke mana pun; klik
 *   menampilkan pemberitahuan bahwa link belum dikonfigurasi.
 */
export default function CtaButton({ href, children, className = '', dark = false }) {
  const [showNotice, setShowNotice] = useState(false)

  if (isRealLink(href)) {
    const external = !href.startsWith('#')
    return (
      <a
        href={href}
        className={className}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
        {external && <span className="sr-only"> (membuka tab baru)</span>}
      </a>
    )
  }

  return (
    <div className="w-full">
      <button
        type="button"
        className={className}
        data-placeholder-link="true"
        aria-expanded={showNotice}
        onClick={() => setShowNotice((v) => !v)}
      >
        {children}
      </button>
      {showNotice && (
        <p
          role="status"
          className={`mt-3 flex items-start gap-2 rounded-2xl px-3.5 py-2.5 text-left text-xs leading-relaxed ${
            dark ? 'bg-white/10 text-white' : 'bg-brand-pale text-muted'
          }`}
        >
          <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>
            Link pemesanan belum dikonfigurasi. Atur di{' '}
            <code className="font-mono">src/data/productData.js</code>.
          </span>
        </p>
      )}
    </div>
  )
}
