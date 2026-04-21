import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import tasksData from '@/constants/tasks.json';

import { BenefitElectionsDetail } from '@/components/task-details/BenefitElectionsDetail';
import { ProvideDocumentsDetail } from '@/components/task-details/ProvideDocumentsDetail';
import { UpdateCalendarDetail } from '@/components/task-details/UpdateCalendarDetail';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const task = tasksData.find(t => t.id === id);

  if (!task) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Task not found</Text>
      </View>
    );
  }

  const renderDetailForm = () => {
    switch (task.detailsType) {
      case 'benefits':
        return <BenefitElectionsDetail data={task.details} />;
      case 'documents':
        return <ProvideDocumentsDetail data={task.details as any[]} />;
      case 'calendar':
        return <UpdateCalendarDetail data={task.details} />;
      default:
        return (
           <View className="mt-8 items-center">
             <Text className="text-gray-400">No additional details</Text>
           </View>
        );
    }
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F5F5F5]">
      <Stack.Screen options={{ headerShown: false }} />
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity 
          className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm"
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-4">{task.title}</Text>
      </View>

      <ScrollView className="flex-1 px-5 pt-2" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Task Summary Header inside card */}
        <View className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 flex-row items-center mb-6">
          <View className={`w-14 h-14 rounded-full items-center justify-center mr-4 ${task.iconColor}`}>
            <Ionicons name={task.iconName as any} size={28} />
          </View>
          <View className="flex-1">
             <View className="flex-row items-center mb-2">
                <View className={`px-2 py-0.5 rounded-full mr-2 ${task.statusColor}`}>
                  <Text className="text-[10px] font-bold uppercase">{task.status}</Text>
                </View>
                {task.dueDate && (
                  <View className="flex-row items-center">
                    <Ionicons name="time-outline" size={12} color="#EF4444" className="mr-1" />
                    <Text className="text-[#EF4444] text-xs ml-1">{task.dueDate}</Text>
                  </View>
                )}
             </View>
             <Text className="text-black text-lg font-bold leading-tight">{task.title}</Text>
             <Text className="text-gray-400 text-xs mt-1">{task.subtitle}</Text>
          </View>
        </View>

        {/* Dynamic Detail Content */}
        {renderDetailForm()}

      </ScrollView>
    </SafeAreaView>
  );
}
