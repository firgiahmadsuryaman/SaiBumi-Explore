import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { User, MessageSquare, Info, LogOut, ChevronRight, SlidersHorizontal } from 'lucide-react-native';
import { useAuth } from '../../src/context/AuthContext';
import Header from '../../src/components/Header';

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

  const accountItems = [
    {
      title: 'Edit Profil',
      icon: <User size={18} color="#00678F" />,
      bg: '#E0F2FE',
      onPress: () => router.push('/profile/edit')
    },
    {
      title: 'Review Saya',
      icon: <MessageSquare size={18} color="#D97706" />,
      bg: '#FFF3E0',
      onPress: () => Alert.alert('Informasi', 'Halaman Review Saya terintegrasi dengan CMS backend.')
    }
  ];

  const otherItems = [
    {
      title: 'Tentang Aplikasi',
      icon: <Info size={18} color="#059669" />,
      bg: '#E8F5E9',
      onPress: () => router.push('/about')
    },
    {
      title: 'Keluar',
      icon: <LogOut size={18} color="#E11D48" />,
      bg: '#FFEBEE',
      onPress: handleLogout
    }
  ];

  return (
    <View className="flex-1 bg-white">
      <Header
        title="SaiBumi Explore"
        showBackButton={true}
        rightComponent={
          <TouchableOpacity activeOpacity={0.7} className="p-1">
            <SlidersHorizontal size={18} color="#00678F" />
          </TouchableOpacity>
        }
      />
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 py-6 bg-slate-50">
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
            <Text className="font-poppins font-bold text-[#00678F] text-lg">{stats.trips}</Text>
            <Text className="font-poppins text-textSecondary text-[10px] mt-0.5">Perjalanan</Text>
          </View>
          <View className="bg-white flex-1 p-4 rounded-2xl border border-gray-100 shadow-sm items-center ml-2">
            <Text className="font-poppins font-bold text-[#D97706] text-lg">{stats.reviews}</Text>
            <Text className="font-poppins text-textSecondary text-[10px] mt-0.5">Ulasan</Text>
          </View>
        </View>

        <Text className="font-poppins font-bold text-textSecondary text-[10px] uppercase tracking-wider mb-2 ml-1">
          Akun
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-5">
          {accountItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={item.onPress}
              activeOpacity={0.7}
              className={`flex-row items-center justify-between p-4 ${
                idx < accountItems.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <View className="flex-row items-center">
                <View
                  className="w-8 h-8 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: item.bg }}
                >
                  {item.icon}
                </View>
                <Text className="font-poppins text-textPrimary text-xs font-medium">{item.title}</Text>
              </View>
              <ChevronRight size={14} color="#94A3B8" />
            </TouchableOpacity>
          ))}
        </View>

        <Text className="font-poppins font-bold text-textSecondary text-[10px] uppercase tracking-wider mb-2 ml-1">
          Lainnya
        </Text>
        <View className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          {otherItems.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={item.onPress}
              activeOpacity={0.7}
              className={`flex-row items-center justify-between p-4 ${
                idx < otherItems.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <View className="flex-row items-center">
                <View
                  className="w-8 h-8 rounded-xl items-center justify-center mr-3"
                  style={{ backgroundColor: item.bg }}
                >
                  {item.icon}
                </View>
                <Text className="font-poppins text-textPrimary text-xs font-medium">{item.title}</Text>
              </View>
              {item.title !== 'Keluar' && <ChevronRight size={14} color="#94A3B8" />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

