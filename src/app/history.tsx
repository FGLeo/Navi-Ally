import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HistoryEvent {
  id: number;
  type: 'detection' | 'ocr' | 'sos' | 'navigation';
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  confidence?: number;
  feedback?: 'helpful' | 'not_helpful' | null;
}

export default function HistoryScreen() {
  const { top } = useSafeAreaInsets();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [historyEvents, setHistoryEvents] = useState<HistoryEvent[]>([
    {
      id: 1,
      type: 'detection',
      title: 'Persona caminando',
      description: 'Se detectó una persona caminando hacia tu dirección a aproximadamente 3 metros de distancia.',
      timestamp: '2024-01-15 14:30:25',
      location: 'Parque Central, Ciudad de México',
      confidence: 95,
      feedback: 'helpful'
    },
    {
      id: 2,
      type: 'ocr',
      title: 'Texto leído',
      description: 'Menú de restaurante: "Tacos al Pastor - $45, Quesadillas - $35, Agua fresca - $20"',
      timestamp: '2024-01-15 13:15:10',
      location: 'Restaurante La Esquina',
      confidence: 88,
      feedback: 'helpful'
    },
    {
      id: 3,
      type: 'detection',
      title: 'Escalón detectado',
      description: 'Escalón de aproximadamente 15 cm de altura detectado directamente frente a ti.',
      timestamp: '2024-01-15 12:45:33',
      location: 'Entrada del Metro Insurgentes',
      confidence: 92,
      feedback: null
    },
    {
      id: 4,
      type: 'navigation',
      title: 'Ruta completada',
      description: 'Has llegado exitosamente a tu destino: Farmacia Guadalajara.',
      timestamp: '2024-01-15 11:20:15',
      location: 'Av. Reforma 123',
      confidence: 100,
      feedback: 'helpful'
    },
    {
      id: 5,
      type: 'sos',
      title: 'SOS Activado',
      description: 'Sistema SOS activado. Contactos de emergencia notificados automáticamente.',
      timestamp: '2024-01-14 18:45:22',
      location: 'Calle Madero 456',
      confidence: 100,
      feedback: null
    },
    {
      id: 6,
      type: 'detection',
      title: 'Vehículo en movimiento',
      description: 'Automóvil detectado aproximándose desde la izquierda. Velocidad estimada: moderada.',
      timestamp: '2024-01-14 16:30:45',
      location: 'Cruce Av. Juárez y Reforma',
      confidence: 87,
      feedback: 'helpful'
    },
    {
      id: 7,
      type: 'ocr',
      title: 'Señalización leída',
      description: 'Letrero: "PROHIBIDO EL PASO - OBRAS EN CONSTRUCCIÓN"',
      timestamp: '2024-01-14 15:10:30',
      location: 'Zona de construcción',
      confidence: 94,
      feedback: 'helpful'
    },
    {
      id: 8,
      type: 'detection',
      title: 'Obstáculo bajo',
      description: 'Objeto bajo detectado en el suelo. Posible escalón o desnivel.',
      timestamp: '2024-01-14 14:25:18',
      location: 'Banqueta Av. Insurgentes',
      confidence: 78,
      feedback: 'not_helpful'
    }
  ]);

  const filterTypes = [
    { key: 'all', label: 'TODOS', icon: '[Lista]' },
    { key: 'detection', label: 'DETECCIONES', icon: '[Radar]' },
    { key: 'ocr', label: 'TEXTO', icon: '[Texto]' },
    { key: 'navigation', label: 'NAVEGACIÓN', icon: '[Mapa]' },
    { key: 'sos', label: 'EMERGENCIAS', icon: '[SOS]' }
  ];

  const getFilteredEvents = () => {
    if (selectedFilter === 'all') return historyEvents;
    return historyEvents.filter(event => event.type === selectedFilter);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'detection': return '[Radar]';
      case 'ocr': return '[Texto]';
      case 'navigation': return '[Mapa]';
      case 'sos': return '[SOS]';
      default: return '[Lista]';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'detection': return 'bg-blue-600';
      case 'ocr': return 'bg-green-600';
      case 'navigation': return 'bg-purple-600';
      case 'sos': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const provideFeedback = (eventId: number, feedback: 'helpful' | 'not_helpful') => {
    setHistoryEvents(prev => 
      prev.map(event => 
        event.id === eventId 
          ? { ...event, feedback }
          : event
      )
    );
    
    const feedbackText = feedback === 'helpful' ? 'útil' : 'no útil';
    Alert.alert(
      'Retroalimentación Registrada',
      `Has marcado este evento como ${feedbackText}. Esto nos ayuda a mejorar la precisión del sistema.`,
      [{ text: 'Continuar' }]
    );
  };

  const shareEvent = (event: HistoryEvent) => {
    Alert.alert(
      'Compartir Evento',
      `¿Deseas compartir este evento con tus contactos de emergencia o cuidadores?\n\n"${event.title}"`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Compartir', onPress: () => {
          Alert.alert(
            'Evento Compartido',
            'El evento ha sido compartido exitosamente con tus contactos seleccionados.',
            [{ text: 'Entendido' }]
          );
        }}
      ]
    );
  };

  const repeatDescription = (event: HistoryEvent) => {
    Alert.alert(
      'Repetir Descripción',
      `Reproduciendo descripción de audio:\n\n"${event.description}"`,
      [{ text: 'Detener' }]
    );
  };

  const exportHistory = () => {
    Alert.alert(
      'Exportar Historial',
      'Selecciona el formato para exportar tu historial:',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'PDF', onPress: () => Alert.alert('Exportando', 'Generando archivo PDF...') },
        { text: 'CSV', onPress: () => Alert.alert('Exportando', 'Generando archivo CSV...') },
        { text: 'Audio', onPress: () => Alert.alert('Exportando', 'Generando resumen de audio...') }
      ]
    );
  };

  const clearHistory = () => {
    Alert.alert(
      'Limpiar Historial',
      '¿Estás seguro de que quieres eliminar todo el historial? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar Todo', style: 'destructive', onPress: () => {
          setHistoryEvents([]);
          Alert.alert('Historial Limpiado', 'Todo el historial ha sido eliminado.');
        }}
      ]
    );
  };

  const filteredEvents = getFilteredEvents();

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: top }}>
      <View className="flex-1 px-6 py-8">
        {/* Header */}
        <View className="mb-8">
          <Text 
            className="text-4xl font-bold text-black text-center mb-2"
            accessibilityRole="header"
            accessibilityLabel="Historial de Eventos de Navi-Ally"
          >
            HISTORIAL
          </Text>
          <Text className="text-xl text-black text-center mb-4">
            Registro de Detecciones y Eventos
          </Text>
          <Text className="text-lg text-black text-center">
            Total de eventos: {historyEvents.length} | Mostrando: {filteredEvents.length}
          </Text>
        </View>

        {/* Filter Buttons */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">FILTROS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row space-x-3">
              {filterTypes.map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  className={`${
                    selectedFilter === filter.key 
                      ? 'bg-blue-600 border-white' 
                      : 'bg-gray-200 border-black'
                  } border-4 px-4 py-3 rounded-lg min-w-[120px]`}
                  onPress={() => setSelectedFilter(filter.key)}
                  accessibilityLabel={`Filtrar por ${filter.label}`}
                  accessibilityState={{ selected: selectedFilter === filter.key }}
                >
                  <Text className={`${
                    selectedFilter === filter.key ? 'text-white' : 'text-black'
                  } text-base font-bold text-center`}>
                    {filter.icon} {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Action Buttons */}
        <View className="mb-8">
          <View className="flex-row space-x-3 mb-4">
            <TouchableOpacity
              className="bg-green-600 border-4 border-white p-3 rounded-lg flex-1"
              onPress={exportHistory}
              accessibilityLabel="Exportar historial"
            >
              <Text className="text-white text-base font-bold text-center">
                [Exportar] EXPORTAR
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              className="bg-red-600 border-4 border-white p-3 rounded-lg flex-1"
              onPress={clearHistory}
              accessibilityLabel="Limpiar historial"
            >
              <Text className="text-white text-base font-bold text-center">
                [Limpiar] LIMPIAR
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Events List */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-black mb-4">
            EVENTOS ({filteredEvents.length})
          </Text>
          
          {filteredEvents.length === 0 ? (
            <View className="bg-gray-100 border-4 border-gray-400 p-6 rounded-lg">
              <Text className="text-xl text-gray-600 text-center font-bold">
                [Vacio] NO HAY EVENTOS
              </Text>
              <Text className="text-lg text-gray-600 text-center mt-2">
                {selectedFilter === 'all' 
                  ? 'No tienes eventos registrados aún.' 
                  : `No hay eventos del tipo "${filterTypes.find(f => f.key === selectedFilter)?.label}" registrados.`
                }
              </Text>
            </View>
          ) : (
            filteredEvents.map((event, index) => (
              <View key={event.id} className="mb-6">
                {/* Event Card */}
                <View className="bg-gray-100 border-4 border-black rounded-lg p-4">
                  {/* Event Header */}
                  <View className="flex-row items-center mb-3">
                    <View className={`${getEventColor(event.type)} p-2 rounded-lg mr-3`}>
                      <Text className="text-white text-lg">{getEventIcon(event.type)}</Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg font-bold text-black">{event.title}</Text>
                      <Text className="text-base text-gray-600">{event.timestamp}</Text>
                    </View>
                  </View>
                  
                  {/* Event Description */}
                  <Text className="text-base text-black mb-3 leading-6">
                    {event.description}
                  </Text>
                  
                  {/* Event Details */}
                  {event.location && (
                    <Text className="text-base text-gray-700 mb-2">
                      [Ubicacion] {event.location}
                    </Text>
                  )}
                  
                  {event.confidence && (
                    <Text className="text-base text-gray-700 mb-3">
                      [Precision] Confianza: {event.confidence}%
                    </Text>
                  )}
                  
                  {/* Action Buttons */}
                  <View className="flex-row space-x-2 mb-3">
                    <TouchableOpacity
                      className="bg-blue-600 border-2 border-white px-3 py-2 rounded flex-1"
                      onPress={() => repeatDescription(event)}
                      accessibilityLabel={`Repetir descripción de ${event.title}`}
                    >
                      <Text className="text-white text-sm font-bold text-center">
                        [Audio] REPETIR
                      </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                      className="bg-purple-600 border-2 border-white px-3 py-2 rounded flex-1"
                      onPress={() => shareEvent(event)}
                      accessibilityLabel={`Compartir evento ${event.title}`}
                    >
                      <Text className="text-white text-sm font-bold text-center">
                        [Compartir] COMPARTIR
                      </Text>
                    </TouchableOpacity>
                  </View>
                  
                  {/* Feedback Section */}
                  <View className="border-t-2 border-gray-300 pt-3">
                    <Text className="text-base font-bold text-black mb-2">
                      ¿Fue útil esta detección?
                    </Text>
                    
                    {event.feedback ? (
                      <View className="flex-row items-center">
                        <Text className="text-base text-gray-700 mr-2">
                          Tu calificación:
                        </Text>
                        <View className={`${
                          event.feedback === 'helpful' ? 'bg-green-600' : 'bg-red-600'
                        } px-3 py-1 rounded`}>
                          <Text className="text-white font-bold">
                            {event.feedback === 'helpful' ? '[+] ÚTIL' : '[-] NO ÚTIL'}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <View className="flex-row space-x-2">
                        <TouchableOpacity
                          className="bg-green-600 border-2 border-white px-4 py-2 rounded flex-1"
                          onPress={() => provideFeedback(event.id, 'helpful')}
                          accessibilityLabel="Marcar como útil"
                        >
                          <Text className="text-white text-sm font-bold text-center">
                            [+] ÚTIL
                          </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                          className="bg-red-600 border-2 border-white px-4 py-2 rounded flex-1"
                          onPress={() => provideFeedback(event.id, 'not_helpful')}
                          accessibilityLabel="Marcar como no útil"
                        >
                          <Text className="text-white text-sm font-bold text-center">
                            [-] NO ÚTIL
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
                
                {/* Timeline Connector */}
                {index < filteredEvents.length - 1 && (
                  <View className="flex-row justify-center py-2">
                    <View className="w-1 h-6 bg-gray-400"></View>
                  </View>
                )}
              </View>
            ))
          )}
        </View>
        
        {/* Statistics */}
        {historyEvents.length > 0 && (
          <View className="mb-8">
            <Text className="text-2xl font-bold text-black mb-4">ESTADÍSTICAS</Text>
            
            <View className="bg-blue-100 border-4 border-blue-600 p-4 rounded-lg">
              <Text className="text-lg font-bold text-blue-800 text-center mb-3">
                [Estadisticas] RESUMEN DE ACTIVIDAD
              </Text>
              
              <View className="space-y-2">
                <Text className="text-base text-blue-800">
                  • Detecciones: {historyEvents.filter(e => e.type === 'detection').length}
                </Text>
                <Text className="text-base text-blue-800">
                  • Textos leídos: {historyEvents.filter(e => e.type === 'ocr').length}
                </Text>
                <Text className="text-base text-blue-800">
                  • Navegaciones: {historyEvents.filter(e => e.type === 'navigation').length}
                </Text>
                <Text className="text-base text-blue-800">
                  • Emergencias: {historyEvents.filter(e => e.type === 'sos').length}
                </Text>
                <Text className="text-base text-blue-800">
                  • Eventos útiles: {historyEvents.filter(e => e.feedback === 'helpful').length}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}