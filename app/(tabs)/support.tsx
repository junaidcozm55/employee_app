import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity, Linking, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import supportData from '@/constants/support.json';
import { WelcomeTourCard } from '@/components/WelcomeTourCard';

export default function SupportScreen() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const specialist = supportData.specialist;

  const handleEmail = () => {
    Linking.openURL(`mailto:${specialist.email}`);
  };

  const handlePhone = () => {
    Linking.openURL(`tel:${specialist.phone.replace(/\s/g, '')}`);
  };

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F5FBFC]">
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text className="text-black text-3xl font-extrabold mt-4 mb-6">Support</Text>

        {/* Welcome Tour Card */}
        <WelcomeTourCard />

        {/* Section Header */}
        <View className="mt-8 mb-6">
          <Text className="text-[#2EB5BF] text-xs font-bold mb-1">{"We're here for you"}</Text>
          <Text className="text-black text-xl font-bold mb-1">Help & support</Text>
          <Text className="text-gray-400 text-sm font-medium">Talk to a real person or chat with Mira anytime.</Text>
        </View>

        {/* Specialist Contact Card */}
        <View className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 mb-6">
          {/* Specialist Info */}
          <View className="flex-row items-center mb-6">
            <View className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden mr-4">
              <Image
                source={require('@/assets/images/profile.png')}
                className="w-full h-full"
                resizeMode="cover"
              />
            </View>
            <View className="flex-1">
              <Text className="text-black text-lg font-bold">{specialist.name}</Text>
              <Text className="text-gray-400 text-sm font-medium">{specialist.role} · {specialist.team}</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2.5 h-2.5 rounded-full bg-[#22C55E] mr-1.5" />
              <Text className="text-[#22C55E] text-xs font-bold">Online</Text>
            </View>
          </View>

          {/* Email Row */}
          <TouchableOpacity
            onPress={handleEmail}
            className="flex-row items-center py-4 border-t border-gray-50"
          >
            <View className="w-10 h-10 bg-[#F5FBFC] rounded-2xl items-center justify-center mr-4">
              <Ionicons name="mail-outline" size={20} color="#2EB5BF" />
            </View>
            <Text className="text-black text-sm font-medium flex-1">{specialist.email}</Text>
            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
          </TouchableOpacity>

          {/* Phone Row */}
          <TouchableOpacity
            onPress={handlePhone}
            className="flex-row items-center py-4 border-t border-gray-50"
          >
            <View className="w-10 h-10 bg-[#F5FBFC] rounded-2xl items-center justify-center mr-4">
              <Ionicons name="call-outline" size={20} color="#2EB5BF" />
            </View>
            <Text className="text-black text-sm font-medium flex-1">{specialist.phone}</Text>
            <Ionicons name="chevron-forward" size={18} color="#D1D5DB" />
          </TouchableOpacity>
        </View>

        {/* Browse FAQs */}
        <View className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50">
          <View className="flex-row items-center mb-5">
            <View className="w-12 h-12 bg-[#FEF2F2] rounded-2xl items-center justify-center mr-4">
              <Ionicons name="help-buoy-outline" size={24} color="#EF4444" />
            </View>
            <View className="flex-1">
              <Text className="text-black text-lg font-bold">Browse FAQs</Text>
              <Text className="text-gray-400 text-xs font-medium">Visas, taxes, housing.</Text>
            </View>
          </View>

          {/* FAQ List */}
          <View className="gap-3">
            {supportData.faqs.map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <TouchableOpacity
                  key={faq.id}
                  onPress={() => setExpandedFaq(isExpanded ? null : faq.id)}
                  className={`p-4 rounded-2xl border ${isExpanded ? 'bg-[#F5FBFC] border-[#2EB5BF]/20' : 'bg-gray-50 border-gray-50'}`}
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-black text-sm font-bold flex-1 mr-3">{faq.question}</Text>
                    <Ionicons
                      name={isExpanded ? 'chevron-up' : 'chevron-down'}
                      size={18}
                      color={isExpanded ? '#2EB5BF' : '#D1D5DB'}
                    />
                  </View>
                  {isExpanded && (
                    <Text className="text-gray-500 text-xs font-medium mt-3 leading-5">{faq.answer}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
