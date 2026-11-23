/**
 * SEMUA KONTEN WEBSITE ADA DI FILE INI.
 *
 * Isi fitur diambil dari file template (versi 1.0, November 2026):
 * "Teman Wedding Lite.xlsx", "Teman Wedding Premium.xlsx",
 * "Teman Lamaran.xlsx", dan "Deeptalk Couples.xlsx".
 *
 * File ini juga dibaca oleh vite.config.js untuk membuat meta SEO,
 * Open Graph, dan structured data (JSON-LD) saat build.
 */

/* ------------------------------------------------------------------ */
/* Promo                                                               */
/* ------------------------------------------------------------------ */
export const promo = {
  active: true, // saklar utama: false = semua harga kembali normal
  label: 'Promo launching',
  // Hari terakhir promo (WIB), format 'YYYY-MM-DD'. Setelah tanggal ini harga
  // otomatis kembali normal. null = promo aktif tanpa batas tanggal.
  endsAt: '2026-12-31',
  // Pop-up ajakan beli: muncul setelah halaman dibuka selama delayMs.
  // oncePerSession: true = tidak muncul lagi di tab yang sama setelah pernah tampil.
  popup: { delayMs: 15000, oncePerSession: true },
}

/** Akhir promo sebagai Date (WIB), atau null bila tanpa batas tanggal. */
export const promoEndDate = () => (promo.endsAt ? new Date(`${promo.endsAt}T23:59:59+07:00`) : null)

export const isPromoActive = (now = new Date()) => {
  if (!promo.active) return false
  if (!promo.endsAt) return true
  return now <= promoEndDate()
}

export const promoEndLabel = (short = false) =>
  promo.endsAt
    ? new Date(`${promo.endsAt}T12:00:00+07:00`).toLocaleDateString('id-ID', {
        timeZone: 'Asia/Jakarta',
        day: 'numeric',
        month: short ? 'short' : 'long',
        ...(!short && { year: 'numeric' }),
      })
    : null

export const formatRupiah = (n) => `Rp${n.toLocaleString('id-ID')}`

/** Harga yang berlaku saat ini (promo bila aktif). */
export const currentPrice = (plan) =>
  isPromoActive() && plan.promoPrice ? plan.promoPrice : plan.price

/* ------------------------------------------------------------------ */
/* Identitas & kontak                                                  */
/* ------------------------------------------------------------------ */
export const product = {
  name: 'Teman Wedding',
  hashtag: '#TemanDalamSetiapPersiapan',
  category: 'Planner persiapan pernikahan',
  platform: 'Google Sheets',
  version: '1.0',
  intro:
    'Planner pernikahan di Google Sheets, dari lamaran sampai hari H. Anggaran, vendor, seserahan, tamu, dan berkas nikah tercatat di satu tempat yang saling terhubung. Anda cukup mengisi data, rumus dan dashboard mengurus sisanya.',
}

const WHATSAPP_NUMBER = '6287869882030' // 0878-6988-2030

/** Link WhatsApp dengan pesan pembuka yang sudah terisi. */
export const whatsapp = (message) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

export const contact = [
  {
    label: 'Instagram',
    value: '@temanwedding.co',
    href: 'https://instagram.com/temanwedding.co',
  },
  {
    label: 'WhatsApp',
    value: '0878-6988-2030',
    href: whatsapp('Halo Teman Wedding, saya mau bertanya.'),
  },
  {
    label: 'Email',
    value: 'teman.wedding.persiapan@gmail.com',
    href: 'mailto:teman.wedding.persiapan@gmail.com',
  },
]

/* ------------------------------------------------------------------ */
/* Navigasi (href harus cocok dengan id section)                       */
/* ------------------------------------------------------------------ */
export const navLinks = [
  { label: 'Isi file', href: '#isi' },
  { label: 'Berkas nikah', href: '#berkas' },
  { label: 'Bonus file', href: '#bonus' },
  { label: 'Harga', href: '#harga' },
  { label: 'FAQ', href: '#faq' },
]

