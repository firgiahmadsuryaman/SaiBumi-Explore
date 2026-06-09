import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/context/AuthContext';
import { useFavorites } from '../../src/context/FavoriteContext';
import CategoryCard from '../../src/components/CategoryCard';
import DestinationCard from '../../src/components/DestinationCard';

export default function HomeScreen() {
  const router = useRouter();
  const { user, api } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [categories, setCategories] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const [catRes, destRes] = await Promise.all([
        api.get('/categories'),
        api.get('/destinations')
      ]);
      setCategories(catRes.data);
      setDestinations(destRes.data);
    } catch (err) {
      console.error(err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const popularDestinations = destinations.filter(d => d.rating >= 4.0);
  const recommendedDestinations = destinations.slice(0, 5);

  const banners = [
    {
      id: '1',
      title: 'Diskon 20% Pulau Pahawang',
      subtitle: 'Promo Khusus Akhir Pekan',
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '2',
      title: 'Festival Krakatau 2026',
      subtitle: 'Ikuti Kemeriahan Budaya Lampung',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    },
    {
      id: '3',
      title: 'Keindahan Gigi Hiu',
      subtitle: 'Petualangan Tebing Karang Eksotis',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
    }
  ];

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center">
        <ActivityIndicator size="large" color="#0EA5E9" />
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center p-6">
        <Text className="font-poppins text-textPrimary text-sm text-center mb-4">
          Gagal memuat data destinasi wisata.
        </Text>
        <TouchableOpacity
          onPress={loadData}
          className="bg-sky-500 px-6 py-2.5 rounded-xl"
        >
          <Text className="font-poppins font-bold text-white text-xs">Coba Lagi</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 py-4">
        <View className="flex-row items-center justify-between mb-5">
          <View>
            <Text className="font-poppins text-textSecondary text-xs">Selamat Datang,</Text>
            <Text className="font-poppins font-bold text-textPrimary text-lg">
              {user?.name || 'Rizki'} 👋
            </Text>
          </View>
          <Image
            source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
            className="w-11 h-11 rounded-full border border-gray-100"
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => router.push('/(tabs)/explore')}
          className="flex-row items-center border border-gray-100 rounded-xl bg-white px-3.5 h-12 shadow-sm mb-5"
        >
          <Search size={16} color="#94A3B8" />
          <Text className="font-poppins text-slate-400 text-xs ml-2.5">
            Cari destinasi wisata...
          </Text>
        </TouchableOpacity>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          className="mb-6 rounded-2xl overflow-hidden h-36"
        >
          {banners.map((b) => (
            <View key={b.id} className="relative w-[342px] h-36 bg-slate-200">
              <Image source={{ uri: b.image }} className="w-full h-full" resizeMode="cover" />
              <View className="absolute inset-0 bg-black/30 p-4 justify-end">
                <Text className="font-poppins font-bold text-white text-sm">{b.title}</Text>
                <Text className="font-poppins text-white/80 text-[10px] mt-0.5">{b.subtitle}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View className="mb-6">
          <Text className="font-poppins font-bold text-textPrimary text-xs mb-3">Kategori Wisata</Text>
          <View className="flex-row flex-wrap justify-between">
            {categories.slice(0, 6).map((cat) => (
              <CategoryCard
                key={cat.id}
                name={cat.name}
                showIconOnly
                onPress={() => router.push({ pathname: '/(tabs)/explore', params: { category: cat.name } })}
                className="w-[30%] mb-3.5"
              />
            ))}
          </View>
        </View>

        {popularDestinations.length > 0 && (
          <View className="mb-6">
            <Text className="font-poppins font-bold text-textPrimary text-xs mb-3">Destinasi Populer</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {popularDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  variant="popular"
                  onPress={() => router.push(`/destination/${dest.id}`)}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {recommendedDestinations.length > 0 && (
          <View className="mb-8">
            <Text className="font-poppins font-bold text-textPrimary text-xs mb-3">Rekomendasi Untukmu</Text>
            {recommendedDestinations.map((dest) => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                variant="recommended"
                onPress={() => router.push(`/destination/${dest.id}`)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// home mod 13

// home mod 14
