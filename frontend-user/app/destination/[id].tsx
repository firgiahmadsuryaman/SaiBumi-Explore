import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, Alert, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Heart, Share2, MapPin, Star, Ticket, Clock } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/context/AuthContext';
import { useFavorites } from '../../src/context/FavoriteContext';
import Button from '../../src/components/Button';

export default function DestinationDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { api } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [destination, setDestination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const loadDetail = async () => {
    setIsLoading(true);
    try {
      const res = await api.get(`/destinations/${id}`);
      setDestination(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'Gagal memuat detail destinasi');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadDetail();
  }, [id]);

  const handleShare = () => {
    Alert.alert('Bagikan', `Bagikan keindahan ${destination?.name} ke teman-temanmu!`);
  };

  const handleOpenMap = () => {
    if (!destination) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${destination.latitude},${destination.longitude}`;
    Linking.openURL(url).catch(() => Alert.alert('Error', 'Gagal membuka Google Maps'));
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center">
        <ActivityIndicator size="large" color="#0EA5E9" />
      </SafeAreaView>
    );
  }

  if (!destination) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50 items-center justify-center p-6">
        <Text className="font-poppins text-textPrimary text-sm text-center mb-4">
          Destinasi tidak ditemukan.
        </Text>
        <Button title="Kembali" onPress={() => router.back()} className="w-36" />
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="mb-20">
        <View className="relative h-72">
          <Image source={{ uri: destination.thumbnail }} className="w-full h-full" resizeMode="cover" />
          
          <SafeAreaView className="absolute inset-x-0 top-0 flex-row justify-between px-4 pt-2">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-9 h-9 rounded-full bg-black/40 items-center justify-center"
            >
              <ArrowLeft size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <View className="flex-row gap-2">
              <TouchableOpacity
                onPress={handleShare}
                className="w-9 h-9 rounded-full bg-black/40 items-center justify-center"
              >
                <Share2 size={16} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => toggleFavorite(destination.id)}
                className="w-9 h-9 rounded-full bg-black/40 items-center justify-center"
              >
                <Heart size={16} color={isFavorite(destination.id) ? '#EF4444' : '#FFFFFF'} fill={isFavorite(destination.id) ? '#EF4444' : 'transparent'} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          <View className="absolute bottom-4 right-4 bg-white/95 px-3 py-1.5 rounded-xl flex-row items-center shadow-md">
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <Text className="font-poppins font-bold text-amber-500 text-xs ml-1">
              {destination.rating.toFixed(1)}
            </Text>
            <Text className="font-poppins text-textSecondary text-[9px] ml-1">
              ({destination.reviewsCount} Ulasan)
            </Text>
          </View>
        </View>

        <View className="p-5">
          <View className="bg-sky-50 px-3 py-1.5 rounded-full self-start mb-2">
            <Text className="font-poppins text-sky-600 text-[10px] font-semibold">
              {destination.category}
            </Text>
          </View>
          <Text className="font-poppins font-bold text-textPrimary text-xl mb-1.5">
            {destination.name}
          </Text>
          <View className="flex-row items-center mb-5">
            <MapPin size={12} color="#64748B" />
            <Text className="font-poppins text-textSecondary text-[10px] ml-1 flex-1" numberOfLines={1}>
              {destination.address}
            </Text>
          </View>

          <View className="flex-row justify-between mb-6 border-y border-slate-100 py-3">
            <View className="flex-row items-center flex-1">
              <View className="w-8 h-8 rounded-lg bg-sky-50 items-center justify-center mr-2.5">
                <Ticket size={16} color="#0EA5E9" />
              </View>
              <View>
                <Text className="font-poppins text-textSecondary text-[9px]">Tiket Masuk</Text>
                <Text className="font-poppins font-semibold text-textPrimary text-xs mt-0.5">
                  {destination.ticketPrice === 0 ? 'Gratis' : `Rp ${destination.ticketPrice.toLocaleString('id-ID')}`}
                </Text>
              </View>
            </View>
            <View className="flex-row items-center flex-1 border-l border-slate-100 pl-4">
              <View className="w-8 h-8 rounded-lg bg-teal-50 items-center justify-center mr-2.5">
                <Clock size={16} color="#14B8A6" />
              </View>
              <View>
                <Text className="font-poppins text-textSecondary text-[9px]">Jam Buka</Text>
                <Text className="font-poppins font-semibold text-textPrimary text-xs mt-0.5">
                  {destination.openTime} - {destination.closeTime}
                </Text>
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="font-poppins font-bold text-textPrimary text-xs mb-2">Deskripsi</Text>
            <Text
              className="font-poppins text-textSecondary text-xs leading-relaxed"
              numberOfLines={showFullDesc ? undefined : 4}
            >
              {destination.description}
            </Text>
            <TouchableOpacity onPress={() => setShowFullDesc(!showFullDesc)} activeOpacity={0.7} className="mt-1">
              <Text className="font-poppins font-bold text-sky-500 text-[10px]">
                {showFullDesc ? 'Sembunyikan' : 'Baca Selengkapnya'}
              </Text>
            </TouchableOpacity>
          </View>

          {destination.facilities?.length > 0 && (
            <View className="mb-6">
              <Text className="font-poppins font-bold text-textPrimary text-xs mb-3">Fasilitas</Text>
              <View className="flex-row flex-wrap gap-2">
                {destination.facilities.map((f: string, idx: number) => (
                  <View key={idx} className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 flex-row items-center">
                    <Text className="font-poppins text-textPrimary text-[10px] font-medium">{f}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View className="mb-6">
            <Text className="font-poppins font-bold text-textPrimary text-xs mb-3">Lokasi</Text>
            <TouchableOpacity
              onPress={handleOpenMap}
              activeOpacity={0.9}
              className="bg-slate-100 rounded-2xl h-24 overflow-hidden border border-slate-200 justify-center items-center"
            >
              <View className="items-center">
                <MapPin size={24} color="#0EA5E9" />
                <Text className="font-poppins font-semibold text-sky-600 text-[10px] mt-1">
                  Lihat di Peta Arah
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-between items-center mb-6">
            <Text className="font-poppins font-bold text-textPrimary text-xs">Ulasan Pengunjung</Text>
            <TouchableOpacity onPress={() => router.push(`/reviews/${destination.id}`)} activeOpacity={0.7}>
              <Text className="font-poppins font-bold text-sky-500 text-[10px]">Lihat Semua</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 inset-x-0 bg-white border-t border-slate-100 px-6 py-4 flex-row items-center justify-between shadow-lg">
        <View>
          <Text className="font-poppins text-textSecondary text-[9px]">Harga Tiket</Text>
          <Text className="font-poppins font-bold text-sky-500 text-base mt-0.5">
            {destination.ticketPrice === 0 ? 'Gratis' : `Rp ${destination.ticketPrice.toLocaleString('id-ID')}`}
          </Text>
        </View>
        <Button title="Pesan Sekarang" onPress={handleOpenMap} className="w-44 h-10" />
      </View>
    </View>
  );
}

// maps integrated

// map open action
