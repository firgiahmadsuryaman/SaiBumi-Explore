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
    <View
      className="flex-1 bg-white items-center justify-between py-20"
    >
      <View />

      <View className="items-center">
        {/* Logo Container */}
        <View
          className="w-24 h-24 bg-white rounded-3xl items-center justify-center mb-6"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.12,
            shadowRadius: 6,
            elevation: 5,
          }}
        >
          <View className="w-16 h-16 bg-[#00678F] rounded-full items-center justify-center">
            <Compass size={36} color="#FFFFFF" />
          </View>
        </View>
        <Text className="font-poppins font-bold text-[#0F172A] text-3xl tracking-wide">
          SaiBumi Explore
        </Text>
        <Text
          className="font-poppins text-[#64748B] text-xs mt-2 tracking-widest uppercase"
          style={{ opacity: 0.9 }}
        >
          Jelajahi Keindahan Lampung
        </Text>
      </View>

      <View className="items-center">
        <ActivityIndicator size="small" color="#00678F" className="mb-2" />
        <Text
          className="font-poppins font-bold text-[#64748B] text-[10px] tracking-widest uppercase"
          style={{ opacity: 0.8 }}
        >
          Memuat
        </Text>
      </View>
    </View>
  );
}

// refined splash

// splash mod 1

// splash mod 2

// splash mod 3

// timer adjusted
