import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Switch, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { simulateTextToSpeech, simulateHapticFeedback, simulateDevicePairing } from '../../utils/simulationUtils';

export default function SettingsScreen() {
  const { top } = useSafeAreaInsets();
  const [voiceSpeed, setVoiceSpeed] = useState(1.0);
  const [detectionSensitivity, setDetectionSensitivity] = useState(0.7);
  const [language, setLanguage] = useState('Español');
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [highContrastMode, setHighContrastMode] = useState(true);
  const [continuousMode, setContinuousMode] = useState(false);
  const [autoRepeat, setAutoRepeat] = useState(false);
  
  // Estados para perfil
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [userName, setUserName] = useState('Usuario Navi-Ally');
  const [userEmail, setUserEmail] = useState('usuario@example.com');
  
  // Estados para dispositivos
  const [connectedDevices, setConnectedDevices] = useState([
    { id: '1', name: 'Auriculares Bluetooth', type: 'audio', connected: true },
    { id: '2', name: 'Smartwatch', type: 'wearable', connected: false },
  ]);
  
  // Estados para privacidad
  const [locationSharing, setLocationSharing] = useState(true);
  const [dataCollection, setDataCollection] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  const voiceSpeeds = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
  const sensitivityLevels = [0.3, 0.5, 0.7, 0.9];
  const languages = ['Español', 'English', 'Français'];
  const sensitivityLabels = ['Baja', 'Media', 'Alta', 'Máxima'];

  const testVoiceSpeed = () => {
    Alert.alert(
      'Prueba de Velocidad',
      `Esta es una prueba de velocidad de voz configurada a ${voiceSpeed}x. Navi-Ally utilizará esta velocidad para todas las descripciones y comandos de voz.`,
      [{ text: 'Entendido' }]
    );
  };

  const testDetectionSensitivity = () => {
    const sensitivityIndex = sensitivityLevels.indexOf(detectionSensitivity);
    const sensitivityLabel = sensitivityLabels[sensitivityIndex];
    
    Alert.alert(
      'Prueba de Sensibilidad',
      `Sensibilidad configurada en nivel ${sensitivityLabel}. Iniciando detección de prueba...`,
      [{ text: 'Continuar' }]
    );
    
    setTimeout(() => {
      Alert.alert(
        'Resultado de Prueba',
        'Simulación: Objeto detectado a 1.5 metros - Silla de plástico blanca',
        [{ text: 'Repetir Prueba', onPress: testDetectionSensitivity }, { text: 'Aceptar' }]
      );
    }, 2000);
  };

  const resetToDefaults = () => {
    Alert.alert(
      'Restaurar Configuración',
      '¿Estás seguro de que quieres restaurar todas las configuraciones a los valores predeterminados?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Restaurar', onPress: () => {
          setVoiceSpeed(1.0);
          setDetectionSensitivity(0.7);
          setLanguage('Español');
          setVoiceCommandsEnabled(true);
          setHapticFeedback(true);
          setHighContrastMode(true);
          setContinuousMode(false);
          setAutoRepeat(false);
          Alert.alert('Configuración Restaurada', 'Todas las configuraciones han sido restauradas a los valores predeterminados.');
        }}
      ]
    );
  };

  const saveSettings = () => {
    Alert.alert(
      'Configuración Guardada',
      'Todas las configuraciones de accesibilidad han sido guardadas exitosamente.',
      [{ text: 'Continuar' }]
    );
  };

  const saveProfile = () => {
    setIsEditingProfile(false);
    Alert.alert('Perfil Actualizado', 'Los datos del perfil han sido guardados exitosamente.');
  };

  const toggleDeviceConnection = (deviceId) => {
    setConnectedDevices(devices => 
      devices.map(device => 
        device.id === deviceId 
          ? { ...device, connected: !device.connected }
          : device
      )
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', onPress: () => router.replace('/') }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción no se puede deshacer. ¿Estás seguro de que quieres eliminar tu cuenta permanentemente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
          Alert.alert('Cuenta Eliminada', 'Tu cuenta ha sido eliminada exitosamente.');
          router.replace('/');
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
            accessibilityLabel="Configuraciones de Accesibilidad de Navi-Ally"
          >
            CONFIGURACIÓN
          </Text>
          <Text className="text-xl text-black text-center mb-4">
            Ajustes de Accesibilidad
          </Text>
        </View>

        {/* Voice Speed Settings */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">VELOCIDAD DE VOZ</Text>
          <Text className="text-lg text-black mb-4">Actual: {voiceSpeed}x</Text>
          
          <View className="flex-row flex-wrap justify-between mb-4">
            {voiceSpeeds.map((speed) => (
              <TouchableOpacity
                key={speed}
                className={`${voiceSpeed === speed ? 'bg-black' : 'bg-gray-300'} border-4 border-black p-3 rounded-lg mb-2`}
                style={{ width: '30%' }}
                onPress={() => setVoiceSpeed(speed)}
                accessibilityLabel={`Velocidad ${speed}x`}
                accessibilityHint={`Toca para configurar la velocidad de voz a ${speed}x`}
              >
                <Text className={`${voiceSpeed === speed ? 'text-white' : 'text-black'} text-lg font-bold text-center`}>
                  {speed}x
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity
            className="bg-blue-600 border-4 border-white p-4 rounded-lg"
            onPress={testVoiceSpeed}
            accessibilityLabel="Probar velocidad de voz"
            accessibilityHint="Toca para escuchar una prueba con la velocidad seleccionada"
          >
            <Text className="text-white text-lg font-bold text-center">
              [Audio] PROBAR VELOCIDAD
            </Text>
          </TouchableOpacity>
        </View>

        {/* Detection Sensitivity */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">SENSIBILIDAD DE DETECCIÓN</Text>
          <Text className="text-lg text-black mb-4">
            Nivel: {sensitivityLabels[sensitivityLevels.indexOf(detectionSensitivity)]}
          </Text>
          
          <View className="flex-row justify-between mb-4">
            {sensitivityLevels.map((level, index) => (
              <TouchableOpacity
                key={level}
                className={`${detectionSensitivity === level ? 'bg-black' : 'bg-gray-300'} border-4 border-black p-3 rounded-lg`}
                style={{ width: '22%' }}
                onPress={() => setDetectionSensitivity(level)}
                accessibilityLabel={`Sensibilidad ${sensitivityLabels[index]}`}
                accessibilityHint={`Toca para configurar la sensibilidad a nivel ${sensitivityLabels[index]}`}
              >
                <Text className={`${detectionSensitivity === level ? 'text-white' : 'text-black'} text-sm font-bold text-center`}>
                  {sensitivityLabels[index]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <TouchableOpacity
            className="bg-green-600 border-4 border-white p-4 rounded-lg"
            onPress={testDetectionSensitivity}
            accessibilityLabel="Probar sensibilidad de detección"
            accessibilityHint="Toca para realizar una prueba de detección con la sensibilidad seleccionada"
          >
            <Text className="text-white text-lg font-bold text-center">
              [Objetivo] PROBAR SENSIBILIDAD
            </Text>
          </TouchableOpacity>
        </View>

        {/* Language Selection */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">IDIOMA</Text>
          
          <View className="flex-row justify-between mb-4">
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang}
                className={`${language === lang ? 'bg-black' : 'bg-gray-300'} border-4 border-black p-4 rounded-lg`}
                style={{ width: '30%' }}
                onPress={() => setLanguage(lang)}
                accessibilityLabel={`Idioma ${lang}`}
                accessibilityHint={`Toca para cambiar el idioma a ${lang}`}
              >
                <Text className={`${language === lang ? 'text-white' : 'text-black'} text-lg font-bold text-center`}>
                  {lang}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Toggle Settings */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">CONFIGURACIONES GENERALES</Text>
          
          {/* Voice Commands */}
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-lg font-bold text-black">Comandos de Voz</Text>
                <Text className="text-base text-black">Activar reconocimiento de voz</Text>
              </View>
              <Switch
                value={voiceCommandsEnabled}
                onValueChange={setVoiceCommandsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
                thumbColor={voiceCommandsEnabled ? '#ffffff' : '#f4f3f4'}
                accessibilityLabel="Activar comandos de voz"
              />
            </View>
          </View>
          
          {/* Haptic Feedback */}
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-lg font-bold text-black">Vibración</Text>
                <Text className="text-base text-black">Retroalimentación háptica</Text>
              </View>
              <Switch
                value={hapticFeedback}
                onValueChange={setHapticFeedback}
                trackColor={{ false: '#767577', true: '#000000' }}
                thumbColor={hapticFeedback ? '#ffffff' : '#f4f3f4'}
                accessibilityLabel="Activar vibración"
              />
            </View>
          </View>
          
          {/* High Contrast */}
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-lg font-bold text-black">Alto Contraste</Text>
                <Text className="text-base text-black">Modo de alto contraste visual</Text>
              </View>
              <Switch
                value={highContrastMode}
                onValueChange={setHighContrastMode}
                trackColor={{ false: '#767577', true: '#000000' }}
                thumbColor={highContrastMode ? '#ffffff' : '#f4f3f4'}
                accessibilityLabel="Activar alto contraste"
              />
            </View>
          </View>
          
          {/* Continuous Mode */}
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-lg font-bold text-black">Modo Continuo</Text>
                <Text className="text-base text-black">Detección automática constante</Text>
              </View>
              <Switch
                value={continuousMode}
                onValueChange={setContinuousMode}
                trackColor={{ false: '#767577', true: '#000000' }}
                thumbColor={continuousMode ? '#ffffff' : '#f4f3f4'}
                accessibilityLabel="Activar modo continuo"
              />
            </View>
          </View>
          
          {/* Auto Repeat */}
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-lg font-bold text-black">Repetición Automática</Text>
                <Text className="text-base text-black">Repetir descripciones importantes</Text>
              </View>
              <Switch
                value={autoRepeat}
                onValueChange={setAutoRepeat}
                trackColor={{ false: '#767577', true: '#000000' }}
                thumbColor={autoRepeat ? '#ffffff' : '#f4f3f4'}
                accessibilityLabel="Activar repetición automática"
              />
            </View>
          </View>
        </View>

        {/* Touch Commands Info */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">COMANDOS TÁCTILES</Text>
          <View className="bg-yellow-100 border-4 border-yellow-600 p-4 rounded-lg">
            <Text className="text-lg font-bold text-yellow-800 text-center mb-2">
              GESTOS CONFIGURADOS
            </Text>
            <Text className="text-base text-yellow-800">
              • Toque simple: Repetir última descripción{"\n"}
              • Toque doble: Pausar/Reanudar audio{"\n"}
              • Presión larga: Modo de descripción continua{"\n"}
              • Deslizar arriba/abajo: Ajustar volumen{"\n"}
              • Deslizar izquierda/derecha: Cambiar sensibilidad
            </Text>
          </View>
        </View>

        {/* Perfil de Usuario */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">PERFIL DE USUARIO</Text>
          
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
            {isEditingProfile ? (
              <View>
                <Text className="text-lg font-bold text-black mb-2">Nombre:</Text>
                <TextInput
                  className="bg-white border-2 border-gray-400 p-3 rounded-lg mb-4 text-lg"
                  value={userName}
                  onChangeText={setUserName}
                  accessibilityLabel="Campo de nombre de usuario"
                />
                
                <Text className="text-lg font-bold text-black mb-2">Email:</Text>
                <TextInput
                  className="bg-white border-2 border-gray-400 p-3 rounded-lg mb-4 text-lg"
                  value={userEmail}
                  onChangeText={setUserEmail}
                  keyboardType="email-address"
                  accessibilityLabel="Campo de email"
                />
                
                <View className="flex-row justify-between">
                  <TouchableOpacity
                    className="bg-green-600 border-2 border-white p-3 rounded-lg flex-1 mr-2"
                    onPress={saveProfile}
                  >
                    <Text className="text-white text-lg font-bold text-center">Guardar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    className="bg-gray-600 border-2 border-white p-3 rounded-lg flex-1 ml-2"
                    onPress={() => setIsEditingProfile(false)}
                  >
                    <Text className="text-white text-lg font-bold text-center">Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View>
                <Text className="text-lg font-bold text-black mb-2">[Usuario] {userName}</Text>
            <Text className="text-base text-gray-600 mb-4">[Email] {userEmail}</Text>
                
                <TouchableOpacity
                  className="bg-blue-600 border-2 border-white p-3 rounded-lg"
                  onPress={() => setIsEditingProfile(true)}
                >
                  <Text className="text-white text-lg font-bold text-center">[Editar] Editar Perfil</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Dispositivos Conectados */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">DISPOSITIVOS CONECTADOS</Text>
          
          {connectedDevices.map((device) => (
            <View key={device.id} className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">
                    {device.type === 'audio' ? '[Audio]' : '[Reloj]'} {device.name}
                  </Text>
                  <Text className={`text-base ${device.connected ? 'text-green-600' : 'text-red-600'}`}>
                    {device.connected ? 'Conectado' : 'Desconectado'}
                  </Text>
                </View>
                <TouchableOpacity
                  className={`${device.connected ? 'bg-red-600' : 'bg-green-600'} border-2 border-white p-2 rounded-lg`}
                  onPress={() => toggleDeviceConnection(device.id)}
                >
                  <Text className="text-white text-sm font-bold">
                    {device.connected ? 'Desconectar' : 'Conectar'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Configuraciones de Privacidad */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">PRIVACIDAD Y DATOS</Text>
          
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-lg font-bold text-black">Compartir Ubicación</Text>
                <Text className="text-base text-black">Permitir acceso a ubicación para navegación</Text>
              </View>
              <Switch
                value={locationSharing}
                onValueChange={setLocationSharing}
                trackColor={{ false: '#767577', true: '#000000' }}
                thumbColor={locationSharing ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>
          
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-lg font-bold text-black">Recopilación de Datos</Text>
                <Text className="text-base text-black">Permitir recopilación para mejorar la app</Text>
              </View>
              <Switch
                value={dataCollection}
                onValueChange={setDataCollection}
                trackColor={{ false: '#767577', true: '#000000' }}
                thumbColor={dataCollection ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>
          
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-center">
              <View className="flex-1">
                <Text className="text-lg font-bold text-black">Análisis de Uso</Text>
                <Text className="text-base text-black">Enviar estadísticas de uso anónimas</Text>
              </View>
              <Switch
                value={analyticsEnabled}
                onValueChange={setAnalyticsEnabled}
                trackColor={{ false: '#767577', true: '#000000' }}
                thumbColor={analyticsEnabled ? '#ffffff' : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mb-8">
          <TouchableOpacity
            className="bg-black border-4 border-white p-6 rounded-lg mb-4"
            onPress={saveSettings}
            accessibilityLabel="Guardar configuraciones"
            accessibilityHint="Toca para guardar todas las configuraciones actuales"
          >
            <Text className="text-white text-2xl font-bold text-center">
              [Guardar] GUARDAR CONFIGURACIÓN
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-gray-600 border-4 border-white p-4 rounded-lg mb-4"
            onPress={resetToDefaults}
            accessibilityLabel="Restaurar configuración predeterminada"
            accessibilityHint="Toca para restaurar todas las configuraciones a los valores predeterminados"
          >
            <Text className="text-white text-lg font-bold text-center">
              [Restaurar] RESTAURAR PREDETERMINADOS
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-orange-600 border-4 border-white p-4 rounded-lg mb-4"
            onPress={handleLogout}
            accessibilityLabel="Cerrar sesión"
          >
            <Text className="text-white text-lg font-bold text-center">
              [Salir] CERRAR SESIÓN
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-red-600 border-4 border-white p-4 rounded-lg"
            onPress={handleDeleteAccount}
            accessibilityLabel="Eliminar cuenta"
          >
            <Text className="text-white text-lg font-bold text-center">
              [Eliminar] ELIMINAR CUENTA
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}