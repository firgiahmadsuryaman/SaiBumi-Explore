import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useFavorites } from '../../src/context/FavoriteContext';
import DestinationCard from '../../src/components/DestinationCard';
import EmptyState from '../../src/components/EmptyState';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, isLoading, toggleFavorite } = useFavorites();

  return (
    <SafeAreaView className="flex-1 bg-slate-50 px-4 pt-4">
      <Text className="font-poppins font-bold text-textPrimary text-lg mb-4 ml-1">
        Favorit Saya
      </Text>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#0EA5E9" />
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DestinationCard
              destination={item}
              variant="favorite"
              onFavoritePress={() => toggleFavorite(item.id)}
              onPress={() => router.push(`/destination/${item.id}`)}
            />
          )}
          ListEmptyComponent={
            <EmptyState
              title="Belum Ada Favorit"
              description="Mulai jelajahi destinasi dan simpan tempat wisata favorit Anda di sini."
              actionTitle="Jelajahi Wisata"
              onActionPress={() => router.push('/(tabs)/explore')}
            />
          }
        />
      )}
    </SafeAreaView>
  );
}

// favorites mod 8
