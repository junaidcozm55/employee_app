import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function AssignmentCard() {
  return (
    <LinearGradient
      colors={['#7E57C2', '#BFA687']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="rounded-3xl p-5 mt-6 shadow-sm"
    >
      <View className="bg-white/20 self-start px-3 py-1 rounded-full mb-3">
        <Text className="text-white text-xs font-medium">Step 1 of 5</Text>
      </View>
      
      <Text className="text-white text-2xl font-bold mb-2">
        Congratulations On Your{'\n'}International Assignment
      </Text>
      
      <Text className="text-white/80 text-sm leading-5">
        A new chapter awaits. We'll guide you from{'\n'}paperwork to your first day abroad.
      </Text>
    </LinearGradient>
  );
}
