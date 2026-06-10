import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Memulai seeding database...');

  // 1. Bersihkan database
  await prisma.review.deleteMany();
  await prisma.destination.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  // 2. Seed Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      name: 'Admin SaiBumi',
      email: 'admin@saibumi.com',
      password: passwordHash,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      role: 'ADMIN',
      status: 'ACTIVE',
    },
  });
  console.log(`Admin user berhasil dibuat: ${admin.email}`);

  // No registered users seeded (clean start)

  // 3. Seed Categories
  const categoriesData = [
    { name: 'Pantai' },
    { name: 'Gunung' },
    { name: 'Air Terjun' },
    { name: 'Danau' },
    { name: 'Budaya & Sejarah' },
    { name: 'Kuliner' },
    { name: 'Alam' },
    { name: 'Wisata Sejarah' },
    { name: 'Wisata Kuliner' },
    { name: 'Wisata Religi' },
  ];

  const categoriesMap: Record<string, string> = {};
  for (const cat of categoriesData) {
    const createdCat = await prisma.category.create({ data: cat });
    categoriesMap[createdCat.name] = createdCat.id;
  }
  console.log(`Berhasil membuat ${Object.keys(categoriesMap).length} kategori.`);

  // 4. Seed Destinations
  const destinationsData = [
    {
      name: 'Pantai Gigi Hiu',
      categoryName: 'Pantai',
      description: 'Pantai Gigi Hiu menawarkan pemandangan tebing batu karang yang menjulang tinggi seperti deretan gigi hiu di tepi pantai. Sangat cocok bagi pecinta fotografi dan petualangan.',
      address: 'Kecamatan Kelumbayan, Kabupaten Tanggamus, Lampung',
      latitude: -5.7654,
      longitude: 104.9876,
      ticketPrice: 15000,
      openTime: '06:00',
      closeTime: '18:00',
      facilities: ['Area Parkir', 'Toilet', 'Spot Foto'],
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1471922639839-be7462f54e5e?auto=format&fit=crop&w=600&q=80',
      ],
      rating: 0.0,
      reviewsCount: 0,
    },
    {
      name: 'Pulau Pahawang',
      categoryName: 'Pantai',
      description: 'Pulau Pahawang terkenal dengan keindahan terumbu karang bawah lautnya yang menakjubkan dan air laut yang sangat jernih. Tempat favorit untuk snorkeling.',
      address: 'Kecamatan Marga Punduh, Kabupaten Pesawaran, Lampung',
      latitude: -5.6789,
      longitude: 105.2134,
      ticketPrice: 50000,
      openTime: '07:00',
      closeTime: '17:00',
      facilities: ['Area Parkir', 'Toilet', 'Restoran', 'Spot Foto', 'Penginapan'],
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80',
      ],
      rating: 0.0,
      reviewsCount: 0,
    },
    {
      name: 'Taman Nasional Way Kambas',
      categoryName: 'Alam',
      description: 'Pusat konservasi dan penangkaran gajah sumatera yang terkenal secara nasional and internasional. Pengunjung dapat melihat pelatihan gajah secara langsung.',
      address: 'Kecamatan Labuhan Ratu, Kabupaten Lampung Timur, Lampung',
      latitude: -5.0123,
      longitude: 105.7891,
      ticketPrice: 30000,
      openTime: '08:00',
      closeTime: '16:00',
      facilities: ['Area Parkir', 'Mushola', 'Toilet', 'Restoran', 'Spot Foto'],
      thumbnail: 'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?auto=format&fit=crop&w=600&q=80',
      ],
      rating: 0.0,
      reviewsCount: 0,
    },
    {
      name: 'Gunung Anak Krakatau',
      categoryName: 'Gunung',
      description: 'Gunung berapi aktif legendaris yang terletak di Selat Sunda. Menawarkan petualangan mendaki dan menyaksikan keindahan alam vulkanis yang mempesona.',
      address: 'Selat Sunda, Kabupaten Lampung Selatan, Lampung',
      latitude: -6.1021,
      longitude: 105.4231,
      ticketPrice: 100000,
      openTime: '00:00',
      closeTime: '23:59',
      facilities: ['Spot Foto', 'Penginapan'],
      thumbnail: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=600&q=80',
      images: [
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=600&q=80',
      ],
      rating: 0.0,
      reviewsCount: 0,
    },
    {
      name: 'Kawah Keramikan Suoh',
      categoryName: 'Alam',
      description: 'Kawah dengan formasi batuan silika belerang menyerupai ubin keramik yang unik di kawasan vulkanis Suoh.',
      address: 'Kecamatan Suoh, Kabupaten Lampung Barat, Lampung',
      latitude: -5.2345,
      longitude: 104.2345,
      ticketPrice: 10000,
      openTime: '07:00',
      closeTime: '16:30',
      facilities: ['Area Parkir', 'Toilet', 'Spot Foto'],
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      images: [],
      rating: 0.0,
      reviewsCount: 0,
    },
    {
      name: 'Air Terjun Curup Tujuh',
      categoryName: 'Air Terjun',
      description: 'Air terjun tujuh tingkat yang terletak di tengah hutan lindung, menawarkan suasana alami yang asri.',
      address: 'Kecamatan Sendang Agung, Kabupaten Lampung Tengah, Lampung',
      latitude: -4.8912,
      longitude: 104.9123,
      ticketPrice: 15000,
      openTime: '08:00',
      closeTime: '17:00',
      facilities: ['Area Parkir', 'Toilet'],
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      images: [],
      rating: 0.0,
      reviewsCount: 0,
    },
    {
      name: 'Teluk Kiluan',
      categoryName: 'Pantai',
      description: 'Terkenal dengan atraksi lumba-lumba hidung botol di laut lepas dan pemandangan pulau kelapa kecil yang cantik.',
      address: 'Kecamatan Kelumbayan, Kabupaten Tanggamus, Lampung',
      latitude: -5.7891,
      longitude: 105.1234,
      ticketPrice: 20000,
      openTime: '06:00',
      closeTime: '18:00',
      facilities: ['Area Parkir', 'Toilet', 'Restoran', 'Penginapan'],
      thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
      images: [],
      rating: 0.0,
      reviewsCount: 0,
    },
    {
      name: 'Danau Ranau',
      categoryName: 'Danau',
      description: 'Danau terbesar kedua di Sumatera yang berbatasan dengan Sumatera Selatan, menawarkan latar belakang pemandangan Gunung Seminung yang anggun.',
      address: 'Kabupaten Lampung Barat, Lampung',
      latitude: -4.8912,
      longitude: 103.9123,
      ticketPrice: 10000,
      openTime: '00:00',
      closeTime: '23:59',
      facilities: ['Area Parkir', 'Mushola', 'Toilet', 'Restoran', 'Spot Foto', 'Penginapan'],
      thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
      images: [],
      rating: 0.0,
      reviewsCount: 0,
    },
  ];

  const destinationsMap: Record<string, string> = {};
  for (const dest of destinationsData) {
    const { categoryName, ...rest } = dest;
    const categoryId = categoriesMap[categoryName];
    if (!categoryId) continue;

    const createdDest = await prisma.destination.create({
      data: {
        ...rest,
        categoryId,
      },
    });
    destinationsMap[createdDest.name] = createdDest.id;
  }
  console.log(`Berhasil membuat ${Object.keys(destinationsMap).length} destinasi wisata.`);

  // No reviews seeded (clean start)
  console.log('Seeding database selesai dengan sukses! 🎉');
}

main()
  .catch((e) => {
    console.error('Error saat melakukan seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
