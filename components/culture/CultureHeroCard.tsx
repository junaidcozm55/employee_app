import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function CultureHeroCard() {
  return (
    <LinearGradient
      colors={['#49A0D0', '#D19053']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-[24px] p-5 mb-5 shadow-sm overflow-hidden"
    >
      <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-3">
        <Text className="text-white text-xs font-semibold">Destination · Tokyo, Japan</Text>
      </View>
      
      <Text className="text-white text-2xl font-bold mb-1">
        Feel At Home, Faster
      </Text>
      
      <Text className="text-white/90 text-sm">
        Bite-sized tips to help you connect with local culture.
      </Text>
    </LinearGradient>
  );
}
