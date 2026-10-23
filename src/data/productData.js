/**
 * SATU-SATUNYA FILE YANG PERLU ANDA EDIT UNTUK MENGISI KONTEN.
 *
 * Semua teks dalam tanda kurung siku, mis. "[NAMA PRODUK]", adalah PLACEHOLDER.
 * Ganti dengan konten asli Anda. Komponen di folder `components/` tidak perlu diubah.
 *
 * Link tujuan (CTA / sosial media) baru dianggap aktif jika diawali
 * "https://", "http://", "mailto:", "tel:", atau "#". Selama masih berupa
 * placeholder, tombol tidak akan membuka URL apa pun dan menampilkan
 * pemberitahuan "link belum dikonfigurasi".
 */
import {
  Box,
  Layers,
  Puzzle,
  Settings2,
  Sparkles,
  Star,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/* Identitas produk                                                    */
/* ------------------------------------------------------------------ */
export const product = {
  name: '[NAMA PRODUK]',
  category: '[KATEGORI PRODUK]', // teks kecil (eyebrow) di Hero
  tagline: '[TAGLINE PRODUK]', // headline utama di Hero
  shortDescription: '[DESKRIPSI SINGKAT PRODUK]', // paragraf di Hero & Footer
  description:
    '[DESKRIPSI PRODUK: jelaskan apa produk ini dan untuk apa produk ini digunakan.]',
  // Opsional: isi dengan path gambar (mis. import dari src/assets) untuk mengganti
  // mockup bawaan di Hero. Biarkan null untuk memakai mockup netral.
  heroImage: null,
  heroImageAlt: '[DESKRIPSI GAMBAR PRODUK]',
}

/* ------------------------------------------------------------------ */
/* Navigasi (href harus cocok dengan id section di App.jsx)            */
/* ------------------------------------------------------------------ */
export const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Paket', href: '#paket' },
  { label: 'Add-on', href: '#addon' },
  { label: 'FAQ', href: '#faq' },
]

/* ------------------------------------------------------------------ */
/* Link tujuan CTA                                                     */
/* ------------------------------------------------------------------ */
export const ctaLinks = {
  basic: '[LINK PEMESANAN BASIC]',
  premium: '[LINK PEMESANAN PREMIUM]',
  addon: '[LINK PEMESANAN ADD-ON]',
}

