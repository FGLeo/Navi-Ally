import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Notifications() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl">Notificaciones</Text>
      <Button title="Volver" onPress={() => router.back()} />
    </View>
  );
}
