import React from 'react';
import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CaregiverLayout() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#0f4c81',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        tabBarStyle: {
          height: 70 + bottom,
          paddingTop: 10,
          paddingBottom: bottom + 10,
          backgroundColor: '#0f4c81',
          borderTopWidth: 0,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#b3c5d7',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 5,
        },
      }}
    >
      <Tabs.Screen
        name="camera"
        options={{
          title: 'Cámara',
          headerTitle: 'MONITOREO EN VIVO',
          tabBarLabel: 'CÁMARA',
          tabBarIcon: ({ color }) => (
            <View className="items-center justify-center">
              <Text style={{ color, fontWeight: 'bold' }}>[Camara]</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Panel',
          headerTitle: 'PANEL DE CONTROL',
          tabBarLabel: 'PANEL',
          tabBarIcon: ({ color }) => (
            <View className="items-center justify-center">
              <Text style={{ color, fontWeight: 'bold' }}>[Panel]</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Usuarios',
          headerTitle: 'GESTIÓN DE USUARIOS',
          tabBarLabel: 'USUARIOS',
          tabBarIcon: ({ color }) => (
            <View className="items-center justify-center">
              <Text style={{ color, fontWeight: 'bold' }}>[Usuarios]</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Ajustes',
          headerTitle: 'CONFIGURACIÓN',
          tabBarLabel: 'AJUSTES',
          tabBarIcon: ({ color }) => (
            <View className="items-center justify-center">
              <Text style={{ color, fontWeight: 'bold' }}>[Config]</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}