import { ArrowRight } from 'lucide-react'
import { finalCta } from '../data/productData.js'

export default function FinalCTA() {
  return (
    <section
      aria-labelledby="judul-cta"
      className="bg-canvas px-5 pb-16 sm:px-8 sm:pb-20 lg:pb-24"
    >
      <div className="on-dark relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand-dark px-6 py-14 text-center sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-brand/40 blur-3xl"
        />
        <div className="relative mx-auto max-w-2xl">
          <h2
            id="judul-cta"
            className="text-3xl font-semibold !text-white sm:text-4xl"
          >
            {finalCta.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-soft sm:text-lg">
            {finalCta.description}
          </p>
          <a href="#paket" className="btn btn-light mt-8">
            Lihat Paket
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
