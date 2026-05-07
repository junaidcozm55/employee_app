import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GreetingHeader } from '@/components/GreetingHeader';
import { AssignmentCard } from '@/components/AssignmentCard';
import { WelcomeTourCard } from '@/components/WelcomeTourCard';
import { FeatureCards } from '@/components/FeatureCards';
import { AlertCard } from '@/components/home/AlertCard';
import { ServiceStatusSection } from '@/components/home/ServiceStatusSection';
import { NotificationPanel } from '@/components/NotificationPanel';

export default function HomeScreen() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <SafeAreaView edges={['top']} className="flex-1 bg-[#F5FBFC]">
      <ScrollView 
        className="flex-1 px-5" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <GreetingHeader onNotificationPress={() => setShowNotifications(true)} />
        <AssignmentCard />
        <WelcomeTourCard />
        <AlertCard />
        <ServiceStatusSection />
        <FeatureCards />
      </ScrollView>

      <NotificationPanel
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </SafeAreaView>
  );
}
