import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { simulateTextToSpeech, simulateHapticFeedback, simulateSOSAlert } from '../../utils/simulationUtils';

export default function ProfileScreen() {
  const { top } = useSafeAreaInsets();
  const [userName] = useState('Usuario Navi-Ally');
  const [userEmail] = useState('usuario@example.com');
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: '1', name: 'María García', phone: '+1234567890', relationship: 'Madre' },
    { id: '2', name: 'Dr. López', phone: '+0987654321', relationship: 'Médico' },
  ]);
  
  // Estados para historial
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [historyEvents] = useState([
    {
      id: '1',
      type: 'detection',
      title: 'Detección de Obstáculo',
      description: 'Mesa detectada a 2 metros al frente',
      timestamp: '2024-01-15 14:30',
      location: 'Sala de estar'
    },
    {
      id: '2',
      type: 'text',
      title: 'Texto Reconocido',
      description: 'Menú de restaurante escaneado',
      timestamp: '2024-01-15 13:15',
      location: 'Restaurante Central'
    },
    {
      id: '3',
      type: 'navigation',
      title: 'Navegación Completada',
      description: 'Ruta a farmacia completada exitosamente',
      timestamp: '2024-01-15 11:45',
      location: 'Centro de la ciudad'
    },
    {
      id: '4',
      type: 'emergency',
      title: 'Alerta SOS Enviada',
      description: 'Contactos de emergencia notificados',
      timestamp: '2024-01-14 16:20',
      location: 'Parque Municipal'
    }
  ]);
  
  // Estadísticas de actividad
  const [activityStats] = useState({
    detectionsToday: 23,
    textsScanned: 8,
    navigationRoutes: 3,
    emergencyAlerts: 0,
    weeklyDetections: 156,
    monthlyDetections: 672
  });

  const filterTypes = [
    { key: 'all', label: 'Todos', icon: 'Lista' },
    { key: 'detection', label: 'Detecciones', icon: 'Radar' },
    { key: 'text', label: 'Texto', icon: 'Texto' },
    { key: 'navigation', label: 'Navegación', icon: 'Mapa' },
    { key: 'emergency', label: 'Emergencias', icon: 'SOS' }
  ];

  const getFilteredEvents = () => {
    if (selectedFilter === 'all') return historyEvents;
    return historyEvents.filter(event => event.type === selectedFilter);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'detection': return 'Radar';
      case 'text': return 'Texto';
      case 'navigation': return 'Mapa';
      case 'emergency': return 'SOS';
      default: return 'Info';
    }
  };

  const repeatDescription = async (description: string) => {
    await simulateTextToSpeech(`Repitiendo: ${description}`);
    await simulateHapticFeedback('light');
  };

  const shareEvent = (event: any) => {
    Alert.alert(
      'Compartir Evento',
      `¿Cómo quieres compartir "${event.title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Mensaje', onPress: () => Alert.alert('Compartido', 'Evento compartido por mensaje') },
        { text: 'Email', onPress: () => Alert.alert('Compartido', 'Evento compartido por email') }
      ]
    );
  };

  const testEmergencyContact = async (contact: any) => {
    await simulateTextToSpeech(`Probando contacto de emergencia: ${contact.name}`);
    await simulateSOSAlert();
    Alert.alert(
      'Prueba de Contacto',
      `Se ha enviado una alerta de prueba a ${contact.name} (${contact.phone})`,
      [{ text: 'Entendido' }]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: top }}>
      <View className="p-6">
        {/* Header del Perfil */}
        <View className="mb-8">
          <Text className="text-3xl font-bold text-black mb-2">PERFIL DE USUARIO</Text>
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg">
            <Text className="text-xl font-bold text-black mb-1">Usuario {userName}</Text>
            <Text className="text-lg text-gray-600">Email {userEmail}</Text>
          </View>
        </View>

        {/* Estadísticas de Actividad */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">ESTADÍSTICAS DE ACTIVIDAD</Text>
          
          <View className="grid grid-cols-2 gap-4 mb-4">
            <View className="bg-blue-100 border-4 border-blue-600 p-4 rounded-lg">
              <Text className="text-2xl font-bold text-blue-800">{activityStats.detectionsToday}</Text>
              <Text className="text-base font-bold text-blue-600">Detecciones Hoy</Text>
            </View>
            
            <View className="bg-green-100 border-4 border-green-600 p-4 rounded-lg">
              <Text className="text-2xl font-bold text-green-800">{activityStats.textsScanned}</Text>
              <Text className="text-base font-bold text-green-600">Textos Escaneados</Text>
            </View>
            
            <View className="bg-purple-100 border-4 border-purple-600 p-4 rounded-lg">
              <Text className="text-2xl font-bold text-purple-800">{activityStats.navigationRoutes}</Text>
              <Text className="text-base font-bold text-purple-600">Rutas Navegadas</Text>
            </View>
            
            <View className="bg-red-100 border-4 border-red-600 p-4 rounded-lg">
              <Text className="text-2xl font-bold text-red-800">{activityStats.emergencyAlerts}</Text>
              <Text className="text-base font-bold text-red-600">Alertas SOS</Text>
            </View>
          </View>
          
          <View className="bg-gray-100 border-4 border-black p-4 rounded-lg">
            <Text className="text-lg font-bold text-black mb-2">Resumen Semanal/Mensual</Text>
            <Text className="text-base text-black">Esta semana: {activityStats.weeklyDetections} detecciones</Text>
            <Text className="text-base text-black">Este mes: {activityStats.monthlyDetections} detecciones</Text>
          </View>
        </View>

        {/* Historial de Actividades */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">HISTORIAL DE ACTIVIDADES</Text>
          
          {/* Filtros */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row">
              {filterTypes.map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  className={`mr-3 p-3 rounded-lg border-2 ${
                    selectedFilter === filter.key
                      ? 'bg-black border-white'
                      : 'bg-gray-200 border-gray-400'
                  }`}
                  onPress={() => setSelectedFilter(filter.key)}
                  accessibilityLabel={`Filtrar por ${filter.label}`}
                >
                  <Text
                    className={`text-base font-bold ${
                      selectedFilter === filter.key ? 'text-white' : 'text-black'
                    }`}
                  >
                    {filter.icon} {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
          
          {/* Lista de Eventos */}
          {getFilteredEvents().map((event) => (
            <View key={event.id} className="bg-gray-100 border-4 border-black p-4 rounded-lg mb-4">
              <View className="flex-row justify-between items-start mb-2">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-black mb-1">
                    {getEventIcon(event.type)} {event.title}
                  </Text>
                  <Text className="text-base text-black mb-2">{event.description}</Text>
                  <Text className="text-sm text-gray-600">
                    Reloj {event.timestamp} | Ubicacion {event.location}
                  </Text>
                </View>
              </View>
              
              <View className="flex-row justify-between mt-3">
                <TouchableOpacity
                  className="bg-blue-600 border-2 border-white p-2 rounded-lg flex-1 mr-2"
                  onPress={() => repeatDescription(event.description)}
                  accessibilityLabel="Repetir descripción"
                >
                  <Text className="text-white text-sm font-bold text-center">Repetir</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="bg-green-600 border-2 border-white p-2 rounded-lg flex-1 ml-2"
                  onPress={() => shareEvent(event)}
                  accessibilityLabel="Compartir evento"
                >
                  <Text className="text-white text-sm font-bold text-center">Compartir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          {getFilteredEvents().length === 0 && (
            <View className="bg-gray-100 border-4 border-gray-400 p-6 rounded-lg">
              <Text className="text-lg text-gray-600 text-center">
                No hay eventos para el filtro seleccionado
              </Text>
            </View>
          )}
        </View>

        {/* Contactos de Emergencia */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">CONTACTOS DE EMERGENCIA</Text>
          
          {emergencyContacts.map((contact) => (
            <View key={contact.id} className="bg-red-100 border-4 border-red-600 p-4 rounded-lg mb-4">
              <View className="flex-row justify-between items-center">
                <View className="flex-1">
                  <Text className="text-lg font-bold text-red-800">SOS {contact.name}</Text>
                  <Text className="text-base text-red-600">Telefono {contact.phone}</Text>
                  <Text className="text-sm text-red-500">{contact.relationship}</Text>
                </View>
                <TouchableOpacity
                  className="bg-red-600 border-2 border-white p-2 rounded-lg"
                  onPress={() => testEmergencyContact(contact)}
                  accessibilityLabel={`Probar contacto de emergencia ${contact.name}`}
                >
                  <Text className="text-white text-sm font-bold">Probar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Botón SOS Principal */}
        <View className="mb-8">
          <TouchableOpacity
            className="bg-red-600 border-4 border-white p-6 rounded-lg"
            onPress={async () => {
              await simulateSOSAlert();
              Alert.alert(
                'SOS Activado',
                'Se ha enviado una alerta de emergencia a todos tus contactos con tu ubicación actual.',
                [{ text: 'Entendido' }]
              );
            }}
            accessibilityLabel="Botón de emergencia SOS"
            accessibilityHint="Toca para enviar alerta de emergencia a tus contactos"
          >
            <Text className="text-white text-2xl font-bold text-center">
              SOS EMERGENCIA
            </Text>
            <Text className="text-white text-base text-center mt-2">
              Presiona para enviar alerta inmediata
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}