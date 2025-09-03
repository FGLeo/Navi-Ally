// Navi-Ally Simulation Utilities
// Provides simulated functionality for detection, OCR, voice commands, and accessibility features

export interface DetectionResult {
  id: string;
  type: 'person' | 'vehicle' | 'obstacle' | 'step' | 'door' | 'sign' | 'animal' | 'unknown';
  description: string;
  confidence: number;
  distance?: number;
  direction?: 'front' | 'left' | 'right' | 'behind';
  size?: 'small' | 'medium' | 'large';
  movement?: 'stationary' | 'slow' | 'moderate' | 'fast';
  timestamp: string;
  location?: string;
  audioDescription: string;
}

export interface OCRResult {
  id: string;
  text: string;
  confidence: number;
  language: 'es' | 'en';
  type: 'menu' | 'sign' | 'document' | 'label' | 'other';
  timestamp: string;
  audioDescription: string;
}

export interface VoiceCommand {
  command: string;
  action: string;
  parameters?: Record<string, any>;
  confidence: number;
}

export interface NavigationInstruction {
  id: string;
  instruction: string;
  distance: number;
  direction: string;
  landmark?: string;
  audioDescription: string;
}

// Simulated detection scenarios
const DETECTION_SCENARIOS: Omit<DetectionResult, 'id' | 'timestamp'>[] = [
  {
    type: 'person',
    description: 'Persona caminando hacia tu dirección',
    confidence: 95,
    distance: 3,
    direction: 'front',
    size: 'medium',
    movement: 'moderate',
    audioDescription: 'Persona detectada a 3 metros frente a ti, caminando hacia tu dirección a velocidad moderada.'
  },
  {
    type: 'vehicle',
    description: 'Automóvil aproximándose desde la izquierda',
    confidence: 92,
    distance: 8,
    direction: 'left',
    size: 'large',
    movement: 'moderate',
    audioDescription: 'Vehículo detectado a 8 metros a tu izquierda, aproximándose a velocidad moderada. Mantén precaución.'
  },
  {
    type: 'obstacle',
    description: 'Obstáculo bajo en el suelo',
    confidence: 88,
    distance: 1,
    direction: 'front',
    size: 'small',
    movement: 'stationary',
    audioDescription: 'Obstáculo bajo detectado a 1 metro frente a ti. Posible escalón o desnivel en el suelo.'
  },
  {
    type: 'step',
    description: 'Escalón de aproximadamente 15 cm',
    confidence: 94,
    distance: 0.5,
    direction: 'front',
    size: 'medium',
    movement: 'stationary',
    audioDescription: 'Escalón detectado directamente frente a ti, altura aproximada de 15 centímetros.'
  },
  {
    type: 'door',
    description: 'Puerta de entrada a tu derecha',
    confidence: 90,
    distance: 2,
    direction: 'right',
    size: 'large',
    movement: 'stationary',
    audioDescription: 'Puerta detectada a 2 metros a tu derecha. Parece ser una entrada principal.'
  },
  {
    type: 'sign',
    description: 'Letrero o señalización visible',
    confidence: 85,
    distance: 4,
    direction: 'front',
    size: 'medium',
    movement: 'stationary',
    audioDescription: 'Letrero o señalización detectada a 4 metros frente a ti. Usa la función OCR para leer el contenido.'
  },
  {
    type: 'animal',
    description: 'Animal pequeño en movimiento',
    confidence: 78,
    distance: 5,
    direction: 'left',
    size: 'small',
    movement: 'fast',
    audioDescription: 'Animal pequeño detectado a 5 metros a tu izquierda, moviéndose rápidamente.'
  }
];

