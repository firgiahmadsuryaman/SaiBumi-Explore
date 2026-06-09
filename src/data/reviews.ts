import { Review } from "@/types";

export const initialReviews: Review[] = [
  {
    id: "1",
    user: {
      name: "Budi Santoso",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      email: "budi.santoso@example.com"
    },
    destinationId: "1",
    destinationName: "Pantai Gigi Hiu",
    rating: 5,
    comment: "Pemandangan batu karangnya luar biasa indah dan sangat estetik untuk foto! Jalur akses ke lokasi cukup menantang namun sangat sepadan.",
    date: "2023-11-05"
  },
  {
    id: "2",
    user: {
      name: "Siti Rahma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      email: "siti.rahma@example.com"
    },
    destinationId: "2",
    destinationName: "Pulau Pahawang",
    rating: 4,
    comment: "Sangat menyenangkan melakukan snorkeling di Pahawang. Airnya jernih sekali dan terumbu karangnya masih terawat dengan sangat baik.",
    date: "2023-10-28"
  },
  {
    id: "3",
    user: {
      name: "Andi Wijaya",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=150&q=80",
      email: "andi.wijaya@example.com"
    },
    destinationId: "3",
    destinationName: "Taman Nasional Way Kambas",
    rating: 5,
    comment: "Pengalaman luar biasa melihat penangkaran gajah sumatera secara dekat. Pemandu wisatanya sangat ramah dan edukatif dalam menyampaikan informasi.",
    date: "2023-09-12"
  },
  {
    id: "4",
    user: {
      name: "Dewi Lestari",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      email: "dewi.lestari@example.com"
    },
    destinationId: "1",
    destinationName: "Pantai Gigi Hiu",
    rating: 4,
    comment: "Tempat yang sangat dramatis dan memukau. Sangat disarankan datang saat sore hari untuk menikmati sunset di balik batu karang raksasa.",
    date: "2023-11-01"
  }
  {
    id: "5",
    user: {
      name: "Rian Hidayat",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      email: "rian.hidayat@example.com"
    },
    destinationId: "2",
    destinationName: "Pulau Pahawang",
    rating: 5,
    comment: "Tempat terbaik untuk refreshing akhir pekan bersama keluarga. Homestay di sana sangat nyaman dan bersih.",
    date: "2023-11-08"
  }
  {
    id: "6",
    user: {
      name: "Siti Rahma",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      email: "siti.rahma@example.com"
    },
    destinationId: "3",
    destinationName: "Taman Nasional Way Kambas",
    rating: 4,
    comment: "Sangat edukatif terutama bagi anak-anak untuk belajar mencintai satwa dan alam.",
    date: "2023-11-02"
  }
  {
    id: "7",
    user: {
      name: "Dewi Lestari",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      email: "dewi.lestari@example.com"
    },
    destinationId: "1",
    destinationName: "Pantai Gigi Hiu",
    rating: 5,
    comment: "Keindahan karang yang tiada duanya! Sangat magis ketika diterpa ombak besar.",
    date: "2023-11-10"
  }
];
