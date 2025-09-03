import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#000000',
          borderTopWidth: 4,
          borderTopColor: '#ffffff',
          height: 90,
          paddingBottom: 20,
          paddingTop: 15,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#808080',
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: '#000000',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarAccessibilityLabel: 'Pantalla principal del dashboard',
          tabBarIcon: ({ color }) => (
            <View className="items-center justify-center">
              <View className="w-8 h-8 rounded-full" style={{ backgroundColor: color }} />
              <Text className="text-xs mt-1" style={{ color }}>Casa</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Configuración',
          tabBarAccessibilityLabel: 'Pantalla de configuraciones de accesibilidad',
          tabBarIcon: ({ color }) => (
            <View className="items-center justify-center">
              <View className="w-8 h-8 rounded-full" style={{ backgroundColor: color }} />
              <Text className="text-xs mt-1" style={{ color }}>Config</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarAccessibilityLabel: 'Pantalla de perfil de usuario',
          tabBarIcon: ({ color }) => (
            <View className="items-center justify-center">
              <View className="w-8 h-8 rounded-full" style={{ backgroundColor: color }} />
              <Text className="text-xs mt-1" style={{ color }}>Perfil</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}