import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, ScrollView, Vibration } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Dashboard() {
  const { top } = useSafeAreaInsets();
  const [isDetecting, setIsDetecting] = useState(false);
  const [lastDetections, setLastDetections] = useState([
    { id: 1, time: '14:30', description: 'Persona caminando hacia la derecha, aproximadamente 3 metros de distancia' },
    { id: 2, time: '14:25', description: 'Escalón detectado a 1 metro adelante, altura aproximada 15 centímetros' },
    { id: 3, time: '14:20', description: 'Semáforo en rojo, cruce peatonal detectado' }
  ]);
  const [deviceStatus, setDeviceStatus] = useState('Conectado');

  const startDetection = () => {
    setIsDetecting(true);
    Vibration.vibrate(200);
    
    Alert.alert(
      'Detección Iniciada',
      'Navi-Ally está ahora analizando tu entorno. Mantén el dispositivo estable.',
      [{ text: 'Entendido' }]
    );
    
    // Simular detección después de 3 segundos
    setTimeout(() => {
      const newDetection = {
        id: Date.now(),
        time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
        description: 'Simulación: Puerta de vidrio detectada a 2 metros adelante, manija del lado derecho'
      };
      
      setLastDetections(prev => [newDetection, ...prev.slice(0, 2)]);
      setIsDetecting(false);
      Vibration.vibrate([100, 50, 100]);
      
      Alert.alert(
        'Detección Completada',
        newDetection.description,
        [{ text: 'Repetir', onPress: () => repeatLastDescription() }, { text: 'Continuar' }]
      );
    }, 3000);
  };

  const stopDetection = () => {
    setIsDetecting(false);
    Vibration.vibrate(100);
    Alert.alert('Detección Detenida', 'La detección de entorno ha sido pausada.');
  };

  const repeatLastDescription = () => {
    if (lastDetections.length > 0) {
      Alert.alert('Última Detección', lastDetections[0].description);
    } else {
      Alert.alert('Sin Detecciones', 'No hay detecciones recientes para repetir.');
    }
  };

  const activateOCR = () => {
    Alert.alert(
      'OCR Activado',
      'Apunta la cámara hacia el texto que deseas leer. Procesando...',
      [{ text: 'Cancelar' }]
    );
    
    setTimeout(() => {
      Alert.alert(
        'Texto Detectado',
        'Simulación OCR: "SALIDA DE EMERGENCIA - Mantenga esta área libre de obstáculos"',
        [{ text: 'Repetir' }, { text: 'Continuar' }]
      );
    }, 2000);
  };

  const activateSOS = () => {
    Alert.alert(
      'EMERGENCIA SOS',
      '¿Confirmas que necesitas asistencia de emergencia? Se contactarán los servicios de emergencia y tus contactos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'CONFIRMAR SOS', style: 'destructive', onPress: () => {
          Alert.alert('SOS ACTIVADO', 'Servicios de emergencia contactados. Ayuda en camino.');
        }}
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: top }}>
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text 
            className="text-4xl font-bold text-black text-center mb-2"
            accessibilityRole="header"
            accessibilityLabel="Navi-Ally Dashboard Principal"
          >
            NAVI-ALLY
          </Text>
          <Text className="text-xl text-black text-center mb-4">
            Dashboard Principal
          </Text>
          
          {/* Device Status */}
          <View className="bg-green-100 border-4 border-green-600 p-4 rounded-lg mb-4">
            <Text className="text-lg font-bold text-green-800 text-center">
              Estado: {deviceStatus} [OK]
            </Text>
          </View>
        </View>

        {/* Main Detection Button */}
        <View className="mb-8">
          <TouchableOpacity
            className={`${isDetecting ? 'bg-red-600' : 'bg-black'} border-4 border-white p-8 rounded-lg mb-4`}
            onPress={isDetecting ? stopDetection : startDetection}
            accessibilityLabel={isDetecting ? 'Detener detección' : 'Iniciar detección de entorno'}
            accessibilityHint={isDetecting ? 'Toca para pausar la detección' : 'Toca para comenzar a analizar tu entorno'}
            disabled={false}
          >
            <Text className="text-white text-3xl font-bold text-center mb-2">
              {isDetecting ? '⏹️ DETENER' : '▶️ INICIAR'}
            </Text>
            <Text className="text-white text-xl text-center">
              {isDetecting ? 'Analizando entorno...' : 'DETECCIÓN DE ENTORNO'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">ACCIONES RÁPIDAS</Text>
          
          <View className="flex-row justify-between mb-4">
            <TouchableOpacity
              className="bg-blue-600 border-4 border-white p-4 rounded-lg flex-1 mr-2"
              onPress={activateOCR}
              accessibilityLabel="Activar OCR para leer texto"
              accessibilityHint="Toca para leer texto con la cámara"
            >
              <Text className="text-white text-lg font-bold text-center">
                [Texto] LEER TEXTO
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-green-600 border-4 border-white p-4 rounded-lg flex-1 ml-2"
              onPress={repeatLastDescription}
              accessibilityLabel="Repetir última descripción"
              accessibilityHint="Toca para escuchar nuevamente la última detección"
            >
              <Text className="text-white text-lg font-bold text-center">
                [Repetir] REPETIR
              </Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity
            className="bg-red-600 border-4 border-white p-4 rounded-lg"
            onPress={activateSOS}
            accessibilityLabel="Botón de emergencia SOS"
            accessibilityHint="Toca para activar emergencia y contactar ayuda"
          >
            <Text className="text-white text-xl font-bold text-center">
              [SOS] EMERGENCIA SOS
            </Text>
          </TouchableOpacity>
        </View>

        {/* Recent Detections */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">ÚLTIMAS DETECCIONES</Text>
          
          {lastDetections.map((detection) => (
            <TouchableOpacity
              key={detection.id}
              className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-3"
              onPress={() => Alert.alert('Detección', detection.description)}
              accessibilityLabel={`Detección de las ${detection.time}`}
              accessibilityHint="Toca para escuchar esta detección nuevamente"
            >
              <Text className="text-lg font-bold text-black mb-1">
                {detection.time}
              </Text>
              <Text className="text-base text-black">
                {detection.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Voice Commands Help */}
        <View className="bg-yellow-100 border-4 border-yellow-600 p-4 rounded-lg">
          <Text className="text-lg font-bold text-yellow-800 text-center mb-2">
            COMANDOS DE VOZ ACTIVOS
          </Text>
          <Text className="text-base text-yellow-800 text-center">
            • "¿Qué hay adelante?" - Detección inmediata{"\n"}
            • "Leer texto" - Activar OCR{"\n"}
            • "Repetir" - Última descripción{"\n"}
            • "Emergencia" - Activar SOS{"\n"}
            • Toque doble - Repetir instrucción
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