// Simulated OCR scenarios
const OCR_SCENARIOS: Omit<OCRResult, 'id' | 'timestamp'>[] = [
  {
    text: 'MENÚ DEL DÍA\nTacos al Pastor - $45\nQuesadillas - $35\nAgua fresca - $20\nPostre del día - $25',
    confidence: 92,
    language: 'es',
    type: 'menu',
    audioDescription: 'Menú del día detectado. Tacos al Pastor 45 pesos, Quesadillas 35 pesos, Agua fresca 20 pesos, Postre del día 25 pesos.'
  },
  {
    text: 'PROHIBIDO EL PASO\nOBRAS EN CONSTRUCCIÓN\nUSE VÍA ALTERNA',
    confidence: 96,
    language: 'es',
    type: 'sign',
    audioDescription: 'Señal de tránsito: Prohibido el paso, obras en construcción, use vía alterna.'
  },
  {
    text: 'FARMACIA GUADALAJARA\nABIERTO 24 HORAS\nServicios: Medicamentos, Consultas, Laboratorio',
    confidence: 89,
    language: 'es',
    type: 'sign',
    audioDescription: 'Letrero de Farmacia Guadalajara, abierto 24 horas. Servicios: medicamentos, consultas y laboratorio.'
  },
  {
    text: 'METRO INSURGENTES\nLÍNEA 1 - DIRECCIÓN PANTITLÁN\nPróximo tren: 3 minutos',
    confidence: 94,
    language: 'es',
    type: 'sign',
    audioDescription: 'Información del Metro Insurgentes, Línea 1 dirección Pantitlán. Próximo tren en 3 minutos.'
  },
  {
    text: 'SALIDA DE EMERGENCIA\nEMERGENCY EXIT\nMANTENGA LIBRE',
    confidence: 91,
    language: 'es',
    type: 'sign',
    audioDescription: 'Señal de salida de emergencia bilingüe. Mantener libre el acceso.'
  },
  {
    text: 'Receta Médica\nPaciente: María González\nMedicamento: Ibuprofeno 400mg\nTomar cada 8 horas',
    confidence: 87,
    language: 'es',
    type: 'document',
    audioDescription: 'Receta médica para María González. Medicamento: Ibuprofeno 400 miligramos, tomar cada 8 horas.'
  }
];

// Voice command patterns
const VOICE_COMMANDS: Record<string, VoiceCommand> = {
  'qué hay frente a mí': {
    command: 'qué hay frente a mí',
    action: 'detect_front',
    confidence: 95
  },
  'lee el texto': {
    command: 'lee el texto',
    action: 'ocr_read',
    confidence: 92
  },
  'repite la descripción': {
    command: 'repite la descripción',
    action: 'repeat_description',
    confidence: 98
  },
  'dónde estoy': {
    command: 'dónde estoy',
    action: 'get_location',
    confidence: 90
  },
  'activar sos': {
    command: 'activar sos',
    action: 'emergency_sos',
    confidence: 99
  },
  'pausar audio': {
    command: 'pausar audio',
    action: 'pause_audio',
    confidence: 96
  },
  'continuar audio': {
    command: 'continuar audio',
    action: 'resume_audio',
    confidence: 96
  },
  'subir volumen': {
    command: 'subir volumen',
    action: 'volume_up',
    confidence: 94
  },
  'bajar volumen': {
    command: 'bajar volumen',
    action: 'volume_down',
    confidence: 94
  },
  'modo continuo': {
    command: 'modo continuo',
    action: 'continuous_mode',
    confidence: 91
  }
};

// Navigation instructions
const NAVIGATION_INSTRUCTIONS: Omit<NavigationInstruction, 'id'>[] = [
  {
    instruction: 'Camina 50 metros hacia adelante',
    distance: 50,
    direction: 'adelante',
    landmark: 'hasta llegar al semáforo',
    audioDescription: 'Camina 50 metros hacia adelante hasta llegar al semáforo.'
  },
  {
    instruction: 'Gira a la derecha',
    distance: 0,
    direction: 'derecha',
    landmark: 'en la esquina de la farmacia',
    audioDescription: 'Gira a la derecha en la esquina donde está la farmacia.'
  },
  {
    instruction: 'Continúa 100 metros',
    distance: 100,
    direction: 'adelante',
    landmark: 'pasando el parque',
    audioDescription: 'Continúa 100 metros hacia adelante, pasando el parque a tu izquierda.'
  }
];

