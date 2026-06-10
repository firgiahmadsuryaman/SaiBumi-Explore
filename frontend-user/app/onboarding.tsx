import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.7}
            className="bg-slate-100 rounded-full px-3.5 py-1.5"
          >
            <Text className="font-poppins font-bold text-xs text-textSecondary uppercase tracking-wider">
              Lewati
            </Text>
          </TouchableOpacity>
        </View>

        {/* Center Mockup Image */}
        <View
          className="items-center my-6 bg-white rounded-[32px]"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
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

          {/* Slide Indicators */}
          <View className="flex-row justify-center items-center mb-6">
            <View className="w-5 h-1.5 rounded-full bg-[#00678F] mx-1" />
            <View className="w-1.5 h-1.5 rounded-full bg-slate-200 mx-1" />
            <View className="w-1.5 h-1.5 rounded-full bg-slate-200 mx-1" />
          </View>

          {/* Action Button */}
          <TouchableOpacity
            onPress={handleNext}
            activeOpacity={0.8}
            className="w-full bg-[#00678F] h-12 rounded-xl flex-row items-center justify-center"
            style={{
              minHeight: 48,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3.84,
              elevation: 4,
            }}
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
