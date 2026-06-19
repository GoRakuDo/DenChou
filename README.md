# DenChou・電帳

> **Baca dalam bahasa lain:** [English](README.en.md)

DenChou adalah Template Kartu Anki untuk belajar Immersion bahasa Jepang.

Awalnya merupakan Fork dari [Senren](https://github.com/BrenoAqua/Senren), tapi arahnya kami buat berbeda menjadi lebih tenang, ringan, dan mememprioritaskan kompatibilitas AnkiDroid, supaya tetap nyaman dipakai dalam sesi belajar yang lama. Tujuannya bukan membuat Anki terlihat ramai dan banyak fitur, tapi untuk membantu supaya kartu Anki lebih mudah dibaca.

## Fokus DenChou

- Tata letak yang lebih halus dan mengutamakan ponsel untuk AnkiDroid
- Urutan baca yang jelas antara kata, kalimat, gambar, audio, dan definisi
- Tema terang dan gelap yang tidak mencolok, tanpa permukaan hitam pekat atau putih murni dengan warna berbasis OKLCH
- Gen Interface JP sebagai tanpilan antarmuka bawaan, dengan fallback font Jepang yang umum
- Ikon Lucide SVG, tanpa memuat font ikon secara utuh
- Panel preferensi bawaan untuk mengubah pengaturan kartu
- Penimpilan UI Bawaan yang ringan, termasuk optimalisasi otomatis AnkiDroid untuk layar kecil

## Arah desain

DenChou seharusnya terasa seperti meja belajar yang tenang, bukan dasbor yang penuh sesak. Senren memberi fondasi yang kuat: kartu responsif, pengaturan lengkap, tampilan kamus, dukungan aksen nada, penanganan gambar, kontrol audio, dan kustomisasi saat belajar ulang. Dan kami membuat DenChou dengan mempertahankan fondasi-nya, lalu melembutkan permukaannya.

Kartu Anki seharusnya memandu fokus mata, bukan berebut perhatian.

### Warna dan tipografi

Gaya buatan DenChou menggunakan warna OKLCH. Desain baru kami sebaiknya menghindari hex mentah, RGB, nama warna CSS, dan nilai `black` / `white` yang menyilaukan.

Font antarmuka bawaan adalah Gen Interface JP. Kalau font ini belum tersedia secara lokal atau lewat CDN, DenChou akan fallback ke font Jepang umum dari sistem.

### Perilaku mobile-first

DenChou secara bawaan disetel untuk mengutamakan AnkiDroid. Layar kecil mendapat efek yang lebih ringan, kontrol yang lebih tenang, dan pekerjaan runtime (script) yang lebih sedikit.

## Cara memulai

DenChou masih dalam proses pembentukan ulang, jadi cara menginstall paling aman untuk sekarang adalah manual.

Pakai catatan yang ada di [`Template/`](Template/) dan ikuti alur pembaruan template di [`Template/README.md`](Template/README.md): ganti bagian Front Template, Back Template, dan Styling di Anki kalian.

Dokumen cara menginstall lama dari Senren ada di [`docs/setup_overview.md`](docs/setup_overview.md) diwariskan dari Senren dan mungkin masih tertulis sebagai Senren nama sebelumnya selagi fork ini masih dibersihkan.

---

## Status proyek

DenChou sedang aktif dalam pembentukan ulang dari Senren. Beberapa dokumentasi dan peengaturan masih diwariskan dari Senren mungkin masih tertulis sebagai Senren selagi fork ini dibersihkan. Kalau ragu, berkas template DenChou dan [`Template/DESIGN.md`](Template/DESIGN.md) adalah sumber dari Design untuk fork ini.

## Kredit dan lisensi

DenChou bisa ada karena Senren sudah banyak melakukan kerja keras.

Proyek asli: [Senren・洗練](https://github.com/BrenoAqua/Senren) | Lisensi: GPLv3. Lihat [`LICENSE`](LICENSE).