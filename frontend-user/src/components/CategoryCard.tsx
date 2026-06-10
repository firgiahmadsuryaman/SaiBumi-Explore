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
  // Map category names to icons and soft colors
  const getCategoryTheme = () => {
    const iconSize = 20;
    const lowerName = name.toLowerCase();

    // Default themes
    let iconColor = '#00678F';
    let bgColor = '#E0F2FE'; // light blue default
    let iconElement = <Lucide.MapPin size={iconSize} color={isActive ? '#FFFFFF' : iconColor} />;

    switch (lowerName) {
      case 'pantai':
        iconColor = '#D97706'; // orange-600
        bgColor = '#FFF3E0'; // light orange
        iconElement = <Lucide.Waves size={iconSize} color={isActive ? '#FFFFFF' : iconColor} />;
        break;
      case 'gunung':
        iconColor = '#8B5A2B'; // brown-600-ish
        bgColor = '#F3E5AB'; // light brown/yellow
        iconElement = <Lucide.Mountain size={iconSize} color={isActive ? '#FFFFFF' : iconColor} />;
        break;
      case 'air terjun':
      case 'airterjun':
        iconColor = '#0D9488'; // teal-600
        bgColor = '#E0F2F1'; // light teal
        iconElement = <Lucide.Droplet size={iconSize} color={isActive ? '#FFFFFF' : iconColor} />;
        break;
      case 'danau':
        iconColor = '#2563EB'; // blue-600
        bgColor = '#E8EAF6'; // light blue/indigo
        iconElement = <Lucide.Compass size={iconSize} color={isActive ? '#FFFFFF' : iconColor} />;
        break;
      case 'budaya':
        iconColor = '#E11D48'; // rose-600
        bgColor = '#FCE7F3'; // light pink/rose
        iconElement = <Lucide.Landmark size={iconSize} color={isActive ? '#FFFFFF' : iconColor} />;
        break;
      case 'alam':
        iconColor = '#059669'; // emerald-600
        bgColor = '#E8F5E9'; // light green
        iconElement = <Lucide.Trees size={iconSize} color={isActive ? '#FFFFFF' : iconColor} />;
        break;
      default:
        iconColor = '#00678F';
        bgColor = '#E0F2FE';
        iconElement = <Lucide.MapPin size={iconSize} color={isActive ? '#FFFFFF' : iconColor} />;
        break;
    }

    return { iconColor, bgColor, iconElement };
  };

  const { bgColor, iconElement } = getCategoryTheme();

  if (showIconOnly) {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        className={`items-center justify-center ${className}`}
        style={{
          width: '22%',
          marginBottom: 16,
        }}
      >
        <View
          className="w-12 h-12 rounded-full items-center justify-center mb-1.5"
          style={{
            backgroundColor: isActive ? '#00678F' : bgColor,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.08,
            shadowRadius: 1,
            elevation: 1,
          }}
        >
          {iconElement}
        </View>
        <Text
          className={`font-poppins text-[10px] font-medium text-center ${
            isActive ? 'text-[#00678F] font-semibold' : 'text-textPrimary'
          }`}
          numberOfLines={1}
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
      className={`px-4 py-2 rounded-full mr-2 flex-row items-center ${className}`}
      style={{
        backgroundColor: isActive ? '#00678F' : '#F1F5F9',
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
