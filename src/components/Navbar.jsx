import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { product, navLinks } from '../data/productData.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggleRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    // Tutup menu jika layar diperbesar ke ukuran desktop.
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = (e) => e.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    mq.addEventListener('change', onChange)
    return () => {
      document.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onChange)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-canvas/95 backdrop-blur-sm transition-colors duration-200 ${
        scrolled || open ? 'border-line' : 'border-transparent'
      }`}
    >
      <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
        <a
          href="#beranda"
          onClick={close}
          className="flex min-h-[44px] items-center font-serif text-[1.4rem] font-medium tracking-[-0.01em] text-ink"
        >
          {product.name}
        </a>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative inline-flex min-h-[44px] items-center text-[15px] text-ink/80 transition-colors duration-200 after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-forest after:transition-transform after:duration-300 hover:text-ink hover:after:scale-x-100"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#harga" className="btn btn-solid hidden min-h-[44px] px-5 lg:inline-flex">
            Pilih paket
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 grid h-11 w-11 place-items-center text-ink lg:hidden"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" aria-label="Navigasi seluler" className="border-t border-line lg:hidden">
          <ul className="wrap flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-line/70 last:border-0">
                <a
                  href={link.href}
                  onClick={close}
                  className="flex min-h-[52px] items-center font-serif text-xl text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pb-2 pt-4">
              <a href="#harga" onClick={close} className="btn btn-solid w-full">
                Pilih paket
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
