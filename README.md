# SaiBumi Explore - Lampung Tourism Platform

SaiBumi Explore adalah platform pariwisata terintegrasi untuk Provinsi Lampung. Platform ini terdiri dari tiga komponen utama:
1. **backend-api**: Layanan RESTful API berkinerja tinggi.
2. **frontend-cms**: Website Dashboard CMS untuk Admin mengelola konten pariwisata.
3. **frontend-user**: Aplikasi Android Mobile bagi wisatawan untuk menjelajahi destinasi wisata Lampung.

---

## 📂 Struktur & Fitur Utama Komponen

### 1. NestJS Backend API (`backend-api`)
Layanan API tangguh yang dibangun menggunakan **NestJS**, **TypeScript**, **Prisma ORM**, dan database **PostgreSQL**.
* **Autentikasi & Otorisasi**: Login dan registrasi yang aman dengan enkripsi password menggunakan `bcrypt` serta otorisasi berbasis token JWT (`passport-jwt`).
* **Manajemen Pengguna (User)**: Endpoint untuk mendapatkan profil (`GET /auth/profile`), memperbarui profil (`PATCH /auth/profile`), serta manajemen status keaktifan user.
* **Kategori Wisata**: RESTful API CRUD untuk mengelola kategori destinasi wisata pariwisata Lampung.
* **Destinasi Wisata**: RESTful API CRUD lengkap untuk destinasi pariwisata (berisi koordinat peta, fasilitas, harga tiket, jam operasional, ulasan, rata-rata rating, dan galeri foto).
* **Ulasan (Reviews) Wisata**: Fitur pengiriman ulasan pariwisata baru yang secara otomatis menghitung ulang rata-rata rating bintang (`rating`) dan jumlah ulasan (`reviewsCount`) di destinasi terkait.
* **Destinasi Favorit**: Fitur toggle favorit (`POST /favorite/toggle/:id`) dan sinkronisasi daftar favorit pengguna (`GET /favorite`) secara aman.
* **Database Migration & Seeder**: Menggunakan Prisma untuk sinkronisasi skema ke database PostgreSQL secara instan dan pengisian data demo pariwisata Lampung awal.

### 2. Next.js Web CMS (`frontend-cms`)
Dashboard CMS premium untuk Admin yang dibangun menggunakan **Next.js (App Router)**, **TypeScript**, dan **Tailwind CSS**.
* **Dashboard Statistik**: Menampilkan metrik utama seperti total destinasi, kategori, pengguna terdaftar, ulasan masuk, grafik kunjungan bulanan, serta daftar destinasi terpopuler.
* **Kelola Destinasi & Kategori**: Halaman CRUD interaktif untuk memanipulasi kategori dan destinasi pariwisata (termasuk upload gambar, entri fasilitas, koordinat peta).
* **Moderasi Ulasan**: Memantau ulasan wisatawan secara real-time dan menghapus ulasan yang tidak layak.
* **Manajemen Pengguna**: Dashboard kontrol untuk melihat daftar wisatawan terdaftar dan menonaktifkan/mengaktifkan status akun mereka.
* **Manajemen Profil**: Halaman edit informasi profil admin.
* **Offline Mode Fallback**: Jika backend API offline, CMS secara otomatis beralih menggunakan `localStorage` agar fungsionalitas pengeditan data tetap dapat diakses sementara.

### 3. Expo Android User Mobile (`frontend-user`)
Aplikasi mobile pariwisata khusus platform **Android** yang dibangun menggunakan **React Native Expo (SDK 56)**, **TypeScript**, **Expo Router**, **NativeWind (Tailwind CSS)**, dan **Lucide Icons**.
* **Splash Screen Animasi**: Dilengkapi logo kompas elegan, tagline pariwisata, dan indikator loading dinamis.
* **Onboarding Slide**: Layar edukasi awal mengenai keindahan destinasi wisata alam Lampung dengan navigasi lanjut dan lewati.
* **Secure Authentication**: Halaman masuk (Login) dan daftar (Register) terintegrasi API lengkap dengan validasi form (format email, panjang password, konfirmasi kecocokan kata sandi).
* **Beranda (Home)**: Banner promo auto-slide carousel, filter grid kategori wisata cepat, daftar destinasi populer (horizontal), dan rekomendasi destinasi pilihan (vertikal).
* **Jelajah (Explore)**: Fitur pencarian instan destinasi (by name/address) dikombinasikan dengan filter chip kategori horizontal.
* **Favorit (Favorites)**: Sinkronisasi real-time destinasi favorit pengguna dengan tombol hapus cepat dan halaman detail.
* **Detail Destinasi**: Galeri foto carousel, informasi harga tiket, jam operasional, status buka/tutup, deskripsi lengkap, grid fasilitas, integrasi peta arah Google Maps, dan daftar ulasan pengunjung.
* **Tulis Ulasan (Reviews)**: Form pengiriman ulasan langsung dari detail destinasi dengan penentu bintang rating (1-5) dan kolom komentar.
* **Edit Profil & Tentang Aplikasi**: Halaman edit nama lengkap, email, nomor telepon, serta halaman informasi visi misi platform.

---

## 🚀 Panduan Menjalankan Proyek secara Lokal

Ikuti langkah-langkah di bawah ini secara berurutan untuk menjalankan seluruh ekosistem aplikasi:

### Langkah 1: Jalankan Backend API
1. Pastikan PostgreSQL Server Anda telah berjalan di komputer lokal (default port `5432`).
2. Masuk ke folder backend:
   ```bash
   cd backend-api
   ```
3. Buat berkas `.env` dari `.env.example` dan sesuaikan kredensial koneksi database PostgreSQL Anda pada variabel `DATABASE_URL`. Contoh:
   ```env
   DATABASE_URL="postgresql://postgres:balam5656@localhost:5432/saibumi_explore?schema=public"
   JWT_SECRET="saibumi_explore_secret_key_12345"
   JWT_EXPIRATION="24h"
   PORT=3001
   ```
4. Jalankan migrasi database dan seeding data awal:
   ```bash
   npx prisma db push
   npx prisma db seed
   ```
5. Jalankan server backend:
   ```bash
   npm run start:dev
   ```
   *Layanan backend kini aktif berjalan di [http://localhost:3001](http://localhost:3001).*

### Langkah 2: Jalankan Web CMS
1. Buka terminal baru dan masuk ke folder CMS:
   ```bash
   cd frontend-cms
   ```
2. Jalankan server Next.js:
   ```bash
   npm run dev
   ```
   *Dashboard CMS kini aktif berjalan di [http://localhost:3000](http://localhost:3000).*
   * **Akun Login Admin Bawaan**:
     * **Email**: `admin@saibumi.com`
     * **Password**: `admin123`

### Langkah 3: Jalankan Aplikasi Mobile (Android)
1. Buka terminal baru dan masuk ke folder mobile:
   ```bash
   cd frontend-user
   ```
2. Jalankan bundler Expo Metro dengan membersihkan cache:
   ```bash
   npx expo start -c
   ```
3. Tekan tombol **`a`** di terminal untuk meluncurkan aplikasi ke Android Emulator Anda.
   * **Akun Uji Coba Wisatawan Bawaan**:
     * **Email**: `budi.santoso@example.com` (atau `siti.rahma@example.com`, `andi.wijaya@example.com`)
     * **Password**: `user123`
     * *Atau daftar menggunakan tombol registrasi untuk membuat akun baru langsung.*
