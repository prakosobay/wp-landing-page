import Envelope from './Envelope.jsx'
import CtaButton from './CtaButton.jsx'
import { PromoStamp } from './Promo.jsx'
import { plans, contact, currentPrice, formatRupiah, isPromoActive } from '../data/productData.js'

/** Penutup yang disusun seperti kartu undangan: satu-satunya bagian rata tengah. */
export default function FinalCTA() {
  const whatsappHref = contact.find((c) => c.label === 'WhatsApp')?.href

  return (
    <section aria-labelledby="judul-cta" className="grain overflow-hidden py-20 sm:py-28">
      <div className="wrap">
        <div className="relative mx-auto max-w-xl">
          <div className="absolute -left-10 -top-10 w-[55%] -rotate-[4deg] shadow-paper sm:-left-24 sm:-top-12 sm:w-[48%]">
            <Envelope />
          </div>

          <div className="relative bg-paper px-6 py-14 text-center shadow-paper sm:px-14 sm:py-16">
            <PromoStamp className="absolute -right-3 -top-8 bg-paper sm:-right-8" />

            <p className="eyebrow text-muted">Dengan penuh sukacita</p>
            <h2
              id="judul-cta"
              className="mt-6 font-serif text-[clamp(1.75rem,5vw,2.4rem)] !font-normal uppercase leading-[1.45] tracking-[0.2em] !text-forest"
            >
              Anda
              <span className="block normal-case italic tracking-normal text-sage">&amp;</span>
              Pasangan
            </h2>
            <p className="eyebrow mx-auto mt-6 max-w-sm text-ink/80">
              Mulai menyiapkan hari bahagia, satu sheet demi satu sheet
            </p>

            <div className="mx-auto my-8 h-px w-10 bg-sage/50" aria-hidden="true" />

            <ul className="space-y-1.5">
              {plans.map((p) => (
                <li key={p.id} className="eyebrow text-muted">
                  {p.shortName}{' '}
                  {isPromoActive() && p.promoPrice && (
                    <>
                      <span className="sr-only">harga normal </span>
                      <s className="text-muted/70">{formatRupiah(p.price)}</s>{' '}
                      <span className="sr-only">harga promo </span>
                    </>
                  )}
                  <span className="text-forest">{formatRupiah(currentPrice(p))}</span>
                </li>
              ))}
            </ul>

            <div className="mx-auto mt-8 flex max-w-sm flex-col gap-3">
              <a href="#harga" className="btn btn-solid w-full">
                Pilih paket
              </a>
              <CtaButton href={whatsappHref} className="btn btn-line w-full">
                Tanya lewat WhatsApp
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
