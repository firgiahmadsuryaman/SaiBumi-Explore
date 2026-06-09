import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Star } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../src/context/AuthContext';
import Header from '../../src/components/Header';
import ReviewCard from '../../src/components/ReviewCard';
import Button from '../../src/components/Button';
import EmptyState from '../../src/components/EmptyState';

export default function ReviewsScreen() {
  const { id } = useLocalSearchParams();
  const { api, user } = useAuth();
  
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/reviews', { params: { destinationId: id } });
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) loadReviews();
  }, [id]);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      Alert.alert('Perhatian', 'Komentar ulasan wajib diisi');
      return;
    }
    setIsSubmitting(true);
    try {
      await api.post('/reviews', {
        destinationId: id,
        rating,
        comment
      });
      setComment('');
      setRating(5);
      Alert.alert('Sukses', 'Ulasan Anda berhasil dikirim!');
      loadReviews();
    } catch (err) {
      console.error(err);
      Alert.alert('Gagal', 'Gagal mengirim ulasan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header title="Ulasan" showBackButton />

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 16 }}
        ListHeaderComponent={
          user && (
            <View className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
              <Text className="font-poppins font-bold text-textPrimary text-xs mb-2">Tulis Ulasan Anda</Text>
              
              <View className="flex-row mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <TouchableOpacity key={star} onPress={() => setRating(star)} activeOpacity={0.7} className="mr-1.5">
                    <Star size={20} color="#F59E0B" fill={star <= rating ? '#F59E0B' : 'transparent'} />
                  </TouchableOpacity>
                ))}
              </View>

              <TextInput
                placeholder="Ceritakan pengalaman Anda di sini..."
                value={comment}
                onChangeText={setComment}
                multiline
                numberOfLines={3}
                placeholderTextColor="#94A3B8"
                className="bg-white border border-slate-200 rounded-xl p-3 font-poppins text-xs text-textPrimary min-h-[80px] mb-3"
                style={{ textAlignVertical: 'top' }}
              />

              <Button title="Kirim Ulasan" onPress={handleSubmit} isLoading={isSubmitting} className="h-10" />
            </View>
          )
        }
        renderItem={({ item }) => <ReviewCard review={item} />}
        ListEmptyComponent={
          !isLoading ? (
            <EmptyState
              title="Belum Ada Ulasan"
              description="Jadilah yang pertama menuliskan ulasan tentang destinasi wisata ini."
            />
          ) : null
        }
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="small" color="#0EA5E9" className="my-4" /> : null
        }
      />
    </SafeAreaView>
  );
}
