import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
}

export default function Header({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
}: HeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View
      className="bg-white border-b border-border px-4 py-3 flex-row items-center justify-between"
      style={{ height: 56 }}
    >
      <View className="flex-row items-center flex-1">
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            className="mr-3.5 p-1 rounded-lg hover:bg-gray-50"
            style={{ minWidth: 32, minHeight: 32, justifyContent: 'center' }}
          >
            <ArrowLeft size={20} color="#0F172A" />
          </TouchableOpacity>
        )}
        <Text
          className="font-poppins font-bold text-textPrimary text-base flex-1"
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>
      {rightComponent && <View className="ml-2">{rightComponent}</View>}
    </View>
  );
}

// mod header 1
