import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center gap-4">
      <Text className="text-xl">Iniciar sesión</Text>
      <Button title="Ingresar" onPress={() => router.push("/pairing")} />
      <Button title="Registrarse" onPress={() => router.push("/signup")} />
    </View>
  );
}
