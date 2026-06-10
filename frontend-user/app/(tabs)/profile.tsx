import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { User, MessageSquare, Info, LogOut, ChevronRight } from 'lucide-react-native';
import { useAuth } from '../../src/context/AuthContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout, api } = useAuth();
  const [stats, setStats] = useState({ trips: 12, reviews: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const favsRes = await api.get('/favorite');
        const revsRes = await api.get('/reviews/my');
        setStats({
          trips: favsRes.data.length || 0,
          reviews: revsRes.data.length || 0
        });
      } catch (err) {
        console.error(err);
      }
    };
    if (user) {
      fetchStats();
    }
  }, [user]);

  const handleLogout = () => {
    Alert.alert(
      'Keluar Akun',
      'Apakah Anda yakin ingin keluar dari aplikasi?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Keluar',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/auth/login');
          }
        }
      ]
    );
  };

  const menuItems = [
    {
      title: 'Edit Profil',
      icon: <User size={18} color="#0EA5E9" />,
      onPress: () => router.push('/profile/edit')
    },
    {
      title: 'Review Saya',
      icon: <MessageSquare size={18} color="#14B8A6" />,
      onPress: () => Alert.alert('Informasi', 'Halaman Review Saya terintegrasi dengan CMS backend.')
    },
    {
      title: 'Tentang Aplikasi',
      icon: <Info size={18} color="#F59E0B" />,
      onPress: () => router.push('/about')
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 py-6">
        <View className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center mb-6">
          <Image
            source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
            className="w-18 h-18 rounded-full mb-3 border border-slate-100"
          />
          <Text className="font-poppins font-bold text-textPrimary text-base">
            {user?.name || 'Nama Pengguna'}
          </Text>
          <Text className="font-poppins text-textSecondary text-xs">
            {user?.email || 'tamu@saibumi.com'}
          </Text>
        </View>

        <View className="flex-row justify-between mb-6">
          <View className="bg-white flex-1 p-4 rounded-2xl border border-gray-100 shadow-sm items-center mr-2">
            <Text className="font-poppins font-bold text-sky-500 text-lg">{stats.trips}</Text>
            <Text className="font-poppins text-textSecondary text-[10px] mt-0.5">Destinasi Favorit</Text>
          </View>
          <View className="bg-white flex-1 p-4 rounded-2xl border border-gray-100 shadow-sm items-center ml-2">
            <Text className="font-poppins font-bold text-teal-500 text-lg">{stats.reviews}</Text>
            <Text className="font-poppins text-textSecondary text-[10px] mt-0.5">Ulasan Saya</Text>
          </View>
        </View>

        <View className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          {menuItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={item.onPress}
              activeOpacity={0.7}
              className={`flex-row items-center justify-between p-4 ${
                idx < menuItems.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <View className="flex-row items-center">
                <View className="w-8 h-8 rounded-xl bg-slate-50 items-center justify-center mr-3">
                  {item.icon}
                </View>
                <Text className="font-poppins text-textPrimary text-xs font-medium">{item.title}</Text>
              </View>
              <ChevronRight size={14} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          onPress={handleLogout}
          activeOpacity={0.7}
          className="bg-red-50 border border-red-100 p-4 rounded-2xl flex-row items-center justify-center mb-8"
        >
          <LogOut size={16} color="#EF4444" />
          <Text className="font-poppins font-bold text-danger text-xs ml-2">Keluar Akun</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