// Utility functions
export class SimulationUtils {
  private static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private static getCurrentTimestamp(): string {
    return new Date().toLocaleString('es-MX', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  // Simulate environment detection
  static async simulateDetection(delay: number = 2000): Promise<DetectionResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const scenario = DETECTION_SCENARIOS[Math.floor(Math.random() * DETECTION_SCENARIOS.length)];
        const result: DetectionResult = {
          ...scenario,
          id: this.generateId(),
          timestamp: this.getCurrentTimestamp()
        };
        resolve(result);
      }, delay);
    });
  }

  // Simulate OCR text reading
  static async simulateOCR(delay: number = 3000): Promise<OCRResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const scenario = OCR_SCENARIOS[Math.floor(Math.random() * OCR_SCENARIOS.length)];
        const result: OCRResult = {
          ...scenario,
          id: this.generateId(),
          timestamp: this.getCurrentTimestamp()
        };
        resolve(result);
      }, delay);
    });
  }

  // Process voice command
  static processVoiceCommand(input: string): VoiceCommand | null {
    const normalizedInput = input.toLowerCase().trim();
    
    // Find exact match first
    if (VOICE_COMMANDS[normalizedInput]) {
      return VOICE_COMMANDS[normalizedInput];
    }

    // Find partial matches
    for (const [command, result] of Object.entries(VOICE_COMMANDS)) {
      if (normalizedInput.includes(command) || command.includes(normalizedInput)) {
        return {
          ...result,
          confidence: result.confidence * 0.8 // Reduce confidence for partial matches
        };
      }
    }

    return null;
  }

  // Simulate navigation instruction
  static getNavigationInstruction(): NavigationInstruction {
    const instruction = NAVIGATION_INSTRUCTIONS[Math.floor(Math.random() * NAVIGATION_INSTRUCTIONS.length)];
    return {
      ...instruction,
      id: this.generateId()
    };
  }

  // Simulate haptic feedback
  static simulateHapticFeedback(pattern: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error'): void {
    // In a real implementation, this would trigger device haptic feedback
    console.log(`Haptic feedback: ${pattern}`);
    
    // Simulate different vibration patterns
    const patterns = {
      light: [100],
      medium: [200],
      heavy: [300],
      success: [100, 50, 100],
      warning: [200, 100, 200],
      error: [300, 100, 300, 100, 300]
    };

    // In React Native, you would use:
    // import { Vibration } from 'react-native';
    // Vibration.vibrate(patterns[pattern]);
  }

  // Simulate text-to-speech
  static simulateTextToSpeech(text: string, rate: number = 1.0, language: string = 'es-MX'): Promise<void> {
    return new Promise((resolve) => {
      console.log(`TTS (${language}, rate: ${rate}): ${text}`);
      
      // Simulate speech duration based on text length and rate
      const duration = (text.length * 50) / rate;
      
      setTimeout(() => {
        resolve();
      }, Math.min(duration, 5000)); // Max 5 seconds for simulation
    });
  }

  // Simulate location services
  static async getCurrentLocation(): Promise<{ latitude: number; longitude: number; address: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const locations = [
          {
            latitude: 19.4326,
            longitude: -99.1332,
            address: 'Centro Histórico, Ciudad de México'
          },
          {
            latitude: 19.4284,
            longitude: -99.1276,
            address: 'Alameda Central, Ciudad de México'
          },
          {
            latitude: 19.4270,
            longitude: -99.1435,
            address: 'Zona Rosa, Ciudad de México'
          }
        ];
        
        const location = locations[Math.floor(Math.random() * locations.length)];
        resolve(location);
      }, 1000);
    });
  }

  // Simulate emergency SOS
  static async activateEmergencySOS(): Promise<{ success: boolean; message: string; contactsNotified: string[] }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'SOS activado exitosamente. Contactos de emergencia notificados.',
          contactsNotified: ['Juan González', 'Ana López', 'Servicios de Emergencia']
        });
      }, 1500);
    });
  }

  // Simulate device pairing
  static async simulateDevicePairing(deviceType: 'bluetooth' | 'wifi'): Promise<{ success: boolean; devices: Array<{ name: string; id: string; type: string }> }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const bluetoothDevices = [
          { name: 'Auriculares Sony WH-1000XM4', id: 'bt_001', type: 'audio' },
          { name: 'Smartwatch Apple Watch', id: 'bt_002', type: 'wearable' },
          { name: 'Altavoz JBL Flip 5', id: 'bt_003', type: 'audio' }
        ];

        const wifiDevices = [
          { name: 'Red_Casa_WiFi', id: 'wifi_001', type: 'network' },
          { name: 'Navi_Ally_Hotspot', id: 'wifi_002', type: 'network' }
        ];

        resolve({
          success: true,
          devices: deviceType === 'bluetooth' ? bluetoothDevices : wifiDevices
        });
      }, 2000);
    });
  }

  // Simulate battery level monitoring
  static getBatteryLevel(): number {
    // Simulate battery level between 20-100%
    return Math.floor(Math.random() * 80) + 20;
  }

  // Simulate connectivity status
  static getConnectivityStatus(): { wifi: boolean; cellular: boolean; bluetooth: boolean } {
    return {
      wifi: Math.random() > 0.2, // 80% chance of WiFi
      cellular: Math.random() > 0.1, // 90% chance of cellular
      bluetooth: Math.random() > 0.3 // 70% chance of Bluetooth
    };
  }

  // Generate accessibility announcement
  static generateAccessibilityAnnouncement(action: string, result?: any): string {
    const announcements = {
      detection_started: 'Iniciando detección del entorno. Por favor mantén el dispositivo estable.',
      detection_completed: result ? `Detección completada. ${result.audioDescription}` : 'Detección completada.',
      ocr_started: 'Iniciando lectura de texto. Enfoca la cámara hacia el texto que deseas leer.',
      ocr_completed: result ? `Texto detectado: ${result.audioDescription}` : 'Lectura de texto completada.',
      navigation_started: 'Iniciando navegación. Te guiaré paso a paso hacia tu destino.',
      sos_activated: 'Sistema SOS activado. Contactando servicios de emergencia y contactos.',
      settings_changed: 'Configuración actualizada exitosamente.',
      device_connected: 'Dispositivo conectado correctamente.',
      device_disconnected: 'Dispositivo desconectado.',
      low_battery: 'Batería baja. Considera cargar tu dispositivo pronto.',
      no_connection: 'Sin conexión a internet. Algunas funciones pueden estar limitadas.'
    };

    return announcements[action as keyof typeof announcements] || `Acción completada: ${action}`;
  }
}

