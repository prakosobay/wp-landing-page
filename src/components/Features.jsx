import SectionHeader from './SectionHeader.jsx'
import { features } from '../data/productData.js'

export default function Features() {
  return (
    <section
      id="fitur"
      aria-labelledby="judul-fitur"
      className="section-pad bg-brand-pale/70"
    >
      <div className="container-page">
        <SectionHeader
          id="judul-fitur"
          eyebrow="Features"
          title="Fitur yang tersedia"
          description="[DESKRIPSI SINGKAT FITUR PRODUK]"
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="group card flex gap-4 p-6 hover:-translate-y-1 hover:border-brand/50 hover:shadow-lift"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-dark text-white transition duration-200 group-hover:bg-brand">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                  {description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
