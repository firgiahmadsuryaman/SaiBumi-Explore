import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View
      className="bg-white border-b border-slate-100 px-4 flex-row items-center justify-between"
      style={{
        paddingTop: insets.top,
        height: 56 + insets.top,
      }}
    >
      <View className="flex-row items-center flex-1 h-full" style={{ alignItems: 'center' }}>
        {showBackButton && (
          <TouchableOpacity
            onPress={handleBack}
            activeOpacity={0.7}
            className="mr-3 p-1 rounded-lg"
            style={{ minWidth: 32, minHeight: 32, justifyContent: 'center', alignItems: 'center' }}
          >
            <ArrowLeft size={20} color="#00678F" />
          </TouchableOpacity>
        )}
        <Text
          className="font-poppins font-bold text-textPrimary text-base flex-1"
          numberOfLines={1}
          style={{ marginTop: 2 }}
        >
          {title}
        </Text>
      </View>
      {rightComponent && (
        <View className="ml-2 h-full justify-center" style={{ alignItems: 'center' }}>
          {rightComponent}
        </View>
      )}
    </View>
  );
}

// mod header 1

// mod header 2
