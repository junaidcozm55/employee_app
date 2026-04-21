import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SupportScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA] justify-center items-center">
      <Text className="text-xl font-bold text-gray-800">Support</Text>
    </SafeAreaView>
  );
}
