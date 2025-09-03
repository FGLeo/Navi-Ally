import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Settings() {
  const router = useRouter();

  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl">Ajustes</Text>
      <Button title="Volver" onPress={() => router.back()} />
    </View>
  );
}
