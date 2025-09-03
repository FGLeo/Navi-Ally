import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Switch, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { simulateTextToSpeech, simulateHapticFeedback } from '../../utils/simulationUtils';

export default function CaregiverSettingsScreen() {
  const { top } = useSafeAreaInsets();
  
  // Estados para configuraciones
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emergencyAlertsEnabled, setEmergencyAlertsEnabled] = useState(true);
  const [autoRecordingEnabled, setAutoRecordingEnabled] = useState(false);
  const [voiceCommandsEnabled, setVoiceCommandsEnabled] = useState(true);
  const [highContrastMode, setHighContrastMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  
  // Estados para información del cuidador
  const [caregiverInfo, setCaregiverInfo] = useState({
    name: 'Dr. Patricia Hernández',
    email: 'patricia.hernandez@cuidadores.com',
    phone: '+34 600 123 456',
    license: 'CG-2024-001',
    organization: 'Centro de Cuidados Avanzados',
    specialization: 'Cuidados Geriátricos'
  });
  
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: '1', name: 'Servicios de Emergencia', phone: '112', type: 'emergency' },
    { id: '2', name: 'Supervisor - María García', phone: '+34 611 234 567', type: 'supervisor' },
    { id: '3', name: 'Centro Médico', phone: '+34 622 345 678', type: 'medical' }
  ]);

  const testAudioSettings = async () => {
    await simulateTextToSpeech('Probando configuración de audio. Si puedes escuchar esto, el audio funciona correctamente.');
    await simulateHapticFeedback('medium');
    Alert.alert('Prueba de Audio', 'Prueba de audio y vibración completada.');
  };

  const exportUserData = () => {
    Alert.alert(
      'Exportar Datos',
      '¿Qué datos quieres exportar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Historial de Usuarios', onPress: () => Alert.alert('Exportando', 'Generando reporte de usuarios...') },
        { text: 'Registros de Emergencia', onPress: () => Alert.alert('Exportando', 'Generando reporte de emergencias...') },
        { text: 'Datos Completos', onPress: () => Alert.alert('Exportando', 'Generando reporte completo...') }
      ]
    );
  };

  const manageSubscription = () => {
    Alert.alert(
      'Gestión de Suscripción',
      'Plan Actual: Profesional\nUsuarios: 50/50\nVencimiento: 15 Abr 2024',
      [
        { text: 'Cerrar' },
        { text: 'Actualizar Plan', onPress: () => Alert.alert('Actualizar', 'Redirigiendo a opciones de plan...') },
        { text: 'Facturación', onPress: () => Alert.alert('Facturación', 'Abriendo historial de facturación...') }
      ]
    );
  };

  const logout = async () => {
    await simulateTextToSpeech('Cerrando sesión');
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', onPress: () => Alert.alert('Sesión Cerrada', 'Has cerrado sesión correctamente') }
      ]
    );
  };

  const deleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'ADVERTENCIA: Esta acción eliminará permanentemente tu cuenta y todos los datos asociados. Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
          Alert.alert(
            'Confirmación Final',
            'Escribe "ELIMINAR" para confirmar la eliminación de la cuenta:',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Confirmar', onPress: () => Alert.alert('Cuenta Eliminada', 'Tu cuenta ha sido eliminada') }
            ]
          );
        }}
      ]
    );
  };

  const editProfile = () => {
    Alert.alert(
      'Editar Perfil',
      'Esta función permite editar la información del cuidador.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => Alert.alert('Formulario', 'Abriendo formulario de edición...') }
      ]
    );
  };

  const addEmergencyContact = () => {
    Alert.alert(
      'Agregar Contacto',
      'Agregar nuevo contacto de emergencia',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Agregar', onPress: () => Alert.alert('Contacto', 'Abriendo formulario de contacto...') }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: top }}>
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-black mb-2">CONFIGURACIÓN</Text>
          <Text className="text-lg text-gray-600">Ajustes de la aplicación de cuidadores</Text>
        </View>

        {/* Información del Cuidador */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">PERFIL DEL CUIDADOR</Text>
          
          <View className="bg-blue-50 border-4 border-blue-600 p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-start mb-3">
              <View className="flex-1">
                <Text className="text-xl font-bold text-black">{caregiverInfo.name}</Text>
                <Text className="text-base text-gray-600">[Email] {caregiverInfo.email}</Text>
                <Text className="text-base text-gray-600">[Telefono] {caregiverInfo.phone}</Text>
                <Text className="text-base text-gray-600">[Licencia] {caregiverInfo.license}</Text>
                <Text className="text-base text-gray-600">[Organizacion] {caregiverInfo.organization}</Text>
                <Text className="text-base text-gray-600">[Especialidad] {caregiverInfo.specialization}</Text>
              </View>
            </View>
            
            <TouchableOpacity
              className="bg-blue-600 border-2 border-white p-3 rounded-lg"
              onPress={editProfile}
              accessibilityLabel="Editar perfil del cuidador"
            >
              <Text className="text-white text-lg font-bold text-center">[Editar] EDITAR PERFIL</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Configuraciones de Notificaciones */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">NOTIFICACIONES</Text>
          
          <View className="bg-gray-50 border-4 border-gray-300 p-4 rounded-lg">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-black flex-1">[Notificacion] Notificaciones Generales</Text>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                accessibilityLabel="Activar notificaciones generales"
              />
            </View>
            
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-black flex-1">[SOS] Alertas de Emergencia</Text>
              <Switch
                value={emergencyAlertsEnabled}
                onValueChange={setEmergencyAlertsEnabled}
                accessibilityLabel="Activar alertas de emergencia"
              />
            </View>
            
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-black flex-1">[Grabar] Grabación Automática</Text>
              <Switch
                value={autoRecordingEnabled}
                onValueChange={setAutoRecordingEnabled}
                accessibilityLabel="Activar grabación automática en emergencias"
              />
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-bold text-black flex-1">[Microfono] Comandos de Voz</Text>
              <Switch
                value={voiceCommandsEnabled}
                onValueChange={setVoiceCommandsEnabled}
                accessibilityLabel="Activar comandos de voz"
              />
            </View>
          </View>
        </View>

        {/* Configuraciones de Accesibilidad */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">ACCESIBILIDAD</Text>
          
          <View className="bg-gray-50 border-4 border-gray-300 p-4 rounded-lg">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-black flex-1">[Contraste] Modo Alto Contraste</Text>
              <Switch
                value={highContrastMode}
                onValueChange={setHighContrastMode}
                accessibilityLabel="Activar modo alto contraste"
              />
            </View>
            
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-black flex-1">[Audio] Sonidos del Sistema</Text>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                accessibilityLabel="Activar sonidos del sistema"
              />
            </View>
            
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-black flex-1">[Vibracion] Vibración</Text>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                accessibilityLabel="Activar vibración"
              />
            </View>
            
            <TouchableOpacity
              className="bg-purple-600 border-2 border-white p-3 rounded-lg"
              onPress={testAudioSettings}
              accessibilityLabel="Probar configuración de audio"
            >
              <Text className="text-white text-lg font-bold text-center">[Audio] PROBAR CONFIGURACIÓN</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contactos de Emergencia */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold text-black">CONTACTOS DE EMERGENCIA</Text>
            <TouchableOpacity
              className="bg-green-600 border-2 border-white px-3 py-2 rounded-lg"
              onPress={addEmergencyContact}
              accessibilityLabel="Agregar contacto de emergencia"
            >
              <Text className="text-white font-bold">[Agregar] NUEVO</Text>
            </TouchableOpacity>
          </View>
          
          <View className="bg-gray-50 border-4 border-gray-300 p-4 rounded-lg">
            {emergencyContacts.map(contact => (
              <View key={contact.id} className="flex-row justify-between items-center mb-3 pb-3 border-b border-gray-300">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">{contact.name}</Text>
                  <Text className="text-base text-gray-600">[Telefono] {contact.phone}</Text>
                  <Text className="text-sm text-gray-500">
                    {contact.type === 'emergency' && '[SOS] Emergencia'}
                    {contact.type === 'supervisor' && '[Supervisor] Supervisor'}
                    {contact.type === 'medical' && '[Medico] Médico'}
                  </Text>
                </View>
                <TouchableOpacity
                  className="bg-blue-600 border-2 border-white px-3 py-2 rounded-lg"
                  onPress={() => Alert.alert('Llamando', `Llamando a ${contact.name}...`)}
                  accessibilityLabel={`Llamar a ${contact.name}`}
                >
                  <Text className="text-white font-bold">[Llamar] LLAMAR</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Gestión de Datos */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">GESTIÓN DE DATOS</Text>
          
          <View className="bg-gray-50 border-4 border-gray-300 p-4 rounded-lg">
            <TouchableOpacity
              className="bg-blue-600 border-2 border-white p-3 rounded-lg mb-3"
              onPress={exportUserData}
              accessibilityLabel="Exportar datos de usuarios"
            >
              <Text className="text-white text-lg font-bold text-center">[Exportar] EXPORTAR DATOS</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-gray-600 border-2 border-white p-3 rounded-lg mb-3"
              onPress={() => Alert.alert('Respaldo', 'Creando respaldo de datos...', [
                { text: 'Cerrar' },
                { text: 'Ver Respaldos', onPress: () => Alert.alert('Respaldos', 'Mostrando respaldos disponibles...') }
              ])}
              accessibilityLabel="Crear respaldo de datos"
            >
              <Text className="text-white text-lg font-bold text-center">[Respaldo] CREAR RESPALDO</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-orange-600 border-2 border-white p-3 rounded-lg"
              onPress={() => Alert.alert(
                'Limpiar Caché',
                '¿Quieres limpiar los datos temporales? Esto puede mejorar el rendimiento.',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  { text: 'Limpiar', onPress: () => Alert.alert('Limpieza', 'Caché limpiado correctamente') }
                ]
              )}
              accessibilityLabel="Limpiar caché de la aplicación"
            >
              <Text className="text-white text-lg font-bold text-center">[Limpiar] LIMPIAR CACHÉ</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Suscripción y Facturación */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">SUSCRIPCIÓN</Text>
          
          <TouchableOpacity
            className="bg-green-600 border-4 border-white p-4 rounded-lg"
            onPress={manageSubscription}
            accessibilityLabel="Gestionar suscripción"
          >
            <Text className="text-white text-lg font-bold text-center">[Suscripcion] GESTIONAR SUSCRIPCIÓN</Text>
            <Text className="text-white text-base text-center mt-2">
              Plan Profesional - 50 usuarios
            </Text>
          </TouchableOpacity>
        </View>

        {/* Información Legal */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">INFORMACIÓN LEGAL</Text>
          
          <View className="bg-gray-50 border-4 border-gray-300 p-4 rounded-lg">
            <TouchableOpacity
              className="bg-gray-600 border-2 border-white p-3 rounded-lg mb-3"
              onPress={() => Alert.alert('Términos', 'Abriendo términos y condiciones...')}
              accessibilityLabel="Ver términos y condiciones"
            >
              <Text className="text-white text-lg font-bold text-center">[Legal] TÉRMINOS Y CONDICIONES</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-gray-600 border-2 border-white p-3 rounded-lg mb-3"
              onPress={() => Alert.alert('Privacidad', 'Abriendo política de privacidad...')}
              accessibilityLabel="Ver política de privacidad"
            >
              <Text className="text-white text-lg font-bold text-center">[Privacidad] POLÍTICA DE PRIVACIDAD</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-gray-600 border-2 border-white p-3 rounded-lg"
              onPress={() => Alert.alert('Licencias', 'Mostrando licencias de software...')}
              accessibilityLabel="Ver licencias de software"
            >
              <Text className="text-white text-lg font-bold text-center">[Info] LICENCIAS</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Acciones de Cuenta */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">ACCIONES DE CUENTA</Text>
          
          <View className="bg-gray-50 border-4 border-gray-300 p-4 rounded-lg">
            <TouchableOpacity
              className="bg-orange-600 border-2 border-white p-3 rounded-lg mb-3"
              onPress={logout}
              accessibilityLabel="Cerrar sesión"
            >
              <Text className="text-white text-lg font-bold text-center">[Salir] CERRAR SESIÓN</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-red-600 border-2 border-white p-3 rounded-lg"
              onPress={deleteAccount}
              accessibilityLabel="Eliminar cuenta"
            >
              <Text className="text-white text-lg font-bold text-center">[Eliminar] ELIMINAR CUENTA</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Información de la Aplicación */}
        <View className="mb-6">
          <View className="bg-blue-50 border-4 border-blue-600 p-4 rounded-lg">
            <Text className="text-lg font-bold text-blue-800 mb-2">[Info] INFORMACIÓN DE LA APLICACIÓN</Text>
            <Text className="text-base text-blue-600">NaviAlly Cuidadores v2.1.0</Text>
            <Text className="text-base text-blue-600">Última actualización: 15 Mar 2024</Text>
            <Text className="text-base text-blue-600">Desarrollado para profesionales del cuidado</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}