import { ArrowRight, Plus } from 'lucide-react'
import CtaButton from './CtaButton.jsx'
import { Price, PromoStamp, PromoUntil } from './Promo.jsx'
import { useOrder } from './OrderModals.jsx'
import {
  plans,
  included,
  orderLink,
  isPromoActive,
} from '../data/productData.js'

/** Essensial membuka pop-up penawaran upgrade; Complete langsung ke pemesanan. */
function PlanCta({ plan, dark }) {
  const { openUpsell } = useOrder()
  const className = `btn w-full ${dark ? 'btn-paper' : 'btn-solid'}`
  const arrow = <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />

  if (plan.id === 'essensial') {
    return (
      <a
        href={orderLink(plan)}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={(e) => {
          e.preventDefault()
          openUpsell()
        }}
      >
        Pesan {plan.shortName}
        {arrow}
      </a>
    )
  }

  return (
    <CtaButton href={orderLink(plan)} dark={dark} className={className}>
      Pesan {plan.shortName}
      {arrow}
    </CtaButton>
  )
}

function Plan({ plan, dark }) {
  const line = dark ? 'border-paper/20' : 'border-line'

  return (
    <article
      aria-labelledby={`paket-${plan.id}`}
      className={`relative flex flex-col px-6 py-10 sm:px-10 sm:py-12 ${
        dark ? 'on-dark bg-forest text-paper' : 'bg-paper text-ink'
      }`}
    >
      <PromoStamp dark={dark} className="absolute right-5 top-5 sm:right-8 sm:top-8" />

      <div className="pr-24">
        {/* baris label selalu ada agar harga kedua paket sejajar */}
        <p className={`eyebrow min-h-[1.1rem] !text-[10px] ${dark ? 'text-sage-soft' : 'text-forest'}`}>
          {plan.badge}
        </p>
        <h3
          id={`paket-${plan.id}`}
          className={`mt-2 text-[1.7rem] leading-[1.15] sm:text-[2rem] ${dark ? '!text-paper' : ''}`}
        >
          {plan.name}
        </h3>
      </div>

      <div className="mt-8">
        <Price plan={plan} dark={dark} />
      </div>
      <p className={`mt-4 max-w-xs leading-[1.6] ${dark ? 'text-paper/80' : 'text-muted'}`}>{plan.summary}</p>

      <ul className={`mt-8 border-t ${line}`}>
        {plan.features.map((feature) => (
          <li key={feature} className={`flex gap-3 border-b py-3 text-[15px] leading-[1.55] ${line}`}>
            <span aria-hidden="true" className={dark ? 'text-sage-soft' : 'text-sage'}>
              —
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {plan.bundled.length > 0 ? (
        <>
          <p className={`eyebrow mt-7 !text-[10px] ${dark ? 'text-paper/60' : 'text-muted'}`}>Bonus file</p>
          <ul className="mt-2 flex-1 space-y-1">
            {plan.bundled.map((name) => (
              <li key={name} className="flex items-center gap-2 font-serif text-lg italic">
                <Plus className={`h-4 w-4 ${dark ? 'text-sage-soft' : 'text-sage'}`} strokeWidth={1.5} aria-hidden="true" />
                {name}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="flex-1" />
      )}

      <div className="mt-10">
        <PlanCta plan={plan} dark={dark} />
      </div>
    </article>
  )
}

export default function Pricing() {
  return (
    <section id="harga" aria-labelledby="judul-harga" className="grain py-20 sm:py-28">
      <div className="wrap">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow text-forest">
              Harga{isPromoActive() && ' · Promo launching'}
              {isPromoActive() && <PromoUntil />}
            </p>
            <h2 id="judul-harga" className="h-section mt-5">
              Dua paket. Pilih sesuai <em className="font-normal text-sage">kebutuhan</em> persiapan Anda.
            </h2>
          </div>
          <p className="max-w-md leading-[1.7] text-ink/75 lg:col-span-4 lg:col-start-9 lg:self-end">
            Essensial untuk mencatat inti persiapan. Complete bila Anda juga ingin mengelola tabungan,
            mengurus berkas nikah, dan menyiapkan obrolan penting sebelum menikah.
          </p>
        </div>

        <div className="mt-12 grid shadow-paper md:grid-cols-2 lg:mt-16">
          {plans.map((plan, i) => (
            <Plan key={plan.id} plan={plan} dark={i === plans.length - 1} />
          ))}
        </div>

        <p className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-ink/70">
          <span className="text-ink">Di kedua paket:</span>
          {included.map((item, i) => (
            <span key={item}>
              {item}
              {i < included.length - 1 && <span aria-hidden="true" className="ml-3 text-ink/30">·</span>}
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
