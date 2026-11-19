import { useState } from 'react'
import { getFaq, contact } from '../data/productData.js'

function FaqItem({ item, index, open, onToggle }) {
  const buttonId = `faq-tombol-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <div className="border-b border-line">
      <h3 className="!font-sans">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="group flex min-h-[64px] w-full items-center justify-between gap-6 py-5 text-left"
        >
          <span className="font-serif text-[1.3rem] leading-snug text-ink transition-colors duration-200 group-hover:text-forest sm:text-[1.45rem]">
            {item.question}
          </span>
          <span aria-hidden="true" className="relative h-3.5 w-3.5 shrink-0">
            <span className="absolute left-0 top-1/2 h-px w-full bg-ink" />
            <span
              className={`absolute left-1/2 top-0 h-full w-px bg-ink transition-transform duration-300 ${
                open ? 'scale-y-0' : 'scale-y-100'
              }`}
            />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-7 pr-8 leading-[1.75] text-muted">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  // Satu item terbuka pada satu waktu; item pertama terbuka secara default.
  const [openIndex, setOpenIndex] = useState(0)
  const wa = contact.find((c) => c.label === 'WhatsApp')
  const faq = getFaq()

  return (
    <section id="faq" aria-labelledby="judul-faq" className="py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-forest">FAQ</p>
            <h2 id="judul-faq" className="h-section mt-5">
              Sebelum Anda memesan.
            </h2>
            {wa && (
              <p className="mt-6 max-w-xs leading-[1.7] text-muted">
                Pertanyaan lain? Kirim pesan ke{' '}
                <a
                  href={wa.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-ink"
                >
                  WhatsApp {wa.value}
                  <span className="sr-only"> (membuka tab baru)</span>
                </a>
                .
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-ink lg:col-span-8">
          {faq.map((item, i) => (
            <FaqItem
              key={item.question}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
