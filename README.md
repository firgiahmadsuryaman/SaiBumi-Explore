# SaiBumi Explore - Panduan Menjalankan Proyek

Repositori ini terdiri dari dua bagian terpisah yang saling terintegrasi:
1. **frontend-cms**: Dashboard CMS Admin berbasis **Next.js** (berjalan di port `3000`).
2. **backend-api**: Layanan RESTful API berbasis **NestJS**, **Prisma ORM**, dan **PostgreSQL** (berjalan di port `3001`).

---

## Prasyarat (Prerequisites)

Sebelum menjalankan aplikasi, pastikan Anda telah menginstal:
* [Node.js](https://nodejs.org/) (versi 18 ke atas)
* [PostgreSQL](https://www.postgresql.org/) server yang aktif dan berjalan secara lokal (default port `5432`).

---

## Langkah 1: Konfigurasi & Menjalankan Backend API

1. Masuk ke direktori `backend-api`:
   ```bash
   cd backend-api
   ```

2. Konfigurasi variabel lingkungan (*Environment Variables*):
   - Salin file `.env.example` menjadi `.env`:
     ```bash
     cp .env.example .env
     ```
   - Buka file `.env` dan sesuaikan kredensial koneksi database PostgreSQL Anda pada `DATABASE_URL`:
     ```env
     DATABASE_URL="postgresql://postgres:PASSWORD_ANDA@localhost:5432/saibumi_explore?schema=public"
     ```

3. Jalankan migrasi skema database Prisma ke PostgreSQL:
   ```bash
   npx prisma migrate dev --name init
   ```

4. Jalankan seeder database untuk memasukkan data admin bawaan, kategori pariwisata, destinasi wisata, dan ulasan awal:
   ```bash
   npx prisma db seed
   ```

5. Jalankan server backend NestJS dalam mode development:
   ```bash
   npm run start:dev
   ```
   API kini berjalan aktif di [http://localhost:3001](http://localhost:3001).

---

## Langkah 2: Menjalankan Frontend CMS

1. Buka terminal baru dan masuk ke direktori `frontend-cms`:
   ```bash
   cd frontend-cms
   ```

2. Jalankan aplikasi Next.js dalam mode development:
   ```bash
   npm run dev
   ```
   Website CMS kini berjalan aktif di [http://localhost:3000](http://localhost:3000).

---

## Kredensial Login Admin Default

Setelah seeding database selesai, gunakan akun berikut untuk masuk ke dashboard CMS:
- **Email**: `admin@saibumi.com`
- **Password**: `admin123`

*(Catatan: Jika backend API dalam kondisi mati/offline, aplikasi Next.js akan secara otomatis melakukan fallback ke mode offline menggunakan LocalStorage sehingga dashboard CMS tetap dapat dibuka).*

<!-- verifikasi selesai -->
