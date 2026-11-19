import { steps, sample } from '../data/productData.js'

const ROMAN = ['I', 'II', 'III', 'IV', 'V']

/** Potongan sheet Master Data, memakai warna sel asli dari template. */
function SheetFragment() {
  const rows = [
    ['Nama CPP', sample.couple[0]],
    ['Nama CPW', sample.couple[1]],
    ['Tanggal Menikah', sample.date],
    ['Lokasi Kota', sample.city],
  ]

  return (
    <figure>
      <div
        className="overflow-hidden border border-[#DADCE0] bg-white text-[13px] shadow-paper"
        role="img"
        aria-label="Contoh sheet Master Data: sel krem diisi pengguna, sel hijau terisi otomatis oleh rumus."
      >
        <div className="grid grid-cols-[2rem_1fr_1fr] border-b border-[#DADCE0] bg-[#F8F9FA] text-center text-[11px] text-[#5F6368]">
          <span className="border-r border-[#DADCE0] py-1" />
          <span className="border-r border-[#DADCE0] py-1">A</span>
          <span className="py-1">B</span>
        </div>
        <Row n={1}>
          <span className="col-span-2 bg-forest px-3 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-white">
            Master Data
          </span>
        </Row>
        {rows.map(([label, value], i) => (
          <Row key={label} n={i + 2}>
            <span className="border-r border-[#DADCE0] bg-mint px-3 py-2.5 text-forest">{label}</span>
            <span className="relative bg-paper px-3 py-2.5 text-ink">
              {value}
              {i === 0 && (
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 border-2 border-[#1A73E8]" />
              )}
            </span>
          </Row>
        ))}
        <Row n={6}>
          <span className="border-r border-[#DADCE0] bg-mint px-3 py-2.5 text-forest">Judul otomatis</span>
          <span className="bg-[#EEF5F0] px-3 py-2.5 text-forest">
            {sample.couple.join(' & ')} | {sample.city}
          </span>
        </Row>
      </div>

      <figcaption className="mt-6 grid gap-3 text-[14px] text-muted sm:grid-cols-2">
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="h-4 w-4 shrink-0 border border-line bg-paper" />
          Sel krem: diisi oleh Anda
        </span>
        <span className="flex items-center gap-3">
          <span aria-hidden="true" className="h-4 w-4 shrink-0 border border-[#CBD9CF] bg-[#EEF5F0]" />
          Sel hijau: rumus, terisi otomatis
        </span>
      </figcaption>
    </figure>
  )
}

function Row({ n, children }) {
  return (
    <div className="grid grid-cols-[2rem_1fr_1fr] border-b border-[#DADCE0] last:border-0">
      <span className="border-r border-[#DADCE0] bg-[#F8F9FA] py-2.5 text-center text-[11px] text-[#5F6368]">
        {n}
      </span>
      {children}
    </div>
  )
}

export default function HowItWorks() {
  return (
    <section id="cara-pakai" aria-labelledby="judul-cara" className="py-20 sm:py-28">
      <div className="wrap">
        <div className="grid gap-6 border-b border-ink pb-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow text-forest">Cara pakai</p>
            <h2 id="judul-cara" className="h-section mt-5">
              Anda mengisi yang krem. Rumus mengerjakan sisanya.
            </h2>
          </div>
          <p className="max-w-md leading-[1.7] text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
            Dirancang untuk Google Sheets di laptop, PC, atau tablet. Di HP, file tetap nyaman untuk
            memantau progres.
          </p>
        </div>

        <div className="grid gap-14 pt-12 lg:grid-cols-12 lg:gap-8 lg:pt-16">
          <ol className="lg:col-span-6">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-b border-line py-7 first:pt-0 last:border-0 sm:grid-cols-[4.5rem_1fr]"
              >
                <span aria-hidden="true" className="font-serif text-4xl font-light italic leading-none text-sage">
                  {ROMAN[i]}
                </span>
                <div>
                  <h3 className="text-[1.6rem] leading-tight">
                    <span className="sr-only">Langkah {i + 1}: </span>
                    {step.title}
                  </h3>
                  <p className="mt-2 leading-[1.7] text-muted">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="lg:col-span-5 lg:col-start-8">
            <SheetFragment />
          </div>
        </div>
      </div>
    </section>
  )
}
