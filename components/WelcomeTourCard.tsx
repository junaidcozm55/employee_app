import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function WelcomeTourCard() {
  return (
    <View className="bg-white rounded-3xl p-3 shadow-sm border border-gray-50 mt-6">
      <View className="relative w-full h-44 rounded-2xl overflow-hidden mb-4">
        <Image 
          source={require('@/assets/images/tour.png')} 
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute inset-0 items-center justify-center">
          <TouchableOpacity className="w-14 h-14 bg-white/90 rounded-full items-center justify-center shadow-md">
            <Ionicons name="play" size={28} color="#2EB5BF" style={{ marginLeft: 4 }} />
          </TouchableOpacity>
        </View>
      </View>
      
      <View className="flex-row items-center justify-between px-2 pb-2">
        <View className="flex-1">
          <Text className="text-black text-lg font-bold">Your Welcome Tour</Text>
          <Text className="text-gray-400 text-sm mt-0.5">A 2-minute intro from your relocation team.</Text>
        </View>
        <View className="bg-[#E5F7F8] px-3 py-1.5 rounded-xl ml-2">
          <Text className="text-[#2EB5BF] text-xs font-bold">2:14</Text>
        </View>
      </View>
    </View>
  );
}
