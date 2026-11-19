# Teman Wedding — Landing Page

Landing page satu halaman untuk **Teman Wedding**, template wedding planner di Google Sheets (#TemanDalamSetiapPersiapan), dengan dua paket:

| Paket | Isi | Normal | Promo launching |
| --- | --- | --- | --- |
| Essensial Wedding Planner | Planner (Lite) + Teman Lamaran | Rp59.000 | Rp39.000 |
| Complete Wedding Planner | Planner (Premium) + Teman Lamaran + Deep Talk Couples | Rp139.000 | Rp74.000 |

Essensial bisa ditambah Deep Talk Couples seharga Rp15.000.
Dibangun dengan React, Vite, dan Tailwind CSS v3, siap di-deploy sebagai situs statis di GitHub Pages.

Isi fitur diambil dari file `Teman Wedding Lite.xlsx`, `Teman Wedding Premium.xlsx`, `Teman Lamaran.xlsx`, dan `Deeptalk Couples.xlsx` (versi 1.0).

## Arah desain

"Stationery editorial": halaman terasa seperti satu set undangan cetak di atas meja kraft (amplop sage, kartu krem, label kapital berjarak lebar), dipadukan tipografi editorial (headline serif besar dengan satu kata miring, garis tipis, tombol bersudut tegas). Palet warna diambil langsung dari template Google Sheets, sehingga website dan produk terasa satu identitas.

## Teknologi

- React 19 (JSX) + Vite 8
- Tailwind CSS 3.4 (via PostCSS)
- Lucide React untuk beberapa ikon kecil
- Font self-hosted lewat `@fontsource-variable/newsreader` (serif) dan `@fontsource-variable/jost` (sans), tanpa request ke Google Fonts
- Tanpa backend, database, atau layanan berbayar

## Prasyarat

- Node.js 20.19+ atau 22+ (diuji dengan Node 26)
- npm

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka alamat yang ditampilkan di terminal (biasanya `http://localhost:5173`).

## Build produksi

```bash
npm run build     # hasil di folder dist/
npm run preview   # opsional: pratinjau hasil build
```

## Mengisi konten

**Semua konten ada di [`src/data/productData.js`](src/data/productData.js)**, tanpa perlu mengubah komponen:

| Bagian | Variabel |
| --- | --- |
| Promo (saklar, label, tanggal akhir) | `promo` |
| Paket, harga normal & promo, isi, link checkout | `plans` |
| Nama, hashtag, kategori, intro | `product` |
| Kontak (Instagram, WhatsApp, Email) | `contact` |
| Teman Lamaran & Deep Talk Couples | `companions` |
| Daftar isi planner | `sheets`, `companionRows` |
| Teaser Alur Pendaftaran | `registration` |
| Langkah "Cara pakai" | `steps` |
| FAQ | `getFaq()` |
| Judul & deskripsi SEO | `seo` |

### Promo

```js
export const promo = {
  active: true,          // false = semua harga kembali normal
  label: 'Promo launching',
  endsAt: '2026-12-31',  // hari terakhir promo (WIB); null = tanpa batas tanggal
}
```

Promo launching saat ini berlaku **sampai 31 Desember 2026**. Selama promo aktif, situs menampilkan pita promo di atas navbar, harga normal dicoret, stempel "Promo launching", dan FAQ masa promo.

Setelah `endsAt` lewat, tampilan di browser otomatis kembali ke harga normal. HTML pre-render, meta description, dan JSON-LD dibuat saat build; karena itu workflow GitHub Pages **build ulang otomatis setiap hari pukul 00:05 WIB** (lihat `schedule` di `deploy.yml`), sehingga semuanya ikut kembali normal paling lambat beberapa menit setelah promo berakhir.

> Catatan GitHub: jadwal otomatis di repositori publik dinonaktifkan jika repositori tidak ada aktivitas selama 60 hari. Jika itu terjadi, aktifkan lagi dari tab **Actions**.

### Link pemesanan

Tombol pesan membuka WhatsApp dengan pesan terisi (nama paket + harga yang berlaku). Isi `checkoutUrl` pada paket di `plans` untuk memakai link toko (mis. Lynk.id, Shopee).

## SEO & pre-render

`npm run build` menjalankan tiga langkah: build client, build SSR ([`src/entry-server.jsx`](src/entry-server.jsx)), lalu [`scripts/prerender.mjs`](scripts/prerender.mjs) menyisipkan HTML halaman lengkap ke `dist/index.html`. Isi halaman sudah terbaca mesin pencari dan preview link tanpa menunggu JavaScript; di browser, React melanjutkan dengan `hydrateRoot`.

Meta dibuat otomatis saat build oleh `seoPlugin` di [`vite.config.js`](vite.config.js):

- `<title>` dan meta description dari `seo` di `productData.js`
- Open Graph & Twitter Card (preview saat link dibagikan di WhatsApp/Instagram/X), gambar [`public/og-image.png`](public/og-image.png) 1200×630
- JSON-LD: `Organization`, `Product` + `Offer` per paket (harga IDR), dan `FAQPage`
- `robots.txt`, serta `sitemap.xml` dan canonical bila `SITE_URL` diisi

`SITE_URL` diisi otomatis oleh workflow GitHub Pages. Jika memakai domain sendiri, ubah nilainya di [`deploy.yml`](.github/workflows/deploy.yml).

### Cara kerja link CTA

Link dianggap **aktif** hanya jika diawali `https://`, `http://`, `mailto:`, `tel:`, atau `#`.

- **Link valid**: tombol menjadi tautan yang membuka tujuan di tab baru.
- **Masih placeholder** (teks berformat `[...]`): tombol tidak menavigasi ke mana pun dan menampilkan pesan "Link pemesanan belum dikonfigurasi".

Contoh:

```js
// di dalam plans
{ id: 'essensial', /* ... */ checkoutUrl: 'https://contoh.com/checkout/essensial' }
```

## Deploy ke GitHub Pages

1. Buat repositori di GitHub dan push project ini ke branch `main`. Folder `product-landing-page` harus menjadi **root repositori**, karena workflow berada di `.github/workflows/deploy.yml`.

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/<NAMA-REPOSITORI>.git
   git push -u origin main
   ```

   Ganti `<USERNAME>` dan `<NAMA-REPOSITORI>` dengan milik Anda.

2. Di GitHub, buka **Settings → Pages → Build and deployment → Source**, lalu pilih **GitHub Actions**.

3. Setiap push ke `main` menjalankan workflow: `npm ci` → `npm run build` → deploy folder `dist`. Situs tersedia di `https://<USERNAME>.github.io/<NAMA-REPOSITORI>/`. Workflow juga bisa dijalankan manual lewat tab **Actions → Run workflow**.

### Di mana nama repositori diatur?

Anda **tidak perlu** mengetik nama repositori. Workflow mengisinya otomatis lewat variabel `VITE_BASE_PATH: /${{ github.event.repository.name }}/` (lihat [`deploy.yml`](.github/workflows/deploy.yml)), yang dibaca oleh [`vite.config.js`](vite.config.js).

| Situasi | Pengaturan |
| --- | --- |
| Repositori biasa (`<username>.github.io/<repo>/`) | Otomatis, tidak ada yang diubah |
| Repositori user site (`<username>.github.io`) | Di `deploy.yml`, ubah `VITE_BASE_PATH` menjadi `/` |
| Build manual untuk subpath | `VITE_BASE_PATH=/<NAMA-REPOSITORI>/ npm run build` (PowerShell: `$env:VITE_BASE_PATH='/<NAMA-REPOSITORI>/'; npm run build`) |
| Tanpa `VITE_BASE_PATH` (lokal) | Memakai `./` (path relatif) |

Jika Anda mengganti nama repositori, tidak ada yang perlu diubah di kode.

## Struktur project

```text
product-landing-page/
├── .github/workflows/deploy.yml   # deploy GitHub Pages
├── public/favicon.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx, Hero.jsx        # hero + komposisi flat-lay (amplop & kartu)
│   │   ├── Contents.jsx                # daftar isi file, kolom Lite/Premium
│   │   ├── Registration.jsx            # teaser Complete: 28 berkas nikah
│   │   ├── Companions.jsx              # Teman Lamaran & Deep Talk Couples
│   │   ├── Promo.jsx                   # pita promo, stempel, harga coret
│   │   ├── HowItWorks.jsx              # cara pakai + potongan sheet Master Data
│   │   ├── Pricing.jsx, FAQ.jsx
│   │   ├── FinalCTA.jsx, Footer.jsx    # penutup bergaya kartu undangan
│   │   ├── Envelope.jsx, CtaButton.jsx
│   ├── data/productData.js        # semua konten yang bisa diedit
│   ├── utils/links.js             # deteksi link placeholder vs link asli
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx                   # import font self-hosted
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## Warna & tipografi

Token ada di [`tailwind.config.js`](tailwind.config.js), diambil dari warna sel di template:

| Token | Hex | Asal di template |
| --- | --- | --- |
| `forest` | `#214E42` | Header sheet / sel hijau tua |
| `sage` | `#6B8F71` | Sel KPI hijau sedang |
| `mint` | `#E8F0EA` | Sel hijau muda (otomatis) |
| `paper` | `#FFFDF8` | Sel krem (diisi pengguna) |
| `ink` | `#20332C` | Warna teks |
| `muted` | `#52645B` | Teks petunjuk |
| `canvas` / `kraft` | `#F6F2EA` / `#E5DED0` | Latar halaman / latar "meja" |

Serif: Newsreader (headline, harga, angka). Sans: Jost (teks, label kapital berjarak lebar).
