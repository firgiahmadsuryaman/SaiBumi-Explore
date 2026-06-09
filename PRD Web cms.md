# Product Requirements Document (PRD)

# SaiBumi Explore CMS

## 1. Overview

SaiBumi Explore CMS merupakan dashboard administrasi berbasis web yang digunakan untuk mengelola seluruh data destinasi wisata pada platform SaiBumi Explore.

CMS memungkinkan admin untuk menambah, mengubah, menghapus, dan memonitor informasi destinasi wisata Lampung secara terpusat.

Target pengguna:

* Super Admin
* Admin Pariwisata

Platform:

* Web Responsive
* Desktop First

Framework:

* Next.js
* TypeScript
* Tailwind CSS
* Lucide React

Font:

* Poppins

---

# 2. Design System

## Primary Color

Sky Blue

#0EA5E9

## Secondary Color

Teal

#14B8A6

## Accent Color

Amber

#F59E0B

## Background

#F8FAFC

## Text

#0F172A

## Border

#E2E8F0

---

# 3. Layout Structure

## Sidebar

Menu:

* Dashboard
* Destinations
* Categories
* Reviews
* Users
* Profile

Posisi:

* Fixed Left
* Collapsible

---

## Top Navbar

Komponen:

* Search Bar
* Notification Icon
* User Avatar
* User Name

Posisi:

* Sticky Top

---

## Main Content

Menampilkan konten sesuai halaman aktif.

---

# 4. Login Page

Tujuan:
Admin dapat masuk ke sistem.

Komponen:

* Logo SaiBumi Explore
* Heading
* Email Input
* Password Input
* Show Password Button
* Login Button

Validasi:

* Email wajib diisi
* Password wajib diisi

Tampilan:

Split Layout

Kiri:

* Banner wisata Lampung

Kanan:

* Form Login

---

# 5. Dashboard Page

Tujuan:
Menampilkan ringkasan data sistem.

## Statistics Cards

Card:

1. Total Destinations
2. Total Categories
3. Total Reviews
4. Total Users

---

## Popular Destinations

Tabel:

* Nama Destinasi
* Kategori
* Rating
* Jumlah Review

---

## Recent Reviews

List review terbaru.

---

# 6. Destinations Page

Tujuan:
Mengelola seluruh destinasi wisata.

## Header

* Judul Halaman
* Tombol Add Destination

---

## Search & Filter

Filter:

* Search Nama
* Kategori

---

## Table Destination

Kolom:

* Thumbnail
* Nama
* Kategori
* Harga Tiket
* Rating
* Created Date
* Actions

Actions:

* View
* Edit
* Delete

---

# 7. Create Destination Page

Form Input:

## Basic Information

* Nama Destinasi
* Kategori
* Deskripsi

---

## Location

* Alamat
* Latitude
* Longitude

---

## Operational

* Harga Tiket
* Jam Buka
* Jam Tutup

---

## Facilities

Checklist:

* Area Parkir
* Mushola
* Toilet
* Restoran
* Spot Foto
* Penginapan

---

## Gallery

Upload:

* Thumbnail
* Multiple Images

---

## Action Button

* Save
* Cancel

---

# 8. Destination Detail Page

Menampilkan informasi lengkap destinasi.

Section:

* Thumbnail
* Gallery
* Informasi Destinasi
* Lokasi
* Fasilitas
* Statistik Review

Button:

* Edit
* Delete

---

# 9. Categories Page

Tujuan:
Mengelola kategori wisata.

Kategori Awal:

* Pantai
* Gunung
* Air Terjun
* Danau
* Budaya
* Alam

---

Table:

* Nama Kategori
* Total Destinasi
* Actions

Actions:

* Edit
* Delete

---

Modal:

* Create Category
* Edit Category

---

# 10. Reviews Page

Tujuan:
Mengelola ulasan pengguna.

Table:

* User
* Destination
* Rating
* Comment
* Date

Actions:

* Delete

---

Filter:

* Rating
* Destination

---

# 11. Users Page

Tujuan:
Melihat pengguna aplikasi.

Table:

* Avatar
* Nama
* Email
* Join Date

Action:

* View Detail

---

# 12. Profile Page

Informasi Admin:

* Avatar
* Nama
* Email

Action:

* Edit Profile
* Change Password

---

# 13. Components Library

## Buttons

Variants:

* Primary
* Secondary
* Outline
* Danger

---

## Inputs

* Text Input
* Textarea
* Select
* Multi Select
* Checkbox

---

## Cards

* Statistic Card
* Destination Card
* Review Card

---

## Table

Features:

* Pagination
* Search
* Sorting

---

## Modal

Digunakan untuk:

* Delete Confirmation
* Create Category
* Edit Category

---

# 14. Responsive Requirement

Desktop:

> = 1280px

Tablet:

> = 768px

Mobile:

> = 375px

Sidebar berubah menjadi Drawer pada layar kecil.

---

# 15. User Flow

Login
↓
Dashboard
↓
Destinations
↓
Create Destination
↓
Upload Images
↓
Save
↓
Destination Published

Review Monitoring
↓
Delete Review jika diperlukan

Category Management
↓
Tambah/Edit/Hapus Kategori
