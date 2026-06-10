"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Destination, Category, Review, User, AdminProfile } from "@/types";
import { initialDestinations } from "@/data/destinations";
import { initialCategories } from "@/data/categories";
import { initialReviews } from "@/data/reviews";
import { initialUsers } from "@/data/users";

interface AppContextType {
  destinations: Destination[];
  categories: Category[];
  reviews: Review[];
  users: User[];
  profile: AdminProfile;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addDestination: (d: Omit<Destination, "id" | "rating" | "reviewsCount" | "createdAt">) => void;
  updateDestination: (id: string, d: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;
  addCategory: (name: string) => void;
  updateCategory: (id: string, name: string) => void;
  deleteCategory: (id: string) => void;
  deleteReview: (id: string) => void;
  updateProfile: (p: Partial<AdminProfile>) => void;
}

const defaultProfile: AdminProfile = {
  name: "Admin SaiBumi",
  email: "admin@saibumi.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
};

const AppContext = createContext<AppContextType | undefined>(undefined);

const API_URL = "http://localhost:3001";

async function apiRequest(path: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("sb_token") : null;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status}`);
  }

  return response.json();
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sb_isLoggedIn") === "true";
    }
    return false;
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sb_destinations");
      if (stored) return JSON.parse(stored);
      return initialDestinations;
    }
    return [];
  });

  const [categories, setCategories] = useState<Category[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sb_categories");
      if (stored) return JSON.parse(stored);
      return initialCategories;
    }
    return [];
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sb_reviews");
      if (stored) return JSON.parse(stored);
      return initialReviews;
    }
    return [];
  });

  const [users, setUsers] = useState<User[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sb_users");
      if (stored) return JSON.parse(stored);
      return initialUsers;
    }
    return [];
  });

  const [profile, setProfile] = useState<AdminProfile>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("sb_profile");
      if (stored) return JSON.parse(stored);
      return defaultProfile;
    }
    return defaultProfile;
  });

  // Write default mock data to localStorage if empty
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!localStorage.getItem("sb_destinations")) {
        localStorage.setItem("sb_destinations", JSON.stringify(initialDestinations));
      }
      if (!localStorage.getItem("sb_categories")) {
        localStorage.setItem("sb_categories", JSON.stringify(initialCategories));
      }
      if (!localStorage.getItem("sb_reviews")) {
        localStorage.setItem("sb_reviews", JSON.stringify(initialReviews));
      }
      if (!localStorage.getItem("sb_users")) {
        localStorage.setItem("sb_users", JSON.stringify(initialUsers));
      }
      if (!localStorage.getItem("sb_profile")) {
        localStorage.setItem("sb_profile", JSON.stringify(defaultProfile));
      }
    }
  }, []);

  // Fetch data from API on login status change
  useEffect(() => {
    if (!isLoggedIn) return;

    const loadData = async () => {
      try {
        const dests = await apiRequest("/destinations");
        setDestinations(dests);
        localStorage.setItem("sb_destinations", JSON.stringify(dests));
      } catch (e) {
        console.warn("Gagal memuat destinasi dari API, menggunakan lokal:", e);
      }

      try {
        const cats = await apiRequest("/categories");
        setCategories(cats);
        localStorage.setItem("sb_categories", JSON.stringify(cats));
      } catch (e) {
        console.warn("Gagal memuat kategori dari API, menggunakan lokal:", e);
      }

      try {
        const revs = await apiRequest("/reviews");
        setReviews(revs);
        localStorage.setItem("sb_reviews", JSON.stringify(revs));
      } catch (e) {
        console.warn("Gagal memuat ulasan dari API, menggunakan lokal:", e);
      }

      try {
        const usrs = await apiRequest("/users");
        setUsers(usrs);
        localStorage.setItem("sb_users", JSON.stringify(usrs));
      } catch (e) {
        console.warn("Gagal memuat pengguna dari API, menggunakan lokal:", e);
      }

      try {
        const prof = await apiRequest("/auth/profile");
        setProfile(prof);
        localStorage.setItem("sb_profile", JSON.stringify(prof));
      } catch (e) {
        console.warn("Gagal memuat profil dari API, menggunakan lokal:", e);
      }
    };

    loadData();
  }, [isLoggedIn]);

  /**
   * Memvalidasi kredensial login admin.
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (res.access_token) {
        localStorage.setItem("sb_token", res.access_token);
        localStorage.setItem("sb_isLoggedIn", "true");
        setIsLoggedIn(true);
        if (res.user) {
          setProfile(res.user);
          localStorage.setItem("sb_profile", JSON.stringify(res.user));
        }
        return true;
      }
      return false;
    } catch (e) {
      console.warn("Login API gagal, mencoba login offline:", e);
      // Offline fallback
      if (email === "admin@saibumi.com" && password === "admin123") {
        setIsLoggedIn(true);
        localStorage.setItem("sb_isLoggedIn", "true");
        return true;
      }
      return false;
    }
  };

  /**
   * Mengeluarkan admin dari sesi aktif.
   */
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("sb_isLoggedIn");
    localStorage.removeItem("sb_token");
  };

  /**
   * Menambahkan destinasi wisata baru ke state.
   */
  const addDestination = async (d: Omit<Destination, "id" | "rating" | "reviewsCount" | "createdAt">) => {
    const mockId = Math.random().toString(36).substr(2, 9);
    const newDest: Destination = {
      ...d,
      id: mockId,
      rating: 0,
      reviewsCount: 0,
      createdAt: new Date().toISOString().split("T")[0]
    };
    const updated = [newDest, ...destinations];
    setDestinations(updated);
    localStorage.setItem("sb_destinations", JSON.stringify(updated));

    try {
      const created = await apiRequest("/destinations", {
        method: "POST",
        body: JSON.stringify(d),
      });
      setDestinations((prev) =>
        prev.map((item) => (item.id === mockId ? { ...item, id: created.id } : item))
      );
    } catch (e) {
      console.warn("Gagal membuat destinasi di API, data tersimpan secara lokal:", e);
    }
  };

  /**
   * Memperbarui data destinasi wisata yang ada.
   */
  const updateDestination = async (id: string, d: Partial<Destination>) => {
    const updated = destinations.map((dest) =>
      dest.id === id ? { ...dest, ...d } : dest
    );
    setDestinations(updated);
    localStorage.setItem("sb_destinations", JSON.stringify(updated));

    try {
      await apiRequest(`/destinations/${id}`, {
        method: "PATCH",
        body: JSON.stringify(d),
      });
    } catch (e) {
      console.warn("Gagal memperbarui destinasi di API, perubahan disimpan lokal:", e);
    }
  };

  /**
   * Menghapus destinasi wisata berdasarkan ID.
   */
  const deleteDestination = async (id: string) => {
    const updated = destinations.filter((dest) => dest.id !== id);
    setDestinations(updated);
    localStorage.setItem("sb_destinations", JSON.stringify(updated));

    try {
      await apiRequest(`/destinations/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn("Gagal menghapus destinasi di API, data terhapus secara lokal:", e);
    }
  };

  /**
   * Menambahkan kategori baru ke dalam daftar.
   */
  const addCategory = async (name: string) => {
    const mockId = Math.random().toString(36).substr(2, 9);
    const newCat: Category = {
      id: mockId,
      name,
      totalDestinations: 0
    };
    const updated = [...categories, newCat];
    setCategories(updated);
    localStorage.setItem("sb_categories", JSON.stringify(updated));

    try {
      const created = await apiRequest("/categories", {
        method: "POST",
        body: JSON.stringify({ name }),
      });
      setCategories((prev) =>
        prev.map((item) => (item.id === mockId ? { ...item, id: created.id } : item))
      );
    } catch (e) {
      console.warn("Gagal membuat kategori di API, data tersimpan secara lokal:", e);
    }
  };

  /**
   * Memperbarui nama kategori berdasarkan ID.
   */
  const updateCategory = async (id: string, name: string) => {
    const updated = categories.map((cat) =>
      cat.id === id ? { ...cat, name } : cat
    );
    setCategories(updated);
    localStorage.setItem("sb_categories", JSON.stringify(updated));

    try {
      await apiRequest(`/categories/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
      });
    } catch (e) {
      console.warn("Gagal memperbarui kategori di API, perubahan disimpan lokal:", e);
    }
  };

  /**
   * Menghapus kategori berdasarkan ID.
   */
  const deleteCategory = async (id: string) => {
    const updated = categories.filter((cat) => cat.id !== id);
    setCategories(updated);
    localStorage.setItem("sb_categories", JSON.stringify(updated));

    try {
      await apiRequest(`/categories/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn("Gagal menghapus kategori di API, data terhapus secara lokal:", e);
    }
  };

  /**
   * Menghapus ulasan pengguna berdasarkan ID.
   */
  const deleteReview = async (id: string) => {
    const updated = reviews.filter((rev) => rev.id !== id);
    setReviews(updated);
    localStorage.setItem("sb_reviews", JSON.stringify(updated));

    try {
      await apiRequest(`/reviews/${id}`, {
        method: "DELETE",
      });
    } catch (e) {
      console.warn("Gagal menghapus ulasan di API, ulasan terhapus secara lokal:", e);
    }
  };

  /**
   * Memperbarui data profil admin saat ini.
   */
  const updateProfile = async (p: Partial<AdminProfile>) => {
    const updated = { ...profile, ...p };
    setProfile(updated);
    localStorage.setItem("sb_profile", JSON.stringify(updated));

    try {
      await apiRequest("/auth/profile", {
        method: "PATCH",
        body: JSON.stringify(p),
      });
    } catch (e) {
      console.warn("Gagal memperbarui profil di API, perubahan disimpan lokal:", e);
    }
  };

  return (
    <AppContext.Provider
      value={{
        destinations,
        categories,
        reviews,
        users,
        profile,
        isLoggedIn,
        login,
        logout,
        addDestination,
        updateDestination,
        deleteDestination,
        addCategory,
        updateCategory,
        deleteCategory,
        deleteReview,
        updateProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
