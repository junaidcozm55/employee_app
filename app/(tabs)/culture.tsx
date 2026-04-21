import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CultureHeroCard } from '@/components/culture/CultureHeroCard';
import { WelcomeTourCard } from '@/components/WelcomeTourCard';
import { CultureTipsRow } from '@/components/culture/CultureTipsRow';
import { DosAndDontsSection } from '@/components/culture/DosAndDontsSection';
import { LocalEtiquetteList } from '@/components/culture/LocalEtiquetteList';

export default function CultureScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F5F5F5]">
      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text className="text-black text-3xl font-extrabold mt-4 mb-6">Cultural Guide</Text>

        <CultureHeroCard />
        
        <View className="mb-2">
           <WelcomeTourCard />
        </View>

        <CultureTipsRow />
        
        <DosAndDontsSection />
        
        <LocalEtiquetteList />

      </ScrollView>
    </SafeAreaView>
  );
}
