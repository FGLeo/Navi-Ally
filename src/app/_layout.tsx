import { Stack } from 'expo-router';
import '../global.css';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
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
      <Stack.Screen
        name="auth"
        options={{
          title: 'Navi-Ally',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="(caregiver)"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
