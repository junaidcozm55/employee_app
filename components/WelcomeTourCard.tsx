import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function WelcomeTourCard() {
  return (
    <View className="bg-white rounded-3xl p-3 shadow-sm border border-gray-100 mt-6">
      <View className="relative w-full h-40 rounded-2xl overflow-hidden mb-3">
        <Image 
          source={require('@/assets/images/tour.png')} 
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 items-center justify-center">
          <TouchableOpacity className="w-12 h-12 bg-white rounded-full items-center justify-center p-1 shadow-md pl-2">
            <Ionicons name="play" size={24} color="#0D9488" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View className="flex-row items-start justify-between px-2 pb-1">
        <View>
          <Text className="text-black text-base font-bold">Your Welcome Tour</Text>
          <Text className="text-gray-400 text-xs mt-1">A 2-minute intro from your relocation team.</Text>
        </View>
        <View className="bg-[#E0F2FE] px-2 py-1 rounded-full">
          <Text className="text-[#0284C7] text-xs font-medium">2:14</Text>
        </View>
      </View>
    </View>
  );
}
