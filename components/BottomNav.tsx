import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View } from 'react-native';

export function BottomNav({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="flex-row items-center justify-between bg-white px-6 py-4 border-t border-gray-100 shadow-sm" style={{ paddingBottom: 20 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
        if (route.name === 'index') iconName = isFocused ? 'home' : 'home-outline';
        if (route.name === 'tasks') iconName = isFocused ? 'list' : 'list-outline';
        if (route.name === 'culture') iconName = isFocused ? 'people' : 'people-outline';
        if (route.name === 'support') iconName = isFocused ? 'help-circle' : 'help-circle-outline';

        // Prevent showing screens like "explore" if they weren't removed yet
        if (!['index', 'tasks', 'culture', 'support'].includes(route.name)) {
            return null;
        }

        return (
          <TouchableOpacity
            key={route.name || index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="items-center justify-center px-2 py-1"
          >
            <View className={`w-12 h-12 rounded-full items-center justify-center ${isFocused ? 'bg-[#E0F2FE]' : 'bg-transparent'}`}>
              <Ionicons name={iconName} size={24} color={isFocused ? '#0284C7' : '#9CA3AF'} />
            </View>
            <Text className={`text-xs mt-1 font-medium ${isFocused ? 'text-[#0284C7]' : 'text-gray-400'}`}>
              {label as string}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
