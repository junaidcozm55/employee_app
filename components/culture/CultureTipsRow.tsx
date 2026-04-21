import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function CultureTipsRow() {
  const tips = [
    { label: 'Dining', iconName: 'cafe-outline', iconColor: '#0891B2', bgColor: 'bg-cyan-50' },
    { label: 'Language', iconName: 'language-outline', iconColor: '#9333EA', bgColor: 'bg-purple-50' },
    { label: 'Punctuality', iconName: 'time-outline', iconColor: '#CA8A04', bgColor: 'bg-yellow-50' },
  ];

  return (
    <View className="mb-6">
      <Text className="text-black text-lg font-bold mb-3 mt-4">Cultural tips</Text>
      
      <View className="flex-row justify-between gap-3">
        {tips.map((tip, index) => (
          <TouchableOpacity 
            key={index} 
            className="flex-1 bg-white rounded-2xl py-4 shadow-sm border border-gray-100 items-center justify-center"
          >
            <View className={`w-12 h-12 rounded-full items-center justify-center mb-2 ${tip.bgColor}`}>
              <Ionicons name={tip.iconName as any} size={22} color={tip.iconColor} />
            </View>
            <Text className="text-black text-sm font-medium">{tip.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
