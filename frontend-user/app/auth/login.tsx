import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Compass } from 'lucide-react-native';
import { useAuth } from '../../src/context/AuthContext';
import Input from '../../src/components/Input';
import Button from '../../src/components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);
    if (res.success) {
      router.replace('/(tabs)');
    } else {
      Alert.alert('Gagal Masuk', res.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="px-8 py-6"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="items-center mb-6">
          <View className="w-16 h-16 bg-[#00678F] rounded-2xl items-center justify-center mb-3.5">
            <Compass size={32} color="#FFFFFF" />
          </View>
          <Text className="font-poppins font-bold text-textPrimary text-2xl text-center">
            Selamat Datang
          </Text>
          <Text className="font-poppins text-textSecondary text-xs text-center mt-1">
            Masuk untuk memulai petualangan di SaiBumi.
          </Text>
        </View>

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

        <View className="flex-row justify-end mb-6">
          <TouchableOpacity activeOpacity={0.7}>
            <Text className="font-poppins font-semibold text-xs text-[#00678F]">
              Lupa Kata Sandi?
            </Text>
          </TouchableOpacity>
        </View>

        <Button title="Masuk  →" onPress={handleLogin} isLoading={isLoading} className="mb-4" />
        
        <View className="flex-row items-center my-4">
          <View className="flex-1 h-[1px] bg-slate-200" />
          <Text className="font-poppins text-slate-400 text-[10px] mx-3 uppercase tracking-wider">atau</Text>
          <View className="flex-1 h-[1px] bg-slate-200" />
        </View>

        <Button
          title="Masuk dengan Google"
          onPress={() => Alert.alert('Informasi', 'Fitur masuk dengan Google belum tersedia')}
          variant="google"
          icon={
            <Image
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/120px-Google_%22G%22_logo.png' }}
              className="w-4 h-4 mr-2"
              resizeMode="contain"
            />
          }
          className="mb-6"
        />

        <View className="flex-row justify-center">
          <Text className="font-poppins text-textSecondary text-xs">
            Belum punya akun?{' '}
          </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')} activeOpacity={0.7}>
            <Text className="font-poppins font-bold text-[#00678F] text-xs">
              Daftar sekarang
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
