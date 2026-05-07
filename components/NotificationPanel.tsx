import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import notificationsData from '@/constants/notifications.json';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: string;
  iconColor: string;
  iconBg: string;
  read: boolean;
}

interface NotificationPanelProps {
  visible: boolean;
  onClose: () => void;
}

export function NotificationPanel({ visible, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(notificationsData as NotificationItem[]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView edges={['top']} className="flex-1 bg-[#F5FBFC]">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 py-4 border-b border-gray-100 bg-white">
          <View className="flex-row items-center">
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 bg-gray-50 rounded-full items-center justify-center mr-3"
            >
              <Ionicons name="chevron-back" size={22} color="#000" />
            </TouchableOpacity>
            <View>
              <Text className="text-black text-xl font-bold">Notifications</Text>
              {unreadCount > 0 && (
                <Text className="text-[#2EB5BF] text-xs font-bold">{unreadCount} unread</Text>
              )}
            </View>
          </View>

          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllRead}>
              <Text className="text-[#2EB5BF] text-xs font-bold">Mark all read</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Notification List */}
        <ScrollView
          className="flex-1 px-5"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40, paddingTop: 16 }}
        >
          <View className="gap-3">
            {notifications.map(notification => (
              <TouchableOpacity
                key={notification.id}
                onPress={() => markAsRead(notification.id)}
                className={`p-5 rounded-[28px] flex-row items-start border ${
                  notification.read
                    ? 'bg-white border-gray-50'
                    : 'bg-[#F0FDFD] border-[#2EB5BF]/10'
                }`}
                style={!notification.read ? {
                  shadowColor: '#2EB5BF',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.06,
                  shadowRadius: 8,
                } : undefined}
              >
                <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${notification.iconBg}`}>
                  <Ionicons name={notification.icon as any} size={22} color={notification.iconColor} />
                </View>

                <View className="flex-1">
                  <View className="flex-row items-start justify-between mb-1">
                    <Text className="text-black text-sm font-bold flex-1 mr-2" numberOfLines={1}>
                      {notification.title}
                    </Text>
                    {!notification.read && (
                      <View className="w-2.5 h-2.5 rounded-full bg-[#2EB5BF] mt-1" />
                    )}
                  </View>
                  <Text className="text-gray-400 text-xs font-medium leading-4 mb-2" numberOfLines={2}>
                    {notification.message}
                  </Text>
                  <Text className="text-gray-300 text-[10px] font-bold">{notification.time}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}