// Export types and utilities
export default SimulationUtils;

// Export individual functions for direct import
export const simulateTextToSpeech = SimulationUtils.simulateTextToSpeech;
export const simulateHapticFeedback = SimulationUtils.simulateHapticFeedback;
export const simulateDevicePairing = SimulationUtils.simulateDevicePairing;
export const simulateDetection = SimulationUtils.simulateDetection;
export const simulateOCR = SimulationUtils.simulateOCR;
export const getCurrentLocation = SimulationUtils.getCurrentLocation;
export const getBatteryLevel = SimulationUtils.getBatteryLevel;
export const getConnectivityStatus = SimulationUtils.getConnectivityStatus;
export const generateAccessibilityAnnouncement = SimulationUtils.generateAccessibilityAnnouncement;
export const processVoiceCommand = SimulationUtils.processVoiceCommand;
export const getNavigationInstruction = SimulationUtils.getNavigationInstruction;

// Add missing simulateSOSAlert function
export const simulateSOSAlert = async (): Promise<{ success: boolean; message: string; alertId: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Alerta SOS enviada exitosamente a todos los cuidadores conectados.',
        alertId: `sos_${Date.now()}`
      });
    }, 1000);
  });
};

// Add emergency contact simulation
export const getEmergencyContacts = (): Array<{ name: string; phone: string; relation: string }> => {
  return [
    { name: 'Juan González', phone: '+52 55 1234 5678', relation: 'Hijo' },
    { name: 'Ana López', phone: '+52 55 8765 4321', relation: 'Cuidadora Principal' },
    { name: 'Dr. Martínez', phone: '+52 55 9999 0000', relation: 'Médico de Cabecera' },
    { name: 'Servicios de Emergencia', phone: '911', relation: 'Emergencias' }
  ];
};

// Add device status simulation
export const getDeviceStatus = (): { 
  battery: number; 
  connectivity: { wifi: boolean; cellular: boolean; bluetooth: boolean };
  sensors: { camera: boolean; microphone: boolean; gps: boolean };
} => {
  return {
    battery: getBatteryLevel(),
    connectivity: getConnectivityStatus(),
    sensors: {
      camera: Math.random() > 0.1, // 90% chance camera works
      microphone: Math.random() > 0.05, // 95% chance microphone works
      gps: Math.random() > 0.15 // 85% chance GPS works
    }
  };
};

// Add notification simulation
export const sendNotification = async (title: string, message: string, type: 'info' | 'warning' | 'error' | 'success' = 'info'): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log(`Notification [${type.toUpperCase()}]: ${title} - ${message}`);
    setTimeout(() => {
      resolve(true);
    }, 500);
  });
};