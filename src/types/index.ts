/**
 * Representasi data destinasi wisata Lampung.
 */
export interface Destination {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  ticketPrice: number;
  openTime: string;
  closeTime: string;
  facilities: string[];
  thumbnail: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

/**
 * Kategori klasifikasi tempat wisata.
 */
export interface Category {
  id: string;
  name: string;
  totalDestinations: number;
}

/**
 * Ulasan dan rating dari pengguna untuk destinasi wisata.
 */
export interface Review {
  id: string;
  user: {
    name: string;
    avatar: string;
    email: string;
  };
  destinationId: string;
  destinationName: string;
  rating: number;
  comment: string;
  date: string;
}

/**
 * Informasi data pengguna terdaftar.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
}

export interface AdminProfile {
  name: string;
  email: string;
  avatar: string;
}
