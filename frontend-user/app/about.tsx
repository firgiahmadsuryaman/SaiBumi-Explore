import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Compass, ChevronRight, ShieldCheck, FileText, Star } from 'lucide-react-native';
import Header from '../src/components/Header';

export default function AboutScreen() {
  const menus = [
    { title: 'Kebijakan Privasi', icon: <ShieldCheck size={18} color="#0EA5E9" /> },
    { title: 'Syarat & Ketentuan', icon: <FileText size={18} color="#14B8A6" /> },
    { title: 'Beri Nilai Aplikasi', icon: <Star size={18} color="#F59E0B" /> }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Tentang Aplikasi" showBackButton />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-8">
        <View className="items-center mb-8 mt-4">
          <View className="w-20 h-20 bg-sky-50 rounded-3xl items-center justify-center shadow-md mb-4 border border-sky-100">
            <Compass size={40} color="#0EA5E9" fill="#E0F2FE" />
          </View>
          <Text className="font-poppins font-bold text-textPrimary text-lg">SaiBumi Explore</Text>
          <Text className="font-poppins text-textSecondary text-[10px] mt-0.5">Versi 1.0.0</Text>
        </View>

        <Text className="font-poppins text-textSecondary text-xs leading-relaxed text-center px-4 mb-10">
          SaiBumi Explore adalah teman perjalanan digital Anda untuk menemukan keindahan tersembunyi, budaya kaya, dan petualangan tak terlupakan di wilayah Lampung. Dirancang dengan cinta untuk pelancong lokal dan internasional, aplikasi ini bertujuan untuk membuat eksplorasi Anda mudah dan menginspirasi.
        </Text>

        <View className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-12">
          {menus.map((item, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => Alert.alert('Informasi', `${item.title} belum tersedia.`)}
              activeOpacity={0.7}
              className={`flex-row items-center justify-between p-4 ${
                idx < menus.length - 1 ? 'border-b border-slate-100' : ''
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

        <View className="mt-auto items-center">
          <Text className="font-poppins text-slate-300 text-[10px] tracking-widest uppercase text-center">
            © 2026 SaiBumi Explore. Dibuat dengan 💙 di Indonesia.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
