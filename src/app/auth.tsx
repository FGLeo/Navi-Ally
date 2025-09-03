import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { simulateTextToSpeech, simulateHapticFeedback } from '../utils/simulationUtils';

export default function AuthScreen() {
  const { top } = useSafeAreaInsets();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      await simulateTextToSpeech('Error: Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    await simulateTextToSpeech('Iniciando sesión...');
    
    // Simular proceso de autenticación
    setTimeout(async () => {
      setIsLoading(false);
      await simulateTextToSpeech('Sesión iniciada correctamente. Bienvenido a Navi-Ally');
      await simulateHapticFeedback('success');
      router.replace('/(tabs)');
    }, 2000);
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      await simulateTextToSpeech('Error: Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      await simulateTextToSpeech('Error: Las contraseñas no coinciden');
      return;
    }

    setIsLoading(true);
    await simulateTextToSpeech('Creando cuenta...');
    
    // Simular proceso de registro
    setTimeout(async () => {
      setIsLoading(false);
      await simulateTextToSpeech('Cuenta creada correctamente. Bienvenido a Navi-Ally');
      await simulateHapticFeedback('success');
      router.replace('/(tabs)');
    }, 2000);
  };

  const speakInstructions = () => {
    const instruction = isLogin 
      ? 'Pantalla de inicio de sesión. Ingresa tu email y contraseña para acceder a Navi-Ally.'
      : 'Pantalla de registro. Completa todos los campos para crear tu cuenta de Navi-Ally.';
    
    Alert.alert('Instrucciones de voz', instruction);
  };

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: top }}>
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text 
            className="text-4xl font-bold text-black text-center mb-4"
            accessibilityRole="header"
            accessibilityLabel="Navi-Ally - Aplicación de asistencia visual"
          >
            NAVI-ALLY
          </Text>
          <Text className="text-xl text-black text-center mb-6">
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </Text>
          
          {/* Voice Instructions Button */}
          <TouchableOpacity
            className="bg-black border-4 border-white p-4 rounded-lg mb-6"
            onPress={speakInstructions}
            accessibilityLabel="Escuchar instrucciones de voz"
            accessibilityHint="Toca para escuchar las instrucciones de esta pantalla"
          >
            <Text className="text-white text-lg font-bold text-center">
              [Audio] ESCUCHAR INSTRUCCIONES
            </Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View className="mb-8">
          {!isLogin && (
            <View className="mb-6">
              <Text className="text-xl font-bold text-black mb-2">Nombre Completo</Text>
              <TextInput
                className="bg-white border-4 border-black p-4 text-xl text-black rounded-lg"
                value={name}
                onChangeText={setName}
                placeholder="Ingresa tu nombre completo"
                placeholderTextColor="#666666"
                accessibilityLabel="Campo de nombre completo"
                accessibilityHint="Ingresa tu nombre completo para el registro"
                autoCapitalize="words"
              />
            </View>
          )}
          
          <View className="mb-6">
            <Text className="text-xl font-bold text-black mb-2">Email</Text>
            <TextInput
              className="bg-white border-4 border-black p-4 text-xl text-black rounded-lg"
              value={email}
              onChangeText={setEmail}
              placeholder="ejemplo@correo.com"
              placeholderTextColor="#666666"
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="Campo de email"
              accessibilityHint="Ingresa tu dirección de correo electrónico"
            />
          </View>
          
          <View className="mb-6">
            <Text className="text-xl font-bold text-black mb-2">Contraseña</Text>
            <TextInput
              className="bg-white border-4 border-black p-4 text-xl text-black rounded-lg"
              value={password}
              onChangeText={setPassword}
              placeholder="Ingresa tu contraseña"
              placeholderTextColor="#666666"
              secureTextEntry
              accessibilityLabel="Campo de contraseña"
              accessibilityHint="Ingresa tu contraseña"
            />
          </View>
          
          {!isLogin && (
            <View className="mb-6">
              <Text className="text-xl font-bold text-black mb-2">Confirmar Contraseña</Text>
              <TextInput
                className="bg-white border-4 border-black p-4 text-xl text-black rounded-lg"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#666666"
                secureTextEntry
                accessibilityLabel="Campo de confirmación de contraseña"
                accessibilityHint="Confirma tu contraseña ingresándola nuevamente"
              />
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View className="mb-8">
          <TouchableOpacity
            className="bg-black border-4 border-white p-6 rounded-lg mb-4"
            onPress={isLogin ? handleLogin : handleRegister}
            disabled={isLoading}
            accessibilityLabel={isLogin ? 'Iniciar sesión' : 'Crear cuenta'}
            accessibilityHint={isLogin ? 'Toca para iniciar sesión con tus credenciales' : 'Toca para crear tu nueva cuenta'}
          >
            <Text className="text-white text-2xl font-bold text-center">
              {isLoading ? 'CARGANDO...' : (isLogin ? 'INICIAR SESIÓN' : 'CREAR CUENTA')}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-white border-4 border-black p-4 rounded-lg"
            onPress={() => setIsLogin(!isLogin)}
            accessibilityLabel={isLogin ? 'Cambiar a registro' : 'Cambiar a inicio de sesión'}
            accessibilityHint={isLogin ? 'Toca para ir a la pantalla de registro' : 'Toca para ir a la pantalla de inicio de sesión'}
          >
            <Text className="text-black text-lg font-bold text-center">
              {isLogin ? '¿No tienes cuenta? REGISTRARSE' : '¿Ya tienes cuenta? INICIAR SESIÓN'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Caregiver Access */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-black text-center mb-4">
            ACCESO PARA CUIDADORES
          </Text>
          <TouchableOpacity
            className="bg-blue-600 border-4 border-white p-4 rounded-lg mb-6"
            onPress={async () => {
              await simulateTextToSpeech('Accediendo a la aplicación de cuidadores');
              router.replace('/(caregiver)');
            }}
            accessibilityLabel="Acceso para cuidadores profesionales"
            accessibilityHint="Toca para acceder a la aplicación de cuidadores"
          >
            <Text className="text-white text-xl font-bold text-center">
              [Cuidador] ACCESO CUIDADORES
            </Text>
            <Text className="text-white text-base text-center mt-2">
              Para profesionales del cuidado
            </Text>
          </TouchableOpacity>
        </View>

        {/* Emergency Access */}
        <View className="mb-8">
          <Text className="text-lg font-bold text-black text-center mb-4">
            ACCESO DE EMERGENCIA
          </Text>
          <TouchableOpacity
            className="bg-red-600 border-4 border-white p-4 rounded-lg"
            onPress={() => Alert.alert('SOS', 'Función de emergencia activada. Contactando servicios de emergencia.')}
            accessibilityLabel="Botón de emergencia SOS"
            accessibilityHint="Toca para activar el modo de emergencia"
          >
            <Text className="text-white text-xl font-bold text-center">
              [SOS] SOS - EMERGENCIA
            </Text>
          </TouchableOpacity>
        </View>

        {/* Accessibility Info */}
        <View className="bg-gray-100 border-4 border-black p-4 rounded-lg">
          <Text className="text-lg font-bold text-black text-center mb-2">
            COMANDOS DE VOZ DISPONIBLES
          </Text>
          <Text className="text-base text-black text-center">
            • "Leer pantalla" - Describe el contenido actual{"\n"}
            • "Ayuda" - Instrucciones de navegación{"\n"}
            • "Emergencia" - Activar modo SOS{"\n"}
            • Toque doble - Repetir última instrucción
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}