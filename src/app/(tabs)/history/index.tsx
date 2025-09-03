import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function History() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl">Historial</Text>
      <Button title="Detalle" onPress={() => router.push("/(tabs)/history/details")} />
    </View>
  );
}
