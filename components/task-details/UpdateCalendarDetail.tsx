import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

export function UpdateCalendarDetail({ data }: { data: any }) {
  const [dates, setDates] = useState([
    { id: 'departure', label: 'Departure date', value: data.departure, iconColor: 'text-teal-500 bg-teal-50', icon: 'airplane' },
    { id: 'arrival', label: 'Arrive at destination', value: data.arrival, iconColor: 'text-purple-500 bg-purple-50', icon: 'home' },
    { id: 'onboarding', label: 'Onboarding day', value: data.onboarding, iconColor: 'text-yellow-600 bg-yellow-50', icon: 'briefcase' },
    { id: 'familyArrival', label: 'Family arrival', value: data.familyArrival, iconColor: 'text-red-500 bg-red-50', icon: 'people' },
  ]);

  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDateIndex, setSelectedDateIndex] = useState<number | null>(null);

  const handleOpenPicker = (index: number) => {
    setSelectedDateIndex(index);
    setDatePickerVisible(true);
  };

  const handleDateConfirm = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      setDatePickerVisible(false);
    }
    
    if (selectedDate && selectedDateIndex !== null) {
      const newDates = [...dates];
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      
      newDates[selectedDateIndex] = { ...newDates[selectedDateIndex], value: `${day}/${month}/${year}` };
      setDates(newDates);
    }

    if (Platform.OS === 'ios' && (event.type === 'set' || event.type === 'dismissed')) {
      setDatePickerVisible(false);
    }
  };

  return (
    <View className="gap-3">
      <Text className="text-teal-600 text-xs font-bold uppercase tracking-wider mb-[-8px]">June 2025</Text>
      <Text className="text-black text-xl font-bold mb-1">Update calendar</Text>
      <Text className="text-gray-400 text-xs mb-4">Pick the dates that work best — you can edit later.</Text>

      {dates.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => handleOpenPicker(index)}
          className="bg-white px-4 py-3 rounded-2xl shadow-sm border border-gray-100 flex-row items-center justify-between mb-2">
           <View className="flex-row items-center">
             <View className={`w-10 h-10 rounded-full items-center justify-center mr-4 ${item.iconColor}`}>
               <Ionicons name={item.icon as any} size={20} />
             </View>
             <View>
               <Text className="text-black text-sm font-bold">{item.label}</Text>
               <Text className="text-gray-500 text-xs">{item.value}</Text>
             </View>
           </View>
           <Ionicons name="calendar-outline" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      ))}

      {datePickerVisible && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateConfirm}
        />
      )}

      <TouchableOpacity className="mt-8 shadow-sm w-full h-14 rounded-full overflow-hidden">
        <LinearGradient 
           colors={['#0891B2', '#9333EA']} 
           start={{x: 0, y: 0}} end={{x: 1, y: 0}}
           className="w-full h-full justify-center items-center"
        >
          <Text className="text-white text-base font-bold">Save Dates</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
