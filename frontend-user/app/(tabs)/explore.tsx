import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useFavorites } from '../../src/context/FavoriteContext';
import Input from '../../src/components/Input';
import CategoryCard from '../../src/components/CategoryCard';
import DestinationCard from '../../src/components/DestinationCard';
import EmptyState from '../../src/components/EmptyState';

export default function ExploreScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { api } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params?.category) {
      setSelectedCategory(params.category);
    } else {
      setSelectedCategory('Semua');
    }
  }, [params?.category]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [destRes, catRes] = await Promise.all([
        api.get('/destinations'),
        api.get('/categories')
      ]);
      setDestinations(destRes.data);
      setCategories([{ id: 'all', name: 'Semua' }, ...catRes.data]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'Semua' ||
      dest.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50 px-4 pt-4">
      <View className="mb-4">
        <Input
          placeholder="Cari destinasi atau lokasi..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          leftIcon={<Search size={16} color="#64748B" />}
          className="mb-0"
        />
      </View>

      <View className="mb-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CategoryCard
              name={item.name}
              isActive={selectedCategory === item.name}
              onPress={() => setSelectedCategory(item.name)}
            />
          )}
        />
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0EA5E9" />
        </View>
      ) : (
        <FlatList
          data={filteredDestinations}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DestinationCard
              destination={item}
              isFavorite={isFavorite(item.id)}
              onFavoritePress={() => toggleFavorite(item.id)}
              onPress={() => router.push(`/destination/${item.id}`)}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title="Destinasi Tidak Ditemukan"
              description="Coba cari dengan kata kunci lain atau pilih kategori wisata yang berbeda."
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

// explore mod 10

// explore mod 11

// explore mod 12

// explore mod 13

// explore mod 14
