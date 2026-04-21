import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function ActionProgressCard() {
  return (
    <View className="mt-6">
      <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
        <View className="flex-row items-center justify-between mb-3">
          <Text className="text-black text-lg font-bold">Your Actions</Text>
          <Text className="text-gray-400 text-xs">2 of 5 Done</Text>
        </View>
        
        {/* Progress Bar */}
        <View className="h-2 w-full bg-[#E5FAFA] rounded-full overflow-hidden mb-5">
          <View className="h-full bg-[#14B8A6] rounded-full" style={{ width: '40%' }} />
        </View>
        
        {/* Action Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          <View className="flex-row items-center bg-[#F0FDF4] px-3 py-1.5 rounded-full mr-2 border border-[#DCFCE7]">
            <Ionicons name="checkmark" size={14} color="#059669" />
            <Text className="text-[#059669] text-xs font-semibold ml-1">DONE Profile</Text>
          </View>
          
          <View className="flex-row items-center bg-[#FEFCE8] px-3 py-1.5 rounded-full mr-2 border border-[#FEF08A]">
            <Ionicons name="checkmark" size={14} color="#CA8A04" />
            <Text className="text-[#CA8A04] text-xs font-semibold ml-1">DONE Benefits</Text>
          </View>
          
          <TouchableOpacity className="flex-row items-center bg-[#FDF4FF] px-3 py-1.5 rounded-full border border-[#FAE8FF]">
            <Text className="text-[#A21CAF] text-xs font-semibold mr-1">Next Culture</Text>
            <Ionicons name="chevron-forward" size={14} color="#A21CAF" />
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      {/* View Your Plan Button */}
      <TouchableOpacity className="bg-[#FAF5FF] w-full py-4 rounded-full mt-4 items-center justify-center">
        <Text className="text-[#9333EA] text-base font-semibold">View Your Plan</Text>
      </TouchableOpacity>
    </View>
  );
}
