# Product Landing Page

Landing page satu halaman untuk produk digital dengan tiga pilihan pembelian: **Basic**, **Premium**, dan **Add-on**.
Dibangun dengan React, Vite, dan Tailwind CSS v3, siap di-deploy sebagai situs statis di GitHub Pages.

Semua konten masih berupa **placeholder** dalam tanda kurung siku, mis. `[NAMA PRODUK]`, `[HARGA BASIC]`. Tidak ada fitur, harga, testimoni, atau klaim bisnis yang dikarang.

## Teknologi

- React 19 (JSX) + Vite 8
- Tailwind CSS 3.4 (via PostCSS)
- Lucide React untuk ikon
- Hanya font sistem, tanpa request ke jaringan eksternal
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
| Nama, kategori, tagline, deskripsi, gambar Hero | `product` |
| Menu navigasi | `navLinks` |
| Link pemesanan | `ctaLinks` |
| 3 kartu manfaat | `overview` |
| Kartu fitur | `features` |
| Paket Basic, Premium, Add-on (nama, harga, fitur, CTA) | `pricing.plans` |
| Aturan pembelian Add-on / catatan harga | `pricing.note` |
| Langkah "Cara memulai" | `howItWorks` |
| FAQ | `faq` |
| CTA penutup | `finalCta` |
| Sosial media | `socials` |

Hal lain yang perlu diganti manual:

- `<title>` dan `<meta name="description">` di [`index.html`](index.html)
- Logo: ikon daun di [`Navbar.jsx`](src/components/Navbar.jsx) dan [`Footer.jsx`](src/components/Footer.jsx), serta [`public/favicon.svg`](public/favicon.svg)
- Gambar produk di Hero: letakkan file di `src/assets/`, lalu isi `product.heroImage` (mis. `import img from '../assets/produk.webp'`). Jika `null`, mockup netral dipakai.

### Cara kerja link CTA

Link dianggap **aktif** hanya jika diawali `https://`, `http://`, `mailto:`, `tel:`, atau `#`.

- **Link valid**: tombol menjadi tautan yang membuka tujuan di tab baru.
- **Masih placeholder** (mis. `[LINK PEMESANAN BASIC]`): tombol tidak menavigasi ke mana pun dan menampilkan pesan "Link pemesanan belum dikonfigurasi". Item sosial media yang belum diisi tampil dengan garis putus-putus dan tidak bisa diklik.

Contoh:

```js
export const ctaLinks = {
  basic: 'https://wa.me/62XXXXXXXXXX?text=Saya%20pilih%20Basic',
  premium: 'https://contoh.com/pesan/premium',
  addon: '#addon',
}
```

Aturan pembelian Add-on (dibeli terpisah atau bersama paket) sengaja belum ditentukan. Isi `pricing.note` dan jawaban FAQ setelah aturannya jelas.

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
│   ├── assets/                    # gambar produk (opsional)
│   ├── components/                # Navbar, Hero, ProductOverview, Features, Pricing,
│   │                              # HowItWorks, FAQ, FinalCTA, Footer, + SectionHeader, CtaButton
│   ├── data/productData.js        # semua konten yang bisa diedit
│   ├── utils/links.js             # deteksi link placeholder vs link asli
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

## Warna

Palet hijau ada di [`tailwind.config.js`](tailwind.config.js) (`brand`, `brand-dark`, `brand-soft`, `brand-pale`, `canvas`, `ink`, `muted`). Ubah di sana dan seluruh situs ikut berubah. Warna teks sekunder (`muted`) sengaja sedikit lebih gelap dari saran awal agar kontras teks kecil memenuhi WCAG AA.
