import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function AlertCard() {
  const router = useRouter();

  return (
    <TouchableOpacity 
      onPress={() => router.push('/tasks')}
      activeOpacity={0.9}
      className="bg-[#FCEFEF] rounded-3xl p-5 mt-6 flex-row items-start border border-[#FAD7D7]"
    >
      <View className="w-10 h-10 bg-[#C54646] rounded-full items-center justify-center mr-3 mt-1">
        <Ionicons name="alert" size={24} color="white" />
      </View>
      
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-black text-lg font-bold">Visa documents blocked</Text>
          <View className="bg-[#C54646] px-2 py-1 rounded-lg">
            <Text className="text-white text-[10px] font-bold">Due soon</Text>
          </View>
        </View>
        
        <Text className="text-gray-500 text-sm leading-4">
          Upload your passport copy to continue immigration review.
        </Text>
      </View>
    </TouchableOpacity>
  );
}
