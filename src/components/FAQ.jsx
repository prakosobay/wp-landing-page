import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SectionHeader from './SectionHeader.jsx'
import { faq } from '../data/productData.js'

function FaqItem({ item, index, open, onToggle }) {
  const buttonId = `faq-tombol-${index}`
  const panelId = `faq-panel-${index}`

  return (
    <div className="card overflow-hidden">
      <h3 className="!font-sans">
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-base font-semibold text-brand-dark transition duration-200 hover:bg-brand-pale/70 sm:px-6 sm:text-lg"
        >
          <span>{item.question}</span>
          <ChevronDown
            className={`h-5 w-5 shrink-0 text-brand transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          />
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
          <p className="px-5 pb-5 leading-relaxed text-muted sm:px-6">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  // Satu item terbuka pada satu waktu; item pertama terbuka secara default.
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section
      id="faq"
      aria-labelledby="judul-faq"
      className="section-pad bg-canvas"
    >
      <div className="container-page">
        <SectionHeader id="judul-faq" eyebrow="FAQ" title={faq.heading} />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faq.items.map((item, i) => (
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
