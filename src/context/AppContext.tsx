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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [profile, setProfile] = useState<AdminProfile>(defaultProfile);

  // Load initial data from localStorage if exists, else use mock data
  useEffect(() => {
    const storedAuth = localStorage.getItem("sb_isLoggedIn");
    if (storedAuth === "true") {
      setIsLoggedIn(true);
    }

    const storedDestinations = localStorage.getItem("sb_destinations");
    if (storedDestinations) {
      setDestinations(JSON.parse(storedDestinations));
    } else {
      setDestinations(initialDestinations);
      localStorage.setItem("sb_destinations", JSON.stringify(initialDestinations));
    }

    const storedCategories = localStorage.getItem("sb_categories");
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(initialCategories);
      localStorage.setItem("sb_categories", JSON.stringify(initialCategories));
    }

    const storedReviews = localStorage.getItem("sb_reviews");
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    } else {
      setReviews(initialReviews);
      localStorage.setItem("sb_reviews", JSON.stringify(initialReviews));
    }

    const storedUsers = localStorage.getItem("sb_users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(initialUsers);
      localStorage.setItem("sb_users", JSON.stringify(initialUsers));
    }

    const storedProfile = localStorage.getItem("sb_profile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      localStorage.setItem("sb_profile", JSON.stringify(defaultProfile));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Mock login validation
    if (email === "admin@saibumi.com" && password === "admin123") {
      setIsLoggedIn(true);
      localStorage.setItem("sb_isLoggedIn", "true");
      return true;
    }
    return false;
  };

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
  const addCategory = (name: string) => {};
  const updateCategory = (id: string, name: string) => {};
  const deleteCategory = (id: string) => {};
  const deleteReview = (id: string) => {};
  const updateProfile = (p: Partial<AdminProfile>) => {};

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
