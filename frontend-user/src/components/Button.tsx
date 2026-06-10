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
  let btnStyle = 'h-12 rounded-xl flex-row items-center justify-center px-4';
  let textStyle = 'font-poppins font-semibold text-sm';

  if (variant === 'primary') {
    btnStyle += ' bg-[#00678F]';
    textStyle += ' text-white';
  } else if (variant === 'secondary') {
    btnStyle += ' bg-[#14B8A6]';
    textStyle += ' text-white';
  } else if (variant === 'danger') {
    btnStyle += ' bg-red-500';
    textStyle += ' text-white';
  } else if (variant === 'outline') {
    btnStyle += ' bg-transparent border border-[#00678F]';
    textStyle += ' text-[#00678F]';
  } else if (variant === 'google') {
    btnStyle += ' bg-white border border-gray-200';
    textStyle += ' text-gray-700';
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`${btnStyle} ${className}`}
      style={{
        minHeight: 48,
        ...((variant === 'primary' || variant === 'secondary' || variant === 'danger' || variant === 'google')
          ? {
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.15,
              shadowRadius: 1.5,
              elevation: 2,
            }
          : {}),
        ...(disabled || isLoading ? { opacity: 0.5 } : {}),
      }}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'google' ? '#00678F' : '#FFFFFF'} />
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

// mod button 4
