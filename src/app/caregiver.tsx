import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface User {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'emergency' | 'offline';
  lastActivity: string;
  location: string;
  batteryLevel: number;
  lastDetection: string;
  emergencyContacts: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

interface Notification {
  id: number;
  userId: number;
  type: 'emergency' | 'low_battery' | 'inactive' | 'detection' | 'location';
  message: string;
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  acknowledged: boolean;
}

export default function CaregiverDashboard() {
  const { top } = useSafeAreaInsets();
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'María González',
      status: 'active',
      lastActivity: '2024-01-15 14:45:30',
      location: 'Parque Central, CDMX',
      batteryLevel: 85,
      lastDetection: 'Persona caminando detectada',
      emergencyContacts: ['Juan González', 'Ana López'],
      riskLevel: 'low'
    },
    {
      id: 2,
      name: 'Carlos Mendoza',
      status: 'emergency',
      lastActivity: '2024-01-15 14:30:15',
      location: 'Av. Reforma 456, CDMX',
      batteryLevel: 45,
      lastDetection: 'SOS activado',
      emergencyContacts: ['Rosa Mendoza', 'Dr. Pérez'],
      riskLevel: 'high'
    },
    {
      id: 3,
      name: 'Ana Rodríguez',
      status: 'inactive',
      lastActivity: '2024-01-15 13:20:45',
      location: 'Casa - Calle Madero 123',
      batteryLevel: 20,
      lastDetection: 'Texto leído: Menú de restaurante',
      emergencyContacts: ['Pedro Rodríguez'],
      riskLevel: 'medium'
    },
    {
      id: 4,
      name: 'Luis Torres',
      status: 'active',
      lastActivity: '2024-01-15 14:40:22',
      location: 'Metro Insurgentes, CDMX',
      batteryLevel: 92,
      lastDetection: 'Escalón detectado',
      emergencyContacts: ['Carmen Torres', 'Miguel Torres'],
      riskLevel: 'low'
    },
    {
      id: 5,
      name: 'Elena Vásquez',
      status: 'offline',
      lastActivity: '2024-01-15 12:15:10',
      location: 'Última ubicación: Centro Comercial',
      batteryLevel: 0,
      lastDetection: 'Vehículo en movimiento detectado',
      emergencyContacts: ['Roberto Vásquez'],
      riskLevel: 'high'
    }
  ]);

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      userId: 2,
      type: 'emergency',
      message: 'Carlos Mendoza ha activado el SOS. Ubicación: Av. Reforma 456',
      timestamp: '2024-01-15 14:30:15',
      priority: 'critical',
      acknowledged: false
    },
    {
      id: 2,
      userId: 5,
      type: 'low_battery',
      message: 'Elena Vásquez tiene batería crítica (0%). Último contacto hace 2 horas.',
      timestamp: '2024-01-15 14:15:10',
      priority: 'high',
      acknowledged: false
    },
    {
      id: 3,
      userId: 3,
      type: 'inactive',
      message: 'Ana Rodríguez no ha tenido actividad en la última hora.',
      timestamp: '2024-01-15 14:20:45',
      priority: 'medium',
      acknowledged: false
    },
    {
      id: 4,
      userId: 1,
      type: 'detection',
      message: 'María González ha completado una detección exitosa en Parque Central.',
      timestamp: '2024-01-15 14:45:30',
      priority: 'low',
      acknowledged: true
    }
  ]);

  const [selectedView, setSelectedView] = useState<'overview' | 'users' | 'notifications' | 'emergency'>('overview');
  const [refreshing, setRefreshing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-yellow-600';
      case 'emergency': return 'bg-red-600';
      case 'offline': return 'bg-gray-600';
      default: return 'bg-gray-400';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'ACTIVO';
      case 'inactive': return 'INACTIVO';
      case 'emergency': return 'EMERGENCIA';
      case 'offline': return 'DESCONECTADO';
      default: return 'DESCONOCIDO';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 border-green-600';
      case 'medium': return 'bg-yellow-100 border-yellow-600';
      case 'high': return 'bg-red-100 border-red-600';
      default: return 'bg-gray-100 border-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const acknowledgeNotification = (notificationId: number) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId 
          ? { ...notif, acknowledged: true }
          : notif
      )
    );
    
    Alert.alert(
      'Notificación Confirmada',
      'La notificación ha sido marcada como vista.',
      [{ text: 'Continuar' }]
    );
  };

  const contactUser = (user: User) => {
    Alert.alert(
      `Contactar a ${user.name}`,
      'Selecciona el método de contacto:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamada', onPress: () => {
          Alert.alert('Llamando', `Iniciando llamada a ${user.name}...`);
        }},
        { text: 'Mensaje', onPress: () => {
          Alert.alert('Enviando Mensaje', `Enviando mensaje de verificación a ${user.name}...`);
        }},
        { text: 'Ubicación', onPress: () => {
          Alert.alert('Solicitar Ubicación', `Solicitando ubicación actual de ${user.name}...`);
        }}
      ]
    );
  };

  const sendAlert = (user: User) => {
    Alert.alert(
      `Enviar Alerta a ${user.name}`,
      'Selecciona el tipo de alerta:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Verificación', onPress: () => {
          Alert.alert('Alerta Enviada', `Se ha enviado una alerta de verificación a ${user.name}.`);
        }},
        { text: 'Precaución', onPress: () => {
          Alert.alert('Alerta Enviada', `Se ha enviado una alerta de precaución a ${user.name}.`);
        }},
        { text: 'Emergencia', onPress: () => {
          Alert.alert('Alerta de Emergencia', `Se ha enviado una alerta de emergencia a ${user.name} y sus contactos.`);
        }}
      ]
    );
  };

  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      Alert.alert('Datos Actualizados', 'La información ha sido actualizada exitosamente.');
    }, 2000);
  };

  const handleEmergency = (user: User) => {
    Alert.alert(
      `EMERGENCIA - ${user.name}`,
      `Usuario en situación de emergencia.\n\nUbicación: ${user.location}\nÚltima actividad: ${user.lastActivity}\n\n¿Qué acción deseas tomar?`,
      [
        { text: 'Contactar Usuario', onPress: () => contactUser(user) },
        { text: 'Llamar Emergencias', onPress: () => {
          Alert.alert('Llamando 911', 'Conectando con servicios de emergencia...');
        }},
        { text: 'Notificar Contactos', onPress: () => {
          Alert.alert('Contactos Notificados', `Se ha notificado a: ${user.emergencyContacts.join(', ')}`);
        }}
      ]
    );
  };

  const unacknowledgedNotifications = notifications.filter(n => !n.acknowledged);
  const emergencyUsers = users.filter(u => u.status === 'emergency');
  const activeUsers = users.filter(u => u.status === 'active');
  const inactiveUsers = users.filter(u => u.status === 'inactive' || u.status === 'offline');

  const renderOverview = () => (
    <View>
      {/* Emergency Alert */}
      {emergencyUsers.length > 0 && (
        <View className="bg-red-100 border-4 border-red-600 p-4 rounded-lg mb-6">
          <Text className="text-xl font-bold text-red-800 text-center mb-3">
            [SOS] EMERGENCIAS ACTIVAS ({emergencyUsers.length})
          </Text>
          {emergencyUsers.map(user => (
            <TouchableOpacity
              key={user.id}
              className="bg-red-600 border-2 border-white p-3 rounded-lg mb-2"
              onPress={() => handleEmergency(user)}
              accessibilityLabel={`Emergencia de ${user.name}`}
            >
              <Text className="text-white font-bold text-center">
                {user.name} - {user.location}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Statistics Cards */}
      <View className="grid grid-cols-2 gap-4 mb-6">
        <View className="bg-green-100 border-4 border-green-600 p-4 rounded-lg">
          <Text className="text-2xl font-bold text-green-800 text-center">{activeUsers.length}</Text>
          <Text className="text-lg font-bold text-green-800 text-center">ACTIVOS</Text>
        </View>
        
        <View className="bg-yellow-100 border-4 border-yellow-600 p-4 rounded-lg">
          <Text className="text-2xl font-bold text-yellow-800 text-center">{inactiveUsers.length}</Text>
          <Text className="text-lg font-bold text-yellow-800 text-center">INACTIVOS</Text>
        </View>
        
        <View className="bg-red-100 border-4 border-red-600 p-4 rounded-lg">
          <Text className="text-2xl font-bold text-red-800 text-center">{emergencyUsers.length}</Text>
          <Text className="text-lg font-bold text-red-800 text-center">EMERGENCIAS</Text>
        </View>
        
        <View className="bg-blue-100 border-4 border-blue-600 p-4 rounded-lg">
          <Text className="text-2xl font-bold text-blue-800 text-center">{unacknowledgedNotifications.length}</Text>
          <Text className="text-lg font-bold text-blue-800 text-center">ALERTAS</Text>
        </View>
      </View>

      {/* Recent Notifications */}
      <View className="mb-6">
        <Text className="text-xl font-bold text-black mb-3">NOTIFICACIONES RECIENTES</Text>
        {unacknowledgedNotifications.slice(0, 3).map(notification => (
          <View key={notification.id} className="bg-gray-100 border-4 border-black p-3 rounded-lg mb-2">
            <View className="flex-row items-center mb-2">
              <View className={`${getPriorityColor(notification.priority)} px-2 py-1 rounded mr-2`}>
                <Text className="text-white font-bold text-xs">
                  {notification.priority.toUpperCase()}
                </Text>
              </View>
              <Text className="text-sm text-gray-600 flex-1">{notification.timestamp}</Text>
            </View>
            <Text className="text-base text-black">{notification.message}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderUsers = () => (
    <View>
      {users.map(user => (
        <View key={user.id} className={`${getRiskColor(user.riskLevel)} border-4 p-4 rounded-lg mb-4`}>
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-lg font-bold text-black flex-1">{user.name}</Text>
            <View className={`${getStatusColor(user.status)} px-3 py-1 rounded`}>
              <Text className="text-white font-bold text-sm">
                {getStatusText(user.status)}
              </Text>
            </View>
          </View>
          
          <Text className="text-base text-black mb-1">[Ubicacion] {user.location}</Text>
                <Text className="text-base text-black mb-1">[Bateria] Batería: {user.batteryLevel}%</Text>
                <Text className="text-base text-black mb-1">[Deteccion] {user.lastDetection}</Text>
          <Text className="text-sm text-gray-600 mb-3">Última actividad: {user.lastActivity}</Text>
          
          <View className="flex-row space-x-2">
            <TouchableOpacity
              className="bg-blue-600 border-2 border-white px-3 py-2 rounded flex-1"
              onPress={() => contactUser(user)}
              accessibilityLabel={`Contactar a ${user.name}`}
            >
              <Text className="text-white font-bold text-center text-sm">[Llamar] CONTACTAR</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-orange-600 border-2 border-white px-3 py-2 rounded flex-1"
              onPress={() => sendAlert(user)}
              accessibilityLabel={`Enviar alerta a ${user.name}`}
            >
              <Text className="text-white font-bold text-center text-sm">[Alerta] ALERTA</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderNotifications = () => (
    <View>
      {notifications.map(notification => {
        const user = users.find(u => u.id === notification.userId);
        return (
          <View key={notification.id} className={`bg-gray-100 border-4 ${
            notification.acknowledged ? 'border-gray-400' : 'border-black'
          } p-4 rounded-lg mb-4 ${notification.acknowledged ? 'opacity-60' : ''}`}>
            <View className="flex-row items-center justify-between mb-2">
              <View className={`${getPriorityColor(notification.priority)} px-2 py-1 rounded`}>
                <Text className="text-white font-bold text-xs">
                  {notification.priority.toUpperCase()}
                </Text>
              </View>
              <Text className="text-sm text-gray-600">{notification.timestamp}</Text>
            </View>
            
            <Text className="text-lg font-bold text-black mb-1">
              {user?.name} - {notification.type.toUpperCase()}
            </Text>
            <Text className="text-base text-black mb-3">{notification.message}</Text>
            
            {!notification.acknowledged && (
              <TouchableOpacity
                className="bg-green-600 border-2 border-white p-2 rounded"
                onPress={() => acknowledgeNotification(notification.id)}
                accessibilityLabel="Marcar notificación como vista"
              >
                <Text className="text-white font-bold text-center">[OK] MARCAR COMO VISTA</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: top }}>
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text 
            className="text-4xl font-bold text-black text-center mb-2"
            accessibilityRole="header"
            accessibilityLabel="Panel de Cuidadores de Navi-Ally"
          >
            PANEL CUIDADORES
          </Text>
          <Text className="text-xl text-black text-center mb-4">
            Monitoreo en Tiempo Real
          </Text>
          
          <TouchableOpacity
            className={`${refreshing ? 'bg-gray-400' : 'bg-green-600'} border-4 border-white p-3 rounded-lg`}
            onPress={refreshData}
            disabled={refreshing}
            accessibilityLabel="Actualizar datos"
          >
            <Text className="text-white text-lg font-bold text-center">
              {refreshing ? '[Cargando] ACTUALIZANDO...' : '[Actualizar] ACTUALIZAR DATOS'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Tabs */}
        <View className="mb-8">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              {[
                { key: 'overview', label: 'RESUMEN', icon: '[Estadisticas]' },
    { key: 'users', label: 'USUARIOS', icon: '[Usuarios]' },
    { key: 'notifications', label: 'ALERTAS', icon: '[Campana]' },
    { key: 'emergency', label: 'EMERGENCIA', icon: '[SOS]' }
              ].map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  className={`${
                    selectedView === tab.key 
                      ? 'bg-blue-600 border-white' 
                      : 'bg-gray-200 border-black'
                  } border-4 px-4 py-3 rounded-lg min-w-[120px]`}
                  onPress={() => setSelectedView(tab.key as any)}
                  accessibilityLabel={`Ver ${tab.label}`}
                  accessibilityState={{ selected: selectedView === tab.key }}
                >
                  <Text className={`${
                    selectedView === tab.key ? 'text-white' : 'text-black'
                  } text-base font-bold text-center`}>
                    {tab.icon} {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Content */}
        {selectedView === 'overview' && renderOverview()}
        {selectedView === 'users' && renderUsers()}
        {selectedView === 'notifications' && renderNotifications()}
        {selectedView === 'emergency' && (
          <View className="bg-red-100 border-4 border-red-600 p-6 rounded-lg">
            <Text className="text-2xl font-bold text-red-800 text-center mb-4">
              [SOS] PROTOCOLO DE EMERGENCIA
            </Text>
            <Text className="text-lg text-red-800 mb-4">
              En caso de emergencia:
            </Text>
            <Text className="text-base text-red-800 mb-2">1. Contactar inmediatamente al usuario</Text>
            <Text className="text-base text-red-800 mb-2">2. Verificar su ubicación actual</Text>
            <Text className="text-base text-red-800 mb-2">3. Notificar a contactos de emergencia</Text>
            <Text className="text-base text-red-800 mb-4">4. Si no hay respuesta, llamar al 911</Text>
            
            <TouchableOpacity
              className="bg-red-600 border-4 border-white p-4 rounded-lg"
              onPress={() => Alert.alert('911', 'Conectando con servicios de emergencia...')}
              accessibilityLabel="Llamar servicios de emergencia"
            >
              <Text className="text-white text-xl font-bold text-center">
                [Telefono] LLAMAR 911
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
}