/* ------------------------------------------------------------------ */
/* Product Overview                                                    */
/* ------------------------------------------------------------------ */
export const overview = {
  heading: `Mengenal ${product.name}`,
  benefits: [
    {
      title: '[MANFAAT 1]',
      description: '[DESKRIPSI MANFAAT 1]',
      icon: Sparkles,
    },
    {
      title: '[MANFAAT 2]',
      description: '[DESKRIPSI MANFAAT 2]',
      icon: Layers,
    },
    {
      title: '[MANFAAT 3]',
      description: '[DESKRIPSI MANFAAT 3]',
      icon: Star,
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Fitur                                                               */
/* Tambah / hapus item sesuka Anda; grid menyesuaikan otomatis.        */
/* ------------------------------------------------------------------ */
export const features = [
  { title: '[FITUR 1]', description: '[DESKRIPSI FITUR 1]', icon: Box },
  { title: '[FITUR 2]', description: '[DESKRIPSI FITUR 2]', icon: Layers },
  { title: '[FITUR 3]', description: '[DESKRIPSI FITUR 3]', icon: Puzzle },
  { title: '[FITUR 4]', description: '[DESKRIPSI FITUR 4]', icon: Sparkles },
  { title: '[FITUR 5]', description: '[DESKRIPSI FITUR 5]', icon: Settings2 },
  { title: '[FITUR 6]', description: '[DESKRIPSI FITUR 6]', icon: Star },
]

/* ------------------------------------------------------------------ */
/* Paket & Add-on                                                      */
/*                                                                     */
/* - type: 'main' (paket utama) atau 'addon' (opsional).               */
/* - highlight: true memberi penekanan visual (tanpa klaim apa pun).   */
/* - badge: teks label kecil di kartu; kosongkan ('') jika tidak perlu.*/
/* - id 'addon' dipakai sebagai target anchor navbar "Add-on".         */
/* ------------------------------------------------------------------ */
export const pricing = {
  heading: 'Pilih paket yang sesuai kebutuhan Anda',
  description:
    'Bandingkan paket Basic dan Premium, lalu tambahkan Add-on bila diperlukan.',
  // Aturan pembelian Add-on belum ditentukan; isi catatan ini jika sudah ada.
  note: '[CATATAN HARGA / ATURAN PEMBELIAN ADD-ON]',
  plans: [
    {
      id: 'basic',
      type: 'main',
      name: 'Basic',
      description: '[DESKRIPSI PAKET BASIC]',
      price: '[HARGA BASIC]',
      priceNote: '', // mis. "per bulan" / "sekali bayar" (isi jika sudah pasti)
      badge: '',
      highlight: false,
      features: [
        '[FITUR BASIC 1]',
        '[FITUR BASIC 2]',
        '[FITUR BASIC 3]',
        '[FITUR BASIC 4]',
      ],
      cta: { label: 'Pilih Basic', href: ctaLinks.basic },
    },
    {
      id: 'premium',
      type: 'main',
      name: 'Premium',
      description: '[DESKRIPSI PAKET PREMIUM]',
      price: '[HARGA PREMIUM]',
      priceNote: '',
      badge: 'Lebih lengkap',
      highlight: true,
      features: [
        '[FITUR PREMIUM 1]',
        '[FITUR PREMIUM 2]',
        '[FITUR PREMIUM 3]',
        '[FITUR PREMIUM 4]',
        '[FITUR PREMIUM 5]',
      ],
      cta: { label: 'Pilih Premium', href: ctaLinks.premium },
    },
    {
      id: 'addon',
      type: 'addon',
      name: 'Add-on',
      description: '[DESKRIPSI ADD-ON]',
      price: '[HARGA ADD-ON]',
      priceNote: '',
      badge: 'Opsional',
      highlight: false,
      features: ['[ADD-ON 1]', '[ADD-ON 2]', '[ADD-ON 3]'],
      cta: { label: 'Lihat Add-on', href: ctaLinks.addon },
    },
  ],
}

/* ------------------------------------------------------------------ */
/* Cara kerja (tepat 3 langkah dianjurkan untuk tampilan terbaik)      */
/* ------------------------------------------------------------------ */
export const howItWorks = {
  heading: 'Cara memulai',
  description: '[DESKRIPSI SINGKAT ALUR PEMESANAN]',
  steps: [
    {
      title: 'Pilih Paket',
      description: '[DESKRIPSI LANGKAH PERTAMA]',
    },
    {
      title: '[LANGKAH KEDUA]',
      description: '[DESKRIPSI LANGKAH KEDUA]',
    },
    {
      title: '[LANGKAH KETIGA]',
      description: '[DESKRIPSI LANGKAH KETIGA]',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */
export const faq = {
  heading: 'Pertanyaan yang sering diajukan',
  items: [
    {
      question: 'Apa perbedaan Basic dan Premium?',
      answer: '[JAWABAN: jelaskan perbedaan paket Basic dan Premium.]',
    },
    {
      question: 'Apa itu Add-on?',
      answer:
        '[JAWABAN: jelaskan apa itu Add-on dan aturan pembeliannya, mis. apakah dibeli terpisah atau bersama paket utama.]',
    },
    {
      question: 'Bagaimana cara melakukan pemesanan?',
      answer: '[JAWABAN: jelaskan langkah pemesanan.]',
    },
    {
      question: 'Bagaimana produk akan diterima setelah pembelian?',
      answer: '[JAWABAN: jelaskan proses penerimaan produk setelah pembelian.]',
    },
  ],
}

/* ------------------------------------------------------------------ */
/* CTA penutup                                                         */
/* ------------------------------------------------------------------ */
export const finalCta = {
  heading: 'Siap memilih paket yang tepat?',
  description:
    'Lihat perbandingan paket dan Add-on, lalu pilih yang paling sesuai untuk Anda.',
}

/* ------------------------------------------------------------------ */
/* Sosial media (hanya yang berisi URL valid yang dibuat bisa diklik)  */
/* Hapus item yang tidak dipakai, atau tambah platform lain.           */
/* ------------------------------------------------------------------ */
export const socials = [
  { label: 'Instagram', href: '[LINK INSTAGRAM]' },
  { label: 'WhatsApp', href: '[LINK WHATSAPP]' },
  { label: 'Email', href: '[ALAMAT EMAIL]' },
]
