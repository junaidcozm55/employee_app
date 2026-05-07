import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function AssignmentCard() {
  const router = useRouter();

  return (
    <View className="bg-white rounded-3xl p-6 mt-6 shadow-sm border border-gray-50">
      <Text className="text-[#2EB5BF] text-sm font-medium mb-2">Tokyo assignment</Text>
      
      <Text className="text-black text-2xl font-bold mb-3 leading-tight">
        Your Move Has 3 Priority Actions
      </Text>
      
      <Text className="text-gray-500 text-sm mb-6 leading-5">
        Complete required items first to reduce compliance risk and keep your relocation on schedule.
      </Text>
      
      <TouchableOpacity 
        onPress={() => router.push('/tasks')}
        className="bg-[#2EB5BF] flex-row items-center justify-center py-4 rounded-2xl"
      >
        <Text className="text-white text-base font-semibold mr-2">Review required action</Text>
        <Ionicons name="arrow-forward" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
}
