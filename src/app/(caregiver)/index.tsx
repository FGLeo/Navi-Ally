import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { simulateTextToSpeech, simulateHapticFeedback } from '../../utils/simulationUtils';

export default function CaregiverDashboard() {
  const { top } = useSafeAreaInsets();
  const [connectedUsers, setConnectedUsers] = useState([
    {
      id: '1',
      name: 'María González',
      status: 'active',
      location: 'Casa - Sala de estar',
      batteryLevel: 78,
      lastActivity: 'Hace 2 minutos',
      lastDetection: 'Mesa detectada al frente',
      emergencyStatus: false
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      status: 'inactive',
      location: 'Parque Central',
      batteryLevel: 45,
      lastActivity: 'Hace 15 minutos',
      lastDetection: 'Escalón detectado',
      emergencyStatus: true
    }
  ]);
  
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      userId: '1',
      type: 'detection',
      message: 'María ha detectado un obstáculo',
      timestamp: '14:30',
      priority: 'medium',
      read: false
    },
    {
      id: '2',
      userId: '2',
      type: 'emergency',
      message: 'Carlos ha activado SOS',
      timestamp: '14:15',
      priority: 'high',
      read: false
    }
  ]);

  const emergencyUsers = connectedUsers.filter(user => user.emergencyStatus);
  const activeUsers = connectedUsers.filter(user => user.status === 'active');
  const unreadNotifications = notifications.filter(n => !n.read);

  const handleUserContact = async (user: any) => {
    await simulateTextToSpeech(`Contactando a ${user.name}`);
    await simulateHapticFeedback('medium');
    Alert.alert(
      'Contactar Usuario',
      `¿Cómo quieres contactar a ${user.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamada de Voz', onPress: () => Alert.alert('Llamando', `Iniciando llamada de voz con ${user.name}`) },
        { text: 'Mensaje de Texto', onPress: () => Alert.alert('Mensaje', `Enviando mensaje a ${user.name}`) },
        { text: 'Alerta de Atención', onPress: () => Alert.alert('Alerta Enviada', `Se ha enviado una alerta de atención a ${user.name}`) }
      ]
    );
  };

  const handleEmergencyResponse = async (user: any) => {
    await simulateTextToSpeech(`Respondiendo emergencia de ${user.name}`);
    Alert.alert(
      'Respuesta de Emergencia',
      `Emergencia activa de ${user.name}\nUbicación: ${user.location}\n\n¿Qué acción tomar?`,
      [
        { text: 'Llamar 911', onPress: () => Alert.alert('911 Contactado', 'Servicios de emergencia han sido notificados') },
        { text: 'Contactar Usuario', onPress: () => handleUserContact(user) },
        { text: 'Ir a Ubicación', onPress: () => Alert.alert('Navegación', `Iniciando navegación a ${user.location}`) },
        { text: 'Marcar como Atendida', onPress: () => {
          setConnectedUsers(prev => prev.map(u => u.id === user.id ? {...u, emergencyStatus: false} : u));
          Alert.alert('Emergencia Atendida', 'La emergencia ha sido marcada como atendida');
        }}
      ]
    );
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? {...n, read: true} : n));
  };

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: top }}>
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-black mb-2">PANEL DE CUIDADOR</Text>
          <Text className="text-lg text-gray-600">Monitoreo y Asistencia Remota</Text>
        </View>

        {/* Resumen de Estado */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">RESUMEN DE ESTADO</Text>
          
          <View className="grid grid-cols-2 gap-4 mb-4">
            <View className="bg-green-100 border-4 border-green-600 p-4 rounded-lg">
              <Text className="text-2xl font-bold text-green-800">{activeUsers.length}</Text>
              <Text className="text-base font-bold text-green-600">Usuarios Activos</Text>
            </View>
            
            <View className="bg-red-100 border-4 border-red-600 p-4 rounded-lg">
              <Text className="text-2xl font-bold text-red-800">{emergencyUsers.length}</Text>
              <Text className="text-base font-bold text-red-600">Emergencias</Text>
            </View>
            
            <View className="bg-blue-100 border-4 border-blue-600 p-4 rounded-lg">
              <Text className="text-2xl font-bold text-blue-800">{connectedUsers.length}</Text>
              <Text className="text-base font-bold text-blue-600">Total Usuarios</Text>
            </View>
            
            <View className="bg-yellow-100 border-4 border-yellow-600 p-4 rounded-lg">
              <Text className="text-2xl font-bold text-yellow-800">{unreadNotifications.length}</Text>
              <Text className="text-base font-bold text-yellow-600">Notificaciones</Text>
            </View>
          </View>
        </View>

        {/* Emergencias Activas */}
        {emergencyUsers.length > 0 && (
          <View className="mb-6">
            <Text className="text-2xl font-bold text-red-800 mb-4">[SOS] EMERGENCIAS ACTIVAS</Text>
            {emergencyUsers.map(user => (
              <View key={user.id} className="bg-red-100 border-4 border-red-600 p-4 rounded-lg mb-4">
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-red-800">{user.name}</Text>
                    <Text className="text-base text-red-600">[Ubicacion] {user.location}</Text>
                    <Text className="text-base text-red-600">[Bateria] {user.batteryLevel}%</Text>
                    <Text className="text-sm text-red-500">Última actividad: {user.lastActivity}</Text>
                  </View>
                </View>
                
                <TouchableOpacity
                  className="bg-red-600 border-2 border-white p-3 rounded-lg"
                  onPress={() => handleEmergencyResponse(user)}
                  accessibilityLabel={`Responder emergencia de ${user.name}`}
                >
                  <Text className="text-white text-lg font-bold text-center">[SOS] RESPONDER EMERGENCIA</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Lista de Usuarios */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">USUARIOS CONECTADOS</Text>
          
          {connectedUsers.map(user => (
            <View key={user.id} className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black">{user.name}</Text>
                  <View className={`inline-block px-2 py-1 rounded ${
                    user.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    <Text className="text-white font-bold text-sm">
                      {user.status === 'active' ? 'ACTIVO' : 'INACTIVO'}
                    </Text>
                  </View>
                </View>
              </View>
              
              <Text className="text-base text-black mb-1">[Ubicacion] {user.location}</Text>
              <Text className="text-base text-black mb-1">[Bateria] {user.batteryLevel}%</Text>
              <Text className="text-base text-black mb-1">[Deteccion] {user.lastDetection}</Text>
              <Text className="text-sm text-gray-600 mb-3">Última actividad: {user.lastActivity}</Text>
              
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  className="bg-blue-600 border-2 border-white p-2 rounded-lg flex-1"
                  onPress={() => handleUserContact(user)}
                  accessibilityLabel={`Contactar a ${user.name}`}
                >
                  <Text className="text-white font-bold text-center text-sm">[Llamar] CONTACTAR</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="bg-orange-600 border-2 border-white p-2 rounded-lg flex-1"
                  onPress={() => Alert.alert('Alerta Enviada', `Se ha enviado una alerta de atención a ${user.name}`)}
                  accessibilityLabel={`Enviar alerta a ${user.name}`}
                >
                  <Text className="text-white font-bold text-center text-sm">[Alerta] ALERTA</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Notificaciones Recientes */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">NOTIFICACIONES RECIENTES</Text>
          
          {notifications.slice(0, 5).map(notification => (
            <View key={notification.id} className={`border-4 p-4 rounded-lg mb-3 ${
              notification.priority === 'high' ? 'bg-red-100 border-red-600' :
              notification.priority === 'medium' ? 'bg-yellow-100 border-yellow-600' :
              'bg-blue-100 border-blue-600'
            }`}>
              <View className="flex-row justify-between items-start">
                <View className="flex-1">
                  <Text className={`text-lg font-bold ${
                    notification.priority === 'high' ? 'text-red-800' :
                    notification.priority === 'medium' ? 'text-yellow-800' :
                    'text-blue-800'
                  }`}>
                    {notification.message}
                  </Text>
                  <Text className="text-sm text-gray-600">Hora {notification.timestamp}</Text>
                </View>
                
                {!notification.read && (
                  <TouchableOpacity
                    className="bg-green-600 border-2 border-white p-2 rounded-lg"
                    onPress={() => markNotificationAsRead(notification.id)}
                    accessibilityLabel="Marcar notificación como vista"
                  >
                    <Text className="text-white font-bold text-center">[OK] MARCAR COMO VISTA</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Acciones Rápidas */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-black mb-4">ACCIONES RÁPIDAS</Text>
          
          <TouchableOpacity
            className="bg-green-600 border-4 border-white p-4 rounded-lg mb-4"
            onPress={() => Alert.alert('Actualizando', 'Obteniendo datos más recientes de todos los usuarios...')}
            accessibilityLabel="Actualizar datos de usuarios"
          >
            <Text className="text-white text-lg font-bold text-center">
              [Actualizar] ACTUALIZAR DATOS
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            className="bg-purple-600 border-4 border-white p-4 rounded-lg mb-4"
            onPress={() => Alert.alert('Configuración', 'Abriendo configuración de monitoreo...')}
            accessibilityLabel="Configurar monitoreo"
          >
            <Text className="text-white text-lg font-bold text-center">
              [Configurar] CONFIGURAR MONITOREO
            </Text>
          </TouchableOpacity>
        </View>

        {/* Protocolo de Emergencia */}
        <View className="mb-6">
          <View className="bg-red-100 border-4 border-red-600 p-6 rounded-lg">
            <Text className="text-2xl font-bold text-red-800 text-center mb-4">
              [SOS] PROTOCOLO DE EMERGENCIA
            </Text>
            <Text className="text-lg text-red-800 mb-4">
              En caso de emergencia grave, contacta inmediatamente a los servicios de emergencia.
            </Text>
            <Text className="text-base text-red-600 mb-4">
              • Evalúa la situación del usuario
              • Contacta servicios de emergencia si es necesario
              • Notifica a familiares o contactos de emergencia
              • Documenta el incidente
            </Text>
            
            <TouchableOpacity
              className="bg-red-600 border-4 border-white p-4 rounded-lg"
              onPress={() => Alert.alert('911', '¿Confirmas que quieres llamar a servicios de emergencia?', [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Llamar 911', onPress: () => Alert.alert('Llamando', 'Contactando servicios de emergencia...') }
              ])}
              accessibilityLabel="Llamar a servicios de emergencia"
            >
              <Text className="text-white text-xl font-bold text-center">
                [Telefono] LLAMAR 911
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}