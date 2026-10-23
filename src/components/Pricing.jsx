import { Check, Info, Plus } from 'lucide-react'
import SectionHeader from './SectionHeader.jsx'
import CtaButton from './CtaButton.jsx'
import { pricing } from '../data/productData.js'
import { isPlaceholderText } from '../utils/links.js'

function PlanCard({ plan }) {
  const isAddon = plan.type === 'addon'
  const isHighlight = plan.highlight

  const cardStyle = isHighlight
    ? 'on-dark border-brand-dark bg-brand-dark text-white shadow-lift lg:-translate-y-3'
    : isAddon
      ? 'border-dashed border-brand bg-brand-pale/80 shadow-none md:col-span-2 lg:col-span-1'
      : 'border-brand-soft/80 bg-white shadow-card'

  const titleColor = isHighlight ? 'text-white' : 'text-brand-dark'
  const mutedColor = isHighlight ? 'text-brand-soft' : 'text-muted'
  const placeholderPrice = isPlaceholderText(plan.price)

  const buttonStyle = isHighlight
    ? 'btn btn-light w-full'
    : isAddon
      ? 'btn btn-secondary w-full'
      : 'btn btn-primary w-full'

  return (
    <article
      id={isAddon ? 'addon' : undefined}
      aria-labelledby={`paket-${plan.id}`}
      className={`relative flex flex-col rounded-3xl border p-7 transition duration-200 hover:shadow-lift sm:p-8 ${
        isAddon ? 'scroll-mt-24' : ''
      } ${cardStyle}`}
    >
      <div className="flex min-h-[28px] items-center justify-between gap-3">
        <h3
          id={`paket-${plan.id}`}
          className={`flex items-center gap-2 text-2xl font-semibold ${titleColor}`}
        >
          {isAddon && <Plus className="h-5 w-5" aria-hidden="true" />}
          {plan.name}
        </h3>
        {plan.badge && (
          <span
            className={`rounded-full px-3 py-1 text-[13px] font-semibold ${
              isHighlight
                ? 'bg-brand-soft text-brand-dark'
                : 'border border-brand text-brand-dark'
            }`}
          >
            {plan.badge}
          </span>
        )}
      </div>

      <p className={`mt-3 text-sm leading-relaxed sm:text-base ${mutedColor}`}>
        {plan.description}
      </p>

      <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span
          className={`font-display font-semibold ${
            placeholderPrice ? 'text-2xl sm:text-3xl' : 'text-4xl'
          } ${titleColor}`}
        >
          {plan.price}
        </span>
        {plan.priceNote && (
          <span className={`text-sm ${mutedColor}`}>{plan.priceNote}</span>
        )}
      </div>

      <hr
        className={`my-6 ${isHighlight ? 'border-white/20' : 'border-brand-soft'}`}
      />

      <ul className="flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm sm:text-base">
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                isHighlight ? 'bg-brand-soft text-brand-dark' : 'bg-brand text-white'
              }`}
            >
              <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
            </span>
            <span className={isHighlight ? 'text-white' : 'text-ink'}>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <CtaButton href={plan.cta.href} className={buttonStyle} dark={isHighlight}>
          {plan.cta.label}
        </CtaButton>
      </div>
    </article>
  )
}

export default function Pricing() {
  return (
    <section
      id="paket"
      aria-labelledby="judul-paket"
      className="section-pad bg-canvas"
    >
      <div className="container-page">
        <SectionHeader
          id="judul-paket"
          eyebrow="Pricing"
          title={pricing.heading}
          description={pricing.description}
        />

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {pricing.plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {pricing.note && (
          <p className="mx-auto mt-8 flex max-w-2xl items-start justify-center gap-2 text-center text-sm text-muted">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span>{pricing.note}</span>
          </p>
        )}
      </div>
    </section>
  )
}
