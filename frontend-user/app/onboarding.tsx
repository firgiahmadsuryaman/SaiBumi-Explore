import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.replace('/auth/login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-between px-6 py-6">
        {/* Skip Header */}
        <View className="flex-row justify-end">
          <TouchableOpacity onPress={handleNext} activeOpacity={0.7} className="py-2 px-1">
            <Text className="font-poppins font-medium text-xs text-textSecondary uppercase tracking-wider">
              Lewati
            </Text>
          </TouchableOpacity>
        </View>

        {/* Center Mockup Image */}
        <View className="items-center my-6">
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
            }}
            className="w-full h-80 rounded-[32px]"
            resizeMode="cover"
          />
        </View>

        {/* Text & Button Column */}
        <View className="mb-6">
          <Text className="font-poppins font-bold text-textPrimary text-2xl text-center leading-tight mb-3">
            Temukan Destinasi Wisata Lampung
          </Text>
          <Text className="font-poppins text-textSecondary text-xs text-center leading-relaxed px-4 mb-8">
            Jelajahi keindahan alam tersembunyi mulai dari pantai berpasir putih hingga pegunungan megah di SaiBumi Ruwa Jurai.
          </Text>

          {/* Action Button */}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            className="w-full bg-sky-500 h-12 rounded-xl flex-row items-center justify-center shadow-md"
            style={{ minHeight: 48 }}
          >
            <Text className="font-poppins font-bold text-white text-sm mr-2">
              Lanjut
            </Text>
            <ArrowRight size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// refined onboarding

// onboarding mod 1

// onboarding mod 2
