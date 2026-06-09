import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { MapPin, Star, Heart } from 'lucide-react-native';

interface DestinationCardProps {
  destination: any;
  onPress: () => void;
  variant?: 'popular' | 'recommended' | 'explore' | 'favorite';
  isFavorite?: boolean;
  onFavoritePress?: () => void;
}

export default function DestinationCard({
  destination,
  onPress,
  variant = 'explore',
  isFavorite = false,
  onFavoritePress,
}: DestinationCardProps) {
  const { name, thumbnail, address, rating, ticketPrice, category } = destination;

  // Format IDR Price
  const formatPrice = (price: number) => {
    if (price === 0) return 'Gratis';
    return `Rp ${price.toLocaleString('id-ID')}`;
  };

  const categoryName = category?.name || destination.category || 'Wisata';

  if (variant === 'popular') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mr-4"
        style={{ width: 170 }}
      >
        <Image
          source={{ uri: thumbnail }}
          className="w-full h-28"
          resizeMode="cover"
        />
        <View className="p-3">
          <Text className="font-poppins font-semibold text-textPrimary text-xs mb-1" numberOfLines={1}>
            {name}
          </Text>
          <View className="flex-row items-center justify-between mt-1">
            <View className="flex-row items-center flex-1 mr-1">
              <MapPin size={10} color="#64748B" />
              <Text className="font-poppins text-textSecondary text-[9px] ml-0.5" numberOfLines={1}>
                {address.split(',')[1] || address}
              </Text>
            </View>
            <View className="flex-row items-center bg-amber-50 px-1.5 py-0.5 rounded-lg">
              <Star size={9} color="#F59E0B" fill="#F59E0B" />
              <Text className="font-poppins font-bold text-amber-500 text-[9px] ml-0.5">
                {rating.toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'recommended') {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-3.5 p-3 flex-row items-center"
      >
        <Image
          source={{ uri: thumbnail }}
          className="w-18 h-18 rounded-xl"
          resizeMode="cover"
        />
        <View className="flex-1 ml-3.5">
          <Text className="font-poppins font-semibold text-textPrimary text-xs" numberOfLines={1}>
            {name}
          </Text>
          <Text className="font-poppins text-textSecondary text-[10px] mt-0.5" numberOfLines={1}>
            {address.split(',')[1] || address}
          </Text>
          <Text className="font-poppins font-bold text-sky-500 text-[11px] mt-1.5">
            {formatPrice(ticketPrice)}
          </Text>
        </View>
        <View className="flex-row items-center bg-amber-50 px-2 py-1 rounded-lg self-center">
          <Star size={11} color="#F59E0B" fill="#F59E0B" />
          <Text className="font-poppins font-bold text-amber-500 text-[10px] ml-0.5">
            {rating.toFixed(1)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === 'favorite') {
    return (
      <View className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
        <View className="relative">
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-44"
            resizeMode="cover"
          />
          <View className="absolute top-3 left-3 bg-sky-500/80 px-2.5 py-1 rounded-full">
            <Text className="font-poppins text-white text-[9px] font-semibold">
              {categoryName}
            </Text>
          </View>
          {onFavoritePress && (
            <TouchableOpacity
              onPress={onFavoritePress}
              activeOpacity={0.7}
              className="absolute top-3 right-3 bg-white/95 p-2 rounded-full shadow-sm"
            >
              <Heart size={16} color="#EF4444" fill="#EF4444" />
            </TouchableOpacity>
          )}
          <View className="absolute bottom-3 right-3 bg-white/95 px-2 py-1 rounded-lg flex-row items-center shadow-sm">
            <Star size={11} color="#F59E0B" fill="#F59E0B" />
            <Text className="font-poppins font-bold text-amber-500 text-[10px] ml-0.5">
              {rating.toFixed(1)}
            </Text>
          </View>
        </View>
        <View className="p-4">
          <Text className="font-poppins font-bold text-textPrimary text-sm mb-1">
            {name}
          </Text>
          <View className="flex-row items-center mb-4">
            <MapPin size={12} color="#64748B" />
            <Text className="font-poppins text-textSecondary text-[10px] ml-1" numberOfLines={1}>
              {address}
            </Text>
          </View>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            className="w-full h-10 bg-sky-500 rounded-xl items-center justify-center"
          >
            <Text className="font-poppins font-semibold text-white text-xs">
              Lihat Detail
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Explore style card
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-4"
    >
      <View className="relative">
        <Image
          source={{ uri: thumbnail }}
          className="w-full h-48"
          resizeMode="cover"
        />
        <View className="absolute top-3 left-3 bg-sky-500 px-3 py-1 rounded-full">
          <Text className="font-poppins text-white text-[9px] font-semibold">
            {categoryName}
          </Text>
        </View>
        {onFavoritePress && (
          <TouchableOpacity
            onPress={onFavoritePress}
            activeOpacity={0.7}
            className="absolute top-3 right-3 bg-white/95 p-2.5 rounded-full shadow-sm"
          >
            <Heart size={16} color={isFavorite ? '#EF4444' : '#64748B'} fill={isFavorite ? '#EF4444' : 'transparent'} />
          </TouchableOpacity>
        )}
        <View className="absolute bottom-3 right-3 bg-white/95 px-2 py-1 rounded-lg flex-row items-center shadow-sm">
          <Star size={11} color="#F59E0B" fill="#F59E0B" />
          <Text className="font-poppins font-bold text-amber-500 text-[10px] ml-0.5">
            {rating.toFixed(1)}
          </Text>
        </View>
      </View>
      <View className="p-4">
        <Text className="font-poppins font-bold text-textPrimary text-sm mb-1">
          {name}
        </Text>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-2">
            <MapPin size={12} color="#64748B" />
            <Text className="font-poppins text-textSecondary text-[10px] ml-1" numberOfLines={1}>
              {address}
            </Text>
          </View>
          <Text className="font-poppins font-bold text-sky-500 text-xs">
            {formatPrice(ticketPrice)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// mod dest 1
