import SectionHeader from './SectionHeader.jsx'
import { product, overview } from '../data/productData.js'

export default function ProductOverview() {
  return (
    <section
      id="tentang"
      aria-labelledby="judul-tentang"
      className="section-pad bg-canvas"
    >
      <div className="container-page">
        <SectionHeader
          id="judul-tentang"
          eyebrow="Tentang produk"
          title={overview.heading}
          description={product.description}
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {overview.benefits.map(({ title, description, icon: Icon }) => (
            <li
              key={title}
              className="card p-7 hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-pale text-brand-dark">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
