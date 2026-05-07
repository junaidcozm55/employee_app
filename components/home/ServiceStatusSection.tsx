import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface StatusItemProps {
  title: string;
  status: 'Pending' | 'Approved' | 'Due soon';
}

function StatusItem({ title, status }: StatusItemProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 'Approved':
        return { bg: 'bg-[#DFF7E9]', text: 'text-[#2E7D32]' };
      case 'Due soon':
        return { bg: 'bg-[#FCEFEF]', text: 'text-[#C54646]' };
      case 'Pending':
      default:
        return { bg: 'bg-[#FEF9E7]', text: 'text-[#B8860B]' };
    }
  };

  const style = getStatusStyle();

  return (
    <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-center justify-between shadow-sm border border-gray-50">
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-[#E5F7F8] rounded-full items-center justify-center mr-3">
          <Ionicons name="checkmark-circle" size={24} color="#2EB5BF" />
        </View>
        <Text className="text-black text-lg font-semibold">{title}</Text>
      </View>
      
      <View className={`${style.bg} px-3 py-1.5 rounded-xl`}>
        <Text className={`${style.text} text-xs font-bold`}>{status}</Text>
      </View>
    </View>
  );
}

export function ServiceStatusSection() {
  return (
    <View className="mt-8">
      <Text className="text-black text-xl font-bold mb-4">Service status</Text>
      
      <StatusItem title="Work permit" status="Pending" />
      <StatusItem title="Payroll setup" status="Approved" />
      <StatusItem title="Tax briefing" status="Due soon" />
    </View>
  );
}
