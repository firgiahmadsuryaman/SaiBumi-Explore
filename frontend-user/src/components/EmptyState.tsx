import React from 'react';
import { View, Text } from 'react-native';
import { Inbox } from 'lucide-react-native';
import Button from './Button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionTitle?: string;
  onActionPress?: () => void;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  actionTitle,
  onActionPress,
  icon,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center p-6 bg-background my-8">
      <View className="bg-sky-50 p-6 rounded-full mb-4">
        {icon || <Inbox size={32} color="#0EA5E9" />}
      </View>
      <Text className="font-poppins font-bold text-textPrimary text-sm text-center mb-1">
        {title}
      </Text>
      <Text className="font-poppins text-textSecondary text-xs text-center max-w-xs leading-relaxed mb-6">
        {description}
      </Text>
      {actionTitle && onActionPress && (
        <Button title={actionTitle} onPress={onActionPress} className="w-44" />
      )}
    </View>
  );
}

// mod empty 1

// mod empty 2
