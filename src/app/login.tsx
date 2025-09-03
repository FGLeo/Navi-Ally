import { View, Text, TextInput, Pressable, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const form = (
    <View className="w-full max-w-sm gap-4">
      <Text className="text-2xl font-bold text-center mb-2">Iniciar sesión</Text>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        className="border-b border-gray-300 p-2"
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="border-b border-gray-300 p-2"
      />
      <Pressable
        onPress={() => router.push("/home")}
        className="mt-4 bg-blue-600 rounded-full py-3"
      >
        <Text className="text-center text-white font-semibold">Ingresar</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/signup")}
      >
        <Text className="text-center text-blue-600">Crear cuenta</Text>
      </Pressable>
    </View>
  );

  if (Platform.OS === "web") {
    return (
      <View className="min-h-screen flex-row">
        <View
          className="flex-1 items-center justify-center p-10"
          style={{ backgroundImage: "linear-gradient(to bottom, #1e3a8a, #3b82f6)" }}
        >
          <Text className="text-white text-4xl font-bold mb-4">Bienvenido</Text>
          <Text className="text-white text-center max-w-md">
            Inicia sesión para continuar.
          </Text>
        </View>
        <View className="flex-1 items-center justify-center p-10">
          {form}
        </View>
      </View>
    );
  }

  return (
    <View
      className="flex-1 justify-center items-center p-6"
      style={{ backgroundColor: "#1e3a8a" }}
    >
      <View className="bg-white w-full max-w-sm rounded-3xl p-6 items-center">
        {form}
      </View>
    </View>
  );
}
