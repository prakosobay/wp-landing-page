import { Leaf } from 'lucide-react'
import { product, navLinks, socials } from '../data/productData.js'
import { isRealLink } from '../utils/links.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark bg-brand-deeper text-brand-soft">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5 font-display text-xl font-semibold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10">
                <Leaf className="h-5 w-5" aria-hidden="true" />
              </span>
              {product.name}
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          <nav aria-label="Navigasi footer">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] !text-white">
              Navigasi
            </h2>
            <ul className="mt-4 space-y-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[44px] items-center text-sm transition duration-200 hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {socials.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] !text-white">
                Hubungi kami
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {socials.map((s) => (
                  <li key={s.label}>
                    {isRealLink(s.href) ? (
                      <a
                        href={s.href}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[40px] items-center rounded-full border border-white/25 px-4 text-sm transition duration-200 hover:border-white hover:bg-white/10 hover:text-white"
                      >
                        {s.label}
                      </a>
                    ) : (
                      <span
                        title="Link belum dikonfigurasi"
                        className="inline-flex min-h-[40px] items-center rounded-full border border-dashed border-white/30 px-4 text-sm opacity-80"
                      >
                        {s.label}
                        <span className="sr-only"> (belum dikonfigurasi)</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <p className="mt-12 border-t border-white/15 pt-6 text-sm">
          &copy; {year} {product.name}. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  )
}
