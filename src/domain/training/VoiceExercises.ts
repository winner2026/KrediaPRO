
export type ExerciseMode = 'AUDIO' | 'VIDEO';

export type VoiceExercise = {
  id: string;
  title: string;
  description: string;
  category: 'BREATHING' | 'PROJECTION' | 'ARTICULATION' | 'INTONATION' | 'RELAXATION' | 'MINDSET' | 'IMPROVISATION' | 'VOCABULARY';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  targetMetrics: string[]; 
  requiredMode: ExerciseMode;
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
    requiredMode: 'AUDIO',
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
    requiredMode: 'AUDIO',
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
    requiredMode: 'AUDIO',
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
    requiredMode: 'AUDIO',
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
    requiredMode: 'AUDIO',
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
    requiredMode: 'AUDIO',
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
    requiredMode: 'AUDIO',
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
    requiredMode: 'AUDIO',
    steps: [
      'Cierra los ojos antes de tu presentación.',
      'Visualiza a la audiencia aplaudiendo y asintiendo.',
      'Siente la emoción de haber terminado con éxito.',
      'Tu cerebro no distingue imaginación de realidad: úsalo a tu favor.'
    ],
    benefit: 'Reduce drásticamente la ansiedad anticipatoria.'
  },
  {
    id: 'anxiety-breathing',
    title: 'Respiración Anti-Pánico',
    description: 'Botón de emergencia para bajar pulsaciones antes de subir.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['rhythmConsistency', 'energyStability'],
    requiredMode: 'AUDIO',
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
    requiredMode: 'AUDIO',
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
    requiredMode: 'AUDIO',
    steps: [
      'Lee un texto a la MITAD de tu velocidad normal.',
      'Separa ex-age-ra-da-men-te cada sílaba.',
      'Siente cómo tu lengua y labios tocan cada diente.',
      'Vuelve a velocidad normal manteniendo esa precisión.'
    ],
    benefit: 'Te entenderán a la primera en cualquier trámite o reunión.'
  },
  // 🆕 RESPIRACIÓN (BREATHING)
  {
    id: 'seseo-control',
    title: 'Seseo de Control',
    description: 'Mide y domina tu flujo de aire con una exhalación constante.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala profundo con el diafragma.',
      'Suelta el aire haciendo un sonido de "S" largo y fino.',
      'Mantén la intensidad constante, que no suba ni baje.',
      'Cronometra cuánto aguantas sin esfuerzo.'
    ],
    benefit: 'Evita que te quedes sin aire a mitad de una frase.'
  },
  {
    id: 'fire-breath',
    title: 'Respiración de Fuego',
    description: 'Despierta tu diafragma y energía vital en segundos.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala y exhala por la nariz de forma rítmica y corta.',
      'Siente cómo tu abdomen entra y sale como un fuelle.',
      'Empieza lento y sube la velocidad gradualmente.',
      'Detente si te mareas.'
    ],
    benefit: 'Activa tu voz y elimina la pereza vocal antes de empezar.'
  },
  {
    id: 'golden-pause-478',
    title: 'La Pausa de Oro (4-7-8)',
    description: 'La técnica maestra para resetear tu sistema nervioso.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala por la nariz silenciosamente en 4 segundos.',
      'Mantén el aire en tus pulmones 7 segundos.',
      'Exhala ruidosamente por la boca en 8 segundos.',
      'Repite el ciclo 4 veces.'
    ],
    benefit: 'Control total sobre los nervios químicos del cuerpo.'
  },
  {
    id: 'imaginary-candle',
    title: 'La Vela Imaginaria',
    description: 'Entrena la precisión milimétrica de tu exhalación.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina una vela encendida a 10 cm de tu boca.',
      'Sopla de forma que la llama se incline pero NO se apague.',
      'Mantén esa inclinación el mayor tiempo posible.',
      'Aleja la "vela" imaginaria y repite.'
    ],
    benefit: 'Te da un control absoluto sobre el aire que gastas al hablar.'
  },
  {
    id: 'surprise-inhale',
    title: 'Inspiración de Sorpresa',
    description: 'Abre tus vías respiratorias al máximo instantáneamente.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Abre la boca como si te acabaran de dar una noticia increíble.',
      'Inhala rápido y profundo sintiendo cómo se ensancha tu garganta.',
      'Siente el aire frío llegando al fondo de tus pulmones.',
      'Exhala con un suspiro de alivio.'
    ],
    benefit: 'Prepara tu laringe para una resonancia mucho más rica.'
  },
  {
    id: 'abdominal-kick',
    title: 'El Contrapunteo Abdominal',
    description: 'Fortalece los músculos que impulsan tu voz.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Coloca tus manos en la cintura, sintiendo los músculos laterales.',
      'Di "¡JA! ¡JA! ¡JA!" con fuerza explosiva.',
      'Asegúrate de que tus manos sienten el empujón hacia afuera al hablar.',
      'No tenses el cuello, solo el abdomen.'
    ],
    benefit: 'Voz con autoridad que no se quiebra bajo presión.'
  },

  // 🆕 ARTICULACIÓN (ARTICULATION)
  {
    id: 'jaw-massage',
    title: 'Liberador de Mandíbula',
    description: 'Elimina la tensión muscular que te impide abrir la boca.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Ubica los músculos donde se unen las mandíbulas superior e inferior.',
      'Masajea en círculos con las yemas de los dedos durante 30 segundos.',
      'Deja que la boca caiga por su propio peso (boca entreabierta).',
      'Di "Aaa-Ooo" exagerando la apertura.'
    ],
    benefit: 'Mayor resonancia y menos esfuerzo al proyectar.'
  },
  {
    id: 'tongue-gym',
    title: 'Gimnasia Lingual 360',
    description: 'Entrena el músculo más importante de tu dicción.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Toca con la punta de la lengua cada diente por la parte exterior.',
      'Recorre tus labios con la lengua en sentido de las agujas del reloj.',
      'Hazlo ahora en sentido contrario.',
      'Chasquea la lengua contra el paladar con fuerza.'
    ],
    benefit: 'Agilidad inmediata para palabras complejas.'
  },
  {
    id: 'chewing-words',
    title: 'Masticar Palabras',
    description: 'Exagera la gesticulación para una claridad cristalina.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['repetitionCount', 'score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma un texto y léelo simulando que masticas un chicle gigante.',
      'Cada sílaba debe requerir que muevas toda la cara.',
      'Involucra labios, lengua y mandíbula.',
      'Lee ahora el mismo texto de forma normal.'
    ],
    benefit: 'Te quita la "pereza labial" que hace que parezca que balbuceas.'
  },
  {
    id: 'explosive-enunciation',
    title: 'Oclusivas Explosivas',
    description: 'Haz que tus palabras tengan un inicio limpio y potente.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Repite la secuencia: P-T-K, P-T-K, P-T-K.',
      'Siente el aire salir con fuerza en cada letra.',
      'Hazlo ahora con palabras: "Papá, Taco, Queso".',
      'Exagera el golpe de aire inicial.'
    ],
    benefit: 'Evita que tus frases suenen flojas o sin energía.'
  },
  {
    id: 'clean-diphthongs',
    title: 'Diptongos Limpios',
    description: 'Evita que las vocales se mezclen en un solo sonido.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Pronuncia lentamente: IA, IE, IO, IU.',
      'Asegúrate de escuchar las DOS vocales por separado.',
      'Ahora con palabras: "Ciudad, Hielo, Cuatro, Peine".',
      'No permitas que se vuelvan un solo sonido borroso.'
    ],
    benefit: 'Mejora la elegancia de tu habla cotidiana.'
  },
  {
    id: 'no-vowels-reading',
    title: 'Lectura sin Vocales',
    description: 'El reto definitivo para tu precisión articulatoria.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Mira una frase (ej: "Hola mundo").',
      'Intenta decirla pronunciando SOLO las consonantes (H-l-m-n-d).',
      'El esfuerzo debe estar en la posición de la lengua.',
      'Léela ahora normal y siente la facilidad.'
    ],
    benefit: 'Forza a tus articuladores a trabajar con precisión máxima.'
  },

  // 🆕 ENTONACIÓN (INTONATION)
  {
    id: 'news-anchor',
    title: 'El Locutor de Noticias',
    description: 'Practica la autoridad y el énfasis descendente.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['fallingIntonationScore', 'pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee una noticia cualquiera con tono serio y pausado.',
      'Termina cada frase con un tono claramente hacia abajo.',
      'Proyecta seguridad en cada afirmación.',
      'Evita subir el tono al final de las frases (sonido de duda).'
    ],
    benefit: 'Proyecta convicción y liderazgo de inmediato.'
  },
  {
    id: 'extreme-drama',
    title: 'Dramatismo Absurdo',
    description: 'Explora tus límites emocionales con un texto plano.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee una receta de cocina como si fuera la tragedia más grande de la historia.',
      'Ponle lágrimas a los ingredientes y agonía a los pasos.',
      'Ahora léelo como si fuera la noticia más feliz de tu vida.',
      'Siente cómo tu voz sube y baja de tono.'
    ],
    benefit: 'Elimina la voz monótona y aburrida.'
  },
  {
    id: 'constant-question',
    title: 'El Mundo como Pregunta',
    description: 'Entrena la flexibilidad de tus finales de frases.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma un texto descriptivo.',
      'Léelo terminando todas las frases hacia arriba (?).',
      'Incluso los puntos finales deben sonar como preguntas.',
      'Nota cómo cambia la percepción de lo que dices.'
    ],
    benefit: 'Te da un control consciente de para qué sirve subir o bajar el tono.'
  },
  {
    id: 'priest-voice',
    title: 'La Voz de Autoridad Calma',
    description: 'Practica la paz y la profundidad sonora.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability', 'pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Usa tu tono más grave y pausado.',
      'Habla como si estuvieras en una catedral inmensa.',
      'Alarga ligeramente las vocales.',
      'Mantén un ritmo lento y deliberado.'
    ],
    benefit: 'Ideal para calmar audiencias tensas o dar noticias serias.'
  },
  {
    id: 'word-emphasis',
    title: 'Énfasis Variable',
    description: 'Aprende a controlar qué idea resalta en tu discurso.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Usa la frase: "Yo no dije que él robó el dinero".',
      'Repítela enfatizando "YO".',
      'Repítela enfatizando "ROBÓ".',
      'Repítela enfatizando "DINERO".',
      'Nota cómo el significado cambia totalmente.'
    ],
    benefit: 'Garantiza que tu audiencia entienda exactamente lo importante.'
  },
  {
    id: 'fairy-tale',
    title: 'Cuentacuentos Mágico',
    description: 'Añade misterio y curiosidad a tu oratoria.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Susurra algunas partes de tu texto.',
      'Habla con entusiasmo repentino en otras.',
      'Usa pausas largas después de palabras clave.',
      'Crea un ambiente de intriga con tu voz.'
    ],
    benefit: 'Mantiene la atención de la audiencia en niveles máximos.'
  },

  // 🆕 MENTALIDAD (MINDSET)
  ,
  {
    id: 'authority-affirmation',
    title: 'Afirmación de Autoridad',
    description: 'Convéncete a ti mismo para poder convencer a otros.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Mírate al espejo directamente a los ojos.',
      'Di en voz alta: "Mi mensaje tiene valor y merezco ser escuchado".',
      'Repítelo 3 veces, bajando el tono al final de la frase.',
      'Sonríe con sinceridad al terminar.'
    ],
    benefit: 'Elimina el síndrome del impostor antes de una sesión.'
  },
  {
    id: 'imaginary-friend',
    title: 'El Amigo Invisible',
    description: 'Convierte el miedo al juicio en apoyo incondicional.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que en la audiencia (o frente a la cámara) está tu mejor amigo.',
      'Esa persona te apoya pase lo que pase.',
      'Háblale directamente a él, olvida al resto por un momento.',
      'Relaja tu rostro mientras lo haces.'
    ],
    benefit: 'Humaniza la oratoria y quita la presión de la perfección.'
  },
  {
    id: 'calm-bubble',
    title: 'El Escudo de Calma',
    description: 'Protégete de la energía negativa externa.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Visualiza una burbuja de luz azul a tu alrededor.',
      'Toda crítica o juicio rebota en esa burbuja.',
      'Dentro de la burbuja, tu voz es perfecta y tu mente está clara.',
      'Respira dentro de ese espacio seguro.'
    ],
    benefit: 'Ideal para hablar en ambientes hostiles o críticos.'
  },
  {
    id: 'focus-on-giving',
    title: 'Enfoque en el Servicio',
    description: 'Quita el foco de ti y ponlo en ayudar a otros.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Antes de empezar, pregúntate: "¿Cómo puedo ayudar hoy?".',
      'Olvida cómo te ves o qué piensan de ti.',
      'Concéntrate al 100% en transmitir tu mensaje con claridad.',
      'Entregar valor es tu única misión.'
    ],
    benefit: 'La ansiedad desaparece cuando dejas de ser el protagonista y te vuelves el mensajero.'
  },

  // 🆕 IMPROVISACIÓN (IMPROVISATION)
  {
    id: 'forbidden-letter',
    title: 'La Letra Prohibida',
    description: 'Forza a tu cerebro a buscar caminos lingüísticos nuevos.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['awkwardSilences', 'fillerCount'],
    requiredMode: 'AUDIO',
    steps: [
      'Habla un minuto sobre el clima o tu día.',
      'Reto: No puedes usar ninguna palabra que contenga la letra "A" (o "O").',
      'Si te detienes más de 3 segundos, pierde.',
      'Intenta ser fluido aunque sea difícil.'
    ],
    benefit: 'Te vuelve extremadamente rápido para encontrar sinónimos.'
  },
  {
    id: 'logical-connector',
    title: 'Puentes Imposibles',
    description: 'Une conceptos totalmente opuestos de forma lógica.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['awkwardSilences', 'fillerCount'],
    requiredMode: 'AUDIO',
    steps: [
      'Elige dos palabras al azar (ej: "Pizza" y "Justicia").',
      'Explica en 30 segundos cómo una pizza puede salvar el sistema judicial.',
      'Busca una conexión coherente, por loca que sea.',
      'Termina con una conclusión potente.'
    ],
    benefit: 'Te da agilidad mental para responder preguntas difíciles en vivo.'
  },
  {
    id: 'story-chain',
    title: 'La Cadena de Conectores',
    description: 'Estructura tus historias de forma dinámica e imparable.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Empieza una historia con una frase al azar.',
      'La siguiente frase DEBE empezar con "Y por eso...".',
      'La siguiente DEBE empezar con "Sin embargo...".',
      'La siguiente DEBE empezar con "Y finalmente...".',
      'Repite el ciclo.'
    ],
    benefit: 'Elimina la monotonía narrativa y hace tus historias más interesantes.'
  },
  {
    id: 'color-description',
    title: 'Describiendo lo Invisible',
    description: 'Mejora tu capacidad de crear imágenes en la mente del otro.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que hablas con alguien ciego de nacimiento.',
      'Describe el color "Rojo" sin usar la palabra rojo ni nombres de objetos rojos.',
      'Describe sensaciones, texturas y emociones.',
      'Habla durante 45 segundos.'
    ],
    benefit: 'Te vuelve un maestro del storytelling visual y sensorial.'
  },
  // 🆕 RESPIRACIÓN (EXTRA PROFESSIONAL)
  {
    id: 'segmented-inhale',
    title: 'Inhalación Fragmentada',
    description: 'Entrena la capacidad de recarga rápida y controlada.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala en 4 pequeños sorbos cortos, como si snifaras.',
      'Mantén 2 segundos.',
      'Exhala en un solo flujo largo y suave.',
      'Siente cómo tus pulmones se llenan por secciones.'
    ],
    benefit: 'Ideal para oradores que hablan rápido y necesitan micro-recargas de aire.'
  },
  {
    id: 'intercostal-expansion',
    title: 'Expansión Intercostal',
    description: 'Abre el "acordeón" de tus costillas para máxima capacidad.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Coloca las manos en tus costillas laterales.',
      'Inhala intentando empujar tus manos hacia los lados, NO hacia adelante.',
      'Siente cómo tu caja torácica se ensancha.',
      'Exhala manteniendo la expansión el mayor tiempo posible.'
    ],
    benefit: 'Libera la presión del pecho y da una voz más profunda y rica.'
  },
  {
    id: 'vacuum-abdominal',
    title: 'Vacío Abdominal (Control)',
    description: 'Fortalece el núcleo del apoyo vocal.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['energyStability', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Exhala todo el aire de tus pulmones.',
      'Sin inhalar, intenta "meter" el ombligo hacia la columna.',
      'Sujeta la contracción 5 segundos.',
      'Relaja e inhala suavemente con el diafragma.'
    ],
    benefit: 'Desarrolla una fuerza abdominal increíble para sostener notas largas o gritos controlados.'
  },
  {
    id: 'humming-breath',
    title: 'Respiración con Resonancia (Hum)',
    description: 'Mezcla aire y sonido para un inicio suave.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability', 'pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala y empieza a soltar el aire con una "M" suave.',
      'Siente la vibración en tus labios y nariz.',
      'Abre la boca hacia una "O" sin dejar de vibrar.',
      'Mantén the flujo constante.'
    ],
    benefit: 'Calienta las cuerdas vocales mientras entrenas el aire.'
  },
  {
    id: 'balloon-blowing',
    title: 'El Globo Imaginario',
    description: 'Resistencia contra el flujo de aire.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Junta los labios dejando solo un pequeño orificio.',
      'Exhala con fuerza como si inflaras un globo muy rígido.',
      'Siente la resistencia en tus mejillas y abdomen.',
      'Descansa e incrementa la duración.'
    ],
    benefit: 'Aumenta la potencia de tu exhalación sin dañar la garganta.'
  },
  {
    id: 'staccato-breathing',
    title: 'Respiración en Staccato',
    description: 'Agilidad diafragmática para ritmos rápidos.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['rhythmConsistency', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala poco aire.',
      'Suelta el aire en golpes cortos y secos haciendo "S! S! S!".',
      'Cada golpe debe venir de un salto del abdomen.',
      'Mantén el ritmo como un metrónomo.'
    ],
    benefit: 'Te da una agilidad verbal asombrosa para discursos dinámicos.'
  },

  // 🆕 ARTICULACIÓN (EXTRA PROFESSIONAL)
  {
    id: 'lip-trill-master',
    title: 'Vibración Labial (Lip Trill)',
    description: 'El calentamiento #1 de los profesionales del mundo.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability', 'pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Une tus labios relajados.',
      'Suelta aire para que vibren como un motor: "Prrrr".',
      'Haz variaciones de tono: sube a agudos y baja a graves.',
      'Si te cuesta, apoya tus dedos en las comisuras de los labios.'
    ],
    benefit: 'Relaja la cara y conecta la respiración con el sonido perfectamente.'
  },
  {
    id: 'soft-palate-lift',
    title: 'Apertura de Paladar Blando',
    description: 'Elimina la voz nasal y gana espacio sonoro.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que vas a empezar a bostezar.',
      'Siente cómo la parte trasera de tu paladar sube.',
      'Di "GUA-GUA-GUA" manteniendo ese espacio abierto.',
      'Siente tu voz más "oscura" y redonda.'
    ],
    benefit: 'Añade un tono aterciopelado y profesional a tu voz.'
  },
  {
    id: 'tongue-stretch-max',
    title: 'Estiramiento Lingual Extremo',
    description: 'Libera la raíz de la lengua para una dicción libre.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Saca la lengua lo máximo posible intentando tocar tu barbilla.',
      'Mantén 5 segundos.',
      'Ahora intenta tocar tu nariz con la punta.',
      'Muévela de lado a lado rápidamente dentro de la boca.'
    ],
    benefit: 'Elimina la tensión que causa el balbuceo.'
  },
  {
    id: 'silent-speech',
    title: 'Articulación Silenciosa',
    description: 'Foco puro en el movimiento muscular.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee un texto en voz alta pero SIN SONIDO.',
      'Exagera los movimientos para que alguien que te lea los labios te entienda.',
      'Pon mucha energía en las consonantes.',
      'Ahora léelo normal y siente la facilidad.'
    ],
    benefit: 'Entrena la memoria muscular para una claridad automática.'
  },
  {
    id: 'phoneme-speed-drill',
    title: 'Taladro de Fonemas Rápidos',
    description: 'Alternancia de zonas de contacto.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad', 'wordsPerMinute'],
    requiredMode: 'AUDIO',
    steps: [
      'Repite: "LA-TA-DA-RA" lo más rápido posible.',
      'Ahora: "PA-BA-MA"',
      'Ahora: "KA-GA-JA"',
      'Combina: "LA-PA-KA-DA" sin trabarte.'
    ],
    benefit: 'Coordina diferentes partes de la boca para hablar a alta velocidad.'
  },
  {
    id: 'accent-marathon',
    title: 'El Maratón de Acentos',
    description: 'Control de sílabas tónicas.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma una palabra larga (ej: "Constantinopla").',
      'Repítela poniendo el acento fuerte en la 1ra sílaba.',
      'Ahora en la 2da, luego en la 3ra, y así hasta el final.',
      'Ej: CÓNS-tan-ti-no-pla, cons-TÁN-ti-no-pla...'
    ],
    benefit: 'Te da un oído rítmico increíble para no sonar monótono.'
  },

  // 🆕 ENTONACIÓN (EXTRA PROFESSIONAL)
  {
    id: 'whispered-authority',
    title: 'Autoridad Susurrada',
    description: 'Gana intensidad sin necesidad de volumen.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability', 'score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Susurra algo importante poniendo mucha presión en el aire.',
      'No dejes que el susurro sea flojo; debe ser "intenso".',
      'Imagina que hablas en secreto pero quieres que te oigan a 5 metros.',
      'Siente la tensión en tu abdomen.'
    ],
    benefit: 'Aprenderás que la autoridad viene de la intención, no del grito.'
  },
  {
    id: 'staircase-pitch',
    title: 'La Escalera de Tonos',
    description: 'Controla el ascenso y descenso melódico.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Di una frase breve.',
      'Repítela subiendo un escalón de tono en cada palabra.',
      'Repítela bajando un escalón en cada palabra.',
      'Hazlo de forma fluida, como si subieras una escalera real.'
    ],
    benefit: 'Evita terminar todas las frases en el mismo tono cansino.'
  },
  {
    id: 'subtext-sarcasm',
    title: 'Juego de Subtextos',
    description: 'Aprende a decir "A" significando "B".',
    category: 'INTONATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Di la frase "Qué buen trabajo hiciste".',
      'Dila con sinceridad total.',
      'Dila con sarcasmo evidente.',
      'Dila con envidia oculta.',
      'Dila como una pregunta de duda.'
    ],
    benefit: 'Te da herramientas para el humor, la ironía y la persuasión sutil.'
  },
  {
    id: 'crescendo-master',
    title: 'Crescendo y Diminuendo',
    description: 'Controla la dinámica de volumen de tu charla.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Empieza un párrafo en un susurro casi inaudible.',
      'Sube el volumen palabra a palabra hasta terminar gritando con poder.',
      'Hazlo a la inversa: de grito a susurro.',
      'Mantén la claridad en ambos extremos.'
    ],
    benefit: 'Crucial para discursos de motivación o ventas con clímax.'
  },
  {
    id: 'echo-imitation',
    title: 'Eco e Imitación de Intención',
    description: 'Expande tu registro imitando otros estilos.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee una frase como un sargento militar.',
      'Repítela como un abuelo contando una historia.',
      'Repítela como una azafata de vuelo.',
      'Busca los matices que hacen diferente a cada uno.'
    ],
    benefit: 'Rompe tus patrones habituales y te hace más versátil.'
  },
  {
    id: 'punctuation-shift',
    title: 'El Peso del Silencio (Puntuación)',
    description: 'Control de pausas gramaticales.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['awkwardSilences', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee un texto respetando rigurosamente las comas (1 seg) y puntos (2 seg).',
      'Ahora ignora las pausas y lee todo seguido.',
      'Nota la falta de sentido.',
      'Vuelve a las pausas pero dándoles mirada intensa.'
    ],
    benefit: 'Le da tiempo a tu audiencia para procesar la información.'
  },

  // 🆕 MENTALIDAD (EXTRA PROFESSIONAL)
  {
    id: 'worst-case-logic',
    title: 'Desmontando el Peor Escenario',
    description: 'Racionaliza el miedo para que deje de ser una amenaza.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Pregúntate: "¿Qué es lo peor que puede pasar Realmente?".',
      '¿Que se rían? ¿Que me equivoque? ¿Seguiré vivo mañana? Sí.',
      'Visualiza ese error y visualízate a ti mismo manejándolo con humor.',
      'Acepta la imperfección.'
    ],
    benefit: 'Quita el peso de la "vida o muerte" a tus presentaciones.'
  },
  {
    id: 'gratitude-shift',
    title: 'Gratitud por la Audiencia',
    description: 'Cambia el miedo por el deseo de ayudar.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'No veas a la audiencia como jueces, sino como personas con problemas.',
      'Siéntete agradecido de que dediquen su tiempo a escucharte.',
      'Internamente diles: "Gracias por estar aquí, voy a intentar serviros".',
      'Siente cómo tu pecho se relaja.'
    ],
    benefit: 'Cambia la energía de "defensa" a "ofrenda", lo cual es carismático.'
  },
  {
    id: 'flow-state-anchor',
    title: 'Ancla del Estado de Flujo',
    description: 'Crea un disparador físico para tu confianza.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Recuerda un momento en que te sentiste increíblemente elocuente.',
      'Cuando sientas esa sensación, presiona tu pulgar con tu dedo índice.',
      'Repite esto varios días.',
      'Antes de hablar, haz el gesto de los dedos para invocar la sensación.'
    ],
    benefit: 'Condicionamiento clásico para entrar en modo "alfa" al instante.'
  },
  {
    id: 'master-mirror-work',
    title: 'Auto-Observación sin Juicio',
    description: 'Acepta tu imagen y voz tal como son.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Graba un video tuyo de 1 minuto hablando.',
      'Míralo 3 veces.',
      '1ra vez: SOLO busca lo que NO te gusta.',
      '2da vez: SOLO busca lo que SÍ haces bien.',
      '3ra vez: Míralo como si fuera un extraño al que quieres ayudar.'
    ],
    benefit: 'Reduce el impacto negativo de la autocrítica destructiva.'
  },
  {
    id: 'pre-success-review',
    title: 'Visualización Retrospectiva',
    description: 'La técnica de los atletas olímpicos aplicada al habla.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Cierra los ojos e imagínate YA terminado el discurso.',
      'Siente el alivio, el éxito y las felicitaciones.',
      'Repasa mentalmente lo bien que fluyó todo "en pasado".',
      'Tu cerebro ahora sentirá que "ya lo ha hecho".'
    ],
    benefit: 'Gana la batalla antes de empezar.'
  },
  {
    id: 'identity-shift',
    title: 'Cambio de Identidad Temporal',
    description: 'Conviértete en el orador que admiras.',
    category: 'MINDSET',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_seguridad', 'pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Elige un orador que admires profundamente (ej: Steve Jobs, Obama).',
      'Pregúntate: "¿Cómo respiraría él ahora mismo?".',
      'Adopta sus micro-gestos y su seguridad por 2 minutos.',
      'Nota cómo tu voz cambia sola al "tomar prestada" su confianza.'
    ],
    benefit: 'Te permite salir de tu zona de confort y explorar nuevos niveles de autoridad.'
  },

  // 🆕 IMPROVISACIÓN (EXTRA PROFESSIONAL)
  {
    id: 'defend-the-indefensible',
    title: 'Defensa de lo Indefendible',
    description: 'Entrena la argumentación bajo presión creativa.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['awkwardSilences', 'score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Reto: Argumenta por qué "Llegar tarde es mejor que llegar puntual".',
      'Tienes 1 minuto para convencer a la audiencia.',
      'Busca beneficios creativos: "Muestra importancia", "Crea expectativa".',
      'No te rías, mantén la seriedad.'
    ],
    benefit: 'Vuelve tu mente ágil para defenderte en debates o críticas.'
  },
  {
    id: 'gibberish-translation',
    title: 'Traductor de Idioma Inventado',
    description: 'Desconecta el juicio racional del discurso.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Habla 20 segundos en un idioma que no exista ("Blah-gah zoo raba...").',
      'Ponle mucha emoción e intención.',
      'De repente, di: "Lo que quise decir con eso es..." y explica la idea en español.',
      'Sigue fluyendo.'
    ],
    benefit: 'Libera tu expresividad natural de las "palabras correctas".'
  },
  {
    id: 'future-news-flash',
    title: 'Noticia del Futuro',
    description: 'Storytelling proyectivo instantáneo.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['fillerCount', 'awkwardSilences'],
    requiredMode: 'AUDIO',
    steps: [
      'Mira un objeto cotidiano (ej: este bolígrafo).',
      'Imagina que estamos en el año 2150.',
      'Cuéntanos durante 45 segundos cómo ese objeto cambió la historia de la humanidad.',
      'Ponle fechas y nombres de científicos inventados.'
    ],
    benefit: 'Entrena la capacidad de crear narrativas coherentes de la nada.'
  },
  {
    id: 'why-game-creative',
    title: 'El Juego del Por Qué Infinito',
    description: 'Profundiza en tus argumentos de forma espontánea.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Haz una afirmación simple: "El café es bueno".',
      'Auto-pregúntate: "¿Por qué?". Respóndelo.',
      'Vuelve a preguntar: "¿Y por qué eso es así?".',
      'Llega hasta 5 niveles de profundidad sin detenerte.'
    ],
    benefit: 'Ideal para oratoria corporativa donde debes justificar ideas.'
  },
  {
    id: 'character-spin',
    title: 'Salto de Personajes',
    description: 'Versatilidad emocional aplicada a un mismo tema.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange', 'score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Elige un tema serio: "La importancia del ahorro".',
      'Empieza a hablar de ello.',
      'Cada 15 segundos, cambia el "personaje": Sacerdote, Rockstar, Detective, Niño.',
      'No dejes de hablar del tema original.'
    ],
    benefit: 'Te vuelve un comunicador magnético capaz de adaptarse a cualquier público.'
  },
  {
    id: 'metaphor-machine',
    title: 'La Máquina de Metáforas',
    description: 'Explica lo complejo de forma sencilla y visual.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma un concepto difícil (ej: "La inflación", "El software").',
      'Explícalo usando una metáfora de pesca, de cocina o de fútbol.',
      'Tienes 45 segundos.',
      'Asegúrate de que la comparación sea visual.'
    ],
    benefit: 'Es la herramienta #1 de los mejores comunicadores: simplificar lo complejo.'
  },
  // 🆕 RESPIRACIÓN (MÓDULO MAESTRÍA)
  {
    id: 'ribcase-isolation',
    title: 'Aislamiento Intercostal',
    description: 'Controla la expansión lateral de tus costillas para un aire infinito.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Envuelve tus costillas inferiores con una banda elástica o tus manos.',
      'Inhala intentando expandir la banda hacia los lados, sin subir los hombros.',
      'Mantén la expansión mientras cuentas hasta 5.',
      'Exhala lentamente sin que las costillas colapsen de golpe.'
    ],
    benefit: 'Ganas una reserva de aire que te permite hablar en frases largas sin fatiga.'
  },
  {
    id: 'vocal-fry-connection',
    title: 'Conexión desde el Vocal Fry',
    description: 'Encuentra tu resonancia más profunda y relajada.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Empieza con un sonido de "puerta crujiendo" (Vocal Fry) muy relajado.',
      'Poco a poco, añade más aire hasta que el crujido se convierta en una vocal clara.',
      'Siente cómo el sonido nace desde muy abajo, sin tensión en la garganta.',
      'Repite con diferentes vocales: A, E, O.'
    ],
    benefit: 'Elimina la voz "apretada" y te da un tono de autoridad natural.'
  },
  {
    id: 'counting-one-breath',
    title: 'Maratón de Números',
    description: 'Entrena la eficiencia máxima del aire gastado.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala profundamente por la nariz.',
      'Empieza a contar en voz alta: 1, 2, 3... con volumen moderado.',
      'Llega lo más lejos que puedas con UNA sola exhalación.',
      'Apunta tu récord y trata de superarlo sin forzar.'
    ],
    benefit: 'Te vuelve consciente de cuánta energía desperdicias en cada palabra.'
  },
  {
    id: 'straw-pressure',
    title: 'Presión con Pajita (Voz de Paja)',
    description: 'Técnica de rehabilitación y potencia usada por cantantes de ópera.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['energyStability', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma una pajita de beber y colócala en un vaso con poca agua.',
      'Haz burbujas constantes emitiendo un sonido suave ("Uuuh").',
      'Mantén las burbujas rítmicas y el sonido estable.',
      'La resistencia del agua entrena tu diafragma de forma segura.'
    ],
    benefit: 'Protege tus cuerdas vocales y aumenta tu potencia muscular.'
  },
  {
    id: 'suspension-drill',
    title: 'La Suspensión del Aliento',
    description: 'Control de la glotis para un inicio de frase limpio.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala y detén el aire SIN cerrar la garganta (mantén la boca abierta).',
      'Siente cómo tus músculos mantienen el aire simplemente por postura.',
      'Sostén 10 segundos.',
      'Suelta el aire suavemente.'
    ],
    benefit: 'Evita los "golpes de glotis" (sonidos secos al empezar a hablar).'
  },
  {
    id: 'sigh-of-relief',
    title: 'Suspiro de Alivio Sonoro',
    description: 'Libera la tensión acumulada en el pecho y hombros.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala profundamente subiendo ligeramente los hombros.',
      'Suelta todo el aire de golpe con un sonido "HAAAAA".',
      'Deja que los hombros caigan pesadamente.',
      'Siente la relajación instantánea.'
    ],
    benefit: 'El mejor ejercicio para resetear el estrés antes de subir al escenario.'
  },

  // 🆕 ARTICULACIÓN (MÓDULO MAESTRÍA)
  {
    id: 'consonant-clusters',
    title: 'Clusters de Consonantes',
    description: 'Doma las combinaciones de letras más difíciles del idioma.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Repite 5 veces: "Transgresor, Obstrucción, Adscripción".',
      'Exagera el sonido de cada consonante sin saltarte ninguna.',
      'Hazlo cada vez más rápido.',
      'Asegúrate de que la última letra de la palabra se escuche clara.'
    ],
    benefit: 'Evita que tus palabras suenen cortadas o incompletas.'
  },
  {
    id: 'vertical-mouth-opening',
    title: 'Apertura Vertical Consciente',
    description: 'Cambia la forma de tu boca para una mejor resonancia.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume', 'score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Coloca dos dedos (uno encima de otro) entre tus dientes.',
      'Intenta decir "Hablar con claridad es mi meta".',
      'Quita los dedos y trata de mantener esa misma apertura vertical.',
      'No hables con los labios "estirados" hacia los lados.'
    ],
    benefit: 'Aumenta el volumen natural de tu voz sin necesidad de gritar.'
  },
  {
    id: 'tongue-tip-precision',
    title: 'Punta de Lengua Ágil (T-D-L-N)',
    description: 'Enfoca la energía en la parte delantera de la boca.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Di rápido: "Todo el día la luna ilumina la lona".',
      'Siente el golpe de la lengua justo detrás de los dientes superiores.',
      'Mantén la mandíbula lo más quieta posible, que trabaje solo la lengua.',
      'Aumenta la velocidad rítmicamente.'
    ],
    benefit: 'Ganas una dicción afilada y profesional.'
  },
  {
    id: 'nasal-contrast-drill',
    title: 'Filtro Anti-Nasalidad',
    description: 'Aprende a diferenciar el aire que va por la nariz del que va por la boca.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Tápate la nariz con los dedos.',
      'Di "A-E-I-O-U". El sonido NO debería cambiar si lo haces bien.',
      'Ahora di "M-N-Ñ". Aquí sí debes sentir presión.',
      'Alterna frases normales intentando que no suenen nasales.'
    ],
    benefit: 'Voz mucho más limpia, clara y agradable de escuchar.'
  },
  {
    id: 'rap-enunciation',
    title: 'Enunciación Velocista (Modo Rap)',
    description: 'Usa el ritmo musical para forzar tu agilidad mental y física.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['wordsPerMinute', 'score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma la letra de una canción rápida o un texto complejo.',
      'Léelo siguiendo un metrónomo a 100 BPM.',
      'Sube a 120 BPM, luego a 140 BPM.',
      'No se vale sacrificar ni una sola sílaba por la velocidad.'
    ],
    benefit: 'Tu cerebro se acostumbra a procesar fonemas a alta velocidad.'
  },
  {
    id: 'technical-jargon-marathon',
    title: 'El Maratón de Tecnicismos',
    description: 'Prepárate para términos complejos sin titubear.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad', 'fillerCount'],
    requiredMode: 'AUDIO',
    steps: [
      'Crea una lista de 10 palabras largas (ej: "Desoxirribonucleico", "Electroencefalografista").',
      'Léelas en orden inverso.',
      'Dilas alternando una palabra susurrada y una palabra gritada.',
      'Agrúpalas de tres en tres con una sola respiración.'
    ],
    benefit: 'Te da una confianza total ante cualquier léxico difícil.'
  },

  // 🆕 ENTONACIÓN (MÓDULO MAESTRÍA)
  {
    id: 'narrative-arc-drill',
    title: 'El Arco del Narrador',
    description: 'Da estructura emocional a tu historia desde la voz.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Inicio: Tono medio-bajo, pausado, creando curiosidad.',
      'Nudo: Sube el tono, aumenta la velocidad, proyecta urgencia.',
      'Clímax: Volumen máximo, voz firme.',
      'Final: Tono bajo, muy lento, dejando una enseñanza.'
    ],
    benefit: 'Mantiene a la audiencia hipnotizada de principio a fin.'
  },
  {
    id: 'certainty-vs-doubt',
    title: 'Contraste Certeza vs Duda',
    description: 'Controla cómo el tono afecta tu credibilidad.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['fallingIntonationScore', 'score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Di: "Este es el mejor camino para nosotros".',
      'Dilo subiendo el tono al final (suena a pregunta/duda).',
      'Dilo bajando el tono al final (suena a orden/certeza).',
      'Repite 10 veces el tono descendente hasta que sea natural.'
    ],
    benefit: 'Esencial para líderes. La entonación descendente proyecta autoridad.'
  },
  {
    id: 'strategic-pause-impact',
    title: 'La Pausa de Impacto Psicológico',
    description: 'Aprende que el silencio comunica más que las palabras.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['awkwardSilences', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Di una frase potente (ej: "Mañana todo va a cambiar").',
      'Quédate en silencio total 3 segundos mirando a la cámara/audiencia.',
      'Siente la tensión del silencio.',
      'Sigue hablando con un tono más suave.'
    ],
    benefit: 'Obligas a la audiencia a reflexionar sobre lo que acabas de decir.'
  },
  {
    id: 'reading-villain-gravitas',
    title: 'Gravitas de Villano',
    description: 'Encuentra tu peso vocal y control absoluto.',
    category: 'INTONATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee un texto con un tono muy profundo, lento y calculador.',
      'No demuestres emoción, solo control puro.',
      'Alarga las consonantes "M", "N" y "S".',
      'Mantén el volumen bajo pero la intensidad alta.'
    ],
    benefit: 'Te ayuda a encontrar tu registro grave, que transmite confianza y poder.'
  },
  {
    id: 'up-talk-correction',
    title: 'Eliminador de Up-Talk',
    description: 'Corrige el vicio de terminar frases como si preguntaras.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['fallingIntonationScore'],
    requiredMode: 'AUDIO',
    steps: [
      'Graba 30 segundos de habla espontánea.',
      'Detecta cuántas frases terminaron hacia arriba sin ser preguntas.',
      'Repite esas frases forzando el final hacia abajo, como si golpearas una mesa.',
      'Siente la diferencia en la firmeza de tu mensaje.'
    ],
    benefit: 'Ganas una imagen de experto y alguien que sabe de lo que habla.'
  },
  {
    id: 'rhythmic-poetry-flow',
    title: 'Flujo Poético y Rítmico',
    description: 'Usa la cadencia para hacer tu discurso memorable.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma un texto con rima o ritmo marcado.',
      'Léelo exagerando las pausas rítmicas.',
      'Ahora lee un texto corporativo intentando aplicarle esa misma "musicalidad".',
      'No dejes que el ritmo se vuelva monótono.'
    ],
    benefit: 'Hace que tus presentaciones no sean aburridas y se sientan más fluidas.'
  },

  // 🆕 MENTALIDAD (MÓDULO MAESTRÍA)
  {
    id: 'self-compassion-reset',
    title: 'Recuperación ante el Error',
    description: 'Entrena a tu cerebro para no bloquearse tras un fallo.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Equivócate a propósito mientras hablas.',
      'Respira, sonríe y di una frase de transición: "Lo que realmente quería decir es...".',
      'Sigue con la misma energía. No te castigues mentalmente.',
      'Repite 5 veces.'
    ],
    benefit: 'Elimina el miedo paralizante a cometer errores en público.'
  },
  {
    id: 'audience-avatar-empathy',
    title: 'Conexión por Empatía',
    description: 'Deja de ver a la audiencia como jueces y míralos como aliados.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Antes de hablar, elige a una persona imaginaria que necesite mucho tu ayuda.',
      'Visualiza sus problemas y cómo tu mensaje los soluciona.',
      'Siente el deseo sincero de ayudarlos.',
      'Habla desde ese sentimiento de contribución.'
    ],
    benefit: 'La ansiedad social disminuye cuando el foco sale de ti y va hacia el otro.'
  },
  {
    id: 'room-reclamation',
    title: 'Reclamación del Espacio Físico',
    description: 'Adueñate del lugar antes de decir la primera palabra.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Camina por todo el escenario o habitación donde vas a hablar.',
      'Toca las paredes o muebles rítmicamente.',
      'Ponte en el centro y respira profundo mirando a las esquinas superiores.',
      'Declara mentalmente: "Este es mi espacio".'
    ],
    benefit: 'Reduce el sentimiento de "invasor" y te da aplomo físico.'
  },
  {
    id: 'eye-contact-comfort',
    title: 'Comodidad en la Mirada',
    description: 'Sostiene la conexión visual sin sentirte intimidado.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Mírate al espejo y sostén tu propia mirada durante 2 minutos.',
      'No parpadees en exceso. Mantén una expresión amable.',
      'Practica hablar mientras mantienes la mirada fija en tus propios ojos.',
      'Siente la seguridad que proyectas.'
    ],
    benefit: 'Ganas una presencia magnética y honesta.'
  },
  {
    id: 'inner-critic-humor',
    title: 'Humor contra el Crítico Interno',
    description: 'Desactiva la voz negativa personificándola.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Identifica tu pensamiento negativo recurrente (ej: "Lo vas a hacer mal").',
      'Ponle una voz ridícula (como de dibujo animado) a ese pensamiento.',
      'Repítelo con esa voz absurda hasta que te rías.',
      'Siente cómo pierde poder sobre ti.'
    ],
    benefit: 'Te quita la presión psicológica y te devuelve el control emocional.'
  },
  {
    id: 'energy-transfer-visual',
    title: 'Visualización de Transferencia de Energía',
    description: 'Tu voz no son palabras, es energía positiva.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que de tu pecho sale una luz que envuelve a toda la audiencia.',
      'Cada palabra que dices hace esa luz más brillante.',
      'Siente el calor de esa luz mientras hablas.',
      'Observa cómo la audiencia se ilumina con tu mensaje.'
    ],
    benefit: 'Aumenta tu carisma y la pasión con la que hablas.'
  },

  // 🆕 IMPROVISACIÓN (MÓDULO MAESTRÍA)
  {
    id: 'one-word-story-chain',
    title: 'Cadena de Historias Instantánea',
    description: 'Entrena la fluidez conectando ideas aleatorias.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['awkwardSilences', 'fillerCount'],
    requiredMode: 'AUDIO',
    steps: [
      'Pide 3 palabras al azar (ej: "Zapatilla", "Libertad", "Nube").',
      'Crea una historia de 45 segundos que incluya las tres de forma lógica.',
      'No te detengas a pensar. Lánzate a la primera idea.',
      'Termina con una conclusión potente.'
    ],
    benefit: 'Te vuelve imparable ante preguntas inesperadas.'
  },
  {
    id: 'objection-handling-live',
    title: 'El Abogado del Diablo',
    description: 'Prepárate para las críticas más duras en tiempo real.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_seguridad', 'awkwardSilences'],
    requiredMode: 'AUDIO',
    steps: [
      'Di una idea en la que creas mucho.',
      'Inmediatamente, plantéate la objeción más difícil que alguien pueda decirte.',
      'Respóndela con calma, educación y datos durante 30 segundos.',
      'Mantén tu postura corporal abierta.'
    ],
    benefit: 'Ganas una agilidad mental suprema para debates y ventas.'
  },
  {
    id: 'transition-bridge-master',
    title: 'Maestro de Puentes y Transiciones',
    description: 'Nunca más digas "ehh..." mientras piensas qué sigue.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['fillerCount'],
    requiredMode: 'AUDIO',
    steps: [
      'Practica usar frases conectoras: "Y esto nos lleva a un punto clave...", "Si analizamos esto desde otra perspectiva...", "Lo que esto significa para ustedes es...".',
      'Habla de un tema A y usa un "puente" para pasar a un tema B totalmente diferente.',
      'Hazlo sonar natural y fluido.'
    ],
    benefit: 'Eliminas las muletillas y haces que tu discurso parezca mucho más profesional.'
  },
  {
    id: 'random-object-pitch',
    title: 'Pitch de Objeto Aleatorio',
    description: 'Vende lo que sea para entrenar tu creatividad persuasiva.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['volume', 'pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma el primer objeto que veas a tu izquierda.',
      'Tienes 30 segundos para convencernos de que es el invento del siglo.',
      'Usa una estructura: Gancho -> Problema -> Solución -> Llamada a la acción.',
      'Dilo con pasión absoluta.'
    ],
    benefit: 'Desarrolla el músculo de la persuasión rápida y el carisma.'
  },
  {
    id: 'yes-and-speech',
    title: 'La Mentalidad del "Sí, y además..."',
    description: 'Acepta cualquier situación y constrúye sobre ella.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['awkwardSilences'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina una situación negativa (ej: "Se cortó el proyector").',
      'Empieza tu frase con "Sí, y además esto es genial porque ahora puedo hablarles más de cerca...".',
      'Sigue construyendo positivamente sobre cualquier imprevisto.',
      'No niegues la realidad, úsala.'
    ],
    benefit: 'Te vuelve un orador todoterreno que brilla bajo presión.'
  },
  {
    id: 'child-explanation-challenge',
    title: 'Explícaselo a un Niño de 5 Años',
    description: 'La prueba máxima de claridad y síntesis.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma un concepto de tu trabajo (ej: "Blockchain", "Logística").',
      'Explícalo en 45 segundos usando palabras sencillas, colores y ejemplos cotidianos.',
      'Evita cualquier palabra técnica.',
      'Si el niño (imaginario) lo entiende, has tenido éxito.'
    ],
    benefit: 'Simplifica tu mensaje para que sea masivo y poderoso.'
  },

  // 🆕 PROYECCIÓN Y PRESENCIA (MÓDULO MAESTRÍA)
  {
    id: 'wall-bounce-projection',
    title: 'Rebote de Voz en la Pared',
    description: 'Siente físicamente cómo tu voz llena el espacio.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Ponte frente a una pared a 2 metros.',
      'Di "¡HOLA!" y trata de sentir la vibración del sonido regresando a ti.',
      'Aléjate 2 metros más y repite subiendo el apoyo abdominal, no la garganta.',
      'Visualiza el sonido golpeando la pared y volviendo.'
    ],
    benefit: 'Te da una presencia sonora imponente sin esfuerzo.'
  },

  // 🆕 RELAJACIÓN (MÓDULO MAESTRÍA)
  {
    id: 'yawn-release-throat',
    title: 'Bostezo Provocado (Apertura)',
    description: 'La forma más rápida de relajar la garganta apretada.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Abre la boca e imita un bostezo grande y profundo.',
      'Siente cómo la laringe baja y la garganta se ensancha.',
      'Al final del bostezo, emite un sonido "Aaaaa" muy suave.',
      'Repite 3 veces.'
    ],
    benefit: 'Elimina el "nudo en la garganta" antes de hablar.'
  },
  {
    id: 'rag-doll-spinal-release',
    title: 'La Muñeca de Trapo',
    description: 'Libera la tensión de toda la columna y cuello.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Ponte de pie y deja caer la cabeza hacia adelante lentamente.',
      'Sigue bajando vértebra por vértebra hasta que tus manos cuelguen cerca del suelo.',
      'Sacude los brazos y la cabeza suavemente.',
      'Sube muy lento, lo último que sube es la cabeza.'
    ],
    benefit: 'Relajación corporal corporal que libera la voz.'
  },
  {
    id: 'lion-face-stretch',
    title: 'Cara de León (Estiramiento Facial)',
    description: 'Despierta todos los músculos de tu cara.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Abre la boca al máximo, saca la lengua y abre mucho los ojos.',
      'Mantén 3 segundos.',
      'Ahora arruga toda la cara como si hubieras comido un limón muy ácido.',
      'Alterna 5 veces.'
    ],
    benefit: 'Mejora la expresividad facial y relaja la mandíbula.'
  },
  {
    id: 'shoulder-rolls-release',
    title: 'Rotación de Hombros Antiestrés',
    description: 'Libera el peso del mundo de tu dicción.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Sube los hombros hasta las orejas e inhala.',
      'Suéltalos de golpe mientras exhalas con un sonido "Fff".',
      'Haz círculos lentos hacia atrás, sintiendo cómo se abren las escápulas.',
      'Siente tus brazos pesados.'
    ],
    benefit: 'Mejora la postura y la libertad respiratoria.'
  },
  {
    id: 'tongue-root-massage',
    title: 'Masaje de Raíz de Lengua',
    description: 'Libera la tensión interna que nadie ve pero todos escuchan.',
    category: 'RELAXATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Con tus pulgares, presiona suavemente el área blanda debajo de tu barbilla.',
      'Mueve los dedos en círculos pequeños.',
      'Trata de tragar saliva mientras masajeas.',
      'Si notas dolor, es que tienes mucha tensión acumulada: masajea más suave.'
    ],
    benefit: 'Voz más fluida y menos cansancio al hablar mucho tiempo.'
  },
  {
    id: 'gentle-neck-tilts',
    title: 'Inclinaciones de Cuello Suaves',
    description: 'Flexibilidad para que tu voz no se bloquee.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Lleva tu oreja derecha al hombro derecho (sin subir el hombro).',
      'Mantén 10 segundos respirando profundo.',
      'Repite en el lado izquierdo.',
      'Dibuja un semicírculo con la barbilla de hombro a hombro.'
    ],
    benefit: 'Libera las vías por donde pasa el sonido, dándote más claridad.'
  },

  // 🆕 EXTRAS PROFESIONALES (MÓDULO MAESTRÍA)
  {
    id: 'microphone-awareness',
    title: 'Uso del Micrófono (Imaginario)',
    description: 'Domina la tecnología para que trabaje a tu favor.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que tienes un micrófono de mano a 3 dedos de tu boca.',
      'No muevas la cabeza hacia los lados sin mover el micrófono.',
      'Habla con un volumen más bajo de lo habitual pero manteniendo la energía.',
      'Evita las "P" explosivas que golpean el micro.'
    ],
    benefit: 'Te verás como un profesional total en cualquier evento con sonido.'
  },
  {
    id: 'teleprompter-flow',
    title: 'Fluidez con Teleprompter (Lectura Natural)',
    description: 'Aprende a leer sin parecer que estás leyendo.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma un texto y léelo intentando no mover los ojos de lado a lado bruscamente.',
      'Mantén la mirada en el centro y usa tu visión periférica.',
      'Añade gestos y pausas que no están en el texto.',
      'Hazlo personal.'
    ],
    benefit: 'Vital para videos, presentaciones online y discursos formales.'
  },
  {
    id: 'staircase-argumentation',
    title: 'Argumentación en Escalera',
    description: 'Construye razones que se vuelven más fuertes cada vez.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_seguridad', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Plantea un objetivo (ej: "Debemos invertir en este proyecto").',
      'Da la Razón 1 (buena).',
      'Da la Razón 2 (mejor).',
      'Da la Razón 3 (irrefutable).',
      'Cierra con un "Y por eso no hay otra opción".'
    ],
    benefit: 'Estructura tu pensamiento para ser lógicamente imbatible.'
  },
  {
    id: 'active-listening-response',
    title: 'Respuesta por Escucha Activa',
    description: 'Improvisa basándote en lo que el otro acaba de decir.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que alguien te hace una pregunta larga.',
      'Empieza tu respuesta resumiendo lo que él dijo: "Lo que entiendo es que te preocupa X...".',
      'Conecta eso con tu solución.',
      'Mantén contacto visual durante todo el proceso.'
    ],
    benefit: 'Ganas una autoridad enorme al mostrar que valoras al interlocutor.'
  },
  {
    id: 'vocal-punctuation-master',
    title: 'Maestría en Puntuación Vocal',
    description: 'Tus silencios y tonos deben sustituir a las comas y puntos.',
    category: 'INTONATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['rhythmConsistency', 'fallingIntonationScore'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee una frase larga sin ninguna coma.',
      'Ahora léela creando tú las pausas donde creas que hay más impacto.',
      'Usa un tono ascendente para una coma y descendente para un punto.',
      'Cambia el significado de la frase solo cambiando las pausas.'
    ],
    benefit: 'Haces que lo complejo sea fácil de seguir para quien te escucha.'
  },
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH 1: PROJECTION (Proyección)
  // -------------------------------------------------------------------------
  {
    id: 'far-throw',
    title: 'El Lanzador de Voz',
    description: 'Imagina que tu voz es una pelota que debes lanzar lejos.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Mira un objeto a 2 metros y di "Ahí estás".',
      'Mira uno a 5 metros y "lánzale" la frase.',
      'Mira uno a 10 metros y haz lo mismo.',
      'No grites, solo aumenta la intención del lanzamiento.'
    ],
    benefit: 'Aprendes a ajustar tu volumen intuitivamente según la distancia.'
  },
  {
    id: 'stage-whisper',
    title: 'El Susurro Escénico',
    description: 'La técnica teatral para susurrar pero que se oiga en la última fila.',
    category: 'PROJECTION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Usa mucho aire pero poca cuerda vocal.',
      'Articula exageradamente cada consonante.',
      'Proyecta el aire hacia adelante con fuerza abdominal.',
      'Debe sonar intenso y urgente, no débil.'
    ],
    benefit: 'Crea una intimidad poderosa que atrapa la atención total.'
  },
  {
    id: 'laser-voice',
    title: 'Voz Láser',
    description: 'Concentra tu sonido en un haz fino y potente.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina un punto rojo saliendo de tu boca.',
      'Apunta a un lugar específico de la pared.',
      'Di una vocal "Eeeee" intentando "quemar" ese punto con tu sonido.',
      'Siente la vibración en los dientes frontales.'
    ],
    benefit: 'Consigues un sonido penetrante que corta el ruido ambiente.'
  },
  {
    id: 'expanding-sphere',
    title: 'La Esfera Expansiva',
    description: 'Llena el espacio a tu alrededor en 360 grados.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina una burbuja alrededor de ti que crece.',
      'Di "Oooooh" mientras separas los brazos.',
      'Visualiza tu voz llenando cada rincón de la habitación.',
      'Siente la vibración en tu espalda y pecho, no solo delante.'
    ],
    benefit: 'Tu presencia sonora se vuelve envolvente y carismática.'
  },
  {
    id: 'ka-power',
    title: 'El Golpe "KA"',
    description: 'Activa tu diafragma con sonidos plosivos.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Pon la mano en el abdomen.',
      'Di "KA!" fuerte y seco.',
      'Siente el golpe hacia afuera en tu mano.',
      'Repite "KA-KA-KA" con ritmo militar.'
    ],
    benefit: 'Conecta inmediatamente tu motor de potencia (diafragma).'
  },
  {
    id: 'humming-rocket',
    title: 'El Cohete de Vibración',
    description: 'Sube la energía desde el pecho a la cabeza.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Empieza con un "Mmmm" grave en el pecho.',
      'Sube el tono y la intensidad gradualmente como un cohete despegando.',
      'Termina en un agudo brillante apuntando al techo.',
      'Abre la boca en "Ah!" al final.'
    ],
    benefit: 'Despierta todos tus resonadores para una voz rica en armónicos.'
  },
  {
    id: 'calling-taxi',
    title: 'Llamando al Taxi',
    description: 'Practica el volumen máximo seguro.',
    category: 'PROJECTION',
    difficulty: 'ADVANCED',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que estás en una calle ruidosa de Nueva York.',
      'Necesitas parar un taxi a 20 metros.',
      'Grita "¡HEY!" desde el estómago, no desde la garganta.',
      'El cuello debe estar relajado, toda la fuerza viene de abajo.'
    ],
    benefit: 'Pierdes el miedo a usar tu máxima potencia.'
  },
  {
    id: 'laughing-yoga',
    title: 'Risa Diafragmática',
    description: 'La forma más natural de proyectar.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Finge una risa grave: "Jo, jo, jo".',
      'Siente cómo se mueve tu abdomen.',
      'Hazlo más fuerte y suelto.',
      'Convierte la risa en vocales: "Jo-Jo-Jooooooo".'
    ],
    benefit: 'Libera tensiones y coloca la voz en su lugar natural.'
  },
  {
    id: 'masked-hero',
    title: 'El Héroe Enmascarado',
    description: 'Proyecta a través de una barrera.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Cúbrete la boca con la mano o una tela.',
      'Intenta hablar y que se te entienda perfectamente a 3 metros.',
      'Tendrás que articular y proyectar el doble.',
      'Quita la mano y siente la facilidad.'
    ],
    benefit: 'Entrenamiento de resistencia para claridad y volumen.'
  },
  {
    id: 'vocal-darts',
    title: 'Dardos Vocales',
    description: 'Precisión y velocidad en la proyección.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Elige 3 puntos distintos en la habitación.',
      'Lanza una palabra corta a cada uno en rápida sucesión.',
      '"Tú." (Punto 1) -> "Ven." (Punto 2) -> "Ya." (Punto 3).',
      'Cada palabra debe dar en el blanco.'
    ],
    benefit: 'Mejora la direccionalidad y agilidad de tu potencia.'
  },
  {
    id: 'reverse-megaphone',
    title: 'El Megáfono Humano',
    description: 'Usa tus manos para amplificar.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Coloca tus manos alrededor de tu boca como un megáfono.',
      'Habla hacia una esquina de la habitación.',
      'Siente cómo el sonido rebota y vuelve a ti.',
      'Intenta replicar ese sonido sin las manos.'
    ],
    benefit: 'Te enseña cómo la acústica afecta a tu voz.'
  },
  {
    id: 'floor-vibration',
    title: 'Vibración de Suelo',
    description: 'Proyecta hacia abajo para ganar cuerpo.',
    category: 'PROJECTION',
    difficulty: 'ADVANCED',
    targetMetrics: ['energyStability', 'pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Acuéstate en el suelo boca arriba.',
      'Canta una nota grave "Ooooo".',
      'Intenta sentir la vibración en el suelo a través de tu espalda.',
      'Aumenta el volumen hasta que "tiemble" el piso.'
    ],
    benefit: 'Conecta tu voz con todo tu cuerpo para máxima resonancia.'
  },
  {
    id: 'silent-scream',
    title: 'El Grito Silencioso',
    description: 'Abre la garganta sin emitir sonido.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Abre la boca como si fueras a gritar con todas tus fuerzas.',
      'Contrae el abdomen.',
      'Pero solo deja salir un suspiro de aire caliente.',
      'Memoriza esa apertura de garganta para cuando hables fuerte.'
    ],
    benefit: 'Evita que la garganta se cierre al subir el volumen.'
  },
  {
    id: 'echo-finder',
    title: 'Buscador de Eco',
    description: 'Juega con la acústica del lugar.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Da una palmada fuerte para escuchar el eco de la sala.',
      'Intenta llenar ese mismo espacio con una palabra: "¡HOLA!".',
      'Escucha si tu voz genera el mismo eco que la palmada.',
      'Ajusta hasta conseguirlo.'
    ],
    benefit: 'Desarrolla tu oído para adaptar tu voz a la sala.'
  },
  {
    id: 'staircase-volume',
    title: 'Volumen en Escalera',
    description: 'Control gradual de intensidad.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Cuenta del 1 al 10.',
      '1 es un susurro, 10 es un grito.',
      'Sube un escalón de volumen exacto con cada número.',
      'No saltes del 3 al 8. Controla los medios (4, 5, 6).'
    ],
    benefit: 'Te da control fino sobre tu "perilla de volumen".'
  },
  {
    id: 'outdoor-speaking',
    title: 'Oratoria al Aire Libre',
    description: 'Vence la falta de rebote acústico.',
    category: 'PROJECTION',
    difficulty: 'ADVANCED',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Si puedes, ve a un espacio abierto (o imagínalo).',
      'No hay paredes que te devuelvan el sonido.',
      'Tienes que trabajar el doble.',
      'Visualiza que tu voz viaja hasta el horizonte.'
    ],
    benefit: 'El entrenamiento más duro para la proyección pura.'
  },
  {
    id: 'emotional-shout',
    title: 'El Grito Emocional',
    description: 'Proyecta emoción, no solo ruido.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Grita "¡BASTA!" con enojo.',
      'Grita "¡GOL!" con alegría.',
      'Grita "¡AYUDA!" con miedo.',
      'Nota cómo cambia tu cuerpo con cada intención.'
    ],
    benefit: 'Conecta la potencia con el sentimiento para no sonar agresivo siempre.'
  },
  {
    id: 'reading-to-sleeping',
    title: 'Leyendo al Dormido',
    description: 'Proyección suave pero firme.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina a alguien durmiendo al otro lado de la sala.',
      'Quieres hablarle sin despertarlo, pero que te oiga en sus sueños.',
      'Usa un tono hipnótico y proyectado pero suave.',
      'Mantén la intensidad constante.'
    ],
    benefit: 'Domina la proyección "sutil" para momentos solemnes.'
  },
  {
    id: 'chest-thump',
    title: 'Golpe de Pecho (Gorila)',
    description: 'Despierta la resonancia pectoral.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Haz un sonido grave "Mmmmm".',
      'Golpea suavemente tu pecho con los puños (estilo Tarzán).',
      'Siente cómo se entrecorta y vibra la voz.',
      'Intenta mantener la vibración sin golpear.'
    ],
    benefit: 'Activa el resonador más grande del cuerpo (el pecho).'
  },
  {
    id: 'distant-friend',
    title: 'El Amigo Lejano',
    description: 'Saludando a alguien en la otra acera.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina ver a tu amigo cruzando la avenida.',
      'Grita "¡Adiós!" alargando las vocales.',
      'Haz el gesto con la mano al mismo tiempo.',
      'El gesto ayuda a impulsar la voz.'
    ],
    benefit: 'Sincroniza cuerpo y voz para mayor alcance.'
  },
  {
    id: 'mask-resonance',
    title: 'Resonancia de Máscara',
    description: 'Coloca la voz en la parte frontal del rostro.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Sonríe exageradamente mostrando dientes.',
      'Di "Nñññññiii" sintiendo vibrar la nariz.',
      'Manteniendo esa sensación, di "Mañana nos vemos".',
      'Tu voz brillará y cortará el aire sin esfuerzo.'
    ],
    benefit: 'Proyección brillante que no cansa las cuerdas.'
  },
  {
    id: 'back-row-focus',
    title: 'Foco en la Última Fila',
    description: 'Mentalidad para teatros o salas grandes.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Ignora la primera fila.',
      'Habla exclusivamente para la persona que está sentada al fondo.',
      'Si él te oye, todos te oyen.',
      'Eleva la barbilla ligeramente.'
    ],
    benefit: 'Garantiza cobertura total de la audiencia.'
  },
  {
    id: 'abdominal-bounce',
    title: 'Rebote Abdominal',
    description: 'Agilidad y potencia rítmica.',
    category: 'PROJECTION',
    difficulty: 'ADVANCED',
    targetMetrics: ['rhythmConsistency', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Di "Ho-Ho-Ho" muy rápido.',
      'Cada "Ho" debe ser un rebote del estómago.',
      'No muevas el pecho ni hombros.',
      'Aumenta la velocidad sin perder volumen.'
    ],
    benefit: 'Proyección dinámica para discursos energéticos.'
  },
  {
    id: 'siren-call',
    title: 'La Sirena',
    description: 'Estira el rango de proyección.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imita el sonido de una sirena de ambulancia "Wiuuuu-WIUUUU".',
      'Empieza suave y grave.',
      'Sube a fuerte y agudo.',
      'Siente cómo el sonido viaja lejos en los agudos.'
    ],
    benefit: 'Flexibilidad total para proyectar en cualquier tono.'
  },
  {
    id: 'candle-distance',
    title: 'Apagar Velas a Distancia',
    description: 'Control de flujo de aire dirigido.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Pon un dedo frente a ti (tu vela).',
      'Sopla suave para apagarla a 10cm.',
      'Aleja el dedo a 30cm y sopla más fuerte.',
      'Aleja el dedo al máximo y usa todo tu aire.'
    ],
    benefit: 'Entrena la presión de aire necesaria para cada distancia.'
  },
  {
    id: 'open-throat-yawn',
    title: 'Bostezo de León',
    description: 'Máxima apertura para máximo sonido.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Bosteza ampliamente haciendo ruido "Aaaah".',
      'Siente el espacio enorme en tu garganta.',
      'Intenta hablar manteniendo esa sensación de espacio.',
      'Tu voz sonará enorme.'
    ],
    benefit: 'Elimina la voz "apretada" y pequeña.'
  },
  {
    id: 'consonant-launchpad',
    title: 'Plataforma de Consonantes',
    description: 'Usa las consonantes para impulsar las vocales.',
    category: 'PROJECTION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'En la palabra "POPULAR", usa las P para explotar.',
      'No digas "popular", di "P!-o-P!-u-lar".',
      'Apóyate en las consonantes fuertes (P, T, K, B).',
      'Ellas son el trampolín de tu volumen.'
    ],
    benefit: 'Claridad explosiva que llega lejos.'
  },
  {
    id: 'spine-alignment',
    title: 'Alineación de Columna',
    description: 'Postura para liberar el canal de voz.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina un hilo tirando de tu coronilla hacia el techo.',
      'Alinea orejas sobre hombros, hombros sobre caderas.',
      'El canal de aire está recto.',
      'Habla ahora y nota la facilidad de salida.'
    ],
    benefit: 'Proyección sin obstáculos físicos.'
  },
  {
    id: 'counting-people',
    title: 'Contando Multitudes',
    description: 'Dirige tu voz a múltiples objetivos.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Señala y cuenta imaginariamente a 10 personas en un auditorio.',
      '"Uno (allí), Dos (allá), Tres (arriba)..."',
      'Mueve tu voz físicamente con tu dedo.',
      'Que cada número llegue a su dueño.'
    ],
    benefit: 'Agilidad para proyectar en todas direcciones.'
  },
  {
    id: 'belly-balloon',
    title: 'Globo en la Panza',
    description: 'Visualización de soporte.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina un globo en tu estómago que se infla al inhalar.',
      'Al hablar, presiona ese globo suavemente.',
      'No dejes que se desinfle de golpe.',
      'Mantén la presión constante mientras hablas.'
    ],
    benefit: 'Soporte de aire constante para frases largas y fuertes.'
  },
  {
    id: 'hey-you',
    title: '¡Hey Tú!',
    description: 'El llamado de atención definitivo.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume', 'score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que alguien se le cae la billetera a 15 metros.',
      'Tienes un segundo para avisarle.',
      'Grita "¡HEY!" corto y percusivo.',
      'No lo pienses, solo reacciona con voz.'
    ],
    benefit: 'Conexión instintiva con tu potencia máxima.'
  },
  {
    id: 'volume-swells',
    title: 'Olas de Volumen',
    description: 'Control dinámico (Crescendo/Decrescendo).',
    category: 'PROJECTION',
    difficulty: 'ADVANCED',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Elige una vocal "Aaaaa".',
      'Empieza en volumen 1, sube gradualmente a 10, baja a 1.',
      'Hazlo en una sola respiración.',
      'Que el cambio sea suave, sin saltos.'
    ],
    benefit: 'Dominio total de la dinámica vocal.'
  },
  {
    id: 'ng-resonance',
    title: 'Resonancia NG',
    description: 'Coloca la voz en el resonador nasal.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Di la palabra "Singgggg" y sostén la NG al final.',
      'Siente la vibración detrás de la nariz.',
      'Abre la boca lentamente a "Ah" manteniendo la posición.',
      'Ese es el punto de máxima resonancia ("Twang").'
    ],
    benefit: 'Voz brillante que se escucha en lugares ruidosos.'
  },
  {
    id: 'lip-buzz',
    title: 'Zumbido de Labios',
    description: 'Proyección relajada.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Haz vibrar tus labios como un caballo (Prrr).',
      'Añade sonido y desliza de grave a agudo.',
      'Empuja fuerte desde el abdomen.',
      'Si pican los labios, lo estás haciendo bien.'
    ],
    benefit: 'Calienta la proyección sin forzar garganta.'
  },
  {
    id: 'opera-singer',
    title: 'El Cantante de Ópera',
    description: 'Imita la técnica clásica.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Adopta una postura muy erguida y pecho inflado.',
      'Imita una voz de ópera exagerada: "LAAAAA!".',
      'Nota el espacio interior en la boca.',
      'Aplica ese espacio a tu voz hablada normal.'
    ],
    benefit: 'Descubres el volumen por resonancia, no por grito.'
  },
  {
    id: 'wall-push',
    title: 'Empujar la Pared',
    description: 'Usa fuerza física para activar la voz.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Ponte frente a una pared y empújala con las manos.',
      'Mientras haces fuerza física, di "¡Fuerza!".',
      'Nota cómo tu voz sale automáticamente más potente.',
      'Tu cuerpo conecta esfuerzo físico con vocal.'
    ],
    benefit: 'Truco rápido para encontrar tu voz de mando.'
  },
  {
    id: 'reading-through-straw',
    title: 'Inhalar por Pajita',
    description: 'Prepara la presión subglótica.',
    category: 'PROJECTION',
    difficulty: 'ADVANCED',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que inhalas por una pajita muy fina.',
      'Siente la expansión fría en el fondo de la garganta.',
      'Mantén esa sensación de "abierto" al hablar.',
      'Evita que se cierre al exhalar.'
    ],
    benefit: 'Mantiene la garganta abierta bajo presión.'
  },
  {
    id: 'articulation-for-projection',
    title: 'Articulación Proyectada',
    description: 'Claridad es volumen.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee una frase susurrando pero moviendo la boca al 200%.',
      'Ahora dilo con voz, manteniendo ese movimiento exagerado.',
      'Verás que el sonido sale disparado.',
      'La boca abierta es un altavoz natural.'
    ],
    benefit: 'Máximo volumen con mínimo esfuerzo de garganta.'
  },
  {
    id: 'project-emotion-joy',
    title: 'Proyectar Alegría',
    description: 'La emoción más expansiva.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que acabas de ganar la lotería.',
      'Quieres contárselo a todo el edificio.',
      'Grita "¡SÍÍÍ!" con una sonrisa enorme.',
      'La sonrisa levanta el paladar y abrillanta la voz.'
    ],
    benefit: 'Proyección brillante y contagiosa.'
  },
  {
    id: 'project-emotion-authority',
    title: 'Proyectar Autoridad',
    description: 'Peso y gravedad en la voz.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que eres un juez dictando sentencia.',
      'Usa un tono grave y pausado.',
      'Cada palabra pesa una tonelada.',
      'No grites, "pesa" sobre la audiencia.'
    ],
    benefit: 'Proyección de mando y respeto.'
  },
  {
    id: 'project-emotion-urgent',
    title: 'Proyectar Urgencia',
    description: 'Velocidad y dirección.',
    category: 'PROJECTION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['wordsPerMinute', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que hay un incendio (ficticio).',
      'Tienes que sacar a la gente RÁPIDO.',
      '"¡Vamos! ¡Por aquí! ¡Muévanse!".',
      'Proyección corta, rápida y direccionada.'
    ],
    benefit: 'Capacidad de movilizar a la audiencia.'
  },
  {
    id: 'the-hearing-aid',
    title: 'El Abuelo Sordo',
    description: 'Paciencia y claridad en volumen alto.',
    category: 'PROJECTION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad', 'volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Hablas con alguien que oye muy mal.',
      'No le gritas con enojo, le hablas ALTO y CLARO.',
      'Alarga las vocales y marca las consonantes.',
      '"A-BUE-LO, ¿CÓ-MO ES-TÁ?".'
    ],
    benefit: 'Volumen amable, no agresivo.'
  },
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH: RELAXATION (Relajación) - PART 1
  // -------------------------------------------------------------------------
  {
    id: 'laryngeal-massage',
    title: 'Masaje Laríngeo',
    description: 'Reduce la tensión directa en la caja de voz.',
    category: 'RELAXATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange', 'energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Ubica tu nuez de Adán (o cartílago tiroides).',
      'Con el índice y pulgar, mueve suavemente la laringe de lado a lado.',
      'Debe moverse libremente, sin "clic" ni dolor.',
      'Haz un zumbido suave mientras masajeas.'
    ],
    benefit: 'Elimina la opresión en la garganta tras hablar mucho.'
  },
  {
    id: 'neck-rolls-slow',
    title: 'Giros de Cuello Lentos',
    description: 'Libera la tensión cervical que afecta la voz.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Deja caer la cabeza hacia el pecho.',
      'Gira muy lentamente hacia la oreja derecha.',
      'Pasa hacia atrás (boca abierta para no tensar) y luego izquierda.',
      'Siente cada fibra estirarse. No tengas prisa.'
    ],
    benefit: 'Desconecta la tensión del cuello de tus cuerdas vocales.'
  },
  {
    id: 'shoulder-drop',
    title: 'Caída de Hombros',
    description: 'Gravedad a tu favor.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Sube los hombros hasta tocar tus orejas. Tensa al máximo.',
      'Sostén 5 segundos.',
      'Suelta de golpe con un suspiro sonoro "¡Ahhhhh!".',
      'Siente cómo tus brazos pesan toneladas.'
    ],
    benefit: 'Elimina la postura de defensa que cierra la voz.'
  },
  {
    id: 'rag-doll',
    title: 'Muñeco de Trapo',
    description: 'Relajación corporal total.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'De pie, dobla la cintura y deja caer el torso hacia adelante.',
      'Deja que tus brazos y cabeza cuelguen muertos.',
      'Balancea suavemente de lado a lado.',
      'Sube vértebra por vértebra muy despacio.'
    ],
    benefit: 'Resetea toda la postura y libera la espalda baja (apoyo).'
  },
  {
    id: 'tongue-release-gentle',
    title: 'Lengua Muerta',
    description: 'Relaja la raíz de la lengua.',
    category: 'RELAXATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Deja que la lengua descanse en el suelo de la boca.',
      'La punta debe tocar suavemente los dientes inferiores.',
      'Di "A-E-I-O-U" intentando que la lengua no se tense hacia atrás.',
      'Mantén esa sensación de "lengua gorda y pesada".'
    ],
    benefit: 'Evita la voz engolada o "paposa".'
  },
  {
    id: 'face-scrunch',
    title: 'Cara de Pasa',
    description: 'Tensión y relajación facial.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Aprieta todos los músculos de tu cara hacia la nariz (como comer limón).',
      'Sostén 3 segundos.',
      'Abre la cara al máximo (sorpresa) sacando la lengua.',
      'Relaja totalmente. Siente el hormigueo.'
    ],
    benefit: 'Despierta y relaja la máscara facial (expresividad).'
  },
  {
    id: 'jaw-hang',
    title: 'Mandíbula Colgante',
    description: 'Desaprieta los dientes.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Deja caer la mandíbula inferior por gravedad.',
      'Masajea los músculos maseteros (cerca de la oreja).',
      'Muévela suavemente con la mano (no con los músculos).',
      'Debe estar totalmente pasiva.'
    ],
    benefit: 'Elimina el bruxismo diurno y libera el sonido.'
  },
  {
    id: 'silent-sigh',
    title: 'Suspiro Silencioso',
    description: 'Relaja el sistema nervioso.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala profundamente.',
      'Exhala soltando todo el aire como si te desinflaras.',
      'No hagas ruido, solo aire saliendo.',
      'Siente cómo el pecho baja y se relaja.'
    ],
    benefit: 'Baja el ritmo cardíaco antes de hablar.'
  },
  {
    id: 'vocal-fry-slide',
    title: 'Deslizamiento Fry',
    description: 'Masaje interno con sonido.',
    category: 'RELAXATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Haz el sonido de "Vocal Fry" (voz ronca de recién levantado).',
      'Ese crujido suave relaja las cuerdas al mínimo esfuerzo.',
      'Desliza ese sonido un poco hacia arriba y vuelve a bajar.',
      'Como una puerta vieja abriéndose.'
    ],
    benefit: 'Excelente para recuperar la voz cansada.'
  },
  {
    id: 'steam-engine',
    title: 'La Máquina de Vapor',
    description: 'Relajación rítmica del diafragma.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Expulsa aire suavemente: "Ch... ch... ch...".',
      'Hazlo muy lento y pausado.',
      'Concéntrate en que el retorno del aire sea pasivo (relajación).',
      'No tenses para inhalar, deja que el aire entre solo.'
    ],
    benefit: 'Enseña al cuerpo a relajarse entre frases.'
  },
  {
    id: 'eye-palming',
    title: 'Palming Ocular',
    description: 'Relaja los ojos y la frente.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Frota tus manos hasta calentarlas.',
      'Coloca las palmas sobre tus ojos cerrados (sin presionar).',
      'Siente el calor y la oscuridad 30 segundos.',
      'Relaja el entrecejo.'
    ],
    benefit: 'Una frente tensa tensa la voz. Esto lo soluciona.'
  },
  {
    id: 'chewing-gum-invisible',
    title: 'Chicle Invisible Gigante',
    description: 'Movimiento amplio sin tensión.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Finge mascar un chicle enorme y pegajoso.',
      'Mueve la mandíbula en círculos amplios y lentos.',
      'Involucra labios y mofletes.',
      'Mantén la boca abierta, no aprietes los dientes.'
    ],
    benefit: 'Lubrica la articulación temporomandibular.'
  },
  {
    id: 'humming-release',
    title: 'Humming de Alivio',
    description: 'Sonido suave para calmar.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Haz un "Mmmm" en tu tono más cómodo y medio-grave.',
      'Imagina que ese sonido masajea tu garganta por dentro.',
      'No busques volumen, busca confort.',
      'Siente la vibración en los labios.'
    ],
    benefit: 'Restarura el equilibrio vocal.'
  },
  {
    id: 'tongue-circles-inside',
    title: 'Limpiando la Casa (Lengua)',
    description: 'Estiramiento interno.',
    category: 'RELAXATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Con la boca cerrada, pasa la lengua entre los labios y los dientes.',
      'Haz un círculo completo: arriba derecha, abajo izquierda...',
      'Haz 3 círculos a un lado y 3 al otro.',
      'Siente el estiramiento en la base de la lengua.'
    ],
    benefit: 'Suelta la tensión acumulada en la raíz lingual.'
  },
  {
    id: 'chest-tap-massage',
    title: 'Tapping Pectoral Suave',
    description: 'Despierta y relaja el pecho.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Usa las yemas de los dedos para dar golpecitos suaves en todo el pecho.',
      'Respira profundamente mientras lo haces.',
      'Sigue hacia los hombros y el cuello (suave).',
      'Ayuda a soltar la "armadura" torácica.'
    ],
    benefit: 'Facilita una respiración más profunda y relajada.'
  },
  {
    id: 'airplane-ears',
    title: 'Descompresión de Oídos',
    description: 'Abre la trompa de Eustaquio.',
    category: 'RELAXATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Bosteza con la boca cerrada (siente como se inflan las mejillas internas).',
      'Escucha un "pop" o click en tus oídos.',
      'Mantén esa sensación de apertura interna.',
      'Relaja.'
    ],
    benefit: 'Mejora tu propia escucha (feedback auditivo) y relaja la mandíbula.'
  },
  {
    id: 'spine-twist-gentle',
    title: 'Torsión Espinal Suave',
    description: 'Libera el diafragma bloqueado.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Sentado, gira el torso suavemente a la derecha mirando atrás.',
      'Respira profundo en esa posición torcida.',
      'Vuelve al centro y gira a la izquierda.',
      'Respira profundo otra vez.'
    ],
    benefit: 'Desbloquea las costillas para respirar mejor.'
  },
  {
    id: 'warm-water-swallow',
    title: 'Tragar Saliva Consciente',
    description: 'Reseteo laríngeo.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Junta saliva en la boca.',
      'Traga con fuerza, notando cómo sube y baja la laringe.',
      'Después de tragar, asegúrate de que la laringe baje completamente.',
      'Exhala un suspiro de alivio "Ahhh".'
    ],
    benefit: 'Limpia la garganta sin carraspear (que daña).'
  },
  {
    id: 'floor-rest',
    title: 'Descanso Constructivo (Alexander)',
    description: 'La técnica Alexander para máxima alineación.',
    category: 'RELAXATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['energyStability', 'rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Túmbate en el suelo boca arriba, rodillas dobladas, pies en el suelo.',
      'Pon libros bajo tu cabeza para alinear el cuello (no almohada).',
      'Descansa ahí 5 minutos respirando.',
      'Deja que la gravedad estire tu columna.'
    ],
    benefit: 'La mejor postura para resetear el cuerpo vocal.'
  },
  {
    id: 'forehead-smooth',
    title: 'Alisado de Frente',
    description: 'Elimina la cara de preocupación.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Coloca los dedos en el centro de la frente.',
      'Desliza hacia afuera (hacia las sienes) aplicando presión suave.',
      'Imagina que borras tus arrugas de preocupación.',
      'Repite 5 veces cerrando los ojos.'
    ],
    benefit: 'Una cara relajada produce un tono de voz relajado y confiable.'
  },
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH: RELAXATION (Relajación) - PART 2
  // -------------------------------------------------------------------------
  {
    id: 'cool-stream',
    title: 'Visualización de Agua',
    description: 'Enfriar la glotis mentalmente.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Cierra los ojos e imagina que bebes agua fresca de manantial.',
      'Siente el frescor bajando por tu garganta.',
      'Esa sensación calma la irritación y el calor vocal.',
      'Exhala suavemente "Haaaa" como aire frío.'
    ],
    benefit: 'Reduce la inflamación percibida por estrés.'
  },
  {
    id: 'tongue-on-roof',
    title: 'Descanso en el Cielo',
    description: 'Postura de reposo correcta.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Coloca toda la lengua pegada al paladar superior (succión suave).',
      'La punta no debe tocar los dientes.',
      'Respira solo por la nariz.',
      'Mantén esta postura cuando no estés hablando.'
    ],
    benefit: 'La postura "Mewing" que relaja la mandíbula y mejora la estética facial.'
  },
  {
    id: 'hand-shakeout',
    title: 'Sacudida de Manos',
    description: 'Elimina la energía nerviosa.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Levanta las manos a la altura del pecho.',
      'Sacúdelas frenéticamente como si tuvieran agua.',
      'Hazlo durante 15 segundos respirando rápido.',
      'Deja caer los brazos de golpe y siente el cosquilleo.'
    ],
    benefit: 'Disipa la adrenalina acumulada antes de hablar.'
  },
  {
    id: 'ear-massage',
    title: 'Masaje de Orejas',
    description: 'Puntos de acupresión calmantes.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Tira suavemente de los lóbulos de tus orejas hacia abajo.',
      'Masajea el borde de la oreja desde arriba hasta abajo.',
      'Frota detrás de las orejas con los pulgares.',
      'Esto calma el sistema nervioso parasimpático.'
    ],
    benefit: 'Relajación instantánea y mejora de la escucha.'
  },
  {
    id: 'floating-arms',
    title: 'Brazos Flotantes',
    description: 'Elimina la tensión en trapecios.',
    category: 'RELAXATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que tienes globos de helio atados a las muñecas.',
      'Deja que tus brazos suban solos, sin fuerza muscular.',
      'Muévelos como si estuvieras bajo el agua.',
      'Bájalos muy lento.'
    ],
    benefit: 'Movimientos gestuales más fluidos y naturales.'
  },
  {
    id: 'lion-pose-face',
    title: 'Postura de León (Simhasana)',
    description: 'El estiramiento facial definitivo del Yoga.',
    category: 'RELAXATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['volume', 'score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Abre la boca al máximo.',
      'Saca la lengua todo lo que puedas hacia la barbilla.',
      'Abre los ojos desorbitadamente.',
      'Exhala fuerte con un rugido "Haaaaa".'
    ],
    benefit: 'Estira todos los músculos faciales a la vez.'
  },
  {
    id: 'pelvic-tilt',
    title: 'Basculación Pélvica',
    description: 'Alinea la base de la columna.',
    category: 'RELAXATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'De pie, flexiona ligeramente las rodillas.',
      'Mueve la cadera adelante y atrás (como metiendo la cola).',
      'Encuentra el punto neutro donde la espalda baja no está arqueada.',
      'Relaja los glúteos.'
    ],
    benefit: 'Mejora el apoyo respiratorio desde la base.'
  },
  {
    id: 'scalp-massage',
    title: 'Masaje de Cuero Cabelludo',
    description: 'Suelta la tensión craneal.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Usa las yemas de los 10 dedos.' ,
      'Mueve el cuero cabelludo sobre el cráneo (no frotes el pelo).',
      'Siente cómo se despega la piel del hueso.',
      'Insiste en la zona de las sienes.'
    ],
    benefit: 'Alivia dolores de cabeza tensionales y relaja la expresión.'
  },
  {
    id: 'slow-motion-walk',
    title: 'Caminata Lunar',
    description: 'Ralentiza tu ritmo interno.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Camina por la habitación en cámara superlenta.',
      'Siente cómo el talón toca el suelo, luego el arco, luego dedos.',
      'Respira al mismo ritmo lento.',
      'Sincroniza tu mente con este nuevo tempo.'
    ],
    benefit: 'Combate la prisa y la taquilia (hablar atropellado).'
  },
  {
    id: 'heavy-tongue-vowel',
    title: 'Vocal de Lengua Pesada',
    description: 'Aisoa la lengua de la fonación.',
    category: 'RELAXATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Saca la lengua y déjala descansar sobre el labio inferior.',
      'Di "Aaa-Eee-Iii" sin meter la lengua.',
      'El sonido será extraño, es normal.',
      'El objetivo es que la lengua NO participe en la generación de tono.'
    ],
    benefit: 'Independencia muscular: la lengua articula, no crea tono.'
  },
  {
    id: 'knee-bounce',
    title: 'Rebote de Rodillas',
    description: 'Desbloqueo de piernas (grounding).',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'De pie, rebota suavemente sobre tus rodillas (sin saltar).',
      'Deja que todo el cuerpo vibre con el rebote.',
      'Suelta sonido "Uh-Uh-Uh" con cada rebote.',
      'Siente el contacto con la tierra.'
    ],
    benefit: 'Evita el bloqueo de rodillas que causa desmayos o tensión.'
  },
  {
    id: 'chest-opener',
    title: 'Apertura de Pecho',
    description: 'Estiramiento pectoral.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Entrelaza las manos detrás de la espalda.',
      'Estira los brazos hacia abajo y atrás.',
      'Abre el pecho hacia el techo.',
      'Respira profundo en esa apertura.'
    ],
    benefit: 'Contrarresta la postura encorvada de oficina/celular.'
  },
  {
    id: 'solar-plexus-soften',
    title: 'Suavizar el Plexo',
    description: 'El centro emocional.',
    category: 'RELAXATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Pon la mano en la "boca del estómago" (plexo solar).',
      'A menudo tensamos ahí por ansiedad.',
      'Envía la orden mental: "Suaviza".',
      'Imagina que se derrite como mantequilla.'
    ],
    benefit: 'Libera la respiración profunda bloqueada por emociones.'
  },
  {
    id: 'wall-sit-release',
    title: 'Sentadilla de Pared Vocal',
    description: 'Cansar las piernas para relajar arriba.',
    category: 'RELAXATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Apoya la espalda en la pared y baja como si te sentaras (sin silla).',
      'Mantén la tensión en las piernas.',
      'Mientras tanto, recita un poema relajado y suelto.',
      'El cuerpo lleva la tensión abajo y libera arriba.'
    ],
    benefit: 'Disociación: Tensión en soporte, relajación en voz.'
  },
  {
    id: 'puppet-string-cut',
    title: 'Corte de Hilos',
    description: 'Colapso controlado.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que eres una marioneta tensa hacia arriba.',
      'Alguien corta el hilo: ¡Plop!',
      'Cae al suelo (o a una silla) exhalando todo.',
      'Quédate "desmayado" 5 segundos.'
    ],
    benefit: 'Reconoce la diferencia entre tensión y relajación total.'
  },
  {
    id: 'humming-chew',
    title: 'Masticar Humming',
    description: 'Masaje interno dinámico.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Haz un sonido "Mmmm".',
      'Mastica con la boca cerrada mientras suenas.',
      'Mueve la comida imaginaria de un lado a otro.',
      'Siente la vibración cambiando de lugar.'
    ],
    benefit: 'Relaja mandíbula y labios simultáneamente.'
  },
  {
    id: 'sternum-tap',
    title: 'Golpecitos de Timo',
    description: 'Activa la glándula del timo (inmunidad/energía).',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Golpea suavemente el centro de tu pecho con los dedos.',
      'Haz un ritmo de 3: Uno fuerte, dos suaves.',
      'Respira y sonríe.',
      'Siente una vibración agradable en el pecho.'
    ],
    benefit: 'Sube el ánimo y despierta la voz.'
  },
  {
    id: 'back-breath-stretch',
    title: 'Respiración de Espalda (Niño)',
    description: 'Postura de yoga Balasana.',
    category: 'RELAXATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Arrodíllate y baja la frente al suelo (postura del niño).',
      'Respira intentando expandir la espalda baja.',
      'Siente cómo se abren las costillas traseras.',
      'Es el lugar donde más aire cabe y menos usamos.'
    ],
    benefit: 'Expande la capacidad dorsal relajadamente.'
  },
  {
    id: 'final-shavasana',
    title: 'Silencio Absoluto',
    description: 'La práctica de no hacer nada.',
    category: 'RELAXATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Túmbate o siéntate cómodo.',
      'Quédate 1 minuto en silencio total, sin moverte.',
      'No prepares ni repases nada.',
      'Solo existe.'
    ],
    benefit: 'Recupera la energía mental gastada.'
  },
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH: STAGE PRESENCE (Presencia Escénica) - PART 1
  // -------------------------------------------------------------------------
  ,
  ,
  ,
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH: STAGE PRESENCE (Presencia Escénica) - PART 2
  // -------------------------------------------------------------------------
  ,
  ,
  ,
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH: BREATHING (Respiración)
  // -------------------------------------------------------------------------
  {
    id: 'box-breathing',
    title: 'Respiración Cuadrada',
    description: 'Control y calma total.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala en 4 segundos.',
      'Sostén el aire 4 segundos.',
      'Exhala en 4 segundos.',
      'Sostén sin aire 4 segundos.',
      'Repite el ciclo.'
    ],
    benefit: 'Regula el sistema nervioso y oxigena el cerebro.'
  },
  {
    id: 'rib-stretch-breathing',
    title: 'Respiración de Acordeón',
    description: 'Expansión lateral de costillas.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Pon las manos en tus costillas (a los lados del pecho).',
      'Al inhalar, empuja tus manos hacia afuera con las costillas.',
      'No subas los hombros.',
      'Al exhalar, deja que las costillas regresen al centro.'
    ],
    benefit: 'Aumenta la capacidad pulmonar real.'
  },
  {
    id: 'straw-exhale-long',
    title: 'Espiración con Pajita Imaginaria',
    description: 'Control de la salida de aire.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala profundo.',
      'Exhala por la boca muy cerrada, como si soplaras por una pajita fina.',
      'El chorro de aire debe ser constante y fino.',
      'Intenta durar más de 20 segundos.'
    ],
    benefit: 'Entrena al diafragma para dosificar el aire al hablar.'
  },
  {
    id: 'dog-pant',
    title: 'Jadeo de Perro',
    description: 'Activación diafragmática rápida.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Saca la lengua y jadea como un perro cansado.',
      'Siente el movimiento rápido en tu estómago.',
      'Hazlo 10 segundos y descansa.',
      'No muevas el pecho.'
    ],
    benefit: 'Despierta la musculatura abdominal para el soporte.'
  },
  {
    id: 'candle-flicker',
    title: 'La Vela Parpadeante',
    description: 'Presión de aire constante.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina una vela a 10 cm de tu boca.',
      'Sopla suavemente para mover la llama SIN apagarla.',
      'Mantén la llama inclinada pero estable.',
      'Si tambalea demasiado, tu apoyo es inestable.'
    ],
    benefit: 'Control fino del flujo aéreo para finales de frase suaves.'
  },
  {
    id: 'back-expansion',
    title: 'Respiración Dorsal',
    description: 'Usar la espalda para respirar.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Inclínate hacia adelante apoyando codos en rodillas.',
      'Inhala imaginando que tienes branquias en la espalda.',
      'Siente cómo se expande la zona de los riñones.',
      'Es el lugar donde más se suelen bloquear los nervios.'
    ],
    benefit: 'Desbloquea tensión lumbar y aumenta volumen.'
  },
  {
    id: 'sss-hiss',
    title: 'El Siseo de la Serpiente',
    description: 'Medición de capacidad.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala profundo.',
      'Exhala con un sonido "Sssssssss".',
      'Cronometra tu tiempo.',
      'Meta: 20s (Principiante), 30s (Intermedio), 45s+ (Pro).'
    ],
    benefit: 'Métrica clara de tu progreso en soporte.'
  },
  {
    id: 'quick-sniff',
    title: 'Olfateo Rápido',
    description: 'Recarga de aire invisible.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala rápido y silencioso por la nariz como si olieras una flor.',
      'Debe durar 0.5 segundos.',
      'El aire debe ir directo al abdomen, no al pecho.',
      'Exhala hablando una frase corta.'
    ],
    benefit: 'Técnica vital para hablar rápido sin ahogarse.'
  },
  {
    id: '4-7-8-relax',
    title: 'Técnica 4-7-8',
    description: 'Relajación profunda pre-charla.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala en 4 por la nariz.',
      'Aguanta la respiración 7 segundos.',
      'Exhala en 8 por la boca haciendo ruido "Whoosh".',
      'Repite 4 ciclos.'
    ],
    benefit: 'El tranquilizante natural del sistema nervioso.'
  },
  {
    id: 'segmented-exhale',
    title: 'Exhalación en Escalera',
    description: 'Gestión de la reserva de aire.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala a tope.',
      'Suelta un poco de aire "Tes..." (pausa).',
      'Suelta otro poco "Tes..." (pausa).',
      'Hasta vaciarte por completo.'
    ],
    benefit: 'Ayuda a calcular cuánto aire queda para terminar la frase.'
  },
  {
    id: 'book-on-belly',
    title: 'Libro en el Abdomen',
    description: 'Feedback visual de respiración.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Túmbate boca arriba.',
      'Pon un libro pesado sobre tu ombligo.',
      'Haz que el libro suba al inhalar y baje al exhalar.',
      'Si el libro no se mueve, estás respirando con el pecho.'
    ],
    benefit: 'Corrección automática de la respiración alta.'
  },
  {
    id: 'far-reach-breath',
    title: 'Respiración de Alcance',
    description: 'Proyectar el aire.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que quieres que tu aliento empañe un cristal a 2 metros.',
      'Inhala y lanza el aire con un "Ha" mudo pero con dirección.',
      'Usa los abdominales para impulsar ese aire lejos.',
      'Siente el empuje desde la pelvis.'
    ],
    benefit: 'Convierte el aire en combustible para la proyección.'
  },
  {
    id: 'silent-inhale-practice',
    title: 'El Ninja Silencioso',
    description: 'Eliminar el ruido al aspirar.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Grábate leyendo un texto.',
      'Tu objetivo: Que no se escuche NINGUNA inhalación.',
      'Abre la garganta antes de aspirar.',
      'El ruido al inhalar comunica ansiedad.'
    ],
    benefit: 'Profesionalidad auditiva absoluta.'
  },
  {
    id: 'squeeze-out',
    title: 'Exprimido Total',
    description: 'Vaciar el aire residual.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Exhala todo el aire normal.',
      'Cuando creas que no queda, exhala más haciendo "ssss".',
      'Cuando no quede nada, aprieta los abdominales y saca lo útimo.',
      'Luego relaja todo: el aire entrará solo violentamente.'
    ],
    benefit: 'Renueva el aire viciado del fondo de los pulmones.'
  },
  {
    id: 'fricative-pulses',
    title: 'Pulsos Fricativos',
    description: 'Gimnasia diafragmática.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Haz sonidos cortos y fuertes: "F! F! F! F!".',
      'Luego cambia: "S! S! S! S!".',
      'Luego: "Sh! Sh! Sh! Sh!".',
      'Nota el rebote en tu cintura.'
    ],
    benefit: 'Fortalece los músculos de empuje.'
  },
  {
    id: 'laughing-breath',
    title: 'Respiración de Risa',
    description: 'Liberación natural.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Finge una risa "Ja Ja Ja Ja" lenta y grave.',
      'Hazla más rápida "Jajajajaja".',
      'Hazlo sin sonido, solo aire.',
      'Es el movimiento natural del diafragma feliz.'
    ],
    benefit: 'Relaja tensiones y conecta con emociones positivas.'
  },
  {
    id: 'breath-hold-walk',
    title: 'Caminata en Apnea',
    description: 'Tolerancia al CO2.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala normal, exhala normal, tapa tu nariz.',
      'Camina contando pasos.',
      'Cuando sientas "hambre de aire", destapa y respira suave.',
      'Aumenta tus pasos cada día.'
    ],
    benefit: 'Calma la ansiedad cuando te quedas sin aire al hablar.'
  },
  {
    id: 'surprise-breath',
    title: 'Respiración de Sorpresa',
    description: 'Apertura rápida.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que ves algo increíble.',
      'Inhala rápido por la boca con gesto de sorpresa.',
      'Nota lo frío que entra el aire y cuánto entra.',
      'Úsalo para frases muy expresivas.'
    ],
    benefit: 'Recarga masiva de aire en milisegundos.'
  },
  {
    id: 'balloon-visualization',
    title: 'Visualización del Globo 360',
    description: 'Expansión total.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que tu torso es un globo.',
      'Al inhalar, no solo se infla la barriga.',
      'Se inflan los costados y la espalda a la vez.',
      'Expansión 360 grados.'
    ],
    benefit: 'Maximiza el espacio torácico inferior.'
  },
  {
    id: 'alternate-nostril',
    title: 'Respiración Alterna (Nadi Shodhana)',
    description: 'Equilibrio hemisférico.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Tapa fosa derecha con pulgar, inhala por izquierda.',
      'Tapa izquierda con anular, exhala por derecha.',
      'Inhala por derecha.',
      'Tapa derecha, exhala por izquierda.'
    ],
    benefit: 'Centra la mente antes de una presentación importante.'
  },
  {
    id: 'lip-trill-sustain',
    title: 'Trino de Labios Sostenido',
    description: 'Gestión de flujo constante.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Haz vibrar los labios "Brrrrr".',
      'Intenta mantener la vibración constante sin tono (solo aire).',
      'Luego añade tono.',
      'Si se corta, es que tu flujo de aire es irregular.'
    ],
    benefit: 'Suaviza y regula la salida del aire.'
  },
  {
    id: 'paper-against-wall',
    title: 'Papel en la Pared',
    description: 'Potencia sostenida divertida.',
    category: 'BREATHING',
    difficulty: 'ADVANCED',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Pon un folio A4 contra la pared.',
      'Sopla en el centro para mantenerlo pegado solo con tu aire.',
      'Cronometra cuánto tiempo puedes sostenerlo ahí.',
      'Requiere flujo fuerte y constante.'
    ],
    benefit: 'Reto físico para la potencia respiratoria.'
  },
  {
    id: 'elevator-breath',
    title: 'El Ascensor',
    description: 'Control vertical.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala imaginando el aire bajando al sótano (pelvis).',
      'Exhala imaginando el aire subiendo a la azotea (cabeza).',
      'Siente el recorrido vertical interno.',
      'No hay bloqueos en los pisos intermedios (pecho/garganta).'
    ],
    benefit: 'Conexión mente-cuerpo.'
  },
  {
    id: 'recovery-breath',
    title: 'Respiración de Recuperación',
    description: 'Tras un esfuerzo vocal.',
    category: 'BREATHING',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala por la nariz suavemente.',
      'Exhala por la boca muy despacio con labios fruncidos.',
      'Como si enfriaras una sopa.',
      'Repite 10 veces.'
    ],
    benefit: 'Resetea las cuerdas vocales y el diafragma.'
  },
  {
    id: 'vowel-sustain',
    title: 'Sostenimiento de Vocal',
    description: 'Eficiencia fonatoria.',
    category: 'BREATHING',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Inhala cómodo.',
      'Di "Aaaaaa" en un tono medio y volumen constante.',
      'Mide el tiempo.',
      'Normal: 15s. Cantante: 25s+. Orador Pro: 20s+.'
    ],
    benefit: 'Mejora la eficiencia: más sonido con menos aire.'
  },
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH: INTONATION (Entonación)
  // -------------------------------------------------------------------------
  {
    id: 'musical-scales',
    title: 'Escalas Musicales Habladas',
    description: 'Flexibilidad tonal.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Di "Hola" en un tono muy grave.',
      'Di "Hola" un poco más agudo.',
      'Sube paso a paso como una escalera "Do-Re-Mi...".',
      'Llega a tu máximo agudo (falsete) y baja de nuevo.'
    ],
    benefit: 'Rompe la monotonía expandiendo tu rango útil.'
  },
  {
    id: 'sarcasm-switch',
    title: 'El Interruptor del Sarcasmo',
    description: 'Domina el subtexto.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Di la frase "Qué gran idea" de forma sincera.',
      'Ahora dila sarcásticamente (alargando y curvando el tono).',
      'Siente la diferencia muscular y melódica.',
      'La entonación cambia el significado opuesto.'
    ],
    benefit: 'Conciencia total de cómo el tono altera el mensaje.'
  },
  {
    id: 'storyteller-mode',
    title: 'Modo Cuentacuentos',
    description: 'Variedad extrema.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Cuéntale algo a un niño imaginario de 5 años.',
      'Exagera los agudos "¡Y entonces...!" y los graves "el monstruo...".',
      'Usa susurros y gritos.',
      'Rompe tus barreras de vergüenza.'
    ],
    benefit: 'Si puedes exagerar, puedes matizar.'
  },
  {
    id: 'the-question-mark',
    title: 'La Pregunta Eterna',
    description: 'Evitar el "Upspeak" no deseado.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Grábate diciendo tu nombre: "Soy Juan".',
      '¿Suena a afirmación (tono baja) o pregunta (tono sube)?',
      'Repítelo bajando el tono al final a propósito.',
      'Si subes, pareces inseguro.'
    ],
    benefit: 'Elimina el vicio de "pedir perdón" al hablar.'
  },
  {
    id: 'stress-shift',
    title: 'Cambio de Énfasis',
    description: 'Cambia el foco de la frase.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Frase: "Yo no dije eso".',
      'Di: "YO no dije eso" (fue otro).',
      'Di: "Yo NO dije eso" (lo niego).',
      'Di: "Yo no DIJE eso" (lo escribí).',
      'Di: "Yo no dije ESO" (dije otra cosa).'
    ],
    benefit: 'Precisión quirúrgica en la intención.'
  },
  {
    id: 'speed-variations',
    title: 'Montaña Rusa de Velocidad',
    description: 'Contraste rítmico.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['wordsPerMinute'],
    requiredMode: 'AUDIO',
    steps: [
      'Di una frase muy rápido (emoción/detalle).',
      'Pausa.',
      'Di la siguiente frase muy lento (importancia/conclusión).',
      'El contraste despierta al cerebro del oyente.'
    ],
    benefit: 'Combate el aburrimiento hipnótico de la velocidad constante.'
  },
  {
    id: 'robot-voice',
    title: 'Voz de Robot (Monotono)',
    description: 'Entender la falta de entonación.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Habla 30 segundos sin cambiar NADA el tono.',
      'Todo en la misma nota musical.',
      'Nota lo aburrido y "muerto" que suena.',
      'Ahora añade melodía normal. ¡Qué alivio!'
    ],
    benefit: 'Apreciar y activar la "música" del habla.'
  },
  {
    id: 'opera-slide',
    title: 'Glissando de Ópera',
    description: 'Conexión de registros.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Haz un sonido "Uuuuu" deslizando desde lo más grave a lo más agudo.',
      'Asegúrate de que no haya "saltos" o "gallos" en el medio.',
      'Hazlo también de arriba a abajo.',
      'Como un tobogán de sonido.'
    ],
    benefit: 'Suaviza el paso entre voz de pecho y cabeza.'
  },
  {
    id: 'whisper-loud',
    title: 'El Susurro a Gritos',
    description: 'Intensidad sin volumen.',
    category: 'INTONATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Usa "voz de susurro" (mucho aire) pero intenta que se oiga lejos.',
      'Requiere una articulación brutal.',
      'Transmite urgencia y secreto.',
      'Úsalo para atraer la atención total.'
    ],
    benefit: 'Técnica teatral para momentos climáticos.'
  },
  {
    id: 'pause-for-effect',
    title: 'La Pausa de Poder',
    description: 'El silencio es sonido.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pauseDuration'],
    requiredMode: 'AUDIO',
    steps: [
      'Di algo importante.',
      'Cuenta mentalmente "1 Mississippi, 2 Mississippi".',
      'Mantén el contacto visual en silencio.',
      'Luego continúa.'
    ],
    benefit: 'Da peso a tus palabras y tiempo para procesar.'
  },
  {
    id: 'parenthesis-voice',
    title: 'Voz de Paréntesis',
    description: 'Aclaraciones rápidas.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Estás contando una historia.',
      'Baja el tono y acelera un poco para decir un detalle técnico.',
      'Vuelve al tono y ritmo normal para la historia principal.',
      'Es como un "aparte" en teatro.'
    ],
    benefit: 'Organiza la información auditivamente para el oyente.'
  },
  {
    id: 'staccato-legato',
    title: 'Picado y Ligado',
    description: 'Textura del sonido.',
    category: 'INTONATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Staccato: "Ta. Ta. Ta. Ta." (Golpes secos, separados).',
      'Legato: "LaaaaaLoooooLaaaa" (Todo unido y fluido).',
      'Usa Staccato para datos y listas.',
      'Usa Legato para emociones e historias.'
    ],
    benefit: 'Añade textura rica a tu discurso.'
  },
  {
    id: 'character-voice',
    title: 'La Voz del Personaje',
    description: 'Citas directas.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Cuando cuentes que alguien dijo algo, cambia tu voz un poco.',
      'No tiene que ser una imitación perfecta.',
      'Solo cambia el tono o la actitud.',
      'Distingue claramente al "Narrador" del "Personaje".'
    ],
    benefit: 'Hace tus anécdotas mucho más vivas.'
  },
  {
    id: 'emotional-coloring',
    title: 'Coloreado Emocional',
    description: 'Impregnar la palabra.',
    category: 'INTONATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Di la palabra "Duro" sintiendo dureza.',
      'Di "Suave" sintiendo suavidad (alarga, airea).',
      'Di "Triste" con tono descendente.',
      'Haz que la palabra suene a lo que significa.'
    ],
    benefit: 'Congruencia máxima entre texto y voz.'
  },
  {
    id: 'ascending-list',
    title: 'La Lista Ascendente',
    description: 'Mantener interés en enumeraciones.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Voy a comprar: Manzanas (tono medio)...',
      'Peras (tono un poco más alto)...',
      'Y un melón (tomo más alto y conclusivo).',
      'No dejes caer el tono en cada ítem, súbelo hasta el final.'
    ],
    benefit: 'Evita que las listas duerman a la audiencia.'
  },
  {
    id: 'suspense-build',
    title: 'Construcción de Suspenso',
    description: 'Ralentando hacia el clima.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['wordsPerMinute'],
    requiredMode: 'AUDIO',
    steps: [
      'Empieza a ritmo normal.',
      'Vete frenando poco a poco frases.',
      'Haz las pausas más largas.',
      'Baja el volumen un poco.',
      '¡Y suelta el final!'
    ],
    benefit: 'Manejo magistral de la atención.'
  },
  {
    id: 'punchline-delivery',
    title: 'Entrega del Remate',
    description: 'Timing cómico o impactante.',
    category: 'INTONATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pauseDuration'],
    requiredMode: 'AUDIO',
    steps: [
      'Di la preparación de la frase.',
      'Haz una micropausa antes de la palabra clave.',
      'Di la palabra clave con un cambio de tono o volumen.',
      'No te rías tú (si es chiste), espera la reacción.'
    ],
    benefit: 'Maximiza el impacto de ideas clave.'
  },
  {
    id: 'warm-tone',
    title: 'Tono Cálido (Pecho)',
    description: 'Para empatizar.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Piensa en un chocolate caliente.',
      'Habla desde el pecho, usando graves suaves.',
      'Sonríe levemente con los ojos.',
      'Es la voz de "te entiendo y te apoyo".'
    ],
    benefit: 'Ideal para malas noticias o momentos íntimos.'
  },
  {
    id: 'cold-tone',
    title: 'Tono Frío (Cabeza)',
    description: 'Para datos y distancia.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Elimina todo aire y emoción.',
      'Tono preciso, cortante, metálico.',
      'Articulación perfecta.',
      'Es la voz de un ordenador o informe financiero.'
    ],
    benefit: 'Proyecta profesionalidad desapegada.'
  },
  {
    id: 'volume-whisper-contrast',
    title: 'Grito y Susurro',
    description: 'Rango dinámico extremo.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee una frase GRITANDO DE ALEGRÍA.',
      'Inmediatamente lee la siguiente como un secreto mortal.',
      'El cerebro del oyente se "resetea" con el cambio.',
      'Úsalo para despertar.'
    ],
    benefit: 'Dinamismo total.'
  },
  {
    id: 'interrogative-inflection',
    title: 'Inflexión Interrogativa',
    description: 'Preguntas retóricas.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Lanza una pregunta al aire: "¿Y qué pasó después?".',
      'Exagera la curva hacia arriba al final.',
      'Déjala colgar en el aire 3 segundos.',
      'Obliga al cerebro del público a buscar la respuesta.'
    ],
    benefit: 'Engagement mental automático.'
  },
  {
    id: 'comma-lift',
    title: 'La Coma Elevada',
    description: 'Mantener la frase viva.',
    category: 'INTONATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'En cada coma, sube el tono un poquito (no lo bajes).',
      'Esto indica "no he terminado, sigue escuchando".',
      'Si bajas en la coma, la gente desconecta.',
      'Solo baja en el punto.'
    ],
    benefit: 'Flujo continuo de ideas sin interrupciones mentales.'
  },
  {
    id: 'gravel-voice',
    title: 'Voz Rasgada (Uso puntual)',
    description: 'Textura de "Chico Malo".',
    category: 'INTONATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Relaja tanto las cuerdas que suenen burbujeantes (Fry).',
      'Usa esto en finales de frases para sonar relajado/sexy.',
      '¡No lo uses todo el tiempo! (Daña y cansa).',
      'Es una especia, no el plato principal.'
    ],
    benefit: 'Añade un toque de intimidad física.'
  },
  {
    id: 'echo-repetition',
    title: 'Repetición de Eco',
    description: 'Enfocar una palabra.',
    category: 'INTONATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Di una frase: "El problema es el miedo".',
      'Repite la última palabra con otro tono: "El miedo...".',
      'Baja el volumen y el tono en la repetición.',
      'Graba el concepto a fuego.'
    ],
    benefit: 'Técnica retórica clásica para memorabilidad.'
  },
  {
    id: 'melody-map',
    title: 'Mapa Melódico',
    description: 'Dibujar con la voz.',
    category: 'INTONATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina que tu voz es un lápiz.',
      'Dibuja las palabras en el aire.',
      '"Subir" (tono sube), "Bajar" (tono baja), "Ondular" (tono ondula).',
      'Haz que la forma del sonido coincida con el movimiento.'
    ],
    benefit: 'Prosodia ilustrativa.'
  },
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH: MINDSET (Mentalidad)
  // -------------------------------------------------------------------------
  {
    id: 'imposter-relabel',
    title: 'Reetiquetar al Impostor',
    description: 'Cambiar el diálogo interno.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Cuando pienses "No soy experto", di "Soy un aprendiz curioso".',
      'Cuando pienses "Me van a juzgar", di "Les voy a servir".',
      'Escribe tus 3 miedos principales y su reetiquetado positivo.',
      'El miedo es solo excitación sin respiración.'
    ],
    benefit: 'Neutraliza el sabotaje interno antes de subir al escenario.'
  },
  {
    id: 'gift-mental-shift',
    title: 'La Mentalidad de Regalo',
    description: 'De pedir a dar.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'No subas a pedir aprobación (ego).',
      'Sube a entregar un regalo (servicio).',
      'Visualiza que tienes un paquete valioso para la audiencia.',
      'Si ellos lo rechazan, no es tu culpa, tú cumpliste.'
    ],
    benefit: 'Elimina la presión de "gustar" a todos.'
  },
  {
    id: 'power-pose-amy',
    title: 'La Mujer Maravilla (Power Pose)',
    description: 'Biofeedback hormonal.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Antes de hablar (en privado), pon manos en cintura y abre piernas.',
      'Levanta el pecho y mentón 2 minutos.',
      'Siente cómo baja el cortisol y sube la testosterona.',
      'Tu cuerpo convence a tu mente de que tienes poder.'
    ],
    benefit: 'Química cerebral instantánea para la confianza.'
  },
  {
    id: 'worst-case-scenario',
    title: 'El Peor Escenario Ridículo',
    description: 'Descatastrofización.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Imagina lo PEOR que podría pasar (tropezar, olvidar todo).',
      'Llévalo al absurdo: "Y luego entran payasos y se ríen".',
      'Ríete de esa imagen.',
      'Acepta que incluso si fallas, sobrevivirás.',
      'El cerebro se calma cuando ve que no hay leones reales.'
    ],
    benefit: 'Reduce la ansiedad anticipatoria.'
  },
  {
    id: 'gratitude-anchor',
    title: 'Anclaje de Gratitud',
    description: 'Cambiar miedo por gratitud.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Justo antes de empezar, piensa en 3 cosas que agradeces.',
      '"Gracias por esta oportunidad", "Gracias por este micrófono".',
      'Es biológicamente imposible sentir miedo y gratitud a la vez.',
      'Hackea tu sistema límbico.'
    ],
    benefit: 'Entra al escenario con luz en los ojos, no pánico.'
  },
  {
    id: 'audience-friends',
    title: 'Audiencia de Amigos',
    description: 'Humanizar al público.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'No mires a la "masa" o al "monstruo".',
      'Mira individuos. Imagina que son tus primos lejanos.',
      'Ellos quieren que te vaya bien (nadie quiere ver sufrir a otros).',
      'Ellos están de tu lado.'
    ],
    benefit: 'Convierte un entorno hostil en uno familiar.'
  },
  {
    id: 'success-visualization',
    title: 'La Película del Éxito',
    description: 'Ensayo mental deportivo.',
    category: 'MINDSET',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Cierra los ojos y visualiza tu charla de principio a fin.',
      'Pero visualiza que sale PERFECTA.',
      'Siente los aplausos, las sonrisas, tu calma.',
      'El cerebro no distingue entre visualización vívida y realidad.'
    ],
    benefit: 'Crea una "memoria del futuro" que te da seguridad.'
  },
  {
    id: 'permission-to-suck',
    title: 'Permiso para Ser Malo',
    description: 'Bajar el listón del perfeccionismo.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Dite a ti mismo: "Tengo permiso para hacerlo horrible hoy".',
      'Paradójicamente, soltar la presión de ser perfecto te libera.',
      'La parálisis viene de querer ser Shakespeare en el primer borrador.',
      'Solo sé tú.'
    ],
    benefit: 'Desbloquea la autenticidad y fluidez.'
  },
  {
    id: 'affirmation-mantra',
    title: 'Mantra de Poder',
    description: 'Frases gatillo.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Elige una frase corta: "Estoy listo", "Soy suficiente", "Mi voz importa".',
      'Repítela en bucle justo antes de hablar.',
      'No dejes espacio para pensamientos intrusivos.',
      'Ocupa tu canal auditivo interno.'
    ],
    benefit: 'Enfoque láser en tu intención.'
  },
  {
    id: 'connection-over-perfection',
    title: 'Conexión sobre Perfección',
    description: 'Cambio de KPI personal.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Tu meta no es "no equivocarme".',
      'Tu meta es "conectar con una persona".',
      'Si te trabas pero conectas, ganaste.',
      'Si eres perfecto pero frío, perdiste.'
    ],
    benefit: 'Prioriza lo humano sobre lo técnico.'
  },
  {
    id: 'the-pause-reframe',
    title: 'Reencuadre de la Pausa',
    description: 'Pánico vs Poder.',
    category: 'MINDSET',
    difficulty: 'ADVANCED',
    targetMetrics: ['pauseDuration'],
    requiredMode: 'AUDIO',
    steps: [
      'Cuando te quedes en blanco, no pienses "¡Lo olvidé!".',
      'Piensa: "Estoy haciendo una pausa dramática genial".',
      'El público no tiene tu guion.',
      'Disfruta del silencio mientras recuerdas.'
    ],
    benefit: 'Transforma errores en momentos de autoridad.'
  },
  {
    id: 'nervous-excited',
    title: 'No son Nervios, es Entusiasmo',
    description: 'Reinterpretación fisiológica.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'El corazón rápido y las manos sudorosas son signos de adrenalina.',
      'La adrenalina es energía para la acción.',
      'No trates de calmarte (es difícil bajar de 100 a 0).',
      'Solo di: "Estoy entusiasmado".'
    ],
    benefit: 'Usa la energía a tu favor en lugar de luchar contra ella.'
  },
  {
    id: 'who-cares',
    title: 'El Ejercicio "¿A quién le importa?"',
    description: 'Perspectiva cósmica.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Recuerda que en 100 años nadie recordará tu charla.',
      'La gente está pensando en sus propios problemas, no en ti.',
      'No eres el centro del universo.',
      '¡Qué liberación!'
    ],
    benefit: 'Reduce la inflación del ego y el miedo al ridículo.'
  },
  {
    id: 'celebrate-mistakes',
    title: 'Celebrar el Error',
    description: 'Resiliencia en vivo.',
    category: 'MINDSET',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Si te equivocas, sonríe o haz una broma breve.',
      '"Vaya, se me lengua la traba".',
      'Muestra que no te afecta.',
      'La audiencia confía más en alguien vulnerable que en un robot.'
    ],
    benefit: 'Te hace antifrágil ante los fallos.'
  },
  {
    id: 'avatar-mode',
    title: 'Modo Avatar',
    description: 'Crear un alter-ego.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Crea un personaje: "El Orador Seguro".',
      'Cuando subes al escenario, te "pones el traje" de ese personaje.',
      'Él no tiene miedo, aunque tú sí.',
      'Actúa "como sí" fueras valiente hasta que lo seas.'
    ],
    benefit: 'Disociación útil para superar la timidez.'
  },
  {
    id: 'breathe-into-feet',
    title: 'Respirar hacia los Pies',
    description: 'Grounding mental.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Siente que tu energía mental baja de la cabeza al suelo.',
      'Siente la gravedad.',
      'No puedes estar "en las nubes" (ansiedad) si estás en tus pies.',
      'Sólido como una roca.'
    ],
    benefit: 'Estabilidad física que se traduce en estabilidad mental.'
  },
  {
    id: 'serve-one',
    title: 'Servir a Uno',
    description: 'Reducir la escala.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Busca una cara amable en el público.',
      'Dedícale la charla mentalmente a esa persona.',
      'Háblale a ella.',
      'Reduce una multitud de 1000 a una charla de café.'
    ],
    benefit: 'Hace la tarea manejable y personal.'
  },
  {
    id: 'post-game-analysis',
    title: 'Análisis Post-Partido (Sin Látigo)',
    description: 'Mejora continua sana.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Después de hablar, di 3 cosas que hiciste BIEN.',
      'Solo después di 1 cosa a mejorar.',
      'Prohibido flagelarse.',
      'El refuerzo positivo construye habilidades, el castigo las destruye.'
    ],
    benefit: 'Construye autoestima a largo plazo.'
  },
  {
    id: 'listening-breath',
    title: 'Respirar mientras Escuchan',
    description: 'No tener prisa.',
    category: 'MINDSET',
    difficulty: 'ADVANCED',
    targetMetrics: ['pauseDuration'],
    requiredMode: 'AUDIO',
    steps: [
      'Da espacio a la audiencia para que "respiren" tu mensaje.',
      'No llenes cada segundo.',
      'Tu confianza se demuestra en cuánto silencio aguantas.',
      'El silencio es el sonido de la autoridad.'
    ],
    benefit: 'Proyecta un estatus altísimo.'
  },
  {
    id: 'eye-contact-energy',
    title: 'Intercambio de Energía Ocular',
    description: 'Recibir, no solo dar.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Al mirar a alguien, imagina que INHALAS su atención.',
      'No solo "lances" tu mirada (agresivo).',
      'Recibe su presencia.',
      'Crea un ciclo de retroalimentación.'
    ],
    benefit: 'Conexión magnética y menos agotadora.'
  },
  {
    id: 'smiling-voice-mindset',
    title: 'Sonrisa Interior',
    description: 'Calidez subyacente.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Aunque el tema sea serio, mantén una "sonrisa" en el pecho.',
      'Una actitud de apertura y bienvenida.',
      'Esto suaviza micro-tensiones en la garganta.',
      'Se escucha en el "color" de la voz.'
    ],
    benefit: 'Voz más rica y empática automáticamente.'
  },
  {
    id: 'failure-resume',
    title: 'El Currículum de Fracasos',
    description: 'Perder el miedo a caer.',
    category: 'MINDSET',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Recuerda tus peores fallos pasados.',
      'Date cuenta de que sigues vivo y aprendiste.',
      'El escenario es solo otro lugar para aprender.',
      'El error es el precio de la entrada a la maestría.'
    ],
    benefit: 'Inmunidad al miedo al fracaso.'
  },
  {
    id: 'curiosity-over-judgement',
    title: 'Curiosidad sobre Juicio',
    description: 'Cambio de foco.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'En lugar de juzgarte "¿Lo hago bien?", sé curioso.',
      '"¿Cómo reaccionarán si hago una pausa aquí?".',
      '"¿Qué pasa si bajo la voz?".',
      'Juega como un científico, no como un examinado.'
    ],
    benefit: 'Convierte la ansiedad en experimentación lúdica.'
  },
  {
    id: 'pre-forgiveness',
    title: 'El Pre-Perdón',
    description: 'Autocompasión anticipada.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Antes de empezar, perdona cualquier error que vayas a cometer.',
      '"Me perdono por ser humano de antemano".',
      'Esto relaja la tensión del cuello increíblemente.',
      'Nada que demostrar, nada que defender.'
    ],
    benefit: 'Relajación muscular radical.'
  },
  {
    id: 'the-bridge',
    title: 'El Puente',
    description: 'Tú eres el medio, no el fin.',
    category: 'MINDSET',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Tú eres un puente entre la Idea y la Audiencia.',
      'La gente camina sobre el puente, no se queda a admirarlo.',
      'Que el puente sea firme, pero lo importante es que crucen.',
      'Quítate del medio.'
    ],
    benefit: 'Humildad que potencia la claridad.'
  },
  {
    id: 'enjoyment-imperative',
    title: 'El Imperativo del Disfrute',
    description: 'La regla de oro.',
    category: 'MINDSET',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Tu única obligación real es disfrutar.',
      'Si tú disfrutas, la audiencia disfruta.',
      'Si tú sufres, la audiencia sufre.',
      'Por egoísmo altruista: ¡Pásalo bien!'
    ],
    benefit: 'La emoción más contagiosa y carismática es el gozo.'
  },
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH: IMPROVISATION (Improvisación)
  // -------------------------------------------------------------------------
  {
    id: 'yes-and-solo',
    title: 'Sí, y... (Versión Solo)',
    description: 'Aceptar y construir.',
    category: 'IMPROVISATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Di una frase cualquiera: "El cielo es verde".',
      'Di "Sí, y..." y añade algo lógico a esa realidad: "Sí, y sabe a menta".',
      'Continúa: "Sí, y por eso las nubes son de chocolate".',
      'Nunca digas "No" o "Pero". Solo avanza.'
    ],
    benefit: 'Entrena el cerebro para no bloquear ideas.'
  },
  {
    id: 'prep-method',
    title: 'Método PREP',
    description: 'Estructura instantánea.',
    category: 'IMPROVISATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Elige un tema al azar (ej. "Pizza").',
      'P (Point): "Me encanta la pizza".',
      'R (Reason): "Porque es versátil".',
      'E (Example): "Ayer comí una de piña".',
      'P (Point): "Por eso la pizza es la reina".'
    ],
    benefit: 'Nunca te quedarás en blanco en una respuesta.'
  },
  {
    id: 'bridging-technique',
    title: 'Técnica del Puente (Bridging)',
    description: 'Responder lo que tú quieres.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Pídete una pregunta incómoda: "¿Por qué llegas tarde?".',
      'Reconoce brevemente: "Entiendo tu preocupación...".',
      'Usa el puente: "Sin embargo, lo importante es...".',
      'Di tu mensaje: "...que ya tengo el informe listo".'
    ],
    benefit: 'Control total de la dirección de la charla.'
  },
  {
    id: 'one-word-story-solo',
    title: 'Historia de una Palabra',
    description: 'Narrativa paso a paso.',
    category: 'IMPROVISATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Cuenta una historia diciendo solo una palabra a la vez.',
      '"Ayer... fui... al... mercado... y... vi... un... elefante..."',
      'Te obliga a ir despacio y escuchar tu propia lógica.',
      'No planees el final, descúbrelo.'
    ],
    benefit: 'Paciencia narrativa.'
  },
  {
    id: 'gibberish-interpreter',
    title: 'Intérprete de Galimatías',
    description: 'Lenguaje no verbal puro.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Habla 30 segundos en un idioma inventado (Gibberish).',
      'Usa mucha entonación y gestos.',
      'Luego traduce qué dijiste: "Estaba explicando la física cuántica".',
      'Demuestra que el tono comunica más que las palabras.'
    ],
    benefit: 'Desarrolla expresividad total.'
  },
  {
    id: 'object-monologue',
    title: 'Monólogo del Objeto',
    description: 'Asociación libre.',
    category: 'IMPROVISATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma el objeto más cercano (ej. un lápiz).',
      'Habla 1 minuto sobre él como si fuera lo más fascinante del mundo.',
      'Véndelo, descríbelo, invéntale una historia.',
      'No pares de hablar.'
    ],
    benefit: 'Capacidad de sacar conversación de la nada.'
  },
  {
    id: 'rapid-fire-questions',
    title: 'Preguntas Ráfaga',
    description: 'Velocidad de procesamiento.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['wordsPerMinute'],
    requiredMode: 'AUDIO',
    steps: [
      'Usa un generador de preguntas aleatorias (o imagina).',
      'Responde en menos de 1 segundo lo primero que venga.',
      'No filtres. "¿Color favorito?" "Azul". "¿Miedo?" "Arañas".',
      'Entrena el instinto sobre la reflexión excesiva.'
    ],
    benefit: 'Elimina el retardo por duda.'
  },
  {
    id: 'devils-advocate',
    title: 'Abogado del Diablo',
    description: 'Flexibilidad mental.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Elige una opinión tuya fuerte (ej. "El ejercicio es bueno").',
      'Ahora improvisa 1 minuto defendiendo lo CONTRARIO.',
      '"El ejercicio es terrible porque te lesiona...".',
      'Hazlo con convicción total.'
    ],
    benefit: 'Despega tu ego de tus argumentos.'
  },
  {
    id: 'last-word-first',
    title: 'La Última Palabra Primero',
    description: 'Escucha y enlace.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Di una frase: "Me gusta el sol".',
      'Empieza la siguiente con la última palabra: "Sol es lo que necesito".',
      'Siguiente: "Necesito vacaciones".',
      'Siguiente: "Vacaciones son caras".'
    ],
    benefit: 'Fluidez y conexión lógica infinita.'
  },
  {
    id: 'emotion-switch',
    title: 'Cambio de Emoción',
    description: 'Versatilidad actoral.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Empieza hablando de tu desayuno NORMAL.',
      'A la palmada (imaginaria), cambia a TRISTE.',
      'A la palmada, cambia a EUFÓRICO.',
      'A la palmada, cambia a SOSPECHOSO.',
      'El texto sigue igual, la emoción cambia.'
    ],
    benefit: 'Control emocional instantáneo.'
  },
  {
    id: 'describe-the-painting',
    title: 'Describe el Cuadro Invisible',
    description: 'Visualización verbal.',
    category: 'IMPROVISATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Mira una pared blanca.',
      'Describe con todo detalle el cuadro "invisible" que hay ahí.',
      '"Aquí hay un caballo rojo, y allá una nube con forma de pie..."',
      'Haz que el oyente LO VEA.'
    ],
    benefit: 'Potencia la imaginería descriptiva.'
  },
  {
    id: 'sales-pitch-absurd',
    title: 'Venta Absurda',
    description: 'Persuasión creativa.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Combina dos objetos: "Zapato" y "Yogur".',
      'Crea el "Zapa-Gurt".',
      'Haz un pitch de 30 segundos vendiéndolo.',
      '"¡Camina suave y desayuna a la vez!"'
    ],
    benefit: 'Creatividad bajo presión.'
  },
  {
    id: 'expert-panel',
    title: 'Panel de Expertos',
    description: 'Fingir hasta lograrlo.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Eres el experto mundial en... (tema inventado, ej. "Cría de hormigas lunares").',
      'Responde 3 preguntas del público sobre eso.',
      'Inventa los datos con autoridad absoluta.',
      '"Las hormigas lunares comen queso verde, obviamente".'
    ],
    benefit: 'Proyectar autoridad sobre contenido desconocido.'
  },
  {
    id: 'alphabet-speech',
    title: 'Discurso Alfabético',
    description: 'Restricción creativa.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Empieza una frase con A: "Ayer fui..."',
      'Siguiente con B: "Buscaba pan..."',
      'Siguiente con C: "Cuando vi..."',
      'Llega hasta la Z.'
    ],
    benefit: 'Agilidad mental extrema.'
  },
  {
    id: 'headline-news',
    title: 'Titulares de Impacto',
    description: 'Síntesis.',
    category: 'IMPROVISATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Cuenta tu día de ayer en 3 titulares de periódico.',
      '1: "Hombre se levanta tarde".',
      '2: "Café salva la mañana".',
      '3: "Misión cumplida en el trabajo".',
      'Sé breve y pegadizo.'
    ],
    benefit: 'Aprender a resumir y titular ideas.'
  },
  {
    id: 'problem-solution',
    title: 'Problema-Solución (Rápido)',
    description: 'Estructura comercial.',
    category: 'IMPROVISATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Te dan un problema: "Lluvia".',
      'Inmediatamente ofrece una solución exagerada: "Paraguas dron".',
      'Problema: "Hambre". Solución: "Impresora de comida 3D".',
      'Entrena el cerebro resolutivo.'
    ],
    benefit: 'Mentalidad proactiva al hablar.'
  },
  {
    id: 'story-spine',
    title: 'Columna Vertebral de Pixar',
    description: 'Estructura narrativa.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Había una vez...',
      'Cada día...',
      'Hasta que un día...',
      'Debido a eso...',
      'Debido a eso...',
      'Hasta que finalmente...',
      'Completa los huecos.'
    ],
    benefit: 'La fórmula secreta de las historias que funcionan.'
  },
  {
    id: 'translate-tech',
    title: 'Traductor Técnico-Abuela',
    description: 'Adaptación de registro.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Di una frase técnica: "Optimizar el funnel de conversión".',
      'Tradúcelo para tu abuela: "Hacer que más gente compre en la tienda".',
      'Hazlo con 3 conceptos complejos.',
      'La simplicidad es la máxima sofisticación.'
    ],
    benefit: 'Claridad universal.'
  },
  {
    id: 'three-things',
    title: 'Juego de las Tres Cosas',
    description: 'Enumeración rápida.',
    category: 'IMPROVISATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['wordsPerMinute'],
    requiredMode: 'AUDIO',
    steps: [
      'Dime 3 cosas que hay en una nevera. ¡Ya!',
      'Dime 3 razones para votar. ¡Ya!',
      'Dime 3 excusas para no ir. ¡Ya!',
      'Acostúmbrate a pensar en tríadas.'
    ],
    benefit: 'El cerebro adora el número 3.'
  },
  {
    id: 'silence-filler',
    title: 'Rellenar el Silencio (No hacerlo)',
    description: 'Control de impulso.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pauseDuration'],
    requiredMode: 'AUDIO',
    steps: [
      'Quédate en silencio frente al espejo o cámara.',
      'Siente el impulso IRREFRENABLE de decir algo.',
      'Resístelo 5 segundos más.',
      'Di "Gracias" y termina.',
      'Vencer el miedo al vacío.'
    ],
    benefit: 'Dominio del espacio.'
  },
  {
    id: 'rhyme-time',
    title: 'Tiempo de Rima',
    description: 'Conciencia fonética.',
    category: 'IMPROVISATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Di una frase que termine en "ón" (Corazón).',
      'La siguiente tiene que rimar (Melón).',
      'La siguiente (Canción).',
      'No pares el ritmo hasta que falles.'
    ],
    benefit: 'Mejora la musicalidad y el vocabulario activo.'
  },
  {
    id: 'rant-mode',
    title: 'Modo Queja (Rant)',
    description: 'Fluidez emocional.',
    category: 'IMPROVISATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Empieza a quejarte de algo trivial (el tráfico, el clima).',
      'Sube la intensidad gradualmente hasta la indignación cómica.',
      'No te censures. Deja salir el flujo.',
      'Es un excelente calentamiento vocal y mental.'
    ],
    benefit: 'Libera la voz reprimida.'
  },
  {
    id: 'compliment-shower',
    title: 'Lluvia de Elogios',
    description: 'Positividad rápida.',
    category: 'IMPROVISATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Mira un objeto feo.',
      'Encuentra 5 cosas buenas que decir de él en 30 segundos.',
      '"Es resistente, tiene carácter, es único..."',
      'Entrena el ojo para ver lo positivo.'
    ],
    benefit: 'Carisma instantáneo.'
  },
  {
    id: 'commercial-break',
    title: 'Pausa Comercial',
    description: 'Transiciones abruptas.',
    category: 'IMPROVISATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Estás hablando de un tema serio.',
      'De repente, interrumpe: "¡Y ahora una pausa para nuestros patrocinadores!".',
      'Inventa un anuncio de 10 segundos.',
      'Vuelve al tema serio como si nada.',
      'Flexibilidad cognitiva.'
    ],
    benefit: 'Romper patrones rígidos.'
  }
