export type VoiceExercise = {
  id: string;
  title: string;
  description: string;
  category: 'BREATHING' | 'PROJECTION' | 'ARTICULATION' | 'INTONATION' | 'RELAXATION' | 'MINDSET' | 'STAGE_PRESENCE' | 'IMPROVISATION';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  targetMetrics: string[]; // Qué métricas mejora (ej: 'score_claridad', 'fallingIntonationScore')
  steps: string[];
  benefit: string;
};

export const VOICE_EXERCISES: VoiceExercise[] = [
  // ... (Ejercicios anteriores se mantienen)
  {
    id: 'diaphragmatic-breathing',
    title: 'Respiración Diafragmática',
    description: 'La base de una voz potente. Aprende a respirar con el abdomen, no con el pecho.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability', 'volume'],
    steps: [
      'Siéntate derecho o párate con los pies a la altura de los hombros.',
      'Coloca una mano en el abdomen y otra en el pecho.',
      'Inhala profundo intentando que SOLO se mueva la mano del abdomen.',
      'Exhala controlando que el pecho siga inmóvil.',
      'Repite para ganar estabilidad y volumen.'
    ],
    benefit: 'Aumenta tu capacidad pulmonar y estabilidad vocal.'
  },
  {
    id: 'vocal-projection',
    title: 'Proyección a la Pared',
    description: 'Haz que tu voz viaje sin gritar. Ideal para ganar presencia.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'energyStability'],
    steps: [
      'Siéntate contra una pared y mira un punto en la pared opuesta.',
      'Di "Hola, ¿cómo estás?" imaginando que tu voz debe golpear ese punto.',
      'Aumenta el volumen gradualmente sin tensar la garganta.',
      'Impulsa el aire desde el diafragma.'
    ],
    benefit: 'Tu voz se escuchará clara en toda la sala sin esfuerzo.'
  },
  {
    id: 'tongue-twisters',
    title: 'Trabalenguas Progresivos',
    description: 'El gimnasio de la lengua. Elimina el balbuceo y mejora la precisión.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad', 'wordsPerMinute'],
    steps: [
      'Empieza lento: "Tres tristes tigres tragaban trigo en un trigal".',
      'Exagera la pronunciación de cada sílaba.',
      'Aumenta la velocidad poco a poco sin perder claridad.'
    ],
    benefit: 'Evita que se te "coman" las sílabas al hablar rápido.'
  },
  {
    id: 'emotional-reading',
    title: 'Lectura con Matices',
    description: 'Combate la voz monótona (robot). Aprende a "pintar" con tu voz.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange', 'rhythmConsistency', 'fallingIntonationScore'],
    steps: [
      'Toma un párrafo de un libro cualquiera.',
      'Léelo primero con entusiasmo exagerado.',
      'Léelo ahora con seriedad absoluta.',
      'Léelo finalmente con suavidad/cariño.',
      'Varía la velocidad para enfatizar palabras clave.'
    ],
    benefit: 'Añade emoción y mantiene a la audiencia enganchada.'
  },
  {
    id: 'vocal-relaxation',
    title: 'Relajación de Cuerdas',
    description: 'Previene la fatiga y la voz rasposa antes de hablar.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    steps: [
      'Realiza un bostezo amplio para abrir la garganta.',
      'Haz un zumbido suave ("Mmmm") sintiendo vibrar tus labios.',
      'Sube y baja el tono (agudo-grave) suavemente.'
    ],
    benefit: 'Voz más limpia y resistente durante charlas largas.'
  },
  {
    id: 'pen-horizontal',
    title: 'El Bolígrafo Horizontal',
    description: 'El ejercicio clásico de los locutores para una dicción perfecta.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad', 'repetitionCount'],
    steps: [
      'Coloca un bolígrafo horizontalmente entre tus dientes (sin morder fuerte).',
      'Lee un texto en voz alta esforzándote por vocalizar a pesar del obstáculo.',
      'Retira el bolígrafo y lee lo mismo de nuevo.',
      '¡Siente la liberación inmediata!'
    ],
    benefit: 'Mejora radical e inmediata en la claridad de pronunciación.'
  },
  {
    id: 'pen-tip',
    title: 'Bolígrafo de Punta',
    description: 'Variante para precisión quirúrgica en sonidos difíciles.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad'],
    steps: [
      'Sujeta la punta del bolígrafo con los dientes frontales.',
      'Lee esforzándote en pronunciar cada letra.',
      'Libera y nota la diferencia en la precisión.'
    ],
    benefit: 'Ideal si tienes problemas pronunciando ciertas letras (R, S, T).'
  },
  // 🆕 Módulo: Superando el Miedo Escénico
  {
    id: 'positive-visualization',
    title: 'Hackeo Mental Positivo',
    description: 'Reprograma tu cerebro para esperar el éxito, no el fracaso.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad', 'energyStability'],
    steps: [
      'Cierra los ojos antes de tu presentación.',
      'Visualiza a la audiencia aplaudiendo y asintiendo.',
      'Siente la emoción de haber terminado con éxito.',
      'Tu cerebro no distingue imaginación de realidad: úsalo a tu favor.'
    ],
    benefit: 'Reduce drásticamente la ansiedad anticipatoria.'
  },
  {
    id: 'audience-scanning',
    title: 'Escaneo en Tres Bloques',
    description: 'La técnica para mirar a todos sin abrumarte.',
    category: 'STAGE_PRESENCE',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    steps: [
      'Divide mentalmente a tu audiencia en 3 grupos: Izquierda, Centro, Derecha.',
      'No mires al vacío ni a una sola persona.',
      'Rota tu mirada: 3 seg a la Izquierda, 3 seg al Centro, 3 seg a la Derecha.',
      'Haz que parezca que hablas con todos.'
    ],
    benefit: 'Proyectas control total del escenario y conectas mejor.'
  },
  {
    id: 'anxiety-breathing',
    title: 'Respiración Anti-Pánico',
    description: 'Botón de emergencia para bajar pulsaciones antes de subir.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['rhythmConsistency', 'energyStability'],
    steps: [
      'Inhala profundamente contando hasta 4.',
      'Retén el aire contando hasta 4.',
      'Exhala lentamente contando hasta 4.',
      'Repite 3 veces. Tu sistema nervioso entenderá que "no hay peligro".'
    ],
    benefit: 'Elimina el temblor de voz y la taquicardia al instante.'
  },
  // 🆕 Improv & Daily Life
  {
    id: 'improvisation-connect',
    title: 'Asociación de Palabras',
    description: 'Entrena tu cerebro para nunca quedarte en blanco.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['awkwardSilences', 'fillerCount'],
    steps: [
      'Mira un objeto a tu alrededor (ej: "Silla").',
      'Habla 30 segundos sobre eso.',
      'Salta a otro objeto ("Ventana") sin dejar de hablar.',
      'Conecta ambos conceptos aunque sea absurdo.'
    ],
    benefit: 'Elimina el pánico al silencio y mejora tu fluidez mental.'
  },
  {
    id: 'articulation-pacing',
    title: 'El Método de la Cámara Lenta',
    description: 'Para cuando te piden repetir las cosas ("¿Cómo?").',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['wordsPerMinute', 'score_claridad'],
    steps: [
      'Lee un texto a la MITAD de tu velocidad normal.',
      'Separa ex-age-ra-da-men-te cada sílaba.',
      'Siente cómo tu lengua y labios tocan cada diente.',
      'Vuelve a velocidad normal manteniendo esa precisión.'
    ],
    benefit: 'Te entenderán a la primera en cualquier trámite o reunión.'
  }
];
