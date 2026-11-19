import { ArrowRight, Lock } from 'lucide-react'
import { registration, plans } from '../data/productData.js'

const complete = plans.find((p) => p.id === 'complete')

/**
 * Teaser sheet Alur Pendaftaran (khusus Complete).
 * Sengaja hanya menampilkan nama tahap, tanpa rincian berkas:
 * rinciannya adalah nilai yang dibeli, bukan dibaca di website.
 */
export default function Registration() {
  return (
    <section id="berkas" aria-labelledby="judul-berkas" className="on-dark bg-forest py-20 text-paper sm:py-28">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <p className="eyebrow text-paper/70">Khusus {complete.shortName} · Alur Pendaftaran</p>
            <h2 id="judul-berkas" className="h-section mt-5 !text-paper">
              Urus berkas nikah <em className="font-normal text-sage-soft">tanpa</em> bolak-balik karena
              ada yang kurang.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="leading-[1.7] text-paper/80">
              Berkas apa yang dibawa, surat apa yang keluar, dan ke mana mengurusnya, semuanya sudah
              dipetakan berurutan. Anda tinggal mencentang satu per satu.
            </p>
          </div>
        </div>

        <div className="mt-16 grid items-end gap-10 border-t border-paper/20 pt-10 lg:grid-cols-12 lg:gap-8">
          <p className="flex items-baseline gap-4 lg:col-span-3">
            <span className="font-serif text-[6.5rem] font-light leading-[0.85]">{registration.total}</span>
            <span className="eyebrow text-paper/70">
              berkas
              <br />
              {registration.stages.length} tahap
            </span>
          </p>

          <div className="relative lg:col-span-9">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-paper/30 md:block" />
            <ol
              aria-label="Tahapan pengurusan berkas"
              className="relative grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-6 md:gap-4"
            >
              {registration.stages.map((stage, i) => (
                <li key={stage}>
                  <span aria-hidden="true" className="block h-[15px] w-[15px] rounded-full border border-paper/70 bg-forest" />
                  <span className="mt-4 block font-serif text-sm italic text-sage-soft">{i + 1}</span>
                  <span className="mt-0.5 block font-serif text-lg leading-snug">{stage}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-3 text-[15px] text-paper/75">
            <Lock className="h-4 w-4 shrink-0 text-sage-soft" strokeWidth={1.5} aria-hidden="true" />
            Rincian tiap berkas ada di dalam {complete.name}.
          </p>
          <a href="#harga" className="btn btn-line-light">
            Lihat paket {complete.shortName}
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
