import { useEffect, useRef, useState } from 'react'
import { Leaf, Menu, X } from 'lucide-react'
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
      className={`sticky top-0 z-50 border-b backdrop-blur transition duration-200 ${
        scrolled || open
          ? 'border-brand-soft/70 bg-canvas/95 shadow-sm'
          : 'border-transparent bg-canvas/80'
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <a
          href="#beranda"
          onClick={close}
          className="flex min-h-[44px] min-w-0 items-center gap-2.5 rounded-full font-display text-lg font-semibold text-brand-dark"
          aria-label={`${product.name} — kembali ke beranda`}
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-dark text-white">
            <Leaf className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate">{product.name}</span>
        </a>

        <nav aria-label="Navigasi utama" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-flex min-h-[44px] items-center rounded-full px-4 text-sm font-medium text-muted transition duration-200 hover:bg-brand-pale hover:text-brand-dark"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#paket" className="btn btn-primary hidden !py-2 lg:inline-flex">
            Lihat Paket
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-brand-dark transition duration-200 hover:bg-brand-pale lg:hidden"
            aria-label={open ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-mobile"
          aria-label="Navigasi seluler"
          className="border-t border-brand-soft/70 lg:hidden"
        >
          <ul className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="flex min-h-[48px] items-center rounded-2xl px-4 text-base font-medium text-brand-dark transition duration-200 hover:bg-brand-pale"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a href="#paket" onClick={close} className="btn btn-primary w-full">
                Lihat Paket
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
