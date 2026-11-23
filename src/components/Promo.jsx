import { ArrowRight } from 'lucide-react'
import {
  plans,
  promo,
  isPromoActive,
  promoEndLabel,
  formatRupiah,
  currentPrice,
} from '../data/productData.js'

/** Cap bulat bergaya stempel di kertas undangan. */
export function PromoStamp({ dark = false, className = '' }) {
  if (!isPromoActive()) return null
  return (
    <span
      className={`pointer-events-none grid h-[5.25rem] w-[5.25rem] -rotate-[10deg] place-items-center rounded-full border-[1.5px] p-1 text-center ${
        dark ? 'border-paper/80 text-paper' : 'border-forest text-forest'
      } ${className}`}
    >
      <span
        className={`grid h-full w-full place-items-center rounded-full border border-dashed ${
          dark ? 'border-paper/50' : 'border-forest/50'
        }`}
      >
        <span className="leading-none">
          <span className="block font-sans text-[10px] font-semibold uppercase tracking-[0.22em]">Promo</span>
          <span className="mt-1 block font-serif text-[13px] italic">launching</span>
        </span>
      </span>
    </span>
  )
}

/** Tanggal akhir promo, dibuat menonjol (tebal + sorotan). */
export function PromoUntil({ dark = false, short = false }) {
  const end = promoEndLabel(short)
  if (!end) return null
  return (
    <>
      {' '}
      s.d.{' '}
      <strong
        className={`px-1.5 py-0.5 font-bold ${dark ? 'bg-paper/20 text-paper' : 'bg-mint text-forest'}`}
      >
        {end}
      </strong>
    </>
  )
}

/** Harga normal dicoret + harga promo, atau harga normal saja. */
export function Price({ plan, dark = false }) {
  const onPromo = isPromoActive() && plan.promoPrice
  const muted = dark ? 'text-paper/65' : 'text-muted'

  return (
    <div>
      {onPromo && (
        <p className={`flex items-baseline gap-3 text-[15px] ${muted}`}>
          <span className="sr-only">Harga normal</span>
          <s className="decoration-[1.5px]">{formatRupiah(plan.price)}</s>
          <span className={`eyebrow !text-[10px] ${dark ? 'text-sage-soft' : 'text-forest'}`}>
            Hemat {formatRupiah(plan.price - plan.promoPrice)}
          </span>
        </p>
      )}
      <p className="mt-1 font-serif text-[clamp(3rem,6vw,4.25rem)] font-light leading-none tracking-[-0.02em]">
        {onPromo && <span className="sr-only">Harga promo </span>}
        {formatRupiah(currentPrice(plan))}
      </p>
    </div>
  )
}

/** Pita tipis di atas navbar selama promo berlangsung. */
export function PromoBar() {
  if (!isPromoActive()) return null
  const end = promoEndLabel()

  return (
    <div className="on-dark bg-forest text-paper">
      <a
        href="#harga"
        className="wrap flex min-h-[40px] items-center justify-center gap-2 py-2 text-center text-[13px] tracking-[0.02em]"
      >
        <span className="eyebrow whitespace-nowrap !text-[10px] text-sage-soft">{promo.label}</span>
        <span className="hidden sm:inline">
          {plans.map((p, i) => (
            <span key={p.id}>
              {i > 0 && <span className="mx-2 text-paper/40">·</span>}
              {p.shortName} <s className="text-paper/55">{formatRupiah(p.price)}</s>{' '}
              {formatRupiah(currentPrice(p))}
            </span>
          ))}
          {end && <span className="text-paper/70"> ·<PromoUntil dark /></span>}
        </span>
        <span className="whitespace-nowrap sm:hidden">
          mulai {formatRupiah(Math.min(...plans.map(currentPrice)))}
          {end && <span className="text-paper/70"> ·<PromoUntil dark short /></span>}
        </span>
        <ArrowRight className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
      </a>
    </div>
  )
}