/* ------------------------------------------------------------------ */
/* Contoh data di hero (diambil dari data contoh di dalam template)     */
/* ------------------------------------------------------------------ */
export const sample = {
  couple: ['Raka', 'Nadia'],
  date: '18 September 2027',
  city: 'Bandung',
  countdown: 303,
  rows: [
    { label: 'Linimasa', value: '1 dari 2 kegiatan selesai' },
    { label: 'Anggaran terpakai', value: '17%' },
    { label: 'Undangan terkirim', value: '1 dari 2' },
  ],
}

/* ------------------------------------------------------------------ */
/* File pendamping (dibundel di dalam paket)                           */
/* ------------------------------------------------------------------ */
export const companions = {
  lamaran: {
    name: 'Teman Lamaran',
    tagline: 'Planner persiapan lamaran',
    description:
      'Sebelum hari H pernikahan, ada hari lamaran. Info acara, anggaran, dan daftar tugasnya tercatat rapi, dan prioritas tiap tugas dihitung otomatis dari tenggatnya.',
    sheets: [
      { name: 'Info Lamaran', note: 'Waktu, tempat, dan rangkaian acara' },
      { name: 'Anggaran Lamaran', note: 'Anggaran dan pengeluaran acara' },
      { name: 'Task List Lamaran', note: 'Tugas, prioritas dihitung dari tenggat' },
    ],
  },
  deeptalk: {
    name: 'Deep Talk Couples',
    tagline: '100 pertanyaan sebelum menikah',
    description:
      'Dijawab sendiri-sendiri, dibahas berdua. Jawaban baru terbuka setelah kalian berdua menjawab pertanyaan yang sama.',
    topics: 17,
    questions: 100,
    samples: [
      {
        category: 'Masa Depan',
        question: 'Seperti apa gambaran rumah tangga ideal menurutmu lima tahun setelah menikah?',
      },
      {
        category: 'Keuangan',
        question: 'Berapa persen penghasilan yang ingin kita tabung atau investasikan setiap bulan?',
      },
      {
        category: 'Komunikasi',
        question: 'Bagaimana aku bisa tahu bahwa kamu sedang tidak baik-baik saja?',
      },
    ],
  },
}

/* ------------------------------------------------------------------ */
/* Daftar isi planner pernikahan                                       */
/* essensial / complete: true, false, atau teks pendek.                */
/* ------------------------------------------------------------------ */
export const sheets = [
  {
    name: 'Dashboard',
    description:
      'Ringkasan otomatis: hitung mundur, linimasa, anggaran, dan tamu. Complete menambah grafik dan pengingat.',
    essensial: 'Ringkas',
    complete: 'Lengkap',
  },
  {
    name: 'Master Data',
    description:
      'Isi nama, tanggal, dan kota sekali; semua sheet ikut terisi.',
    essensial: true,
    complete: true,
  },
  {
    name: 'Vendor Comparison',
    description:
      'Bandingkan harga dan paket beberapa vendor sebelum memesan.',
    essensial: true,
    complete: true,
  },
  {
    name: 'Daftar Vendor',
    description:
      'Kontak, estimasi biaya, DP, termin, dan pelunasan vendor.',
    essensial: true,
    complete: true,
  },
  {
    name: 'Rencana Anggaran',
    description:
      'Batas anggaran, realisasi, dan jatuh tempo tiap kategori.',
    essensial: true,
    complete: true,
  },
  {
    name: 'Daftar Seserahan',
    description:
      'Estimasi, harga aktual, dan link toko tiap barang.',
    essensial: true,
    complete: true,
  },
  {
    name: 'Tabungan',
    description:
      'Catat setoran; target nabung per bulan dihitung otomatis.',
    essensial: false,
    complete: true,
  },
  {
    name: 'Linimasa Pernikahan',
    description:
      'Kegiatan, penanggung jawab, dan tenggat dengan prioritas otomatis.',
    essensial: true,
    complete: true,
  },
  {
    name: 'Alur Pendaftaran',
    description: 'Peta berkas nikah, dari RT/RW sampai KUA.',
    essensial: false,
    complete: true,
  },
  {
    name: 'Daftar Tamu',
    description:
      'Tamu per pihak, jenis undangan, dan status pengiriman.',
    essensial: true,
    complete: true,
  },
  {
    name: 'List Lagu',
    description:
      '50 referensi lagu pernikahan per momen acara.',
    essensial: true,
    complete: true,
  },
]

