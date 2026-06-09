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
  login: (email: string, password: string) => boolean;
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
  name: "Budi Santoso",
  email: "budi.santoso@saibumi.com",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
};

const AppContext = createContext<AppContextType | undefined>(undefined);

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

    /**
   * Memvalidasi kredensial login admin.
   */
  const login = (email: string, password: string): boolean => {
    // Mock login validation
    if (email === "admin@saibumi.com" && password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("sb_isLoggedIn", "true");
      return true;
    }
    return false;
  };

    /**
   * Mengeluarkan admin dari sesi aktif.
   */
  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("sb_isLoggedIn");
  };

  const addDestination = (d: Omit<Destination, "id" | "rating" | "reviewsCount" | "createdAt">) => {
    const newDest: Destination = {
      ...d,
      id: Math.random().toString(36).substr(2, 9),
      rating: 0,
      reviewsCount: 0,
      createdAt: new Date().toISOString().split("T")[0]
    };
    const updated = [newDest, ...destinations];
    setDestinations(updated);
    localStorage.setItem("sb_destinations", JSON.stringify(updated));
  };
  const updateDestination = (id: string, d: Partial<Destination>) => {
    const updated = destinations.map((dest) =>
      dest.id === id ? { ...dest, ...d } : dest
    );
    setDestinations(updated);
    localStorage.setItem("sb_destinations", JSON.stringify(updated));
  };
  const deleteDestination = (id: string) => {
    const updated = destinations.filter((dest) => dest.id !== id);
    setDestinations(updated);
    localStorage.setItem("sb_destinations", JSON.stringify(updated));
  };
  const addCategory = (name: string) => {
    const newCat: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      totalDestinations: 0
    };
    const updated = [...categories, newCat];
    setCategories(updated);
    localStorage.setItem("sb_categories", JSON.stringify(updated));
  };
  const updateCategory = (id: string, name: string) => {
    const updated = categories.map((cat) =>
      cat.id === id ? { ...cat, name } : cat
    );
    setCategories(updated);
    localStorage.setItem("sb_categories", JSON.stringify(updated));
  };
  const deleteCategory = (id: string) => {
    const updated = categories.filter((cat) => cat.id !== id);
    setCategories(updated);
    localStorage.setItem("sb_categories", JSON.stringify(updated));
  };
  const deleteReview = (id: string) => {
    const updated = reviews.filter((rev) => rev.id !== id);
    setReviews(updated);
    localStorage.setItem("sb_reviews", JSON.stringify(updated));
  };
  const updateProfile = (p: Partial<AdminProfile>) => {
    const updated = { ...profile, ...p };
    setProfile(updated);
    localStorage.setItem("sb_profile", JSON.stringify(updated));
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
