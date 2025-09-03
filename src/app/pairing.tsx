import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Pairing() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl">Emparejamiento</Text>
      <Button
        title="Ir al dashboard"
        onPress={() => router.replace("/(tabs)/dashboard")}
      />
      <Button title="Volver" onPress={() => router.back()} />
    </View>
  );
}
