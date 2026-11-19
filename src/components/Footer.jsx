import { product, navLinks, contact } from '../data/productData.js'
import { isRealLink } from '../utils/links.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-canvas">
      <div className="wrap pb-10 pt-16 sm:pt-20">
        <div className="grid gap-12 border-t border-ink pt-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="font-serif text-[2rem] leading-none text-ink">{product.name}</p>
            <p className="mt-3 font-serif text-lg italic text-forest">{product.hashtag}</p>
            <p className="mt-5 max-w-sm text-[15px] leading-[1.7] text-muted">
              {product.category} di {product.platform}.
            </p>
          </div>

          <nav aria-label="Navigasi footer" className="md:col-span-3">
            <h2 className="eyebrow !font-sans !font-medium !text-muted">Halaman</h2>
            <ul className="mt-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex min-h-[40px] items-center text-[15px] text-ink transition-colors duration-200 hover:text-forest"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="eyebrow !font-sans !font-medium !text-muted">Kontak</h2>
            <dl className="mt-4 space-y-4">
              {contact.map((c) => (
                <div key={c.label}>
                  <dt className="text-[13px] text-muted">{c.label}</dt>
                  <dd className="mt-0.5 break-words text-[15px]">
                    {isRealLink(c.href) ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="link-underline text-ink"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <span className="text-ink">{c.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p className="mt-16 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-6 text-[13px] text-muted">
          <span suppressHydrationWarning>&copy; {year} {product.name}. Hak cipta dilindungi.</span>
          <span>Template dilindungi UU No. 28 Tahun 2014 tentang Hak Cipta.</span>
        </p>
      </div>
    </footer>
  )
}
