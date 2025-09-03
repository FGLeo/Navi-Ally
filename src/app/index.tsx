import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, Text } from 'react-native';

export default function IndexScreen() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Esperar a que el layout esté montado antes de navegar
    const timer = setTimeout(() => {
      setIsReady(true);
      router.replace('/auth');
    }, 100); // Pequeño delay para asegurar que el layout esté listo

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-black items-center justify-center height:100dvh">
      <Text className="text-white text-2xl font-bold">Navi-Ally</Text>
      <Text className="text-white text-lg mt-2">
        {isReady ? 'Redirigiendo...' : 'Cargando...'}
      </Text>
    </View>
  );
}