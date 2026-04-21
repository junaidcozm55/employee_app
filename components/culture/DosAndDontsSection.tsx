import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function DosAndDontsSection() {
  const dos = [
    'Bow when greeting',
    'Remove shoes indoors',
    'Be on time',
    'Use both hands to give items'
  ];

  const donts = [
    'Tip at restaurants',
    'Speak loudly on transit',
    'Point with chopsticks',
    'Skip business cards'
  ];

  return (
    <View className="mb-6 mt-2">
      <Text className="text-black text-lg font-bold mb-3">Do's & Don'ts</Text>
      
      <View className="flex-row gap-3">
        {/* Do's Card */}
        <View className="flex-1 bg-[#F0FBFA] rounded-2xl p-4 border border-[#E5F7F6]">
          <View className="flex-row items-center mb-3">
            <Ionicons name="thumbs-up-outline" size={20} color="#0891B2" />
            <Text className="text-[#0891B2] text-base font-bold ml-2">Do</Text>
          </View>
          
          {dos.map((item, index) => (
            <View key={`do-${index}`} className="flex-row items-start mb-1.5 pr-2">
              <Text className="text-[#0891B2] mr-2 text-sm mt-[-2px]">•</Text>
              <Text className="text-[#0891B2] text-[11px] leading-4 flex-1">{item}</Text>
            </View>
          ))}
        </View>

        {/* Don'ts Card */}
        <View className="flex-1 bg-[#FDF4F4] rounded-2xl p-4 border border-[#FAEDED]">
          <View className="flex-row items-center mb-3">
            <Ionicons name="thumbs-down-outline" size={20} color="#DC2626" />
            <Text className="text-[#DC2626] text-base font-bold ml-2">Don't</Text>
          </View>
          
          {donts.map((item, index) => (
            <View key={`dont-${index}`} className="flex-row items-start mb-1.5 pr-2">
              <Text className="text-[#DC2626] mr-2 text-sm mt-[-2px]">•</Text>
              <Text className="text-[#DC2626] text-[11px] leading-4 flex-1">{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
