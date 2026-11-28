import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { sample } from '../data/productData.js'

/**
 * Tumpukan kartu "set undangan" yang berisi fitur unggulan Dashboard.
 * Isi kartu dibangun ulang dari data contoh di dalam template (angkanya sama dengan
 * tangkapan layar asli), jadi tetap tajam di semua ukuran layar.
 */

/* ------------------------------------------------------------------ */
/* Kerangka kartu                                                      */
/* ------------------------------------------------------------------ */
function FeatureCard({ eyebrow, title, foot, children }) {
  return (
    <div className="flex h-full flex-col bg-paper px-5 py-8 shadow-paper sm:px-8 sm:py-10">
      <p className="eyebrow text-muted">{eyebrow}</p>
      <h3 className="mt-3 text-[1.4rem] leading-[1.2] text-forest sm:text-[1.6rem]">{title}</h3>
      <div className="mb-6 mt-6">{children}</div>
      <p className="mt-auto border-t border-line pt-3 text-[12px] italic text-muted">{foot}</p>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Kartu 1: ringkasan (kartu utama seperti undangan cetak)             */
/* ------------------------------------------------------------------ */
function SummaryCard() {
  return (
    <div className="flex h-full flex-col justify-center bg-paper px-5 py-10 text-center shadow-paper sm:px-10 sm:py-12">
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

      <dl className="mx-auto mt-6 w-full max-w-[17rem] border-t border-line text-left text-[13px]">
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

/* ------------------------------------------------------------------ */
/* Kartu 2: grafik                                                     */
/* ------------------------------------------------------------------ */
const fundSources = [
  { label: 'Gaji CPP', pct: 63.0, color: '#214E42' },
  { label: 'Gaji CPW', pct: 25.8, color: '#6B8F71' },
  { label: 'Freelance CPP', pct: 8.1, color: '#A9B9A0' },
  { label: 'Freelance CPW', pct: 3.1, color: '#D9D1C1' },
]

const monthly = [
  { m: 'Jun', v: 0.9 },
  { m: 'Jul', v: 3.5 },
  { m: 'Agu', v: 6 },
  { m: 'Sep', v: 6 },
  { m: 'Okt', v: 6 },
  { m: 'Nov', v: 8.5 },
]

const pctId = (n) => n.toFixed(1).replace('.', ',')

function Donut() {
  let acc = 0
  return (
    <svg viewBox="0 0 36 36" className="h-24 w-24 shrink-0 -rotate-90 sm:h-28 sm:w-28" role="img" aria-label="Diagram donat sumber dana tabungan: Gaji CPP 63 persen, Gaji CPW 25,8 persen, Freelance CPP 8,1 persen, Freelance CPW 3,1 persen">
      {fundSources.map((s) => {
        const el = (
          <circle
            key={s.label}
            cx="18"
            cy="18"
            r="15.9155"
            fill="none"
            stroke={s.color}
            strokeWidth="5"
            strokeDasharray={`${Math.max(s.pct - 0.5, 0.1)} ${100 - s.pct + 0.5}`}
            strokeDashoffset={-acc}
          />
        )
        acc += s.pct
        return el
      })}
    </svg>
  )
}

function ChartsCard() {
  const max = Math.max(...monthly.map((d) => d.v))
  return (
    <FeatureCard
      eyebrow="Dashboard grafik"
      title="Angka berubah jadi grafik, tanpa repot membuatnya sendiri."
      foot="Terisi otomatis dari data yang kamu catat."
    >
      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">Sumber dana tabungan</p>
      <div className="mt-3 flex items-center gap-4">
        <Donut />
        <ul className="min-w-0 flex-1 space-y-1.5 text-[13px]">
          {fundSources.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-2.5 w-2.5 shrink-0" style={{ background: s.color }} />
              <span className="truncate text-ink/80">{s.label}</span>
              <span className="ml-auto tabular-nums text-ink">{pctId(s.pct)}%</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-6 text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">Setoran per bulan</p>
      <div
        className="mt-3 flex h-28 items-end gap-2 border-b border-line"
        role="img"
        aria-label="Grafik batang setoran tabungan per bulan, naik dari Rp 0,9 juta pada Juni menjadi Rp 8,5 juta pada November"
      >
        {monthly.map((d, i) => (
          <div key={d.m} className="flex h-full flex-1 flex-col justify-end">
            <div
              className={i === monthly.length - 1 ? 'bg-forest' : 'bg-sage/70'}
              style={{ height: `${Math.max((d.v / max) * 100, 3)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex gap-2 text-[11px] text-muted" aria-hidden="true">
        {monthly.map((d) => (
          <span key={d.m} className="flex-1 text-center">
            {d.m}
          </span>
        ))}
      </div>
    </FeatureCard>
  )
}

/* ------------------------------------------------------------------ */
/* Kartu 3: peringatan & pengingat                                     */
/* ------------------------------------------------------------------ */
const reminders = [
  { when: 'H-2', text: 'Survey toko cincin', meta: `Linimasa · PJ: ${sample.couple[0]} & ${sample.couple[1]}` },
  {
    when: 'Sisa 2 hari',
    text: 'Tabungan bulan ini Rp 3.500.000 dari target Rp 4.765.577',
    meta: 'Tabungan · kurang Rp 1.265.577',
  },
  { when: 'H-3', text: 'Beli handuk', meta: `Linimasa · PJ: ${sample.couple[0]}` },
]

function RemindersCard() {
  return (
    <FeatureCard
      eyebrow="Peringatan & pengingat"
      title="Tak ada lagi yang terlewat menjelang hari H."
      foot="3 peringatan, diurutkan dari yang paling mendesak."
    >
      <ul className="border-t border-line">
        {reminders.map((r) => (
          <li key={r.text} className="flex items-start gap-3 border-b border-line py-3">
            <span className="mt-0.5 w-[5.4rem] shrink-0 whitespace-nowrap bg-mint px-2 py-1 text-center text-[11px] font-medium uppercase tracking-[0.06em] text-forest">
              {r.when}
            </span>
            <span className="min-w-0 text-[14px] leading-snug text-ink">
              {r.text}
              <span className="mt-0.5 block text-[12px] text-muted">{r.meta}</span>
            </span>
          </li>
        ))}
      </ul>
    </FeatureCard>
  )
}

/* ------------------------------------------------------------------ */
/* Kartu 4: tabungan                                                   */
/* ------------------------------------------------------------------ */
const savingsRows = [
  ['Target nabung / bulan', 'Rp 9.336.364'],
  ['Sisa waktu', '11 bulan'],
  ['Bulan ini', 'Kurang Rp 836.364'],
]

const deposits = [
  ['25 Nov', 'Gaji CPP', 'Rp 4.000.000'],
  ['25 Nov', 'Gaji CPW', 'Rp 2.000.000'],
]

function SavingsCard() {
  return (
    <FeatureCard
      eyebrow="Tabungan dana pernikahan"
      title="Tahu persis seberapa dekat target tabungan."
      foot="Target nabung per bulan dihitung otomatis."
    >
      <div className="flex items-end justify-between gap-4">
        <p className="font-serif text-[3.2rem] font-light leading-none text-forest">13,3%</p>
        <p className="pb-1 text-right text-[13px] leading-snug text-muted">
          Rp 14.500.000 terkumpul
          <br />
          dari Rp 108.700.000
        </p>
      </div>
      <div
        className="mt-3 h-1.5 bg-line"
        role="img"
        aria-label="Progres tabungan 13,3 persen"
      >
        <div className="h-full bg-forest" style={{ width: '13.3%' }} />
      </div>

      <dl className="mt-5 border-t border-line text-[13px]">
        {savingsRows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 border-b border-line py-2">
            <dt className="text-muted">{k}</dt>
            <dd className="text-right text-ink">{v}</dd>
          </div>
        ))}
      </dl>

      <p className="mt-5 text-[12px] font-medium uppercase tracking-[0.18em] text-ink/70">Setoran terakhir</p>
      <ul className="mt-1 text-[13px]">
        {deposits.map(([d, src, amount]) => (
          <li key={src} className="flex items-baseline gap-3 py-1.5">
            <span className="w-12 shrink-0 text-muted">{d}</span>
            <span className="text-ink/85">{src}</span>
            <span className="ml-auto tabular-nums text-ink">{amount}</span>
          </li>
        ))}
      </ul>
    </FeatureCard>
  )
}

/* ------------------------------------------------------------------ */
/* Kartu 5: alur administrasi                                          */
/* ------------------------------------------------------------------ */
const steps = [
  ['KTP-el asli', 'Fotokopi KTP-el'],
  ['Kartu Keluarga asli', 'Fotokopi Kartu Keluarga'],
  ['Akta Kelahiran asli', 'Fotokopi Akta Kelahiran'],
  ['Ijazah terakhir asli', 'Fotokopi ijazah terakhir'],
  ['KTP orang tua / wali', 'Fotokopi KTP orang tua / wali'],
]

function AdminCard() {
  return (
    <FeatureCard
      eyebrow="Alur administrasi"
      title="Berkas nikah beres, satu per satu."
      foot="28 tahapan berkas dalam satu daftar."
    >
      <div className="flex items-baseline justify-between gap-3 text-[13px]">
        <span className="text-muted">Persiapan dokumen pribadi</span>
        <span className="text-ink">0 dari 28 selesai</span>
      </div>
      <div className="mt-2 h-1.5 bg-line" aria-hidden="true" />

      <ol className="mt-3 border-t border-line">
        {steps.map(([input, output], i) => (
          <li key={input} className="flex items-center gap-3 border-b border-line py-2.5">
            <span className="w-3 shrink-0 font-serif text-[15px] italic text-sage">{i + 1}</span>
            <span className="min-w-0 flex-1 text-[13px] leading-snug text-ink">
              {input}
              <span className="block truncate text-[12px] text-muted">→ {output}</span>
            </span>
            <span className="shrink-0 border border-line px-2 py-0.5 text-[11px] text-muted">Belum</span>
          </li>
        ))}
      </ol>
    </FeatureCard>
  )
}

/* ------------------------------------------------------------------ */
/* Tumpukan + kontrol                                                  */
/* ------------------------------------------------------------------ */
const cards = [
  { id: 'ringkasan', label: 'Ringkasan', node: <SummaryCard /> },
  { id: 'grafik', label: 'Dashboard grafik', node: <ChartsCard /> },
  { id: 'pengingat', label: 'Peringatan & pengingat', node: <RemindersCard /> },
  { id: 'tabungan', label: 'Tabungan', node: <SavingsCard /> },
  { id: 'administrasi', label: 'Alur administrasi', node: <AdminCard /> },
]

const AUTO_MS = 5500
const SWIPE_PX = 50

const navBtn =
  'grid h-10 w-10 place-items-center border border-ink/30 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper'

/** Gaya tiap kartu berdasarkan jaraknya dari kartu aktif (0 = paling depan). */
function cardStyle(offset, count, dragX) {
  if (offset === 0) {
    return {
      transform: `translate(${dragX}px, 0) rotate(${dragX / 40}deg)`,
      opacity: 1,
      zIndex: 30,
    }
  }
  if (offset === 1 || offset === 2) {
    return {
      transform: `translate(calc(var(--peek) * ${offset}), calc(var(--peek) * ${offset * 0.75})) rotate(${offset * 1.1}deg)`,
      opacity: 1,
      zIndex: 30 - offset * 10,
    }
  }
  if (offset === count - 1) {
    // Kartu yang baru saja dilewati: meluncur ke kiri dan menghilang.
    return { transform: 'translate(-115%, 0) rotate(-7deg)', opacity: 0, zIndex: 40 }
  }
  return {
    transform: 'translate(calc(var(--peek) * 2), calc(var(--peek) * 1.5)) rotate(2.2deg)',
    opacity: 0,
    zIndex: 0,
  }
}

export default function FeatureCards({ className = '' }) {
  const count = cards.length
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [autoplay, setAutoplay] = useState(true)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const start = useRef(null)

  useEffect(() => {
    if (!autoplay || paused || dragging) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const id = setTimeout(() => setIndex((i) => (i + 1) % count), AUTO_MS)
    return () => clearTimeout(id)
  }, [index, paused, autoplay, dragging, count])

  const go = (next) => {
    setAutoplay(false)
    setIndex((next + count) % count)
  }

  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    start.current = { x: e.clientX, y: e.clientY }
  }

  const onPointerMove = (e) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    if (!dragging) {
      // Gerakan vertikal dibiarkan supaya halaman tetap bisa di-scroll.
      if (Math.abs(dx) < 6 || Math.abs(dx) < Math.abs(dy)) return
      setDragging(true)
      e.currentTarget.setPointerCapture?.(e.pointerId)
    }
    setDragX(dx)
  }

  const endDrag = (e) => {
    if (!start.current) return
    const dx = e.clientX - start.current.x
    start.current = null
    if (!dragging) return
    setDragging(false)
    setDragX(0)
    if (Math.abs(dx) > SWIPE_PX) go(index + (dx < 0 ? 1 : -1))
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') go(index + 1)
    else if (e.key === 'ArrowLeft') go(index - 1)
    else return
    e.preventDefault()
  }

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Fitur unggulan Dashboard Teman Wedding"
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={onKeyDown}
    >
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={`grid pb-5 pr-5 [--peek:9px] [touch-action:pan-y] sm:pb-7 sm:pr-8 sm:[--peek:14px] ${
          dragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
      >
        {cards.map((c, i) => {
          const offset = (i - index + count) % count
          const isActive = offset === 0
          return (
            <div
              key={c.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} dari ${count}: ${c.label}`}
              inert={!isActive}
              aria-hidden={!isActive}
              className={`[grid-area:1/1] ${
                isActive && dragging
                  ? ''
                  : 'transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)]'
              } ${isActive ? '' : 'pointer-events-none'}`}
              style={cardStyle(offset, count, dragX)}
            >
              {c.node}
            </div>
          )
        })}
      </div>

      {/* Kontrol di bawah tumpukan: posisinya tetap, tinggi kartu mengikuti yang tertinggi. */}
      <div className="mt-2 flex items-center gap-1 sm:gap-2">
        <button type="button" onClick={() => go(index - 1)} aria-label="Kartu sebelumnya" className={navBtn}>
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <div className="flex items-center" role="group" aria-label="Pilih kartu">
          {cards.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => go(i)}
              aria-label={`Kartu ${i + 1}: ${c.label}`}
              aria-current={index === i}
              className="grid h-10 w-6 place-items-center"
            >
              <span
                aria-hidden="true"
                className={`block h-[3px] transition-all duration-300 ${
                  index === i ? 'w-5 bg-forest' : 'w-2.5 bg-ink/30'
                }`}
              />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(index + 1)} aria-label="Kartu berikutnya" className={navBtn}>
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <p className="eyebrow ml-2 hidden min-w-0 truncate !text-[10px] text-forest sm:block" aria-live="polite">
          {cards[index].label}
        </p>
      </div>
    </div>
  )
}
