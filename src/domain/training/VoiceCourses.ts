import { VOICE_EXERCISES } from './VoiceExercises';

export type VoiceLesson = {
  id: string;
  title: string;
  description: string;
  day: number; // 1-21
  exercises: string[]; // IDs de VoiceExercises
};

export type VoiceCourse = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  durationDays: number;
  lessons: VoiceLesson[];
  externalLink?: string; 
  image?: string; // Ruta de la imagen o mockup
};

export const COURSES: VoiceCourse[] = [
  {
    id: 'sin-miedo-a-hablar',
    title: 'Sin Miedo a Hablar',
    subtitle: 'Transforma tu miedo escénico en confianza en 21 días',
    description: 'No son frases motivadoras. Es un método paso a paso para desactivar el miedo desde la raíz y reconectar con tu voz auténtica.',
    durationDays: 21,
    externalLink: '/go/sin-miedo', 
    image: '/course-mockup.jpg',
    lessons: [
      // Week 1: Desactivar el Miedo
      {
        id: 'day-1',
        title: 'Día 1: La Raíz del Miedo',
        description: 'Entiende y desactiva el miedo escénico desde su origen biológico.',
        day: 1,
        exercises: ['positive-visualization', 'anxiety-breathing']
      },
      {
        id: 'day-2',
        title: 'Día 2: Práctica de Calma',
        description: 'Refuerza tu ancla de seguridad con respiración consciente.',
        day: 2,
        exercises: ['anxiety-breathing']
      },
      {
        id: 'day-3',
        title: 'Día 3: Visualización',
        description: 'Vuelve a programar tu mente para el éxito.',
        day: 3,
        exercises: ['positive-visualization']
      },

      // Week 2: Soltar el Cuerpo
      {
        id: 'day-4',
        title: 'Día 4: Cuerpo sin Tensión',
        description: 'Aprende a respirar, moverte y expresarte soltando el freno de mano.',
        day: 4,
        exercises: ['diaphragmatic-breathing', 'vocal-relaxation']
      },
      {
        id: 'day-5',
        title: 'Día 5: Respiración Profunda',
        description: 'Entrenamiento del diafragma para ganar potencia.',
        day: 5,
        exercises: ['diaphragmatic-breathing']
      },
      {
        id: 'day-6',
        title: 'Día 6: Relajación Activa',
        description: 'Elimina la tensión en cuello y hombros antes de hablar.',
        day: 6,
        exercises: ['vocal-relaxation']
      },
      {
        id: 'day-7',
        title: 'Día 7: Integración Corporal',
        description: 'Combina respiración y relajación en una sesión fluida.',
        day: 7,
        exercises: ['diaphragmatic-breathing', 'vocal-relaxation']
      },

      // Week 3: Voz Firme
      {
        id: 'day-8',
        title: 'Día 8: Voz Firme y Clara',
        description: 'Proyección y dicción para que nadie tenga que pedirte que repitas.',
        day: 8,
        exercises: ['vocal-projection', 'pen-horizontal']
      },
      {
        id: 'day-9',
        title: 'Día 9: Proyección',
        description: 'Haz que tu voz llegue lejos sin gritar.',
        day: 9,
        exercises: ['vocal-projection']
      },
      {
        id: 'day-10',
        title: 'Día 10: Dicción',
        description: 'Gimnasio articulatorio para borrar el balbuceo.',
        day: 10,
        exercises: ['pen-horizontal']
      },
      {
        id: 'day-11',
        title: 'Día 11: Ritmo y Pausas',
        description: 'El silencio es tu mejor herramienta de autoridad.',
        day: 11,
        exercises: ['articulation-pacing']
      },

      // Week 4: Estructura & Historia
      {
        id: 'day-12',
        title: 'Día 12: Estructura de Impacto',
        description: 'Cómo ordenar tus ideas para dejar huella.',
        day: 12,
        exercises: ['improvisation-connect']
      },
      {
        id: 'day-13',
        title: 'Día 13: Improvisación I',
        description: 'Entrena tu agilidad mental conectando conceptos.',
        day: 13,
        exercises: ['improvisation-connect']
      },
      {
        id: 'day-14',
        title: 'Día 14: Improvisación II',
        description: 'Sube la dificultad: conecta ideas opuestas.',
        day: 14,
        exercises: ['improvisation-connect']
      },
      {
        id: 'day-15',
        title: 'Día 15: Repaso Técnico',
        description: 'Un poco de todo: Respiración + Dicción + Estructura.',
        day: 15,
        exercises: ['diaphragmatic-breathing', 'pen-horizontal']
      },

      // Week 5: Storytelling & Cierre
      {
        id: 'day-16',
        title: 'Día 16: Tu Historia Auténtica',
        description: 'Cómo contar quién eres sin vergüenza.',
        day: 16,
        exercises: ['emotional-reading']
      },
      {
        id: 'day-17',
        title: 'Día 17: Lectura Expresiva',
        description: 'Dale color y matices a tu relato.',
        day: 17,
        exercises: ['emotional-reading']
      },
      {
        id: 'day-18',
        title: 'Día 18: Ensayo Mental',
        description: 'Visualiza tu gran discurso saliendo perfecto.',
        day: 18,
        exercises: ['positive-visualization']
      },
      {
        id: 'day-19',
        title: 'Día 19: Presencia Escénica',
        description: 'Cómo pararte, mirar y ocupar el espacio.',
        day: 19,
        exercises: ['stage-presence']
      },
      {
        id: 'day-20',
        title: 'Día 20: Ensayo General',
        description: 'Practica tu discurso completo con cronómetro.',
        day: 20,
        exercises: ['audience-scanning']
      },
      {
        id: 'day-21',
        title: 'Día 21: El Gran Discurso',
        description: 'Tu prueba de fuego. Graba tu transformación.',
        day: 21,
        exercises: ['stage-presence', 'audience-scanning']
      }
    ]
  },
  {
    id: 'negociacion-persuasion',
    title: 'Negociación y Persuasión',
    subtitle: 'Cómo Influenciar y Convencer para Alcanzar el Éxito',
    description: 'Descubre los 6 Potentes Disparadores de Ventas, Psicología Inversa y el poder de la Prueba Social para transformar tu capacidad de influencia.',
    durationDays: 5,
    externalLink: '/go/persuasion',
    image: '/nego-persuasion-mockup.jpg',
    lessons: []
  }
];
