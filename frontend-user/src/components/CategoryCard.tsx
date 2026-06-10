import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import * as Lucide from 'lucide-react-native';

interface CategoryCardProps {
  name: string;
  isActive?: boolean;
  onPress: () => void;
  className?: string;
  showIconOnly?: boolean;
}

export default function CategoryCard({
  name,
  isActive = false,
  onPress,
  className = '',
  showIconOnly = false,
}: CategoryCardProps) {
  // Map category names to icons
  const getIcon = () => {
    const iconSize = 24;
    const iconColor = isActive ? '#FFFFFF' : '#0EA5E9';

    switch (name.toLowerCase()) {
      case 'pantai':
        return <Lucide.Waves size={iconSize} color={iconColor} />;
      case 'gunung':
        return <Lucide.Mountain size={iconSize} color={iconColor} />;
      case 'air terjun':
      case 'airterjun':
        return <Lucide.Droplet size={iconSize} color={iconColor} />;
      case 'danau':
        return <Lucide.Compass size={iconSize} color={iconColor} />;
      case 'budaya':
        return <Lucide.Landmark size={iconSize} color={iconColor} />;
      case 'alam':
        return <Lucide.Trees size={iconSize} color={iconColor} />;
      default:
        return <Lucide.MapPin size={iconSize} color={iconColor} />;
    }
  };

  if (showIconOnly) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={`items-center justify-center p-3 rounded-2xl ${className}`}
        style={{
          minWidth: 64,
          minHeight: 64,
          backgroundColor: isActive ? '#0EA5E9' : '#FFFFFF',
          borderWidth: isActive ? 0 : 1,
          borderColor: '#F3F4F6',
          ...(!isActive
            ? {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.15,
                shadowRadius: 1.5,
                elevation: 2,
              }
            : {}),
        }}
      >
        <View className="mb-1.5">{getIcon()}</View>
        <Text
          className={`font-poppins text-[10px] font-medium mt-1 ${
            isActive ? 'text-white' : 'text-textPrimary'
          }`}
        >
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  // Chip style
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={`px-4 py-2.5 rounded-full mr-2.5 flex-row items-center ${className}`}
      style={{
        backgroundColor: isActive ? '#0EA5E9' : '#F3F4F6',
      }}
    >
      <Text
        className={`font-poppins text-xs font-semibold ${
          isActive ? 'text-white' : 'text-textSecondary'
        }`}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}

// mod cat 1

// mod cat 2

// mod cat 3
