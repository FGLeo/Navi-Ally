import { View, Text, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";

export default function WelcomeScreen() {
  const router = useRouter();

  if (Platform.OS === "web") {
    return (
      <View className="min-h-screen flex-row">
        <View
          className="flex-1 items-center justify-center p-10"
          style={{
            backgroundImage: "linear-gradient(to bottom, #1e3a8a, #3b82f6)",
          }}
        >
          <Text className="text-white text-4xl font-bold mb-6">
            Bienvenido
          </Text>
          <Text className="text-white mb-8 text-center max-w-md">
            Tu asistente de visión para una mayor autonomía.
          </Text>
          <Pressable
            onPress={() => router.push("/login")}
            className="bg-white px-6 py-3 rounded-full mb-4"
          >
            <Text className="text-blue-600 font-semibold">Iniciar sesión</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/signup")}
            className="border border-white px-6 py-3 rounded-full"
          >
            <Text className="text-white font-semibold">Registrarse</Text>
          </Pressable>
        </View>
        <View className="flex-1 items-center justify-center p-10">
          <Text className="text-2xl font-bold mb-4">Navi Ally</Text>
          <Text className="text-center max-w-md">
            Un asistente inteligente de visión para personas con discapacidad visual.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      className="flex-1 items-center justify-center p-6"
      style={{ backgroundColor: "#1e3a8a" }}
    >
      <View className="bg-white w-full max-w-sm rounded-3xl p-6 items-center gap-4">
        <Text className="text-2xl font-bold">Bienvenido</Text>
        <Pressable
          onPress={() => router.push("/login")}
          className="w-full bg-blue-600 rounded-full py-3"
        >
          <Text className="text-center text-white font-semibold">
            Iniciar sesión
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/signup")}
          className="w-full border border-blue-600 rounded-full py-3"
        >
          <Text className="text-center text-blue-600 font-semibold">
            Registrarse
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
