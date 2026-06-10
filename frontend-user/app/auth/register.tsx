import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, User, Phone, Camera } from 'lucide-react-native';
import { useAuth } from '../../src/context/AuthContext';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (!password) {
      newErrors.password = 'Kata sandi wajib diisi';
    } else if (password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Konfirmasi kata sandi tidak cocok';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    setIsLoading(true);
    const res = await register(name, email, password, phone);
    setIsLoading(false);
    if (res.success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Registrasi Gagal', res.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-8 py-8"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-6">
          <Text className="font-poppins font-bold text-textPrimary text-2xl text-center">
            Mulai Petualanganmu
          </Text>
          <Text className="font-poppins text-textSecondary text-xs text-center mt-1">
            Buat akun untuk menjelajahi keindahan Lampung
          </Text>
        </View>

        <View className="items-center mb-6">
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-20 h-20 bg-slate-100 rounded-full items-center justify-center border border-gray-200"
            onPress={() => Alert.alert('Pilih Foto', 'Fitur unggah foto belum tersedia')}
          >
            <Camera size={24} color="#64748B" />
          </TouchableOpacity>
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

        <Input
          label="Kata Sandi"
          placeholder="Minimal 6 karakter"
          value={password}
          onChangeText={(txt) => {
            setPassword(txt);
            if (errors.password) setErrors({ ...errors, password: undefined });
          }}
          secureTextEntry
          leftIcon={<Lock size={16} color="#64748B" />}
          error={errors.password}
        />

        <Input
          label="Konfirmasi Kata Sandi"
          placeholder="Ulangi kata sandi"
          value={confirmPassword}
          onChangeText={(txt) => {
            setConfirmPassword(txt);
            if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
          }}
          secureTextEntry
          leftIcon={<Lock size={16} color="#64748B" />}
          error={errors.confirmPassword}
        />

        <Button title="Daftar" onPress={handleRegister} isLoading={isLoading} className="mt-4 mb-6" />

        <View className="flex-row justify-center">
          <Text className="font-poppins text-textSecondary text-xs">
            Sudah punya akun?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.replace('/auth/login')} activeOpacity={0.7}>
            <Text className="font-poppins font-bold text-sky-500 text-xs">
              Masuk
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
