import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl">Dashboard</Text>
      <Button title="Detección" onPress={() => router.push("/(tabs)/dashboard/detection")} />
      <Button title="OCR" onPress={() => router.push("/(tabs)/dashboard/ocr")} />
      <Button title="SOS" onPress={() => router.push("/(tabs)/dashboard/sos")} />
    </View>
  );
}
