import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useFavorites } from '../../src/context/FavoriteContext';
import DestinationCard from '../../src/components/DestinationCard';
import EmptyState from '../../src/components/EmptyState';
import Header from '../../src/components/Header';

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, isLoading, toggleFavorite } = useFavorites();

  return (
    <View className="flex-1 bg-white">
      <Header title="Favorit Saya" showBackButton={true} />
      <View className="flex-1 bg-slate-50 px-4 pt-4">

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#00678F" />
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
      </View>
    </View>
  );
}

// favorites mod 8

// favorites mod 9

// favorites mod 10

// favorites mod 11

// favorites mod 12

// favorites mod 13

// favorites mod 14
