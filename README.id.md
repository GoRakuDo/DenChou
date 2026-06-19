# DenChou・電帳

DenChou adalah jenis catatan Anki untuk belajar bahasa Jepang.

Fork ini bercabang dari [Senren](https://github.com/BrenoAqua/Senren), tapi arahnya dibuat berbeda: kartu tinjauan yang tenang, ringan, dan mengutamakan AnkiDroid, supaya tetap nyaman dipakai dalam sesi belajar yang lama.

Tujuannya bukan membuat Anki terlihat ramai.
Tujuannya supaya kartu berikutnya lebih mudah dibaca.

## Fokus DenChou

- Tata letak yang lembut dan mengutamakan ponsel untuk AnkiDroid
- Urutan baca yang jelas antara kata, kalimat, gambar, audio, dan definisi
- Tema terang dan gelap yang lembut, tanpa permukaan hitam pekat atau putih murni
- Warna berbasis OKLCH supaya kontras dan penyetelan lebih bisa diprediksi
- Gen Interface JP sebagai fonta antarmuka bawaan, dengan fallback fonta Jepang yang umum
- Ikon SVG Lucide sebaris, tanpa memuat fonta ikon utuh
- Panel preferensi bawaan untuk mengubah perilaku kartu saat belajar ulang
- Bawaan yang ringan, termasuk optimalisasi otomatis AnkiDroid untuk layar sempit

## Arah desain

DenChou seharusnya terasa seperti meja belajar yang tenang, bukan dasbor yang penuh sesak.

Senren memberi fondasi yang kuat: kartu responsif, pengaturan lengkap, tampilan kamus, dukungan aksen nada, penanganan gambar, kontrol audio, dan kustomisasi saat belajar ulang.
DenChou mempertahankan fondasi itu, lalu melembutkan permukaannya.

Kartu seharusnya memandu mata, bukan berebut perhatian.

## Warna dan tipografi

Gaya buatan DenChou menggunakan warna OKLCH.
Pekerjaan desain baru sebaiknya menghindari hex mentah, RGB, nama warna CSS, dan nilai `black` / `white` yang menyilaukan.

Font antarmuka bawaan adalah Gen Interface JP.
Kalau fonta ini belum tersedia secara lokal atau lewat CDN, DenChou akan fallback ke fonta Jepang umum dari sistem.

## Perilaku mobile-first

DenChou disetel untuk AnkiDroid.

Layar kecil mendapat efek yang lebih ringan, kontrol yang lebih tenang, dan pekerjaan runtime yang lebih sedikit kalau memungkinkan.
Tata letak desktop boleh lebih lebar, tapi tidak boleh menjadi produk yang berbeda.

## Cara memulai

DenChou masih dalam proses pembentukan ulang, jadi jalur pemasangan paling aman untuk sekarang adalah manual.

Pakai berkas di [`Template/`](Template/) dan ikuti alur pembaruan templat di [`Template/README.md`](Template/README.md): ganti bagian Front Template, Back Template, dan Styling di Anki.

Dokumen pemasangan lama di [`docs/setup_overview.md`](docs/setup_overview.md) diwariskan dari Senren dan mungkin masih menyebut nama hulu selagi fork ini dibersihkan.

## Status proyek

DenChou sedang aktif dibentuk ulang dari Senren.

Beberapa dokumentasi dan perilaku yang diwariskan mungkin masih menyebut Senren selagi fork ini dibersihkan.
Kalau ragu, berkas templat DenChou dan [`Template/DESIGN.md`](Template/DESIGN.md) adalah sumber kebenaran untuk fork ini.

## Kredit dan lisensi

DenChou bisa ada karena Senren sudah banyak melakukan kerja keras.

Proyek asli: [Senren・洗練](https://github.com/BrenoAqua/Senren)

Lisensi: GPLv3. Lihat [`LICENSE`](LICENSE).