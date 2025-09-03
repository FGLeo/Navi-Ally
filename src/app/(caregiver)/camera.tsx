import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { simulateTextToSpeech, simulateHapticFeedback } from '../../utils/simulationUtils';

export default function CaregiverCameraScreen() {
  const { top } = useSafeAreaInsets();
  const [selectedUser, setSelectedUser] = useState('1');
  const [cameraActive, setCameraActive] = useState(false);
  const [recordingActive, setRecordingActive] = useState(false);
  const [audioActive, setAudioActive] = useState(false);
  
  const [connectedUsers] = useState([
    {
      id: '1',
      name: 'María González',
      status: 'active',
      location: 'Casa - Sala de estar',
      cameraAvailable: true,
      audioAvailable: true,
      batteryLevel: 78
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      status: 'active',
      location: 'Parque Central',
      cameraAvailable: false,
      audioAvailable: true,
      batteryLevel: 45
    },
    {
      id: '3',
      name: 'Ana López',
      status: 'inactive',
      location: 'Centro Comercial',
      cameraAvailable: true,
      audioAvailable: false,
      batteryLevel: 92
    }
  ]);

  const currentUser = connectedUsers.find(user => user.id === selectedUser);

  const toggleCamera = async () => {
    if (!currentUser?.cameraAvailable) {
      Alert.alert('Cámara No Disponible', 'La cámara del usuario seleccionado no está disponible en este momento.');
      return;
    }

    await simulateHapticFeedback('medium');
    setCameraActive(!cameraActive);
    
    if (!cameraActive) {
      await simulateTextToSpeech(`Activando cámara de ${currentUser.name}`);
      Alert.alert(
        'Cámara Activada',
        `Ahora puedes ver la cámara de ${currentUser.name}. El usuario ha sido notificado de que estás monitoreando.`,
        [{ text: 'Entendido' }]
      );
    } else {
      await simulateTextToSpeech('Desactivando cámara');
      Alert.alert('Cámara Desactivada', 'La transmisión de cámara ha sido desactivada.');
    }
  };

  const toggleRecording = async () => {
    if (!cameraActive) {
      Alert.alert('Error', 'Debes activar la cámara antes de grabar.');
      return;
    }

    await simulateHapticFeedback('heavy');
    setRecordingActive(!recordingActive);
    
    if (!recordingActive) {
      await simulateTextToSpeech('Iniciando grabación');
      Alert.alert(
        'Grabación Iniciada',
        'Se ha iniciado la grabación. El usuario ha sido notificado. Recuerda respetar la privacidad.',
        [{ text: 'Entendido' }]
      );
    } else {
      await simulateTextToSpeech('Deteniendo grabación');
      Alert.alert('Grabación Guardada', 'La grabación ha sido guardada de forma segura.');
    }
  };

  const toggleAudio = async () => {
    if (!currentUser?.audioAvailable) {
      Alert.alert('Audio No Disponible', 'El audio del usuario seleccionado no está disponible.');
      return;
    }

    await simulateHapticFeedback('light');
    setAudioActive(!audioActive);
    
    if (!audioActive) {
      await simulateTextToSpeech(`Activando audio de ${currentUser.name}`);
    } else {
      await simulateTextToSpeech('Desactivando audio');
    }
  };

  const sendVoiceMessage = async () => {
    await simulateTextToSpeech('Enviando mensaje de voz');
    Alert.alert(
      'Mensaje de Voz',
      `¿Qué mensaje quieres enviar a ${currentUser?.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Mensaje Personalizado', onPress: () => Alert.alert('Mensaje Enviado', 'Tu mensaje de voz ha sido enviado') },
        { text: 'Pregunta Estado', onPress: () => Alert.alert('Mensaje Enviado', '"¿Cómo te encuentras?" enviado') },
        { text: 'Solicitar Atención', onPress: () => Alert.alert('Mensaje Enviado', '"Por favor responde" enviado') }
      ]
    );
  };

  const takeSnapshot = async () => {
    if (!cameraActive) {
      Alert.alert('Error', 'Debes activar la cámara antes de tomar una captura.');
      return;
    }

    await simulateHapticFeedback('medium');
    await simulateTextToSpeech('Tomando captura de pantalla');
    Alert.alert(
      'Captura Guardada',
      'La captura de pantalla ha sido guardada de forma segura con marca de tiempo.',
      [{ text: 'Ver Capturas', onPress: () => Alert.alert('Galería', 'Abriendo galería de capturas...') }, { text: 'Cerrar' }]
    );
  };

  const requestUserAttention = async () => {
    await simulateTextToSpeech(`Solicitando atención de ${currentUser?.name}`);
    Alert.alert(
      'Solicitar Atención',
      `¿Cómo quieres llamar la atención de ${currentUser?.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Vibración Suave', onPress: () => Alert.alert('Enviado', 'Vibración suave enviada') },
        { text: 'Sonido de Alerta', onPress: () => Alert.alert('Enviado', 'Sonido de alerta enviado') },
        { text: 'Mensaje de Voz', onPress: sendVoiceMessage }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: top }}>
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-black mb-2">CÁMARA DE MONITOREO</Text>
          <Text className="text-lg text-gray-600">Acceso Visual y Audio Remoto</Text>
        </View>

        {/* Selector de Usuario */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">SELECCIONAR USUARIO</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {connectedUsers.map(user => (
                <TouchableOpacity
                  key={user.id}
                  className={`mr-3 p-4 rounded-lg border-4 ${
                    selectedUser === user.id
                      ? 'bg-blue-600 border-white'
                      : 'bg-gray-200 border-gray-400'
                  }`}
                  onPress={() => {
                    setSelectedUser(user.id);
                    setCameraActive(false);
                    setRecordingActive(false);
                    setAudioActive(false);
                  }}
                  accessibilityLabel={`Seleccionar ${user.name}`}
                >
                  <Text className={`text-base font-bold ${
                    selectedUser === user.id ? 'text-white' : 'text-black'
                  }`}>
                    {user.name}
                  </Text>
                  <Text className={`text-sm ${
                    selectedUser === user.id ? 'text-blue-200' : 'text-gray-600'
                  }`}>
                    {user.status === 'active' ? 'Activo' : 'Inactivo'}
                  </Text>
                  <Text className={`text-sm ${
                    selectedUser === user.id ? 'text-blue-200' : 'text-gray-600'
                  }`}>
                    [Bateria] {user.batteryLevel}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Información del Usuario Seleccionado */}
        {currentUser && (
          <View className="mb-6">
            <View className="bg-gray-100 border-4 border-black p-4 rounded-lg">
              <Text className="text-xl font-bold text-black mb-2">{currentUser.name}</Text>
              <Text className="text-base text-black mb-1">[Ubicacion] {currentUser.location}</Text>
              <Text className="text-base text-black mb-1">[Bateria] {currentUser.batteryLevel}%</Text>
              <View className="flex-row mt-2">
                <View className={`px-3 py-1 rounded mr-2 ${
                  currentUser.cameraAvailable ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  <Text className="text-white font-bold text-sm">
                    [Camara] {currentUser.cameraAvailable ? 'Disponible' : 'No Disponible'}
                  </Text>
                </View>
                <View className={`px-3 py-1 rounded ${
                  currentUser.audioAvailable ? 'bg-green-600' : 'bg-red-600'
                }`}>
                  <Text className="text-white font-bold text-sm">
                    [Audio] {currentUser.audioAvailable ? 'Disponible' : 'No Disponible'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Simulación de Vista de Cámara */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">VISTA DE CÁMARA</Text>
          
          <View className={`border-4 rounded-lg p-8 ${
            cameraActive ? 'bg-blue-100 border-blue-600' : 'bg-gray-100 border-gray-400'
          }`}>
            {cameraActive ? (
              <View className="items-center">
                <Text className="text-2xl font-bold text-blue-800 mb-4">[Camara] TRANSMISIÓN ACTIVA</Text>
                <Text className="text-lg text-blue-600 mb-2">Mostrando vista de {currentUser?.name}</Text>
                <Text className="text-base text-blue-600 mb-4">{currentUser?.location}</Text>
                
                {recordingActive && (
                  <View className="bg-red-600 px-4 py-2 rounded-lg mb-4">
                    <Text className="text-white font-bold">[Grabar] GRABANDO</Text>
                  </View>
                )}
                
                {audioActive && (
                  <View className="bg-green-600 px-4 py-2 rounded-lg mb-4">
                    <Text className="text-white font-bold">[Audio] AUDIO ACTIVO</Text>
                  </View>
                )}
                
                <Text className="text-sm text-blue-500 text-center">
                  Simulación: En la aplicación real, aquí se mostraría la transmisión en vivo de la cámara del usuario.
                </Text>
              </View>
            ) : (
              <View className="items-center">
                <Text className="text-xl font-bold text-gray-600 mb-4">[Camara] CÁMARA INACTIVA</Text>
                <Text className="text-base text-gray-500 text-center">
                  Activa la cámara para ver la transmisión en vivo del usuario seleccionado.
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Controles de Cámara */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">CONTROLES</Text>
          
          <View className="grid grid-cols-2 gap-4 mb-4">
            <TouchableOpacity
              className={`border-4 border-white p-4 rounded-lg ${
                cameraActive ? 'bg-red-600' : 'bg-green-600'
              }`}
              onPress={toggleCamera}
              accessibilityLabel={cameraActive ? 'Desactivar cámara' : 'Activar cámara'}
            >
              <Text className="text-white text-lg font-bold text-center">
                {cameraActive ? '[Parar] DESACTIVAR' : '[Camara] ACTIVAR'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className={`border-4 border-white p-4 rounded-lg ${
                audioActive ? 'bg-red-600' : 'bg-blue-600'
              }`}
              onPress={toggleAudio}
              accessibilityLabel={audioActive ? 'Desactivar audio' : 'Activar audio'}
            >
              <Text className="text-white text-lg font-bold text-center">
                {audioActive ? '[Silencio] SILENCIAR' : '[Audio] AUDIO'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className={`border-4 border-white p-4 rounded-lg ${
                recordingActive ? 'bg-red-800' : 'bg-purple-600'
              }`}
              onPress={toggleRecording}
              accessibilityLabel={recordingActive ? 'Detener grabación' : 'Iniciar grabación'}
            >
              <Text className="text-white text-lg font-bold text-center">
                {recordingActive ? '[Parar] DETENER' : '[Grabar] GRABAR'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-orange-600 border-4 border-white p-4 rounded-lg"
              onPress={takeSnapshot}
              accessibilityLabel="Tomar captura de pantalla"
            >
              <Text className="text-white text-lg font-bold text-center">
                [Foto] CAPTURA
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comunicación */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">COMUNICACIÓN</Text>
          
          <TouchableOpacity
            className="bg-green-600 border-4 border-white p-4 rounded-lg mb-4"
            onPress={sendVoiceMessage}
            accessibilityLabel="Enviar mensaje de voz"
          >
            <Text className="text-white text-lg font-bold text-center">
              [Microfono] ENVIAR MENSAJE DE VOZ
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-yellow-600 border-4 border-white p-4 rounded-lg"
            onPress={requestUserAttention}
            accessibilityLabel="Solicitar atención del usuario"
          >
            <Text className="text-white text-lg font-bold text-center">
              [Atencion] SOLICITAR ATENCIÓN
            </Text>
          </TouchableOpacity>
        </View>

        {/* Información de Privacidad */}
        <View className="mb-6">
          <View className="bg-yellow-100 border-4 border-yellow-600 p-4 rounded-lg">
            <Text className="text-lg font-bold text-yellow-800 mb-2">[Privacidad] AVISO DE PRIVACIDAD</Text>
            <Text className="text-base text-yellow-800">
              • El usuario es notificado cuando activas la cámara o audio
              • Todas las grabaciones se almacenan de forma segura
              • Respeta la privacidad y usa estas funciones solo cuando sea necesario
              • Las capturas incluyen marca de tiempo para documentación
            </Text>
          </View>
        </View>

        {/* Acceso Rápido a Emergencia */}
        <View className="mb-6">
          <TouchableOpacity
            className="bg-red-600 border-4 border-white p-6 rounded-lg"
            onPress={() => Alert.alert(
              'Protocolo de Emergencia',
              '¿Confirmas que hay una situación de emergencia?',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar Emergencia', onPress: () => Alert.alert('Emergencia Activada', 'Servicios de emergencia han sido contactados') }
              ]
            )}
            accessibilityLabel="Activar protocolo de emergencia"
          >
            <Text className="text-white text-2xl font-bold text-center">
              [SOS] EMERGENCIA
            </Text>
            <Text className="text-white text-base text-center mt-2">
              Activar protocolo de emergencia inmediato
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}