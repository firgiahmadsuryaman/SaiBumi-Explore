import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Compass } from 'lucide-react-native';
import { useAuth } from '../src/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function SplashScreen() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (user) {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding');
        }
      }, 2500); // 2.5 seconds duration

      return () => clearTimeout(timer);
    }
  }, [isLoading, user]);

  return (
    <LinearGradient
      colors={['#0EA5E9', '#14B8A6']}
      className="flex-1 items-center justify-between py-20"
    >
      <View />

      <View className="items-center">
        {/* Logo Container */}
        <View
          className="w-24 h-24 bg-white rounded-3xl items-center justify-center mb-6"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <Compass size={48} color="#0EA5E9" fill="#E0F2FE" />
        </View>
        <Text className="font-poppins font-bold text-white text-3xl tracking-wide">
          SaiBumi Explore
        </Text>
        <Text
          className="font-poppins text-white text-sm mt-2 tracking-widest uppercase"
          style={{ opacity: 0.9 }}
        >
          Jelajahi Keindahan Lampung
        </Text>
      </View>

      <View className="items-center">
        <ActivityIndicator size="small" color="#FFFFFF" className="mb-2" />
        <Text
          className="font-poppins font-bold text-white text-[10px] tracking-widest uppercase"
          style={{ opacity: 0.8 }}
        >
          Memuat
        </Text>
      </View>
    </LinearGradient>
  );
}

// refined splash

// splash mod 1

// splash mod 2

// splash mod 3

// timer adjusted
