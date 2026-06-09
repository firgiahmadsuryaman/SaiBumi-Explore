import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'google';
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  icon,
  className = '',
}: ButtonProps) {
  let btnStyle = 'h-12 rounded-xl flex-row items-center justify-center px-4 shadow-sm';
  let textStyle = 'font-poppins font-semibold text-sm';

  if (variant === 'primary') {
    btnStyle += ' bg-sky-500';
    textStyle += ' text-white';
  } else if (variant === 'secondary') {
    btnStyle += ' bg-teal-500';
    textStyle += ' text-white';
  } else if (variant === 'danger') {
    btnStyle += ' bg-red-500';
    textStyle += ' text-white';
  } else if (variant === 'outline') {
    btnStyle += ' bg-transparent border border-sky-500';
    textStyle += ' text-sky-500';
  } else if (variant === 'google') {
    btnStyle += ' bg-white border border-gray-200 shadow-sm';
    textStyle += ' text-gray-700';
  }

  if (disabled || isLoading) {
    btnStyle += ' opacity-50';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`${btnStyle} ${className}`}
      style={{ minHeight: 48 }}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'google' ? '#0EA5E9' : '#FFFFFF'} />
      ) : (
        <View className="flex-row items-center justify-center">
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={textStyle}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// mod button 1

// mod button 2

// mod button 3
