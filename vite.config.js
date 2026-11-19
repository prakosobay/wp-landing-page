import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  seo,
  product,
  plans,
  contact,
  currentPrice,
  isPromoActive,
  promo,
  getFaq,
} from './src/data/productData.js'

/**
 * Base path untuk GitHub Pages.
 *
 * - Di GitHub Actions, workflow mengisi VITE_BASE_PATH otomatis menjadi
 *   "/<nama-repositori>/" (lihat .github/workflows/deploy.yml).
 * - Repositori user site "<username>.github.io": gunakan VITE_BASE_PATH=/
 * - Jika VITE_BASE_PATH tidak diisi, dipakai "./" (path relatif).
 */
const base = process.env.VITE_BASE_PATH || './'

/**
 * URL publik situs (mis. "https://temanwedding.co/"), dipakai untuk canonical,
 * og:url, og:image, sitemap, dan JSON-LD. Workflow GitHub Pages mengisinya
 * otomatis; untuk domain sendiri, ubah SITE_URL di deploy.yml.
 */
const siteUrl = (process.env.SITE_URL || '').replace(/\/?$/, '/').replace(/^\/$/, '')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function seoPlugin() {
  const description = seo.description()
  const abs = (path) => (siteUrl ? new URL(path, siteUrl).href : null)
  const ogImage = abs(seo.ogImage)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: product.name,
        ...(siteUrl && { url: siteUrl }),
        email: contact.find((c) => c.label === 'Email')?.value,
        sameAs: contact.filter((c) => c.label === 'Instagram').map((c) => c.href),
      },
      ...plans.map((plan) => ({
        '@type': 'Product',
        name: plan.name,
        description: `${plan.summary} Template ${product.category.toLowerCase()} di ${product.platform}.`,
        brand: { '@type': 'Brand', name: product.name },
        ...(ogImage && { image: ogImage }),
        offers: {
          '@type': 'Offer',
          price: String(currentPrice(plan)),
          priceCurrency: 'IDR',
          availability: 'https://schema.org/InStock',
          ...(siteUrl && { url: `${siteUrl}#harga` }),
          ...(isPromoActive() && promo.endsAt && { priceValidUntil: promo.endsAt }),
        },
      })),
      {
        '@type': 'FAQPage',
        mainEntity: getFaq().map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer },
        })),
      },
    ],
  }

  const tags = [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    siteUrl && `<link rel="canonical" href="${siteUrl}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="id_ID" />`,
    `<meta property="og:site_name" content="${esc(product.name)}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    siteUrl && `<meta property="og:url" content="${siteUrl}" />`,
    ogImage && `<meta property="og:image" content="${ogImage}" />`,
    ogImage && `<meta property="og:image:width" content="1200" />`,
    ogImage && `<meta property="og:image:height" content="630" />`,
    ogImage && `<meta property="og:image:alt" content="${esc(seo.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    ogImage && `<meta name="twitter:image" content="${ogImage}" />`,
    `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ')

  return {
    name: 'teman-wedding-seo',
    transformIndexHtml: (html) => html.replace('<!-- seo -->', tags),
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n${siteUrl ? `\nSitemap: ${siteUrl}sitemap.xml\n` : ''}`,
      })
      if (siteUrl) {
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}</loc></url>\n</urlset>\n`,
        })
      }
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), seoPlugin()],
})
