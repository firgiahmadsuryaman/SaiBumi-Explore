import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const FavoriteContext = createContext<any>(null);

export const FavoriteProvider = ({ children }: any) => {
  const { user, api } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      return;
    }
    setIsLoading(true);
    try {
      const res = await api.get('/favorite');
      setFavorites(res.data);
    } catch (err) {
      console.error('Failed to fetch favorites', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const toggleFavorite = async (destinationId: string) => {
    if (!user) return { success: false, message: 'Harap masuk terlebih dahulu' };
    try {
      const res = await api.post(`/favorite/toggle/${destinationId}`);
      const { isFavorite } = res.data;
      
      // Update local state
      if (isFavorite) {
        // Fetch to get the full destination details
        const destRes = await api.get(`/destinations`); // Assuming we can filter or search, or we just re-fetch all favorites
        // To be simpler and accurate, just refresh favorites list from server:
        await fetchFavorites();
      } else {
        setFavorites((prev) => prev.filter((d) => d.id !== destinationId));
      }
      return { success: true, isFavorite };
    } catch (err) {
      console.error('Failed to toggle favorite', err);
      return { success: false, message: 'Gagal merubah status favorit' };
    }
  };

  const isFavorite = (destinationId: string) => {
    return favorites.some((d) => d.id === destinationId);
  };

  return (
    <FavoriteContext.Provider value={{ favorites, isLoading, fetchFavorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoriteContext);

// mod favctx 1
