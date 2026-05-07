import React, { useCallback, useState } from 'react';
import { Alert, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import servicesData from '@/constants/services.json';
import { WelcomeTourCard } from '@/components/WelcomeTourCard';

/** Avoid NativeWind `shadow-*` on TouchableOpacity — see expo/expo#38423 (misleading navigation context error). */
const activeMainTabStyle = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  android: { elevation: 2 },
  default: { boxShadow: '0 1px 2px rgba(0,0,0,0.06)' },
});

type DocumentRow = {
  id: string;
  fileUrl?: string;
  fileName?: string;
  status?: string;
  [key: string]: unknown;
};

export default function ServicesScreen() {
  const [activeTab, setActiveTab] = useState<'Status' | 'Documents' | 'Culture'>('Status');
  const [activeStatusSubTab, setActiveStatusSubTab] = useState('Tax');

  const tabs = ['Status', 'Documents', 'Culture'];
  const statusSubTabs = ['Tax', 'Destination Services', 'Immigration'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return { bg: 'bg-[#DFF7E9]', text: 'text-[#2E7D32]' };
      case 'In Progress': return { bg: 'bg-[#FEF9E7]', text: 'text-[#B8860B]' };
      case 'Scheduled': return { bg: 'bg-[#F5F3FF]', text: 'text-[#7C3AED]' };
      case 'INITIATED': return { bg: 'bg-[#FEF9E7]', text: 'text-[#B8860B]' };
      default: return { bg: 'bg-[#F3F4F6]', text: 'text-gray-500' };
    }
  };

  const getIconColor = (colorClass: string) => {
    const color = colorClass.split(' ')[0].replace('text-', '');
    switch (color) {
      case 'teal-600': return '#2EB5BF';
      case 'teal-500': return '#2EB5BF';
      case 'purple-600': return '#9333EA';
      case 'red-500': return '#EF4444';
      case 'orange-500': return '#F97316';
      case 'blue-500': return '#3B82F6';
      default: return '#6B7280';
    }
  };

  const openDocumentView = useCallback(async (doc: DocumentRow) => {
    const url = doc.fileUrl;
    if (!url) {
      Alert.alert('Unavailable', 'No document link is configured for this item.');
      return;
    }
    try {
      await WebBrowser.openBrowserAsync(url);
    } catch {
      Alert.alert('Could not open', 'Please try again in a moment.');
    }
  }, []);

  const openDocumentDownload = useCallback(async (doc: DocumentRow) => {
    const url = doc.fileUrl;
    if (!url) {
      Alert.alert('Unavailable', 'No document link is configured for this item.');
      return;
    }
    try {
      const supported = await Linking.canOpenURL(url);
      if (!supported) {
        Alert.alert('Could not download', 'This device cannot open the document URL.');
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert('Could not download', 'Please try again in a moment.');
    }
  }, []);

  const renderStatusView = () => {
    const data = (servicesData.status as any)[activeStatusSubTab];
    return (
      <View className="gap-6">
        {/* Sub Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
          {statusSubTabs.map(tab => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => setActiveStatusSubTab(tab)}
              className={`px-4 py-2 rounded-xl mr-2 ${activeStatusSubTab === tab ? 'bg-black' : 'bg-white border border-gray-100'}`}
            >
              <Text className={`text-xs font-bold ${activeStatusSubTab === tab ? 'text-white' : 'text-gray-400'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Hero Card */}
        <View className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-50">
          <Text className="text-black text-lg font-bold mb-3">{data.hero.title}</Text>
          <View className="flex-row justify-between items-center mb-4">
             <View>
                <Text className="text-gray-400 text-xs font-medium">Employee: {data.hero.employee}</Text>
                <Text className="text-gray-400 text-xs font-medium">{data.hero.date}</Text>
             </View>
             <View className={`${getStatusColor(data.hero.status).bg} px-3 py-1 rounded-lg`}>
                <Text className={`${getStatusColor(data.hero.status).text} text-[10px] font-bold`}>{data.hero.status}</Text>
             </View>
          </View>
        </View>

        {/* Services List */}
        <View>
          <Text className="text-black text-xl font-bold mb-4">Services</Text>
          <View className="gap-3">
            {data.items.map((item: any) => (
              <View key={item.id} className="bg-white p-5 rounded-3xl flex-row items-center justify-between shadow-sm border border-gray-50">
                <View>
                  <Text className="text-black text-base font-bold">{item.name}</Text>
                  <Text className="text-gray-400 text-xs font-medium mt-0.5">{item.duration}</Text>
                </View>
                <View className={`${getStatusColor(item.status).bg} px-3 py-1.5 rounded-xl`}>
                  <Text className={`${getStatusColor(item.status).text} text-[10px] font-bold`}>{item.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderDocumentsView = () => (
    <View className="gap-4">
      <Text className="text-gray-400 text-xs font-medium px-1">Service documents issued by your relocation team. View or download anytime.</Text>
      {servicesData.documents.map((doc: DocumentRow) => {
        const row = doc as DocumentRow & {
          name: string;
          category: string;
          date: string;
          icon: string;
          iconColor: string;
        };
        return (
          <View key={row.id} className="bg-white p-5 rounded-[32px] shadow-sm border border-gray-50">
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-row items-center">
                <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${row.iconColor.split(' ')[1]}`}>
                  <Ionicons name={row.icon as any} size={24} color={getIconColor(row.iconColor)} />
                </View>
                <View>
                  <Text className="text-black text-base font-bold">{row.name}</Text>
                  <Text className="text-gray-400 text-xs font-medium">{row.category} • {row.date}</Text>
                </View>
              </View>
              {row.status === 'Ready' && <Ionicons name="checkmark-circle" size={20} color="#2EB5BF" />}
            </View>
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-[#F5FBFC] py-3 rounded-2xl flex-row items-center justify-center border border-gray-100"
                onPress={() => openDocumentView(row)}
                accessibilityRole="button"
                accessibilityLabel={`View ${row.name}`}
              >
                <Ionicons name="eye-outline" size={18} color="black" style={{ marginRight: 6 }} />
                <Text className="text-black text-sm font-bold">View</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-3 rounded-2xl flex-row items-center justify-center bg-[#1F2937]"
                onPress={() => openDocumentDownload(row)}
                accessibilityRole="button"
                accessibilityLabel={`Download ${row.name}`}
              >
                <Ionicons name="download-outline" size={18} color="white" style={{ marginRight: 6 }} />
                <Text className="text-white text-sm font-bold">Download</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      })}
    </View>
  );

  const renderCultureView = () => (
    <View className="gap-6">
      {/* Hero Card */}
      <View className="bg-[#2EB5BF] p-6 rounded-[32px] shadow-sm">
        <Text className="text-white/80 text-xs font-bold mb-1">{servicesData.culture.hero.location}</Text>
        <Text className="text-white text-2xl font-bold mb-2">{servicesData.culture.hero.title}</Text>
        <Text className="text-white/80 text-sm font-medium">{servicesData.culture.hero.subtitle}</Text>
      </View>

      {/* Cultural Tips */}
      <View>
        <Text className="text-black text-xl font-bold mb-4">Cultural tips</Text>
        <View className="flex-row gap-4">
          {servicesData.culture.tips.map(tip => (
            <View key={tip.id} className="flex-1 bg-white p-4 rounded-3xl items-center shadow-sm border border-gray-50">
               <View className="w-10 h-10 bg-[#E5F7F8] rounded-2xl items-center justify-center mb-3">
                 <Ionicons name={tip.icon as any} size={20} color="#2EB5BF" />
               </View>
               <Text className="text-black text-xs font-bold">{tip.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Do's & Don'ts */}
      <View>
        <Text className="text-black text-xl font-bold mb-4">{"Do's & Don'ts"}</Text>
        <View className="flex-row gap-4">
          {/* Do's */}
          <View className="flex-1 bg-[#F0FDF4] p-5 rounded-3xl border border-[#DCFCE7]">
             <View className="flex-row items-center mb-3">
               <Ionicons name="thumbs-up-outline" size={18} color="#15803D" />
               <Text className="text-[#15803D] text-sm font-bold ml-2">Do</Text>
             </View>
             {servicesData.culture.dosAndDonts.dos.map((item, idx) => (
               <Text key={idx} className="text-[#15803D] text-xs font-medium mb-1.5">• {item}</Text>
             ))}
          </View>
          {/* Don'ts */}
          <View className="flex-1 bg-[#FEF2F2] p-5 rounded-3xl border border-[#FEE2E2]">
             <View className="flex-row items-center mb-3">
               <Ionicons name="thumbs-down-outline" size={18} color="#B91C1C" />
               <Text className="text-[#B91C1C] text-sm font-bold ml-2">{"Don't"}</Text>
             </View>
             {servicesData.culture.dosAndDonts.donts.map((item, idx) => (
               <Text key={idx} className="text-[#B91C1C] text-xs font-medium mb-1.5">• {item}</Text>
             ))}
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F5FBFC]">
      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text className="text-black text-3xl font-extrabold mt-4 mb-6">Our Services</Text>

        <View className="mb-8">
           <WelcomeTourCard />
        </View>

        <View className="mb-6">
           <Text className="text-[#2EB5BF] text-xs font-bold mb-1">Your services</Text>
           <Text className="text-black text-xl font-bold mb-1">Everything in one place</Text>
           <Text className="text-gray-400 text-sm font-medium">Track service progress, view documents, and learn local culture.</Text>
        </View>

        {/* Main Tab Switcher */}
        <View className="flex-row bg-white/50 p-1.5 rounded-[20px] mb-8 border border-gray-100">
          {tabs.map(tab => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => setActiveTab(tab as any)}
              className={`flex-1 py-2.5 rounded-2xl items-center ${activeTab === tab ? 'bg-white' : ''}`}
              style={activeTab === tab ? activeMainTabStyle : undefined}
            >
              <Text className={`text-xs font-bold ${activeTab === tab ? 'text-black' : 'text-gray-400'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Render Content Based on Active Tab */}
        {activeTab === 'Status' && renderStatusView()}
        {activeTab === 'Documents' && renderDocumentsView()}
        {activeTab === 'Culture' && renderCultureView()}

      </ScrollView>
    </SafeAreaView>
  );
}
