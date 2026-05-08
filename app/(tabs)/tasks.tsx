import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { WelcomeTourCard } from '@/components/WelcomeTourCard';
import tasksData from '@/constants/tasks.json';

export default function TasksScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['Required', 'All', 'In Progress', 'Pending', 'Completed'];
  const router = useRouter();

  const filteredTasks = tasksData.filter(task => {
    if (activeFilter === 'All') return true;
    return task.tags.includes(activeFilter);
  });

  const getIconColor = (colorClass: string) => {
    const color = colorClass.split(' ')[0].replace('text-', '');
    switch (color) {
      case 'teal-600': return '#2EB5BF';
      case 'teal-500': return '#2EB5BF';
      case 'yellow-600': return '#B8860B';
      case 'purple-600': return '#9333EA';
      case 'red-500': return '#EF4444';
      case 'gray-500': return '#6B7280';
      default: return '#000000';
    }
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F5FBFC]">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >

        <Text className="text-black text-3xl font-extrabold mt-4 mb-6">Your Tasks</Text>

        {/* Progress Card */}
        <View className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 mb-8">
          <Text className="text-[#2EB5BF] text-sm font-medium mb-1">Your Next Steps</Text>
          <Text className="text-black text-2xl font-bold mb-6">Let's get you ready</Text>

          <View className="flex-row items-center">
            <View className="w-16 h-16 rounded-full border-[6px] border-[#E5F7F8] items-center justify-center mr-5 relative">
              <View
                className="absolute w-16 h-16 rounded-full border-[6px] border-[#2EB5BF]"
                style={{ borderTopColor: 'transparent', borderRightColor: 'transparent', transform: [{ rotate: '-45deg' }] }}
              />
              <Text className="text-black text-xs font-extrabold">50%</Text>
            </View>
            <View>
              <Text className="text-black text-lg font-bold">2 Of 4 Completed</Text>
              <Text className="text-gray-400 text-sm font-medium">Keep going — you're almost there.</Text>
            </View>
          </View>
        </View>

        {/* Welcome Tour Card */}
        <View className="mb-8">
          <WelcomeTourCard />
        </View>

        {/* Filter Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row my-[10px]"
          contentContainerStyle={{ paddingVertical: 2 }}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              className={`h-11 px-6 rounded-[16px] mr-2.5 items-center justify-center border ${
                activeFilter === filter
                  ? 'bg-black border-black'
                  : 'bg-[#F9FAFB] border-[#E5E7EB]'
              }`}
            >
              <Text
                className={`text-sm font-bold ${
                  activeFilter === filter ? 'text-white' : 'text-[#9CA3AF]'
                }`}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tasks List */}
        <View className="gap-4">
          {filteredTasks.map(task => (
            <TouchableOpacity
              key={task.id}
              onPress={() => router.push(`/task/${task.id}`)}
              className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50 flex-row items-center"
            >
              <View className={`w-14 h-14 rounded-full items-center justify-center mr-4 ${task.iconColor.split(' ')[1]}`}>
                <Ionicons name={task.iconName as any} size={26} color={getIconColor(task.iconColor)} />
              </View>

              <View className="flex-1">
                <View className="flex-row items-center mb-1.5">
                  <View className={`px-3 py-1 rounded-xl mr-2 ${task.statusColor.split(' ')[1]}`}>
                    <Text className={`text-[10px] font-bold uppercase ${task.statusColor.split(' ')[0]}`}>{task.status}</Text>
                  </View>

                  {task.dueDate && (
                    <View className="flex-row items-center">
                      <Ionicons name="time-outline" size={14} color="#C54646" />
                      <Text className="text-[#C54646] text-xs font-bold ml-1">{task.dueDate}</Text>
                    </View>
                  )}
                </View>
                <Text className="text-black text-lg font-bold leading-tight">{task.title}</Text>
                <Text className="text-gray-400 text-xs font-medium mt-1">{task.subtitle}</Text>
              </View>

              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

