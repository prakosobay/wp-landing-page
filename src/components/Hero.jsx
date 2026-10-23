import { ArrowRight, ImageIcon } from 'lucide-react'
import { product } from '../data/productData.js'

/** Mockup netral berbasis CSS. Ganti dengan gambar lewat `product.heroImage`. */
function ProductPreview() {
  if (product.heroImage) {
    return (
      <img
        src={product.heroImage}
        alt={product.heroImageAlt}
        className="w-full rounded-3xl border border-brand-soft/70 shadow-lift"
        loading="eager"
        decoding="async"
      />
    )
  }

  return (
    <div
      className="relative mx-auto w-full max-w-md lg:max-w-none"
      role="img"
      aria-label="Pratinjau produk (placeholder)"
    >
      <div className="rounded-3xl border border-brand-soft/80 bg-white p-4 shadow-lift sm:p-5">
        <div className="mb-4 flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-brand-soft" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-soft" />
          <span className="h-2.5 w-2.5 rounded-full bg-brand-soft" />
          <span className="ml-3 h-2.5 w-24 rounded-full bg-brand-pale" />
        </div>

        <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-dashed border-brand/40 bg-brand-pale">
          <div className="flex flex-col items-center gap-2 px-4 text-center text-brand">
            <ImageIcon className="h-9 w-9" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-wide sm:text-sm">
              [PRATINJAU PRODUK]
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3" aria-hidden="true">
          <span className="h-14 rounded-xl bg-brand-pale" />
          <span className="h-14 rounded-xl bg-brand-pale" />
          <span className="h-14 rounded-xl bg-brand-pale" />
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute -left-2 top-10 rounded-full border border-brand-soft bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-dark shadow-card sm:-left-5"
      >
        Basic
      </span>
      <span
        aria-hidden="true"
        className="absolute -right-2 top-1/2 rounded-full bg-brand-dark px-3.5 py-1.5 text-xs font-semibold text-white shadow-card sm:-right-5"
      >
        Premium
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-4 left-8 rounded-full border border-dashed border-brand bg-canvas px-3.5 py-1.5 text-xs font-semibold text-brand-dark sm:left-12"
      >
        + Add-on
      </span>
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="beranda"
      aria-labelledby="judul-hero"
      className="relative overflow-hidden bg-brand-pale/60"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-soft/50 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-14 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div className="animate-fade-up">
          <p className="inline-flex items-center rounded-full border border-brand-soft bg-white px-3.5 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-brand-dark">
            {product.category}
          </p>
          <h1
            id="judul-hero"
            className="mt-5 text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-[3.4rem]"
          >
            {product.tagline}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {product.shortDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#paket" className="btn btn-primary">
              Lihat Paket
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#fitur" className="btn btn-secondary">
              Pelajari Fitur
            </a>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:120ms]">
          <ProductPreview />
        </div>
      </div>
    </section>
  )
}
