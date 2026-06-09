import React from 'react';
import { View, Text, Image } from 'react-native';
import { Star } from 'lucide-react-native';

interface ReviewCardProps {
  review: any;
  showDestination?: boolean;
}

export default function ReviewCard({ review, showDestination = false }: ReviewCardProps) {
  const { user, rating, comment, date, destinationName } = review;
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <View className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-3.5">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Image
            source={{ uri: user.avatar }}
            className="w-9 h-9 rounded-full"
            resizeMode="cover"
          />
          <View className="ml-3">
            <Text className="font-poppins font-semibold text-textPrimary text-xs">
              {user.name}
            </Text>
            <Text className="font-poppins text-textSecondary text-[9px] mt-0.5">
              {date}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          {stars.map((star) => (
            <Star
              key={star}
              size={10}
              color="#F59E0B"
              fill={star <= rating ? '#F59E0B' : 'transparent'}
              style={{ marginRight: 2 }}
            />
          ))}
        </View>
      </View>

      {showDestination && destinationName && (
        <View className="mb-2 bg-sky-50 px-2.5 py-1.5 rounded-lg self-start">
          <Text className="font-poppins text-[10px] font-semibold text-sky-600">
            Wisata: {destinationName}
          </Text>
        </View>
      )}

      <Text className="font-poppins text-textSecondary text-xs leading-relaxed">
        {comment}
      </Text>
    </View>
  );
}
