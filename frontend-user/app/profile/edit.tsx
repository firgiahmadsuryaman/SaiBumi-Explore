import React, { useState } from 'react';
import { View, Text, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Phone, Mail, Camera } from 'lucide-react-native';
import { useAuth } from '../../src/context/AuthContext';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Header from '../../src/components/Header';

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const validate = () => {
    const newErrors: Record<string, string | undefined> = {};
    if (!name) newErrors.name = 'Nama lengkap wajib diisi';
    if (!email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }
    if (!phone) newErrors.phone = 'Nomor telepon wajib diisi';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    setIsLoading(true);
    const res = await updateProfile({ name, email, phoneNumber: phone });
    setIsLoading(false);
    if (res.success) {
      Alert.alert('Sukses', 'Profil berhasil diperbarui!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      Alert.alert('Gagal', res.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Edit Profil" showBackButton />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-6">
        <View className="items-center mb-8">
          <View className="relative">
            <Image
              source={{ uri: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' }}
              className="w-24 h-24 rounded-full border-2 border-slate-100 shadow-sm"
            />
            <TouchableOpacity
              activeOpacity={0.8}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#00678F] items-center justify-center border-2 border-white shadow-md"
              onPress={() => Alert.alert('Informasi', 'Unggah foto profil baru belum tersedia.')}
            >
              <Camera size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <Input
          label="Nama Lengkap"
          placeholder="Masukkan nama lengkap Anda"
          value={name}
          onChangeText={(txt) => {
            setName(txt);
            if (errors.name) setErrors({ ...errors, name: undefined });
          }}
          leftIcon={<User size={16} color="#64748B" />}
          error={errors.name}
        />

        <Input
          label="Email"
          placeholder="Masukkan email Anda"
          value={email}
          onChangeText={(txt) => {
            setEmail(txt);
            if (errors.email) setErrors({ ...errors, email: undefined });
          }}
          keyboardType="email-address"
          leftIcon={<Mail size={16} color="#64748B" />}
          error={errors.email}
        />

        <Input
          label="Nomor Telepon"
          placeholder="Contoh: +62 812 3456 7890"
          value={phone}
          onChangeText={(txt) => {
            setPhone(txt);
            if (errors.phone) setErrors({ ...errors, phone: undefined });
          }}
          keyboardType="phone-pad"
          leftIcon={<Phone size={16} color="#64748B" />}
          error={errors.phone}
        />

        <Button title="Simpan Perubahan" onPress={handleSave} isLoading={isLoading} className="mt-6" />
      </ScrollView>
    </View>
  );
}
