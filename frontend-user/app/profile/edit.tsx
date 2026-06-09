import React, { useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { User, Phone, Mail, Camera } from 'lucide-react-native';
import { useAuth } from '../../src/context/AuthContext';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Header from '../../src/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Edit Profil" showBackButton />
      
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6 py-6">
        <View className="items-center mb-8">
          <View className="relative">
            <View className="w-24 h-24 rounded-full bg-slate-100 items-center justify-center border border-gray-200 overflow-hidden">
              <Camera size={32} color="#64748B" />
            </View>
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
    </SafeAreaView>
  );
}
