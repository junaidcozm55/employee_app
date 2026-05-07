import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Option {
  id: string;
  name: string;
  description: string;
}

export function BenefitElectionsDetail({ data }: { data: any }) {
  const [expandedSection, setExpandedSection] = useState<string | null>('housing');
  const [selections, setSelections] = useState({
    housing: data.housing.selected,
    shipping: data.shipping.selected,
    education: data.education.values,
    splitPay: data.splitPay.selected,
    sharePurchase: data.sharePurchase.selected,
  });
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const sections = [
    { id: 'housing', title: 'Housing', subtitle: 'Select your preferred housing...', icon: 'home-outline' },
    { id: 'shipping', title: 'Shipping election', subtitle: 'How would you like your belongings...', icon: 'cube-outline' },
    { id: 'education', title: 'Education assistance', subtitle: 'Number of dependents requiring school...', icon: 'school-outline' },
    { id: 'splitPay', title: 'Split Pay', subtitle: 'Choose how your salary is split between...', icon: 'cash-outline' },
    { id: 'sharePurchase', title: 'Employee Share Purchase...', subtitle: 'Choose how you would like to participate...', icon: 'business-outline' },
  ];

  const getCompletedCount = () => {
    let count = 0;
    if (selections.housing) count++;
    if (selections.shipping) count++;
    if (Object.values(selections.education).some(v => v as number > 0)) count++;
    if (selections.splitPay) count++;
    if (selections.sharePurchase) count++;
    return count;
  };

  const completedCount = getCompletedCount();
  const progressPercent = (completedCount / 5) * 100;

  const handleSelectOption = (sectionId: string, optionId: string) => {
    setSelections(prev => ({ ...prev, [sectionId]: optionId }));
    // Automatically collapse after selection if needed, but the image shows manual control
  };

  const handleEducationChange = (level: string, value: number) => {
    setSelections(prev => ({
      ...prev,
      education: { ...prev.education, [level]: value }
    }));
  };

  if (isSummaryVisible) {
    return (
      <View className="flex-1 bg-[#F5FBFC] -mt-2">
        <View className="bg-[#2EB5BF] p-6 rounded-b-[40px] mb-6 pt-10">
          <Text className="text-white/80 text-xs font-bold mb-1">Long Term Assignee</Text>
          <Text className="text-white text-2xl font-bold">Election summary</Text>
        </View>

        <View className="px-5 gap-4">
          {sections.map(section => (
            <View key={section.id} className="bg-white p-5 rounded-3xl flex-row items-center justify-between shadow-sm border border-gray-50">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-[#E5F7F8] rounded-2xl items-center justify-center mr-4">
                  <Ionicons name={section.icon as any} size={20} color="#2EB5BF" />
                </View>
                <Text className="text-black text-lg font-bold">{section.title}</Text>
              </View>
              <Ionicons name="checkmark-circle" size={24} color="#2EB5BF" />
            </View>
          ))}
        </View>

        <TouchableOpacity 
          onPress={() => setIsSummaryVisible(false)}
          className="bg-[#2EB5BF] mx-5 h-16 rounded-3xl mt-8 items-center justify-center shadow-lg"
        >
          <Text className="text-white text-lg font-bold">Done</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="gap-6">
      {/* Progress Header */}
      <View className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-50 flex-row items-center">
        <View className="w-16 h-16 rounded-full border-[4px] border-[#E5F7F8] items-center justify-center mr-5 relative">
          <View 
            className="absolute w-16 h-16 rounded-full border-[4px] border-[#2EB5BF]" 
            style={{ 
              borderTopColor: 'transparent', 
              borderRightColor: progressPercent >= 50 ? '#2EB5BF' : 'transparent',
              borderBottomColor: progressPercent >= 75 ? '#2EB5BF' : 'transparent',
              transform: [{ rotate: '-45deg' }] 
            }} 
          />
          <Text className="text-black text-xs font-extrabold">{progressPercent}%</Text>
        </View>
        <View>
          <Text className="text-[#2EB5BF] text-xs font-bold mb-1">Action Required</Text>
          <Text className="text-black text-xl font-bold">{completedCount} Of 5 Completed</Text>
          <Text className="text-gray-400 text-xs font-medium">Long Term Assignee • Due May 22, 2026</Text>
        </View>
      </View>

      {/* Accordion Sections */}
      <View className="gap-3">
        {sections.map((section) => {
          const isExpanded = expandedSection === section.id;
          const isCompleted = section.id === 'education' 
            ? Object.values(selections.education).some(v => v as number > 0)
            : !!(selections as any)[section.id];

          return (
            <View key={section.id} className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-50">
              <TouchableOpacity 
                onPress={() => setExpandedSection(isExpanded ? null : section.id)}
                className="p-5 flex-row items-center justify-between"
              >
                <View className="flex-row items-center flex-1">
                  <View className="w-12 h-12 bg-[#E5F7F8] rounded-2xl items-center justify-center mr-4">
                    <Ionicons name={section.icon as any} size={22} color="#2EB5BF" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-black text-lg font-bold">{section.title}</Text>
                    {!isExpanded && <Text className="text-gray-400 text-xs font-medium" numberOfLines={1}>{section.subtitle}</Text>}
                  </View>
                </View>
                <View className="flex-row items-center">
                  {isCompleted && !isExpanded && (
                    <Ionicons name="checkmark-circle" size={20} color="#2EB5BF" className="mr-2" />
                  )}
                  <Ionicons name={isExpanded ? "chevron-up" : "chevron-forward"} size={20} color="#D1D5DB" />
                </View>
              </TouchableOpacity>

              {isExpanded && (
                <View className="px-5 pb-6">
                  {section.id === 'education' ? (
                    <View className="gap-4">
                      {data.education.levels.map((level: string) => (
                        <View key={level}>
                          <View className="flex-row items-center mb-3">
                            <View className="w-8 h-8 bg-[#E5F7F8] rounded-xl items-center justify-center mr-2">
                              <Ionicons name="people-outline" size={16} color="#2EB5BF" />
                            </View>
                            <Text className="text-black text-sm font-bold">{level}</Text>
                          </View>
                          <View className="flex-row gap-2">
                            {[0, 1, 2, 3, '4+'].map((val, idx) => {
                              const numericVal = idx;
                              const isSelected = (selections.education as any)[level] === numericVal;
                              return (
                                <TouchableOpacity 
                                  key={val}
                                  onPress={() => handleEducationChange(level, numericVal)}
                                  className={`flex-1 h-12 rounded-xl items-center justify-center border ${isSelected ? 'bg-[#2EB5BF] border-[#2EB5BF]' : 'bg-white border-gray-100'}`}
                                >
                                  <Text className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-black'}`}>{val}</Text>
                                </TouchableOpacity>
                              );
                            })}
                          </View>
                        </View>
                      ))}
                    </View>
                  ) : (
                    <View className="gap-3">
                      {(data as any)[section.id].options.map((option: Option) => {
                        const isSelected = (selections as any)[section.id] === option.id;
                        return (
                          <TouchableOpacity 
                            key={option.id}
                            onPress={() => handleSelectOption(section.id, option.id)}
                            className={`p-4 rounded-3xl border-2 ${isSelected ? 'bg-[#F0FDFD] border-[#2EB5BF]' : 'bg-white border-gray-50'}`}
                          >
                            <View className="flex-row items-center justify-between mb-1">
                              <Text className="text-black text-base font-bold flex-1">{option.name}</Text>
                              <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? 'border-[#2EB5BF] bg-[#2EB5BF]' : 'border-gray-200'}`}>
                                {isSelected && <Ionicons name="checkmark" size={14} color="white" />}
                              </View>
                            </View>
                            <Text className="text-gray-400 text-xs font-medium leading-4">{option.description}</Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </View>

      <TouchableOpacity 
        disabled={completedCount < 5}
        onPress={() => setIsSummaryVisible(true)}
        className={`h-16 rounded-3xl items-center justify-center shadow-lg ${completedCount < 5 ? 'bg-[#A5E3E7]' : 'bg-[#2EB5BF]'}`}
      >
        <Text className="text-white text-lg font-bold">
          {completedCount < 5 ? 'Complete all section to submit' : 'Review and submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