/** Baris file pendamping di tabel daftar isi (keduanya khusus Complete). */
export const companionRows = [
  {
    name: companions.lamaran.name,
    description: companions.lamaran.tagline,
    essensial: false,
    complete: true,
  },
  {
    name: companions.deeptalk.name,
    description: companions.deeptalk.tagline,
    essensial: false,
    complete: true,
  },
]

/* ------------------------------------------------------------------ */
/* Sorotan Complete: Alur Pendaftaran (sengaja hanya teaser)            */
/* ------------------------------------------------------------------ */
export const registration = {
  total: 28,
  stages: ['Dokumen pribadi', 'RT / RW', 'Puskesmas', 'Kelurahan / Desa', 'Kecamatan', 'KUA'],
}

/* ------------------------------------------------------------------ */
/* Cara pakai (dari README template)                                   */
/* ------------------------------------------------------------------ */
export const steps = [
  {
    title: 'Buat salinan pribadi',
    description:
      'Buka link yang Anda terima setelah pembelian, lalu klik File → Make a copy. File asli bersifat view only; semua pengisian dilakukan di salinan Anda.',
  },
  {
    title: 'Isi Master Data',
    description:
      'Nama CPP dan CPW, tanggal menikah, dan kota. Judul di setiap sheet ikut berubah, dan kategori di sini menjadi pilihan dropdown di sheet lain.',
  },
  {
    title: 'Isi sel krem, biarkan sel hijau',
    description:
      'Sel krem diisi oleh Anda. Sel hijau berisi rumus dan terkunci. Dashboard menyusun ringkasannya sendiri.',
  },
]

/* ------------------------------------------------------------------ */
/* Paket                                                               */
/* checkoutUrl: isi link toko (Lynk.id, Shopee, dll). Kosong = WhatsApp. */
/* ------------------------------------------------------------------ */
export const plans = [
  {
    id: 'essensial',
    name: 'Essensial Wedding Planner',
    shortName: 'Essensial',
    price: 59000,
    promoPrice: 39000,
    summary: 'Catatan inti persiapan nikah: anggaran, vendor, seserahan, tamu, dan linimasa.',
    features: [
      'Dashboard ringkas: hitung mundur, progres linimasa, anggaran, total tamu',
      'Master Data, Vendor Comparison, dan Daftar Vendor',
      'Rencana Anggaran dan Daftar Seserahan',
      'Linimasa Pernikahan, Daftar Tamu, dan List Lagu',
    ],
    bundled: [],
    checkoutUrl: '',
  },
  {
    id: 'complete',
    name: 'Complete Wedding Planner',
    shortName: 'Complete',
    price: 139000,
    promoPrice: 74000,
    badge: 'Paling lengkap',
    summary: 'Seluruh isi Essensial, ditambah tabungan, berkas nikah, Teman Lamaran, dan Deep Talk.',
    features: [
      'Dashboard lengkap: 6 angka ringkasan, 8 grafik, pengingat tenggat',
      'Tabungan dengan target nabung per bulan otomatis',
      'Alur Pendaftaran berkas nikah, RT/RW sampai KUA',
      'Semua isi planner Essensial',
    ],
    bundled: [companions.lamaran.name, companions.deeptalk.name],
    checkoutUrl: '',
  },
]

/** Pesan WhatsApp untuk memesan sebuah paket (sesuai paket yang dipilih). */
export const orderMessage = (plan) =>
  `Halo Teman Wedding, saya mau pesan ${plan.name} (${formatRupiah(currentPrice(plan))}).`

/** Link pemesanan sebuah paket (checkout bila ada, selain itu WhatsApp). */
export const orderLink = (plan) => plan.checkoutUrl || whatsapp(orderMessage(plan))

/** Nilai tambah Complete dibanding Essensial (dipakai pop-up upgrade). */
export const upgradePerks = [
  'Tabungan dengan target nabung per bulan otomatis',
  `Alur Pendaftaran: ${registration.total} berkas nikah, RT/RW sampai KUA`,
  'Dashboard lengkap: 8 grafik dan pengingat tenggat',
  'Bonus Teman Lamaran dan Deep Talk Couples',
]

