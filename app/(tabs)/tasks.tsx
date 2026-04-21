import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import tasksData from '@/constants/tasks.json';
import { WelcomeTourCard } from '@/components/WelcomeTourCard';

export default function TasksScreen() {
  const [activeFilter, setActiveFilter] = useState('Required');
  const filters = ['Required', 'All', 'In Progress', 'Pending', 'Completed'];
  const router = useRouter();

  const filteredTasks = tasksData.filter(task => task.tags.includes(activeFilter));

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F5F5F5]">
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        <Text className="text-black text-3xl font-extrabold mt-4 mb-6">Your Tasks</Text>

        {/* Progress Card */}
        <View className="bg-white rounded-[24px] p-5 shadow-sm border border-gray-100 mb-6">
          <Text className="text-[#0D9488] text-xs font-semibold uppercase tracking-wider mb-1">Your Next Steps</Text>
          <Text className="text-black text-xl font-bold mb-4">Let's get you ready</Text>
          
          <View className="flex-row items-center">
            {/* Simple representation of circular progress */}
            <View className="w-14 h-14 rounded-full border-4 border-[#E5FAFA] items-center justify-center mr-4" style={{ borderLeftColor: '#14B8A6', transform: [{ rotate: '-45deg' }] }}>
               <View style={{ transform: [{ rotate: '45deg' }] }}>
                 <Text className="text-black text-xs font-bold">50%</Text>
               </View>
            </View>
            <View>
              <Text className="text-black text-base font-bold">2 Of 4 Completed</Text>
              <Text className="text-gray-400 text-xs">Keep going — you're almost there.</Text>
            </View>
          </View>
        </View>

        {/* Reusing WelcomeTourCard */}
        <View className="mb-6">
          <WelcomeTourCard />
        </View>

        {/* Filter Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mb-6">
          {filters.map(filter => (
            <TouchableOpacity 
              key={filter} 
              onPress={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full mr-2 ${activeFilter === filter ? 'bg-black' : 'bg-white border border-gray-200'}`}
            >
              <Text className={`text-sm font-medium ${activeFilter === filter ? 'text-white' : 'text-gray-500'}`}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tasks List */}
        <View className="gap-3">
          {filteredTasks.map(task => (
            <TouchableOpacity 
              key={task.id}
              onPress={() => router.push(`/task/${task.id}`)}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex-row items-center"
            >
              <View className={`w-12 h-12 rounded-full items-center justify-center mr-4 ${task.iconColor}`}>
                <Ionicons name={task.iconName as any} size={24} />
              </View>
              
              <View className="flex-1">
                <View className="flex-row items-center mb-1">
                  {task.status !== 'Completed' ? (
                     <View className={`px-2 py-0.5 rounded-full mr-2 ${task.statusColor}`}>
                       <Text className="text-[10px] font-bold uppercase">{task.status}</Text>
                     </View>
                  ) : (
                     <View className={`px-2 py-0.5 rounded-full mr-2 ${task.statusColor}`}>
                       <Text className="text-[10px] font-bold uppercase text-teal-600">COMPLETED</Text>
                     </View>
                  )}
                  {task.dueDate && (
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={12} color="#EF4444" className="mr-1" />
                      <Text className="text-[#EF4444] text-xs ml-1">{task.dueDate}</Text>
                    </View>
                  )}
                </View>
                <Text className="text-black text-base font-bold">{task.title}</Text>
                <Text className="text-gray-400 text-xs mt-1">{task.subtitle}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

