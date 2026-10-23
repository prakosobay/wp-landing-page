import SectionHeader from './SectionHeader.jsx'
import { howItWorks } from '../data/productData.js'

export default function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      aria-labelledby="judul-cara-kerja"
      className="section-pad bg-brand-pale/70"
    >
      <div className="container-page">
        <SectionHeader
          id="judul-cara-kerja"
          eyebrow="Cara kerja"
          title={howItWorks.heading}
          description={howItWorks.description}
        />

        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {howItWorks.steps.map((step, i) => (
            <li key={step.title} className="card p-7">
              <span
                className="grid h-11 w-11 place-items-center rounded-full bg-brand-dark font-display text-lg font-semibold text-white"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <h3 className="mt-5 text-xl font-semibold">
                <span className="sr-only">Langkah {i + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
