import { useState } from 'react'
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { companions, sample, plans } from '../data/productData.js'

const complete = plans.find((p) => p.id === 'complete')
const { lamaran, deeptalk } = companions

const smallArrow =
  'grid h-9 w-9 place-items-center border border-ink/25 text-ink transition-colors hover:bg-ink hover:text-paper'

/** Kartu contoh pertanyaan Deep Talk: 3 pertanyaan dalam carousel, jawabannya masih terkunci. */
function QuestionCard() {
  const [index, setIndex] = useState(0)
  const { samples } = deeptalk
  const go = (n) => setIndex((n + samples.length) % samples.length)

  return (
    <figure
      role="group"
      aria-roledescription="carousel"
      aria-label="Contoh pertanyaan Deep Talk Couples"
      className="bg-paper px-6 py-9 shadow-paper sm:px-10 sm:py-11"
    >
      <div className="flex items-center justify-between gap-4">
        <p className="eyebrow text-muted" aria-live="polite">
          {samples[index].category} · Contoh {index + 1} dari {samples.length}
        </p>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(index - 1)} aria-label="Pertanyaan sebelumnya" className={smallArrow}>
            <ChevronLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label="Pertanyaan berikutnya" className={smallArrow}>
            <ChevronRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid">
        {samples.map((s, i) => (
          <blockquote
            key={s.question}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} dari ${samples.length}`}
            inert={index !== i}
            className={`font-serif text-[1.55rem] leading-[1.35] text-ink transition-opacity duration-500 [grid-area:1/1] sm:text-[1.85rem] ${
              index === i ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          >
            “{s.question}”
          </blockquote>
        ))}
      </div>

      <div className="mt-4 flex items-center" role="group" aria-label="Pilih pertanyaan">
        {samples.map((s, i) => (
          <button
            key={s.question}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Pertanyaan ${i + 1}`}
            aria-current={index === i}
            className="grid h-8 w-7 place-items-center"
          >
            <span
              aria-hidden="true"
              className={`block h-[3px] transition-all duration-300 ${index === i ? 'w-6 bg-forest' : 'w-3 bg-ink/25'}`}
            />
          </button>
        ))}
      </div>

      <dl className="mt-4 border-t border-line text-[14px]">
        {sample.couple.map((name) => (
          <div key={name} className="flex items-center justify-between gap-4 border-b border-line py-3">
            <dt className="text-muted">Jawaban {name}</dt>
            <dd className="flex items-center gap-2 text-ink/60">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
              Menunggu jawaban berdua
            </dd>
          </div>
        ))}
      </dl>
    </figure>
  )
}

/** Kartu Teman Lamaran: tiga sheet-nya, disusun seperti kartu pertanyaan di samping. */
function LamaranCard() {
  return (
    <figure className="bg-paper px-6 py-9 shadow-paper sm:px-10 sm:py-11">
      <p className="eyebrow text-muted">Teman Lamaran · {lamaran.sheets.length} sheet</p>
      <p className="mt-5 font-serif text-[1.55rem] leading-[1.35] text-ink sm:text-[1.85rem]">
        {lamaran.tagline}, dari info acara sampai daftar tugas.
      </p>
      <ol className="mt-8 border-t border-line text-[14px]">
        {lamaran.sheets.map((s, i) => (
          <li
            key={s.name}
            className="flex flex-col gap-0.5 border-b border-line py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
          >
            <span className="flex gap-3 text-[15px] text-ink">
              <span className="font-serif italic text-sage">{i + 1}</span>
              {s.name}
            </span>
            <span className="pl-6 text-muted sm:pl-0 sm:text-right">{s.note}</span>
          </li>
        ))}
      </ol>
    </figure>
  )
}

const bonuses = [
  {
    id: 'deeptalk',
    label: deeptalk.name,
    visual: <QuestionCard />,
    title: deeptalk.name,
    meta: `${deeptalk.questions} pertanyaan · ${deeptalk.topics} topik`,
    description: deeptalk.description,
  },
  {
    id: 'lamaran',
    label: lamaran.name,
    visual: <LamaranCard />,
    title: lamaran.name,
    meta: lamaran.tagline,
    description: lamaran.description,
  },
]

export default function Companions() {
  const [active, setActive] = useState(0)

  const onTabKey = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const next = (active + (e.key === 'ArrowRight' ? 1 : -1) + bonuses.length) % bonuses.length
    setActive(next)
    document.getElementById(`tab-${bonuses[next].id}`)?.focus()
  }

  return (
    <section id="bonus" aria-labelledby="judul-bonus" className="grain py-20 sm:py-28">
      <div className="wrap">
        <p className="eyebrow text-forest">Bonus file · Khusus {complete.shortName}</p>
        <h2 id="judul-bonus" className="h-section mt-5 max-w-3xl">
          Bukan cuma hari H. Ada juga <em className="font-normal text-sage">obrolan</em> penting sebelum
          menikah, dan lamarannya.
        </h2>

        <div role="tablist" aria-label="Pilih bonus file" className="mt-12 flex gap-8 border-b border-ink/20">
          {bonuses.map((b, i) => (
            <button
              key={b.id}
              id={`tab-${b.id}`}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls={`panel-${b.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onTabKey}
              className={`-mb-px border-b-2 pb-3 font-serif text-xl transition-colors sm:text-2xl ${
                active === i ? 'border-forest text-forest' : 'border-transparent text-muted hover:text-ink'
              }`}
            >
              <span className="mr-2 text-sm italic text-sage">{i + 1}</span>
              {b.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid">
          {bonuses.map((b, i) => (
            <div
              key={b.id}
              id={`panel-${b.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${b.id}`}
              inert={active !== i}
              className={`grid gap-10 transition-opacity duration-500 [grid-area:1/1] lg:grid-cols-12 lg:items-start lg:gap-8 ${
                active === i ? 'opacity-100' : 'pointer-events-none opacity-0'
              }`}
            >
              <div className="lg:col-span-7">{b.visual}</div>
              <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
                <div className="border-t border-ink pt-6">
                  <p className="eyebrow text-muted">Bonus khusus {complete.shortName}</p>
                  <h3 className="mt-3 text-[1.9rem] leading-tight">{b.title}</h3>
                  <p className="mt-1 font-serif italic text-forest">{b.meta}</p>
                  <p className="mt-4 leading-[1.7] text-ink/75">{b.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
