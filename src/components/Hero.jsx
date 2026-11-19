import { ArrowRight } from 'lucide-react'
import Envelope from './Envelope.jsx'
import {
  product,
  sample,
  sheets,
  plans,
  promo,
  companions,
  isPromoActive,
  currentPrice,
  formatRupiah,
} from '../data/productData.js'

const lowest = plans.reduce((a, b) => (currentPrice(b) < currentPrice(a) ? b : a))

/** Kartu utama: ringkasan Dashboard yang disusun seperti undangan cetak. */
function SummaryCard({ className = '' }) {
  return (
    <div className={`bg-paper px-6 py-10 text-center shadow-paper sm:px-10 sm:py-12 ${className}`}>
      <p className="eyebrow text-muted">Ringkasan persiapan</p>

      <p className="mt-6 font-serif text-[1.55rem] uppercase leading-[1.5] tracking-[0.2em] text-forest sm:text-[1.9rem]">
        {sample.couple[0]}
        <span className="block font-normal normal-case italic tracking-normal text-sage">&amp;</span>
        {sample.couple[1]}
      </p>

      <div className="mx-auto my-7 h-px w-10 bg-sage/50" aria-hidden="true" />

      <p className="font-serif text-[4.25rem] font-light leading-none text-forest sm:text-[5rem]">
        {sample.countdown}
      </p>
      <p className="eyebrow mt-3 text-muted">hari menuju hari H</p>

      <p className="eyebrow mt-8 text-forest">
        {sample.date} · {sample.city}
      </p>

      <dl className="mx-auto mt-6 max-w-[17rem] border-t border-line text-left text-[13px]">
        {sample.rows.map((row) => (
          <div key={row.label} className="flex justify-between gap-4 border-b border-line py-2">
            <dt className="text-muted">{row.label}</dt>
            <dd className="text-right text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/** Kartu kecil di samping, seperti kartu "the details" pada set undangan. */
function DetailCard({ className = '' }) {
  return (
    <div className={`bg-paper px-6 py-9 text-center shadow-paper ${className}`}>
      <p className="eyebrow text-muted">Di dalam file</p>
      <p className="mt-3 font-serif text-lg uppercase tracking-[0.22em] text-forest">
        Isi Complete
      </p>
      <ul className="mt-6 space-y-1.5 text-[11px] uppercase tracking-[0.2em] text-ink/75">
        {sheets.map((s) => (
          <li key={s.name}>{s.name}</li>
        ))}
      </ul>
      <p className="mx-auto my-4 h-px w-8 bg-sage/50" aria-hidden="true" />
      <ul className="space-y-1 font-serif text-[15px] italic text-forest">
        {Object.values(companions).map((c) => (
          <li key={c.name}>+ {c.name}</li>
        ))}
      </ul>
      <p className="eyebrow mt-6 text-forest">{product.platform}</p>
    </div>
  )
}

function StationeryScene() {
  return (
    <figure className="grain">
      <div className="wrap py-14 sm:py-20 lg:py-24">
        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[minmax(0,1fr)_15rem] lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
          <div className="relative">
            <div className="absolute left-0 top-0 w-[58%] shadow-paper sm:w-[50%]">
              <Envelope />
            </div>
            <SummaryCard className="relative ml-[12%] mt-[16%] sm:ml-[30%] sm:mt-[12%] sm:max-w-[25rem]" />
          </div>
          <DetailCard className="ml-auto w-[80%] max-w-[17rem] md:mt-4 md:w-full" />
        </div>

        <figcaption className="mx-auto mt-10 max-w-5xl text-[13px] text-muted">
          Ilustrasi disusun dari data contoh di dalam template: pasangan {sample.couple[0]} &amp;{' '}
          {sample.couple[1]}, {sample.date}, {sample.city}.
        </figcaption>
      </div>
    </figure>
  )
}

export default function Hero() {
  return (
    <section id="beranda" aria-labelledby="judul-hero">
      <div className="wrap pt-6 sm:pt-10">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-ink pb-4 text-[13px] tracking-[0.04em]">
          <p className="text-ink/80">
            <span className="text-forest">{product.name}</span>
            <span className="mx-2 text-ink/40" aria-hidden="true">/</span>
            {product.category.toLowerCase()}
          </p>
          <p className="text-muted">
            {product.platform} · versi {product.version}
          </p>
        </div>

        <div className="grid gap-10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-12 lg:gap-8 lg:pt-20">
          <div className="animate-fade-up lg:col-span-8">
            <h1
              id="judul-hero"
              className="text-[clamp(2.6rem,6.6vw,5.4rem)] leading-[1.03] tracking-[-0.025em]"
            >
              Teman dalam <em className="font-normal text-sage">setiap</em> persiapan pernikahan, sampai
              hari&nbsp;H.
            </h1>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#harga" className="btn btn-solid">
                Pilih paket
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a href="#isi" className="btn btn-line">
                Lihat isi file
              </a>
            </div>
          </div>

          <div className="animate-fade-up [animation-delay:120ms] lg:col-span-4 lg:pt-3">
            <p className="max-w-md text-[17px] leading-[1.7] text-ink/80">{product.intro}</p>
            <p className="mt-5 font-serif text-xl italic text-forest">{product.hashtag}</p>
            <div className="mt-6 border-t border-line pt-4">
              {isPromoActive() && <p className="eyebrow !text-[10px] text-forest">{promo.label}</p>}
              <p className="mt-1 flex flex-wrap items-baseline gap-x-2.5 font-serif text-lg text-ink">
                Mulai
                {isPromoActive() && (
                  <span className="text-muted">
                    <span className="sr-only">harga normal </span>
                    <s>{formatRupiah(lowest.price)}</s>
                    <span className="sr-only"> harga promo</span>
                  </span>
                )}
                <span className="text-2xl text-forest">{formatRupiah(currentPrice(lowest))}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <StationeryScene />
    </section>
  )
}
