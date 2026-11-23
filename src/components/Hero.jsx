import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Envelope from './Envelope.jsx'
import { PromoUntil } from './Promo.jsx'
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

/** Gambar dashboard yang tampil di layar monitor dan iPad. */
const dashboardSrc = `${import.meta.env.BASE_URL}dashboard-anggaran.webp`
const dashboardAlt =
  'Dashboard Anggaran Teman Wedding di Google Sheets: grafik anggaran vs realisasi per kategori, status pembayaran, linimasa, dan progres berkas'

/** Mockup monitor + iPad dengan layar berisi tangkapan Dashboard. */
function DeviceMockup() {
  const bezel = 'bg-[#1c2b26]'
  return (
    <figure className="w-full max-w-[32rem]">
      <div className="relative pb-12 pr-3 sm:pb-14 sm:pr-8">
        {/* Monitor */}
        <div>
          <div className={`${bezel} rounded-[10px] p-[7px] shadow-paper sm:rounded-[14px] sm:p-[11px]`}>
            <img
              src={dashboardSrc}
              alt={dashboardAlt}
              width="1400"
              height="905"
              fetchPriority="high"
              decoding="async"
              className="aspect-[16/10] w-full rounded-[3px] bg-paper object-cover object-left-top"
            />
          </div>
          <div aria-hidden="true" className={`${bezel} mx-auto h-4 w-[16%] sm:h-6`} />
          <div aria-hidden="true" className={`${bezel} mx-auto h-1.5 w-[30%] rounded-t-[4px] sm:h-2`} />
        </div>

        {/* iPad */}
        <div
          className={`${bezel} absolute bottom-0 right-0 w-[40%] rounded-[12px] p-[5px] shadow-paper sm:rounded-[18px] sm:p-[8px]`}
        >
          <img
            src={dashboardSrc}
            alt=""
            aria-hidden="true"
            width="1400"
            height="905"
            decoding="async"
            className="aspect-[4/3] w-full rounded-[6px] bg-paper object-cover object-left-top sm:rounded-[9px]"
          />
        </div>
      </div>
      <figcaption className="text-[13px] text-muted">
        Contoh Dashboard Anggaran di dalam template, terbuka di monitor dan iPad.
      </figcaption>
    </figure>
  )
}

const SLIDE_MS = 6500

const arrowClass =
  'absolute top-[42%] z-10 grid h-11 w-11 -translate-y-1/2 place-items-center bg-ink/30 text-paper opacity-0 backdrop-blur-[2px] transition-opacity duration-200 hover:bg-ink/55 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-70'

/** Panah transparan di kiri-kanan slide: muncul saat di-hover (selalu samar di layar sentuh). */
function SlideArrows({ onPrev, onNext }) {
  return (
    <>
      <button type="button" onClick={onPrev} aria-label="Slide sebelumnya" className={`${arrowClass} left-0`}>
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </button>
      <button type="button" onClick={onNext} aria-label="Slide berikutnya" className={`${arrowClass} right-0`}>
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
      </button>
    </>
  )
}

/**
 * Carousel hero: slide 1 (default) = mockup perangkat, slide 2 = headline.
 * Kedua slide selalu ada di HTML (h1 tetap terbaca mesin pencari); slide yang tidak aktif
 * disembunyikan dengan `inert`. Berputar otomatis, berhenti saat di-hover/fokus
 * atau setelah pengunjung memilih slide sendiri.
 */
function HeroCarousel() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const count = 2
  const touchX = useRef(null)

  useEffect(() => {
    if (!autoplay || paused) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS)
    return () => clearTimeout(id)
  }, [index, paused, autoplay])

  const go = (next) => {
    setAutoplay(false)
    setIndex((next + count) % count)
  }

  const slide = (i) =>
    `[grid-area:1/1] transition-opacity duration-500 ${
      index === i ? 'opacity-100' : 'pointer-events-none opacity-0'
    }`

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Sorotan Teman Wedding"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onTouchStart={(e) => {
        touchX.current = e.touches[0].clientX
      }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return
        const dx = e.changedTouches[0].clientX - touchX.current
        touchX.current = null
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1))
      }}
    >
      <div className="grid">
        <div
          role="group"
          aria-roledescription="slide"
          aria-label="1 dari 2: tampilan dashboard"
          inert={index !== 0}
          className={`${slide(0)} group relative max-w-[32rem] self-center`}
        >
          <DeviceMockup />
          <SlideArrows onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />
        </div>

        <div
          role="group"
          aria-roledescription="slide"
          aria-label="2 dari 2: headline"
          inert={index !== 1}
          className={`${slide(1)} group relative self-center`}
        >
          <SlideArrows onPrev={() => go(index - 1)} onNext={() => go(index + 1)} />
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
      </div>

      <div className="mt-6 flex items-center gap-3">
        <span className="eyebrow !text-[10px] text-muted">Pilih slide</span>
        <div className="flex items-center" role="group" aria-label="Pilih slide">
          {[0, 1].map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
              aria-current={index === i}
              className="grid h-10 w-7 place-items-center"
            >
              <span
                aria-hidden="true"
                className={`block h-[3px] transition-all duration-300 ${
                  index === i ? 'w-6 bg-forest' : 'w-3 bg-ink/25'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section id="beranda" aria-labelledby="judul-hero">
      <div className="wrap pt-6 sm:pt-10">
        <div className="grid gap-10 pb-16 sm:pb-20 lg:grid-cols-12 lg:gap-8">
          <div className="animate-fade-up lg:col-span-8">
            <HeroCarousel />
          </div>

          <div className="animate-fade-up [animation-delay:120ms] lg:col-span-4 lg:pt-3">
            <p className="max-w-md text-[17px] leading-[1.7] text-ink/80">{product.intro}</p>
            <p className="mt-5 font-serif text-xl italic text-forest">{product.hashtag}</p>
            <div className="mt-6 border-t border-line pt-4">
              {isPromoActive() && (
                <p className="eyebrow !text-[10px] text-forest">
                  {promo.label}
                  <PromoUntil short />
                </p>
              )}
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
