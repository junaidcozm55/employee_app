import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GreetingHeader } from '@/components/GreetingHeader';
import { AssignmentCard } from '@/components/AssignmentCard';
import { WelcomeTourCard } from '@/components/WelcomeTourCard';
import { ActionProgressCard } from '@/components/ActionProgressCard';
import { FeatureCards } from '@/components/FeatureCards';

export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#FAFAFA]">
      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <GreetingHeader />
        <AssignmentCard />
        <WelcomeTourCard />
        <ActionProgressCard />
        <FeatureCards />
      </ScrollView>
    </SafeAreaView>
  );
}
