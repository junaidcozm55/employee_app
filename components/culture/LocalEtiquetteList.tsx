import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function LocalEtiquetteList() {
  const articles = [
    { 
      id: 1,
      category: 'WORKPLACE', 
      title: 'Meeting etiquette & business cards', 
      time: '3 min read',
      accentBg: 'bg-fuchsia-50',
      accentText: 'text-fuchsia-600',
      tagBg: 'bg-fuchsia-50'
    },
    { 
      id: 2,
      category: 'DAILY LIFE', 
      title: 'Public transit unwritten rules', 
      time: '2 min read',
      accentBg: 'bg-cyan-50',
      accentText: 'text-[#0891B2]',
      tagBg: 'bg-cyan-50'
    },
    { 
       id: 3,
       category: 'FOOD', 
       title: 'How to navigate izakayas', 
       time: '4 min read',
       accentBg: 'bg-yellow-50',
       accentText: 'text-[#CA8A04]',
       tagBg: 'bg-yellow-50'
    }
  ];

  return (
    <View className="mb-8">
      <Text className="text-black text-lg font-bold mb-3 mt-2">Local etiquette</Text>
      
      <View className="gap-3">
        {articles.map((article) => (
          <TouchableOpacity 
            key={article.id} 
            className="flex-row items-center bg-white rounded-[24px] p-4 shadow-sm border border-gray-100"
          >
            <View className={`w-14 h-14 rounded-full items-center justify-center mr-4 ${article.accentBg}`}>
              <Ionicons name="sparkles" size={24} className={article.accentText} />
            </View>
            
            <View className="flex-1">
              <View className={`self-start px-2 py-0.5 rounded-md mb-1 ${article.tagBg}`}>
                <Text className={`text-[9px] font-bold uppercase tracking-wider ${article.accentText}`}>
                  {article.category}
                </Text>
              </View>
              <Text className="text-black text-sm font-bold mb-0.5">{article.title}</Text>
              <Text className="text-gray-400 text-xs">{article.time}</Text>
            </View>
            
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
