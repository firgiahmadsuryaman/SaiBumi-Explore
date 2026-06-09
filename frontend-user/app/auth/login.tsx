import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
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
    const newErrors = {};
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
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 justify-center px-6">
        <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-sky-50 rounded-2xl items-center justify-center mb-3">
              <Compass size={32} color="#0EA5E9" fill="#E0F2FE" />
            </View>
            <Text className="font-poppins font-bold text-textPrimary text-xl text-center">
              Selamat Datang
            </Text>
            <Text className="font-poppins text-textSecondary text-xs text-center mt-1">
              Masuk untuk memulai petualangan di Lampung
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
              <Text className="font-poppins font-medium text-xs text-sky-500">
                Lupa Kata Sandi?
              </Text>
            </TouchableOpacity>
          </View>

          <Button title="Masuk" onPress={handleLogin} isLoading={isLoading} className="mb-4" />
          
          <Button
            title="Masuk dengan Google"
            onPress={() => Alert.alert('Informasi', 'Fitur masuk dengan Google belum tersedia')}
            variant="google"
            className="mb-6"
          />

          <View className="flex-row justify-center">
            <Text className="font-poppins text-textSecondary text-xs">
              Belum punya akun?{' '}
            </Text>
            <TouchableOpacity onPress={() => router.push('/auth/register')} activeOpacity={0.7}>
              <Text className="font-poppins font-bold text-sky-500 text-xs">
                Daftar sekarang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
