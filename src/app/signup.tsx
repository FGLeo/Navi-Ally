import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl">Registro</Text>
      <Button title="Crear cuenta" onPress={() => router.push("/pairing")} />
      <Button title="Ya tengo cuenta" onPress={() => router.push("/login")} />
    </View>
  );
}