export const included = [
  'Google Sheets',
  'Data contoh di tiap sheet',
  'Dropdown & kalender pop-up',
  'Sel rumus terkunci',
  'Lisensi untuk satu pasangan',
]

/* ------------------------------------------------------------------ */
/* FAQ (jawaban diambil dari README & lisensi template)                 */
/* ------------------------------------------------------------------ */
export const getFaq = () => {
  const [essensial, complete] = plans
  const items = [
    {
      question: 'Apa bedanya Essensial dan Complete?',
      answer: `${essensial.name} berisi planner pernikahan dengan dashboard ringkas dan 8 sheet kerja, tanpa file bonus. ${complete.name} berisi semuanya, ditambah sheet Tabungan, Alur Pendaftaran berkas nikah, dashboard lengkap dengan grafik dan pengingat tenggat, serta Deep Talk Couples.`,
    },
    {
      question: 'Apa itu Teman Lamaran dan Deep Talk Couples?',
      answer:
        'Keduanya bonus khusus paket Complete. Teman Lamaran adalah planner untuk acara lamaran: info acara, anggaran, dan daftar tugas. Deep Talk Couples berisi 100 pertanyaan sebelum menikah dalam 17 topik, dijawab terpisah oleh masing-masing calon, lalu dibahas berdua.',
    },
  ]

  if (isPromoActive()) {
    const end = promoEndLabel()
    items.push({
      question: 'Sampai kapan harga promo berlaku?',
      answer: `${end ? `Harga promo launching berlaku sampai ${end}.` : 'Harga promo launching berlaku untuk waktu terbatas.'} Setelah itu harga kembali normal: ${essensial.shortName} ${formatRupiah(essensial.price)} dan ${complete.shortName} ${formatRupiah(complete.price)}.`,
    })
  }

  return items.concat([
    {
      question: 'Bagaimana saya menerima file-nya?',
      answer:
        'Setelah pembelian, Anda menerima link ke file Google Sheets yang bersifat view only. Buat salinan pribadi lewat File → Make a copy, lalu isi data di salinan tersebut.',
    },
    {
      question: 'Apakah bisa dibuka di Microsoft Excel?',
      answer:
        'Template ini dirancang khusus untuk Google Sheets. Di Excel, beberapa fitur tidak berjalan dengan baik, antara lain kalender pop-up pada kolom tanggal, grafik mini di Dashboard, proteksi sel rumus, dan sebagian format tampilan.',
    },
    {
      question: 'Bisa diisi lewat HP?',
      answer:
        'Untuk mengisi data, gunakan laptop, PC, atau tablet agar tabel, dropdown, dan kalender nyaman dipakai. Aplikasi Google Sheets di HP tetap bisa dipakai untuk memantau progres.',
    },
    {
      question: 'Boleh dibagikan ke pasangan, keluarga, atau WO?',
      answer:
        'Boleh. Anda bisa membagikan akses salinan Anda kepada pasangan, keluarga, atau wedding organizer yang membantu persiapan. Lisensi berlaku untuk satu pasangan, jadi template tidak boleh dijual kembali atau dibagikan ulang sebagai template.',
    },
    {
      question: 'Apakah sudah ada contoh pengisian?',
      answer:
        'Ya. Setiap sheet berisi beberapa baris data contoh agar cara pengisiannya mudah dipahami. Timpa dengan data Anda, atau hapus bila tidak diperlukan.',
    },
  ])
}

/* ------------------------------------------------------------------ */
/* SEO (dipakai vite.config.js saat build)                             */
/* ------------------------------------------------------------------ */
export const seo = {
  // ±50–60 karakter: kata kunci utama di depan, merek di belakang.
  title: 'Template Wedding Planner Google Sheets | Teman Wedding',
  // ±140–160 karakter: apa, untuk siapa, isi utama, harga.
  description: () =>
    `Template wedding planner di Google Sheets: anggaran, vendor, seserahan, tamu, linimasa, berkas nikah KUA, plus bonus planner lamaran dan deep talk. Mulai ${formatRupiah(Math.min(...plans.map(currentPrice)))}.`,
  ogImage: 'og-image.png',
  ogImageAlt: 'Teman Wedding, template wedding planner di Google Sheets',
}
