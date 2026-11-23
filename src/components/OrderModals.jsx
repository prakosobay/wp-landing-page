import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, Check, Eye, MessageCircle, X } from 'lucide-react'
import { PromoUntil } from './Promo.jsx'
import {
  plans,
  promo,
  upgradePerks,
  orderLink,
  currentPrice,
  formatRupiah,
  isPromoActive,
  promoEndDate,
  whatsapp,
} from '../data/productData.js'

const essensial = plans.find((p) => p.id === 'essensial')
const complete = plans.find((p) => p.id === 'complete')

const OrderContext = createContext({ openUpsell: () => {} })
export const useOrder = () => useContext(OrderContext)

const SESSION_KEY = 'tw-promo-popup-seen'
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

/* ------------------------------------------------------------------ */
/* Dialog dasar: overlay, Esc, kunci scroll, jebakan fokus              */
/* ------------------------------------------------------------------ */
function Dialog({ onClose, labelledBy, children }) {
  const panel = useRef(null)

  useEffect(() => {
    const previous = document.activeElement
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panel.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel.current) return
      const items = [...panel.current.querySelectorAll(FOCUSABLE)]
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-ink/60 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        className="relative my-auto w-full max-w-lg animate-fade-up bg-paper px-6 pb-8 pt-12 text-center shadow-paper outline-none sm:px-10 sm:pb-10 sm:pt-14"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center text-muted transition-colors hover:text-forest"
        >
          <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Pop-up penawaran upgrade (saat memilih Essensial)                    */
/* ------------------------------------------------------------------ */
function UpsellDialog({ onClose }) {
  const diff = currentPrice(complete) - currentPrice(essensial)
  const onPromo = isPromoActive() && complete.promoPrice

  return (
    <Dialog onClose={onClose} labelledBy="judul-upsell">
      <p className="eyebrow text-forest">Sebelum memesan</p>
      <h2 id="judul-upsell" className="mt-4 text-[clamp(1.6rem,5vw,2.1rem)] leading-[1.15]">
        Tambah {formatRupiah(diff)}, dapat <em className="font-normal text-sage">Complete</em>.
      </h2>
      <p className="mx-auto mt-4 max-w-sm leading-[1.7] text-muted">
        {essensial.shortName} mencakup catatan inti persiapan. Dengan {complete.shortName}, Anda juga mendapat:
      </p>

      <ul className="mt-6 border-t border-line text-left text-[15px]">
        {upgradePerks.map((perk) => (
          <li key={perk} className="flex gap-3 border-b border-line py-2.5 leading-[1.5]">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-forest" strokeWidth={2} aria-hidden="true" />
            {perk}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href={orderLink(complete)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="btn btn-solid w-full"
        >
          Upgrade ke {complete.shortName} · {formatRupiah(currentPrice(complete))}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only"> (membuka tab baru)</span>
        </a>
        <a
          href={orderLink(essensial)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="btn btn-line w-full"
        >
          Tetap pilih {essensial.shortName} · {formatRupiah(currentPrice(essensial))}
          <span className="sr-only"> (membuka tab baru)</span>
        </a>
      </div>

      {onPromo && (
        <p className="mt-5 text-[13px] text-muted">
          {complete.shortName} normalnya <s>{formatRupiah(complete.price)}</s>. Harga promo launching
          <PromoUntil />
        </p>
      )}
    </Dialog>
  )
}

/* ------------------------------------------------------------------ */
/* Pop-up ajakan beli (15 detik setelah halaman dibuka)                 */
/* ------------------------------------------------------------------ */
const pad = (n) => String(n).padStart(2, '0')

function useCountdown() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const end = promoEndDate()
  if (!end) return null
  const left = Math.max(0, end.getTime() - now)
  const total = Math.floor(left / 1000)
  return {
    days: Math.floor(total / 86400),
    clock: `${pad(Math.floor((total % 86400) / 3600))}:${pad(Math.floor((total % 3600) / 60))}:${pad(total % 60)}`,
  }
}

function PromoDialog({ onClose }) {
  const countdown = useCountdown()
  const chat = whatsapp('Halo Teman Wedding, saya mau bertanya soal promo launching.')

  return (
    <Dialog onClose={onClose} labelledBy="judul-promo">
      <p className="eyebrow text-forest">Tunggu sebentar…</p>
      <h2 id="judul-promo" className="mt-4 text-[clamp(1.7rem,5.4vw,2.3rem)] leading-[1.15]">
        Sebelum pergi,
        <br />
        amankan <em className="font-normal text-sage">harga launching.</em>
      </h2>
      <p className="mx-auto mt-4 max-w-sm leading-[1.7] text-muted">
        Harga promo launching berlaku
        <PromoUntil />. Setelah itu harga kembali normal, jadi lebih baik pesan sekarang daripada
        menyesal saat persiapan sudah berjalan.
      </p>

      <dl className="mx-auto mt-6 max-w-sm border-t border-line text-left">
        {plans.map((p) => (
          <div key={p.id} className="flex items-baseline justify-between gap-4 border-b border-line py-3">
            <dt className="font-serif text-lg">{p.shortName}</dt>
            <dd className="text-right">
              <s className="mr-2 text-[14px] text-muted/80">{formatRupiah(p.price)}</s>
              <span className="font-serif text-xl text-forest">{formatRupiah(currentPrice(p))}</span>
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-col items-center gap-4">
        <a
          href={orderLink(complete)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="btn btn-solid w-full"
        >
          Pesan {complete.shortName} · {formatRupiah(currentPrice(complete))}
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only"> (membuka tab baru)</span>
        </a>
        <a href="#isi" onClick={onClose} className="link-underline inline-flex items-center gap-2 text-[15px] text-forest">
          <Eye className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Atau lihat isi file dulu
        </a>
        <a
          href={chat}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[15px] text-forest hover:underline"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Chat WhatsApp kami
          <span className="sr-only"> (membuka tab baru)</span>
        </a>
      </div>

      {countdown && (
        <p className="mt-6 text-[13px] text-muted">
          Harga launching berakhir dalam{' '}
          <strong className="font-semibold tabular-nums text-forest">
            {countdown.days > 0 && `${countdown.days} hari `}
            {countdown.clock}
          </strong>
        </p>
      )}
    </Dialog>
  )
}

/* ------------------------------------------------------------------ */
/* Provider: memegang state kedua pop-up                                */
/* ------------------------------------------------------------------ */
export function OrderProvider({ children }) {
  const [upsellOpen, setUpsellOpen] = useState(false)
  const [promoOpen, setPromoOpen] = useState(false)
  const upsellRef = useRef(false)

  const openUpsell = useCallback(() => {
    setPromoOpen(false)
    setUpsellOpen(true)
  }, [])
  const closeUpsell = useCallback(() => setUpsellOpen(false), [])
  const closePromo = useCallback(() => setPromoOpen(false), [])

  useEffect(() => {
    upsellRef.current = upsellOpen
  }, [upsellOpen])

  useEffect(() => {
    if (!isPromoActive()) return undefined
    const { delayMs, oncePerSession } = promo.popup

    const seen = () => {
      try {
        return oncePerSession && sessionStorage.getItem(SESSION_KEY) === '1'
      } catch {
        return false
      }
    }
    if (seen()) return undefined

    const timer = setTimeout(() => {
      // Jangan menimpa pop-up upgrade yang sedang dibuka pengunjung.
      if (upsellRef.current || seen()) return
      try {
        sessionStorage.setItem(SESSION_KEY, '1')
      } catch {
        /* sessionStorage diblokir: pop-up tetap tampil sekali di halaman ini */
      }
      setPromoOpen(true)
    }, delayMs)

    return () => clearTimeout(timer)
  }, [])

  const value = useMemo(() => ({ openUpsell }), [openUpsell])

  return (
    <OrderContext.Provider value={value}>
      {children}
      {upsellOpen && <UpsellDialog onClose={closeUpsell} />}
      {promoOpen && <PromoDialog onClose={closePromo} />}
    </OrderContext.Provider>
  )
}
