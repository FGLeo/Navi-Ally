import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { simulateTextToSpeech, simulateHapticFeedback } from '../../utils/simulationUtils';

export default function CaregiverUsersScreen() {
  const { top } = useSafeAreaInsets();
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      phone: '+34 612 345 678',
      status: 'active',
      location: 'Casa - Sala de estar',
      lastActivity: '2 min ago',
      emergencyContact: 'Juan González (+34 612 345 679)',
      deviceConnected: true,
      batteryLevel: 78,
      cameraPermission: true,
      audioPermission: true,
      joinDate: '15 Ene 2024'
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+34 623 456 789',
      status: 'active',
      location: 'Parque Central',
      lastActivity: '5 min ago',
      emergencyContact: 'Ana Rodríguez (+34 623 456 790)',
      deviceConnected: true,
      batteryLevel: 45,
      cameraPermission: false,
      audioPermission: true,
      joinDate: '22 Ene 2024'
    },
    {
      id: '3',
      name: 'Ana López',
      email: 'ana.lopez@email.com',
      phone: '+34 634 567 890',
      status: 'inactive',
      location: 'Centro Comercial',
      lastActivity: '1 hora ago',
      emergencyContact: 'Pedro López (+34 634 567 891)',
      deviceConnected: false,
      batteryLevel: 92,
      cameraPermission: true,
      audioPermission: false,
      joinDate: '8 Feb 2024'
    },
    {
      id: '4',
      name: 'Roberto Martín',
      email: 'roberto.martin@email.com',
      phone: '+34 645 678 901',
      status: 'emergency',
      location: 'Hospital General',
      lastActivity: 'Ahora',
      emergencyContact: 'Carmen Martín (+34 645 678 902)',
      deviceConnected: true,
      batteryLevel: 23,
      cameraPermission: true,
      audioPermission: true,
      joinDate: '3 Mar 2024'
    }
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchText.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchText.toLowerCase());
    
    if (selectedFilter === 'all') return matchesSearch;
    if (selectedFilter === 'active') return matchesSearch && user.status === 'active';
    if (selectedFilter === 'inactive') return matchesSearch && user.status === 'inactive';
    if (selectedFilter === 'emergency') return matchesSearch && user.status === 'emergency';
    if (selectedFilter === 'connected') return matchesSearch && user.deviceConnected;
    
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'inactive': return 'bg-gray-600';
      case 'emergency': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'emergency': return 'Emergencia';
      default: return 'Desconocido';
    }
  };

  const contactUser = async (user: any) => {
    await simulateTextToSpeech(`Contactando a ${user.name}`);
    Alert.alert(
      'Contactar Usuario',
      `¿Cómo quieres contactar a ${user.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Llamar', onPress: () => Alert.alert('Llamando', `Llamando a ${user.phone}`) },
        { text: 'Mensaje', onPress: () => Alert.alert('Mensaje', 'Enviando mensaje...') },
        { text: 'Video Llamada', onPress: () => Alert.alert('Video Llamada', 'Iniciando video llamada...') }
      ]
    );
  };

  const viewUserDetails = (user: any) => {
    Alert.alert(
      `Detalles de ${user.name}`,
      `Email: ${user.email}\nTeléfono: ${user.phone}\nContacto de Emergencia: ${user.emergencyContact}\nFecha de Registro: ${user.joinDate}\nÚltima Actividad: ${user.lastActivity}`,
      [
        { text: 'Cerrar' },
        { text: 'Editar', onPress: () => Alert.alert('Editar', 'Función de edición en desarrollo') }
      ]
    );
  };

  const toggleUserPermissions = async (userId: string, permissionType: 'camera' | 'audio') => {
    await simulateHapticFeedback('medium');
    
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          const newUser = { ...user };
          if (permissionType === 'camera') {
            newUser.cameraPermission = !newUser.cameraPermission;
          } else {
            newUser.audioPermission = !newUser.audioPermission;
          }
          return newUser;
        }
        return user;
      })
    );

    const user = users.find(u => u.id === userId);
    const permissionName = permissionType === 'camera' ? 'cámara' : 'audio';
    const currentPermission = permissionType === 'camera' ? user?.cameraPermission : user?.audioPermission;
    
    Alert.alert(
      'Permisos Actualizados',
      `${permissionName} ${!currentPermission ? 'activada' : 'desactivada'} para ${user?.name}`
    );
  };

  const addNewUser = () => {
    Alert.alert(
      'Agregar Usuario',
      'Esta función permite agregar un nuevo usuario al sistema de monitoreo.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Continuar', onPress: () => Alert.alert('Formulario', 'Abriendo formulario de registro...') }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-white" style={{ paddingTop: top }}>
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-black mb-2">GESTIÓN DE USUARIOS</Text>
          <Text className="text-lg text-gray-600">Administra usuarios bajo tu cuidado</Text>
        </View>

        {/* Búsqueda */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-black mb-3">BUSCAR USUARIOS</Text>
          <TextInput
            className="border-4 border-gray-400 p-4 rounded-lg text-lg bg-white"
            placeholder="Buscar por nombre o email..."
            value={searchText}
            onChangeText={setSearchText}
            accessibilityLabel="Campo de búsqueda de usuarios"
          />
        </View>

        {/* Filtros */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-black mb-3">FILTROS</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {[
                { key: 'all', label: 'Todos' },
                { key: 'active', label: 'Activos' },
                { key: 'inactive', label: 'Inactivos' },
                { key: 'emergency', label: 'Emergencia' },
                { key: 'connected', label: 'Conectados' }
              ].map(filter => (
                <TouchableOpacity
                  key={filter.key}
                  className={`mr-3 px-4 py-2 rounded-lg border-2 ${
                    selectedFilter === filter.key
                      ? 'bg-blue-600 border-white'
                      : 'bg-gray-200 border-gray-400'
                  }`}
                  onPress={() => setSelectedFilter(filter.key)}
                  accessibilityLabel={`Filtrar por ${filter.label}`}
                >
                  <Text className={`font-bold ${
                    selectedFilter === filter.key ? 'text-white' : 'text-black'
                  }`}>
                    {filter.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Estadísticas Rápidas */}
        <View className="mb-6">
          <Text className="text-xl font-bold text-black mb-3">RESUMEN</Text>
          <View className="flex-row flex-wrap">
            <View className="bg-green-100 border-2 border-green-600 p-3 rounded-lg mr-3 mb-3">
              <Text className="text-green-800 font-bold">Activos: {users.filter(u => u.status === 'active').length}</Text>
            </View>
            <View className="bg-red-100 border-2 border-red-600 p-3 rounded-lg mr-3 mb-3">
              <Text className="text-red-800 font-bold">Emergencias: {users.filter(u => u.status === 'emergency').length}</Text>
            </View>
            <View className="bg-blue-100 border-2 border-blue-600 p-3 rounded-lg mr-3 mb-3">
              <Text className="text-blue-800 font-bold">Conectados: {users.filter(u => u.deviceConnected).length}</Text>
            </View>
          </View>
        </View>

        {/* Lista de Usuarios */}
        <View className="mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-black">USUARIOS ({filteredUsers.length})</Text>
            <TouchableOpacity
              className="bg-green-600 border-2 border-white px-4 py-2 rounded-lg"
              onPress={addNewUser}
              accessibilityLabel="Agregar nuevo usuario"
            >
              <Text className="text-white font-bold">[Agregar] NUEVO</Text>
            </TouchableOpacity>
          </View>

          {filteredUsers.map(user => (
            <View key={user.id} className="bg-gray-50 border-4 border-gray-300 p-4 rounded-lg mb-4">
              {/* Header del Usuario */}
              <View className="flex-row justify-between items-start mb-3">
                <View className="flex-1">
                  <Text className="text-xl font-bold text-black">{user.name}</Text>
                  <Text className="text-base text-gray-600">{user.email}</Text>
                  <Text className="text-base text-gray-600">{user.phone}</Text>
                </View>
                <View className={`px-3 py-1 rounded-lg ${getStatusColor(user.status)}`}>
                  <Text className="text-white font-bold text-sm">{getStatusText(user.status)}</Text>
                </View>
              </View>

              {/* Información del Usuario */}
              <View className="mb-3">
                <Text className="text-base text-black mb-1">[Ubicacion] {user.location}</Text>
                <Text className="text-base text-black mb-1">[Tiempo] Última actividad: {user.lastActivity}</Text>
                <Text className="text-base text-black mb-1">[Contacto] {user.emergencyContact}</Text>
                
                <View className="flex-row items-center mt-2">
                  <View className={`px-2 py-1 rounded mr-2 ${
                    user.deviceConnected ? 'bg-green-600' : 'bg-red-600'
                  }`}>
                    <Text className="text-white font-bold text-xs">
                      {user.deviceConnected ? '[Conectado]' : '[Desconectado]'}
                    </Text>
                  </View>
                  
                  <View className={`px-2 py-1 rounded mr-2 ${
                    user.batteryLevel > 50 ? 'bg-green-600' : 
                    user.batteryLevel > 20 ? 'bg-yellow-600' : 'bg-red-600'
                  }`}>
                    <Text className="text-white font-bold text-xs">[Bateria] {user.batteryLevel}%</Text>
                  </View>
                </View>
              </View>

              {/* Permisos */}
              <View className="mb-3">
                <Text className="text-base font-bold text-black mb-2">PERMISOS:</Text>
                <View className="flex-row">
                  <TouchableOpacity
                    className={`px-3 py-2 rounded-lg mr-2 border-2 ${
                      user.cameraPermission 
                        ? 'bg-green-600 border-white' 
                        : 'bg-red-600 border-white'
                    }`}
                    onPress={() => toggleUserPermissions(user.id, 'camera')}
                    accessibilityLabel={`${user.cameraPermission ? 'Desactivar' : 'Activar'} cámara para ${user.name}`}
                  >
                    <Text className="text-white font-bold text-sm">
                      [Camara] {user.cameraPermission ? 'ON' : 'OFF'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    className={`px-3 py-2 rounded-lg border-2 ${
                      user.audioPermission 
                        ? 'bg-green-600 border-white' 
                        : 'bg-red-600 border-white'
                    }`}
                    onPress={() => toggleUserPermissions(user.id, 'audio')}
                    accessibilityLabel={`${user.audioPermission ? 'Desactivar' : 'Activar'} audio para ${user.name}`}
                  >
                    <Text className="text-white font-bold text-sm">
                      [Audio] {user.audioPermission ? 'ON' : 'OFF'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Acciones */}
              <View className="flex-row flex-wrap">
                <TouchableOpacity
                  className="bg-blue-600 border-2 border-white px-3 py-2 rounded-lg mr-2 mb-2"
                  onPress={() => contactUser(user)}
                  accessibilityLabel={`Contactar a ${user.name}`}
                >
                  <Text className="text-white font-bold text-sm">[Llamar] CONTACTAR</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  className="bg-gray-600 border-2 border-white px-3 py-2 rounded-lg mr-2 mb-2"
                  onPress={() => viewUserDetails(user)}
                  accessibilityLabel={`Ver detalles de ${user.name}`}
                >
                  <Text className="text-white font-bold text-sm">[Info] DETALLES</Text>
                </TouchableOpacity>
                
                {user.status === 'emergency' && (
                  <TouchableOpacity
                    className="bg-red-600 border-2 border-white px-3 py-2 rounded-lg mr-2 mb-2"
                    onPress={() => Alert.alert(
                      'Emergencia Activa',
                      `${user.name} tiene una emergencia activa. ¿Qué acción quieres tomar?`,
                      [
                        { text: 'Ver Cámara', onPress: () => Alert.alert('Cámara', 'Abriendo vista de cámara...') },
                        { text: 'Llamar 911', onPress: () => Alert.alert('911', 'Contactando servicios de emergencia...') },
                        { text: 'Marcar Resuelta', onPress: () => Alert.alert('Resuelto', 'Emergencia marcada como resuelta') }
                      ]
                    )}
                    accessibilityLabel={`Gestionar emergencia de ${user.name}`}
                  >
                    <Text className="text-white font-bold text-sm">[SOS] EMERGENCIA</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}

          {filteredUsers.length === 0 && (
            <View className="bg-gray-100 border-4 border-gray-400 p-8 rounded-lg">
              <Text className="text-xl font-bold text-gray-600 text-center mb-2">[Vacio] SIN RESULTADOS</Text>
              <Text className="text-base text-gray-500 text-center">
                No se encontraron usuarios que coincidan con los criterios de búsqueda.
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}