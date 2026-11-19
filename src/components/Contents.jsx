import { sheets, companionRows, plans } from '../data/productData.js'

const [essensial, complete] = plans

function Availability({ value }) {
  if (typeof value === 'string') {
    return <span className="text-[13px] text-ink">{value}</span>
  }
  return value ? (
    <>
      <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-forest" />
      <span className="sr-only">Termasuk</span>
    </>
  ) : (
    <>
      <span aria-hidden="true" className="text-ink/35">—</span>
      <span className="sr-only">Tidak termasuk</span>
    </>
  )
}

function Row({ item, index }) {
  return (
    <tr className="group border-b border-line align-top">
      <td className="hidden py-6 pr-3 font-serif text-sm italic text-sage tabular-nums sm:table-cell">
        {index}
      </td>
      <th scope="row" className="py-6 pr-4 font-normal">
        <span className="block font-serif text-[1.35rem] leading-tight text-ink transition-colors duration-200 group-hover:text-forest sm:text-2xl">
          {item.name}
        </span>
        <span className="mt-2 block max-w-xl text-[15px] leading-[1.65] text-muted">
          {item.description}
        </span>
      </th>
      <td className="py-7 text-center">
        <Availability value={item.essensial} />
      </td>
      <td className="bg-mint/40 py-7 text-center">
        <Availability value={item.complete} />
      </td>
    </tr>
  )
}

function Count({ plan, sheetsCount, filesCount, accent }) {
  return (
    <div>
      <dt className="eyebrow text-muted">{plan.shortName}</dt>
      <dd className={`mt-1 font-serif text-3xl ${accent ? 'text-forest' : 'text-ink'}`}>
        {sheetsCount} sheet
      </dd>
      <dd className="mt-1 text-[13px] text-muted">
        + {filesCount} file pendamping
      </dd>
    </div>
  )
}

export default function Contents() {
  const count = (key) => sheets.filter((s) => s[key]).length
  const files = (key) => companionRows.filter((r) => r[key] === true).length

  return (
    <section id="isi" aria-labelledby="judul-isi" className="py-20 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="eyebrow text-forest">Daftar isi</p>
            <h2 id="judul-isi" className="h-section mt-5">
              Semua catatan persiapan, di <em className="font-normal text-sage">satu</em> tempat.
            </h2>
            <p className="mt-6 max-w-sm leading-[1.7] text-muted">
              Setiap sheet saling terhubung. Kategori dari Master Data menjadi dropdown, total seserahan
              masuk ke anggaran, dan Dashboard merangkum semuanya tanpa perlu diisi.
            </p>
            <dl className="mt-8 flex gap-10 border-t border-line pt-5">
              <Count plan={essensial} sheetsCount={count('essensial')} filesCount={files('essensial')} />
              <Count plan={complete} sheetsCount={count('complete')} filesCount={files('complete')} accent />
            </dl>
          </div>
        </div>

        <div className="lg:col-span-8">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Daftar sheet dan file pendamping, serta ketersediaannya di paket {essensial.name} dan{' '}
              {complete.name}
            </caption>
            <thead>
              <tr className="border-b border-ink">
                <th scope="col" className="eyebrow hidden w-16 pb-3 font-medium text-muted sm:table-cell">
                  No
                </th>
                <th scope="col" className="eyebrow pb-3 font-medium text-muted">
                  Planner pernikahan
                </th>
                <th scope="col" className="eyebrow w-[4.5rem] pb-3 text-center font-medium text-muted sm:w-24">
                  {essensial.shortName}
                </th>
                <th scope="col" className="eyebrow w-[4.5rem] pb-3 text-center font-medium text-forest sm:w-24">
                  {complete.shortName}
                </th>
              </tr>
            </thead>
            <tbody>
              {sheets.map((sheet, i) => (
                <Row key={sheet.name} item={sheet} index={String(i + 1).padStart(2, '0')} />
              ))}
            </tbody>
            <tbody>
              <tr className="border-b border-ink">
                <th scope="rowgroup" colSpan={4} className="eyebrow pb-3 pt-12 text-left font-medium text-muted">
                  File pendamping
                </th>
              </tr>
              {companionRows.map((row) => (
                <Row key={row.name} item={row} index="+" />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
