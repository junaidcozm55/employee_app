import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

interface WorkAreaCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

function WorkAreaCard({ icon, title, subtitle, onPress }: WorkAreaCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-1 bg-white rounded-3xl p-5 shadow-sm border border-gray-50 h-36 justify-between"
    >
      <View className="w-10 h-10 bg-[#E5F7F8] rounded-2xl items-center justify-center">
        <Ionicons name={icon} size={20} color="#2EB5BF" />
      </View>
      <View>
        <Text className="text-black text-lg font-bold">{title}</Text>
        <Text className="text-gray-400 text-xs font-medium">{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
}

export function FeatureCards() {
  const router = useRouter();

  return (
    <View className="mt-8 mb-6">
      <Text className="text-black text-xl font-bold mb-4">Work areas</Text>

      <View className="gap-4">
        <View className="flex-row gap-4">
          <WorkAreaCard
            icon="clipboard-outline"
            title="Tasks"
            subtitle="3 Required"
            onPress={() => router.push('/tasks')}
          />
          <WorkAreaCard onPress={() => router.push('/tasks')} icon="calendar-outline" title="Calendar" subtitle="2 Events" />
        </View>

        <View className="flex-row gap-4">
          <WorkAreaCard onPress={() => router.push('/tasks')} icon="document-text-outline" title="Documents" subtitle="4 Files" />
          <WorkAreaCard onPress={() => router.push('/tasks')} icon="cube-outline" title="Services" subtitle="Status updates" />
        </View>
      </View>
    </View>
  );
}
