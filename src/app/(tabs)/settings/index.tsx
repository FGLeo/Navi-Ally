import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl">Ajustes</Text>
      <Button title="Perfil" onPress={() => router.push("/(tabs)/settings/profile")} />
      <Button title="Notificaciones" onPress={() => router.push("/(tabs)/settings/notifications")} />
      <Button title="Cerrar sesión" onPress={() => router.replace("/login")} />
    </View>
  );
}