,
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH: ARTICULATION (Articulación y Dicción)
  // -------------------------------------------------------------------------
  {
    id: 'pencil-prop',
    title: 'El Lápiz Obstáculo',
    description: 'Entrenamiento de sobre-esfuerzo.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Sostén un lápiz horizontalmente con los dientes (mordida suave).',
      'Lee un texto exagerando la vocalización para que se entienda.',
      'Siente cómo trabaja la lengua "saltando" el lápiz.',
      'Quítate el lápiz y lee de nuevo. ¡Vuelas!'
    ],
    benefit: 'Libera la lengua y mejora la dicción instantáneamente.'
  },
  {
    id: 'cork-exercise',
    title: 'El Corcho Frontal',
    description: 'Apertura de mandíbula.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Sostén un corcho (o dedo gordo) verticalmente entre tus dientes frontales.',
      'Lee intentando que los labios rodeen el corcho al pronunciar.',
      'Obliga a la mandíbula a mantenerse abierta.',
      'Excelente para voces "cerradas" o masculleos.'
    ],
    benefit: 'Aumenta resonancia y claridad vocálica.'
  },
  {
    id: 'tongue-twister-r',
    title: 'Trabalenguas del RR',
    description: 'Potencia vibratoria.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Repite: "Erre con erre cigarro, erre con erre barril".',
      '"Rápido corren los carros, los carros del ferrocarril".',
      'Exagera la vibración de la lengua.',
      'Siente el cosquilleo en el paladar.'
    ],
    benefit: 'Activa la punta de la lengua.'
  },
  {
    id: 'tongue-twister-s',
    title: 'Trabalenguas Seseante',
    description: 'Control de sibilantes.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      '"Sancha Sánchez sierra seis sierras con seis sierras suecas".',
      'Evita que el aire silbe excesivamente (quedarse sin aire).',
      'Mantén la S nítida pero corta.'
    ],
    benefit: 'Corrige silbidos molestos en el micrófono.'
  },
  {
    id: 'tongue-twister-explosive',
    title: 'Explosión P-T-K',
    description: 'Consonantes plosivas.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Di con fuerza: "Pa - Ta - Ka".',
      'Repite acelerando: "PaTaKa, PaTaKa, PaTaKa".',
      'Que cada sonido explote aire en tu mano frente a la boca.',
      'Fortalece labios y parte de atrás de la lengua.'
    ],
    benefit: 'Claridad percusiva.'
  },
  {
    id: 'lip-stretch',
    title: 'Estiramiento Labial (Besito-Sonrisa)',
    description: 'Flexibilidad orbicular.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Tira un beso exagerado al frente (morritos).',
      'Estira una sonrisa forzada a los lados (enseñando dientes).',
      'Alterna rápido: Beso-Sonrisa-Beso-Sonrisa.',
      'Hazlo 10 veces hasta sentir calor.'
    ],
    benefit: 'Despierta los músculos faciales perezosos.'
  },
  {
    id: 'tongue-circles',
    title: 'Círculos Linguales (Limpiar dientes)',
    description: 'Agilidad de la lengua.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Cierra la boca.',
      'Pasa la lengua por fuera de los dientes (entre dientes y labios).',
      'Haz un círculo completo masajeando encías.',
      '5 vueltas a un lado, 5 al otro.'
    ],
    benefit: 'Soltura de la raíz de la lengua.'
  },
  {
    id: 'vowel-shapes',
    title: 'Las Vocales Mudas',
    description: 'Memoria muscular.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Di A, E, I, O, U pero SIN SONIDO.',
      'Exagera la forma de la boca al máximo.',
      'A (vertical), E (horizontal), I (sonrisa), O (círculo), U (besito).',
      'Asegura que cada forma es distinta.'
    ],
    benefit: 'Define la "arquitectura" de tu boca.'
  },
  {
    id: 'consonant-endings',
    title: 'Finales de Consonante',
    description: 'Evitar comerse letras.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee: "Verdad, Bondad, Salud, Pared".',
      'Asegúrate de que la "D" final suene y no sea "Verdá".',
      'Exagera el final: "Verda-D".',
      'Haz lo mismo con las "S" finales.'
    ],
    benefit: 'Acabados profesionales en cada palabra.'
  },
  {
    id: 'velocity-drill',
    title: 'Taladro de Velocidad',
    description: 'Articulación rápida.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['wordsPerMinute'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma un párrafo.',
      'Léelo a velocidad normal.',
      'Léelo al doble de velocidad (sin perder claridad).',
      'Léelo al triple.',
      'La lengua debe bailar, no tropezar.'
    ],
    benefit: 'Agilidad neurolingüística.'
  },
  {
    id: 'b-p-labial',
    title: 'Bilabiales Explosivas (B/P)',
    description: 'Fuerza de labios.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Di "Bomba". Siente el contacto de labios.',
      'Di "Pompa". Siente la explosión de aire.',
      'Repite "Bomba-Pompa" asegurando el cierre total de labios.',
      'Si no cierras bien, suena "Womba".'
    ],
    benefit: 'Evita sonidos vagos.'
  },
  {
    id: 'm-n-resonance',
    title: 'Resonancia Nasal (M/N)',
    description: 'vibración de máscara.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Di "Mmmmmm" sintiendo vibrar los labios.',
      'Di "Nnnnnn" sintiendo vibrar la nariz.',
      'Di "Ma-Na-Ma-Na".',
      'Lleva esa vibración al frente de la cara.'
    ],
    benefit: 'Proyección sin esfuerzo (máscara resonadora).'
  },
  {
    id: 'over-enunciation',
    title: 'Sobre-Enunciación',
    description: 'Entrenamiento con pesas.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee 2 minutos moviendo la boca el DOBLE de lo normal.',
      'Que te duela un poco la cara.',
      'Parecerás un dibujo animado.',
      'Vuelve a normal: tu dicción será cristalina.'
    ],
    benefit: 'Activa musculatura dormida.'
  },
  {
    id: 'l-release',
    title: 'Liberación de la L',
    description: 'Agilidad de punta.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Di "La, Le, Li, Lo, Lu".',
      'La lengua debe tocar los dientes superiores y CAER rápido.',
      'No la dejes pegada.',
      'Un golpe limpio y veloz.'
    ],
    benefit: 'Sonido líquido y ágil.'
  },
  {
    id: 'glottal-fry-fix',
    title: 'Corrección de Fry (Voz frita)',
    description: 'Limpieza vocal.',
    category: 'ARTICULATION',
    difficulty: 'ADVANCED',
    targetMetrics: ['pitchRange'],
    requiredMode: 'AUDIO',
    steps: [
      'Si tu voz suena como "krrr" al final de frases.',
      'Añade un poco más de aire.',
      'Sube el tono ligeramente.',
      'El Fry ocurre por falta de presión de aire.'
    ],
    benefit: 'Salud vocal a largo plazo.'
  },
  {
    id: 'staccato-reading',
    title: 'Lectura Silábica',
    description: 'Ritmo preciso.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee un texto separando CADA sílaba.',
      '"Ho-la-co-mo-es-tas".',
      'Marca cada golpe con la mano.',
      'Asegura que ninguna sílaba sea más débil que otra.'
    ],
    benefit: 'Iguala la energía de la frase.'
  },
  {
    id: 'whisper-articulaton',
    title: 'Articulación en Susurro',
    description: 'Foco en consonantes.',
    category: 'ARTICULATION',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee en un susurro audible.',
      'Como no tienes volumen, dependes 100% de la claridad de consonantes.',
      'Exagera T, P, S, K.',
      'Si se te entiende susurrando, se te entenderá gritando.'
    ],
    benefit: 'Foco puro en dicción.'
  },
  {
    id: 'yawn-sigh',
    title: 'Bostezo-Suspiro',
    description: 'Apertura de garganta.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Provoca un bostezo grande (abre garganta).',
      'Termina el bostezo con un suspiro sonoro "Haaaaa".',
      'Ese espacio abierto es tu resonador ideal.',
      'Habla desde ahí.'
    ],
    benefit: 'Voz redonda y completa.'
  },
  {
    id: 'tongue-stretch',
    title: 'Estiramiento Lingual (Yoga)',
    description: 'Sacar la lengua.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['energyStability'],
    requiredMode: 'AUDIO',
    steps: [
      'Saca la lengua todo lo que puedas hacia la barbilla.',
      'Saca la lengua todo lo que puedas hacia la nariz.',
      'Es feo pero necesario.',
      'Estira la raíz de la lengua.'
    ],
    benefit: 'Evita la voz "engolada" (tragar las palabras).'
  },
  {
    id: 'number-count',
    title: 'Conteo Explosivo',
    description: 'Energía inicial.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['volume'],
    requiredMode: 'AUDIO',
    steps: [
      'Cuenta del 1 al 10.',
      'Lanza cada número como si fuera una pelota de tenis.',
      'No los conectes.',
      'UNO! DOS! TRES!',
      'Usa el diafragma en cada golpe.'
    ],
    benefit: 'Ataque limpio de sonido.'
  },
  {
    id: 'final-smile',
    title: 'La Sonrisa Final',
    description: 'Postura de descanso.',
    category: 'ARTICULATION',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Termina tus frases con una micro-relajación ascendente de labios.',
      'Ayuda a que el sonido "brille" al final.',
      'Evita que el final de la frase "caiga" y se apague.'
    ],
    benefit: 'Tono siempre positivo y audible.'
  },
  
  // -------------------------------------------------------------------------
  // 📚 EXPANSION BATCH: VOCABULARY (Vocabulario Activo)
  // -------------------------------------------------------------------------
  {
    id: 'active-verbs',
    title: 'Verbos Activos',
    description: 'Energía gramatical.',
    category: 'VOCABULARY',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma una frase pasiva: "La decisión fue tomada por mí".',
      'Cámbiala a activa: "Yo decidí".',
      'Hazlo con 5 frases de tu último email.',
      'Los verbos activos son el motor de la persuasión.'
    ],
    benefit: 'Ahorra palabras y denota liderazgo.'
  },
  {
    id: 'anti-very',
    title: 'El Anti-Muy',
    description: 'Precisión léxica.',
    category: 'VOCABULARY',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Prohibido decir "Muy".',
      'No digas "Muy cansado", di "Exhausto".',
      'No digas "Muy bueno", di "Excelente".',
      'No digas "Muy rápido", di "Veloz".',
      'Enriquece tu paleta de colores mentales.'
    ],
    benefit: 'Te hace sonar más culto y específico.'
  },
  {
    id: 'sensory-words',
    title: 'Palabras Sensoriales',
    description: 'Pintar imágenes.',
    category: 'VOCABULARY',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Describe un café sin decir "rico".',
      'Usa: "Amargo, caliente, humeante, oscuro, terroso".',
      'Apela a los 5 sentidos (VISTA, OÍDO, GUSTO, OLFATO, TACTO).',
      'La gente no recuerda conceptos, recuerda sensaciones.'
    ],
    benefit: 'Hace tu discurso memorable y cinematográfico.'
  },
  {
    id: 'kill-fillers',
    title: 'Asesino de Muletillas',
    description: 'Limpieza verbal.',
    category: 'VOCABULARY',
    difficulty: 'BEGINNER',
    targetMetrics: ['pauseDuration'],
    requiredMode: 'AUDIO',
    steps: [
      'Grábate 1 minuto.',
      'Cuenta tus "Eh...", "Mmm...", "O sea...", "Este...".',
      'Repite la grabación sustituyendo cada muletilla por un SILENCIO.',
      'El silencio es inteligente. La muletilla es ruido.'
    ],
    benefit: 'Autoridad instantánea.'
  },
  {
    id: 'transition-magic',
    title: 'Transiciones Mágicas',
    description: 'Pegamento de ideas.',
    category: 'VOCABULARY',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'No digas "Y también... Y luego...".',
      'Usa: "Por el contrario...", "En consecuencia...", "Además...", "Sin embargo...".',
      'Conecta tus ideas con lógica, no solo con adición.',
      'Guía al oyente por tu mapa mental.'
    ],
    benefit: 'Fluidez lógica profesional.'
  },
  {
    id: 'concrete-concrete',
    title: 'Lo Concreto Gana',
    description: 'Evitar abstracciones.',
    category: 'VOCABULARY',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'No digas "Hicimos mejoras en el vehículo".',
      'Di "Cambiamos los frenos y pintamos la puerta".',
      'No digas "Soy flexible".',
      'Di "Puedo trabajar los domingos".',
      'El cerebro ama lo específico.'
    ],
    benefit: 'Evita malentendidos y vaguedad.'
  },
  {
    id: 'power-triad',
    title: 'La Tríada de Poder',
    description: 'Retórica clásica.',
    category: 'VOCABULARY',
    difficulty: 'ADVANCED',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Agrupa tus adjetivos de 3 en 3.',
      '"Es seguro, rápido y barato".',
      '"Sangre, sudor y lágrimas".',
      'Nunca digas 2 o 4 si puedes decir 3.'
    ],
    benefit: 'Ritmo hipnótico y citable.'
  },
  {
    id: 'simple-explanation',
    title: 'Explicación Feynman',
    description: 'Simplicidad radical.',
    category: 'VOCABULARY',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Explica tu trabajo sin usar NINGUNA jerga técnica.',
      'Como si hablaras con un niño de 12 años.',
      'Si no puedes hacerlo simple, no lo entiendes bien.',
      'Usa palabras de 2 sílabas máximo.'
    ],
    benefit: 'Claridad universal.'
  },
  {
    id: 'analogy-generator',
    title: 'Generador de Analogías',
    description: 'Puentes de comprensión.',
    category: 'VOCABULARY',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      'X es como Y.',
      '"El CPU es el cerebro de la computadora".',
      '"El flujo de caja es la sangre del negocio".',
      'Inventa una analogía para tu emoción actual.'
    ],
    benefit: 'El atajo cognitivo más rápido.'
  },
  {
    id: 'short-sentences',
    title: 'Frases Cortas',
    description: 'Golpear, no acariciar.',
    category: 'VOCABULARY',
    difficulty: 'BEGINNER',
    targetMetrics: ['rhythmConsistency'],
    requiredMode: 'AUDIO',
    steps: [
      'Toma un párrafo largo lleno de comas.',
      'Córtalo en frases de sujeto-verbo-predicado. Punto.',
      'Sin subordinadas.',
      'Suena más fuerte. Más seguro. Más directo.'
    ],
    benefit: 'Potencia y masculinidad en el discurso.'
  },
  {
    id: 'we-language',
    title: 'Lenguaje del "Nosotros"',
    description: 'Inclusión.',
    category: 'VOCABULARY',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Sustituye "Yo quiero" por "Nosotros necesitamos".',
      'Sustituye "Ustedes deben" por "Juntos podemos".',
      'Crea comunidad con tus pronombres.',
      'Elimina la barrera orador-audiencia.'
    ],
    benefit: 'Liderazgo inclusivo.'
  },
  {
    id: 'positive-framing',
    title: 'Encuadre Positivo',
    description: 'Psicología lingüística.',
    category: 'VOCABULARY',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'No digas "No olvides traer el libro".',
      'Di "Recuerda traer el libro".',
      'No digas "No llegues tarde".',
      'Di "Llega puntual".',
      'El cerebro ignora el "No" y visualiza la acción.'
    ],
    benefit: 'Instrucciones más efectivas.'
  },
  {
    id: 'contrast-pairs',
    title: 'Pares de Contraste',
    description: 'Claridad por oposición.',
    category: 'VOCABULARY',
    difficulty: 'ADVANCED',
    targetMetrics: ['score_claridad'],
    requiredMode: 'AUDIO',
    steps: [
      '"No preguntes qué puede hacer tu país por ti, pregunta qué puedes hacer tú por tu país".',
      '"No es lo que dices, es cómo lo dices".',
      'Estructura: No X, sino Y.',
      'Define lo que NO es para aclarar lo que SÍ es.'
    ],
    benefit: 'Definición nítida.'
  },
  {
    id: 'call-to-action-verb',
    title: 'Verbo de Llamada a la Acción',
    description: 'Cierre imperativo.',
    category: 'VOCABULARY',
    difficulty: 'BEGINNER',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Nunca termines con "Bueno, eso es todo".',
      'Termina con un verbo imperativo: "Empiecen hoy".',
      '"Llama". "Compra". "Vota". "Cambia".',
      'Dile a la gente exactamente qué hacer.'
    ],
    benefit: 'Convierte palabras en hechos.'
  },
  {
    id: 'eliminating-weakifiers',
    title: 'Eliminar Debilitadores',
    description: 'Confianza verbal.',
    category: 'VOCABULARY',
    difficulty: 'INTERMEDIATE',
    targetMetrics: ['score_seguridad'],
    requiredMode: 'AUDIO',
    steps: [
      'Borra: "Creo que...", "En mi opinión...", "Un poco...", "Quizás...".',
      'Di la frase sin el preludio.',
      'En lugar de "Creo que esto funcionará", di "Esto funcionará".',
      'Tú eres la fuente, no te disculpes.'
    ],
    benefit: 'Proyección de certeza.'
  },
  {
    id: 'silent-reading',
    title: 'Lectura Silenciosa (Endofasia)',
    description: 'Velocidad de pensamiento.',
    category: 'VOCABULARY',
    difficulty: 'ADVANCED',
    targetMetrics: ['wordsPerMinute'],
    requiredMode: 'AUDIO',
    steps: [
      'Lee un texto rápido sin mover NADA los labios.',
      'Ni siquiera la lengua dentro de la boca.',
      'Aprende a procesar palabras como imágenes, no como sonidos.',
      'Esto acelera tu capacidad de absorción de información.'
    ],
    benefit: 'Pensamiento más veloz que el habla.'
  }
];
