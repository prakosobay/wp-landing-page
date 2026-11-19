import { Lock } from 'lucide-react'
import { companions, sample, plans, formatRupiah } from '../data/productData.js'

const [essensial, complete] = plans
const { lamaran, deeptalk } = companions

/** Kartu satu pertanyaan Deep Talk, jawabannya masih terkunci. */
function QuestionCard() {
  return (
    <figure className="bg-paper px-6 py-9 shadow-paper sm:px-10 sm:py-11">
      <p className="eyebrow text-muted">
        {deeptalk.sampleCategory} · 1 dari {deeptalk.questions}
      </p>
      <blockquote className="mt-5 font-serif text-[1.55rem] leading-[1.35] text-ink sm:text-[1.85rem]">
        “{deeptalk.sampleQuestion}”
      </blockquote>
      <dl className="mt-8 border-t border-line text-[14px]">
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

export default function Companions() {
  return (
    <section id="bonus" aria-labelledby="judul-bonus" className="grain py-20 sm:py-28">
      <div className="wrap">
        <p className="eyebrow text-forest">Bonus file di dalam paket</p>
        <h2 id="judul-bonus" className="h-section mt-5 max-w-3xl">
          Bukan hanya hari H. Juga lamarannya, dan <em className="font-normal text-sage">obrolan</em> penting
          sebelumnya.
        </h2>

        <div className="mt-14 grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Deep Talk Couples */}
          <div className="lg:col-span-7">
            <QuestionCard />
            <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <h3 className="text-[1.9rem] leading-tight">{deeptalk.name}</h3>
                <p className="mt-1 font-serif italic text-forest">
                  {deeptalk.questions} pertanyaan · {deeptalk.topics} topik
                </p>
                <p className="mt-3 max-w-md leading-[1.7] text-ink/75">{deeptalk.description}</p>
              </div>
              <p className="text-[13px] leading-relaxed text-muted sm:max-w-[13rem] sm:text-right">
                Termasuk di {complete.shortName}. Untuk {essensial.shortName}, tambah{' '}
                {formatRupiah(essensial.upgrade.price)}.
              </p>
            </div>
          </div>

          {/* Teman Lamaran */}
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-10">
            <div className="border-t border-ink pt-6">
              <p className="eyebrow text-muted">Termasuk di kedua paket</p>
              <h3 className="mt-3 text-[1.9rem] leading-tight">{lamaran.name}</h3>
              <p className="mt-1 font-serif italic text-forest">{lamaran.tagline}</p>
              <p className="mt-4 leading-[1.7] text-ink/75">{lamaran.description}</p>
              <ol className="mt-6 border-t border-line text-[15px]">
                {lamaran.sheets.map((s, i) => (
                  <li key={s} className="flex gap-4 border-b border-line py-3">
                    <span className="font-serif italic text-sage">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
