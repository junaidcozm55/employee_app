import { Tabs } from 'expo-router';
import React from 'react';

import { BottomNav } from '@/components/BottomNav';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <BottomNav {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
        }}
      />
      <Tabs.Screen
        name="culture"
        options={{
          title: 'Culture',
        }}
      />
      <Tabs.Screen
        name="support"
        options={{
          title: 'Support',
        }}
      />
    </Tabs>
  );
}
