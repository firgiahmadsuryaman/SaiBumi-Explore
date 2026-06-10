import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, User, Compass } from 'lucide-react-native';
import { useAuth } from '../../src/context/AuthContext';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import Header from '../../src/components/Header';

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
    const res = await register(name, email, password, '');
    setIsLoading(false);
    if (res.success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Registrasi Gagal', res.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Header title="Daftar Akun Baru" showBackButton={true} />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-8 py-6"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-6">
          <View className="w-16 h-16 bg-[#00678F] rounded-full items-center justify-center mb-4">
            <Compass size={32} color="#FFFFFF" />
          </View>
          <Text className="font-poppins font-bold text-textPrimary text-2xl text-center">
            Mulai Petualanganmu
          </Text>
          <Text className="font-poppins text-textSecondary text-xs text-center mt-1">
            Buat akun untuk menjelajahi keindahan Lampung bersama SaiBumi Explore
          </Text>
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
          label="Kata Sandi"
          placeholder="Masukkan kata sandi"
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
            <Text className="font-poppins font-bold text-[#00678F] text-xs">
              Masuk
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
