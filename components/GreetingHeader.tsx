import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface GreetingHeaderProps {
  onNotificationPress?: () => void;
}

export function GreetingHeader({ onNotificationPress }: GreetingHeaderProps) {
  return (
    <View className="flex-row items-center justify-between mt-4">
      <View className="flex-row items-center gap-3">
        <Image 
          source={require('@/assets/images/profile.png')} 
          className="w-12 h-12 rounded-full"
        />
        <View>
          <Text className="text-gray-500 text-sm">Hello 👋</Text>
          <Text className="text-black text-xl font-bold">Anya Sarah!</Text>
        </View>
      </View>
      
      <TouchableOpacity
        onPress={onNotificationPress}
        className="relative bg-white shadow-sm p-2 rounded-full border border-gray-100"
      >
        <Ionicons name="notifications-outline" size={24} color="black" />
        <View className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
      </TouchableOpacity>
    </View>
  );
}
