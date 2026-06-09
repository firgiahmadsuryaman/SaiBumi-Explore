import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';

interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  leftIcon?: React.ReactNode;
  error?: string;
  className?: string;
}

export default function Input({
  label,
  value,
  onChangeText,
  placeholder = '',
  secureTextEntry = false,
  keyboardType = 'default',
  leftIcon,
  error,
  className = '',
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="font-poppins font-medium text-xs text-textSecondary mb-1.5 ml-1">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center border rounded-xl bg-white px-3 h-12 ${
          error
            ? 'border-danger'
            : isFocused
            ? 'border-sky-500 shadow-sm'
            : 'border-border'
        }`}
        style={{ minHeight: 48 }}
      >
        {leftIcon && <View className="mr-2 text-gray-400">{leftIcon}</View>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          placeholderTextColor="#94A3B8"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 font-poppins text-textPrimary text-sm h-full"
          style={{ paddingVertical: 0 }}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            activeOpacity={0.7}
            className="p-1"
          >
            {isPasswordVisible ? (
              <EyeOff size={18} color="#64748B" />
            ) : (
              <Eye size={18} color="#64748B" />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text className="font-poppins text-danger text-[10px] mt-1 ml-1">
          {error}
        </Text>
      )}
    </View>
  );
}

// mod input 1
