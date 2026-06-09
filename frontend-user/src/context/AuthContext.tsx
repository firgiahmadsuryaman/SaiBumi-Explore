import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3001' : 'http://localhost:3001';

export const api = axios.create({
  baseURL: BASE_URL,
});

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        const storedUser = await AsyncStorage.getItem('user');
        if (storedToken && storedUser) {
          setToken(storedToken);
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (e) {
        console.error('Failed to load session', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (email: string, pass: string) => {
    try {
      const res = await api.post('/auth/login', { email, password: pass });
      const { access_token, user: userData } = res.data;
      setToken(access_token);
      setUser(userData);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      await AsyncStorage.setItem('token', access_token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Email atau kata sandi salah' 
      };
    }
  };

  const register = async (name: string, email: string, pass: string, phoneNumber: string) => {
    try {
      const res = await api.post('/auth/register', { name, email, password: pass, phoneNumber });
      const { access_token, user: userData } = res.data;
      setToken(access_token);
      setUser(userData);
      api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      await AsyncStorage.setItem('token', access_token);
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Registrasi gagal' 
      };
    }
  };

  const logout = async () => {
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  const updateProfile = async (data: { name?: string; email?: string; phoneNumber?: string; avatar?: string }) => {
    try {
      const res = await api.patch('/auth/profile', data);
      const updatedUser = { ...user, ...res.data };
      setUser(updatedUser);
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (err: any) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Gagal memperbarui profil' 
      };
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, register, logout, updateProfile, api, BASE_URL }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// mod authctx 1

// mod authctx 2

// mod authctx 3

// mod authctx 4

// mod authctx 5
