import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function FeatureCards() {
  return (
    <View className="mt-8 mb-6">
      <Text className="text-black text-xl font-bold mb-4">What's included</Text>
      
      <View className="flex-row gap-4">
        {/* Card 1 */}
        <View className="flex-1 bg-white rounded-[24px] p-4 shadow-sm border border-gray-100">
          <View className="w-10 h-10 bg-[#F0F9FF] rounded-full items-center justify-center mb-6">
            <Ionicons name="clipboard-outline" size={20} color="#0284C7" />
          </View>
          <Text className="text-black text-base font-bold mb-1">Step-by-step plan</Text>
          <Text className="text-gray-400 text-xs">Tasks tailored to your move.</Text>
        </View>
        
        {/* Card 2 */}
        <View className="flex-1 bg-white rounded-[24px] p-4 shadow-sm border border-gray-100">
          <View className="w-10 h-10 bg-[#FAF5FF] rounded-full items-center justify-center mb-6">
            <Ionicons name="globe-outline" size={20} color="#C026D3" />
          </View>
          <Text className="text-black text-base font-bold mb-1">Cultural guide</Text>
          <Text className="text-gray-400 text-xs">Local tips & etiquette.</Text>
        </View>
      </View>
    </View>
  );
}
