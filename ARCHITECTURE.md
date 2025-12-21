# Arquitectura de Oratoria Efectiva

## Principios fundamentales

Esta aplicación sigue 4 reglas estrictas:

1. **Una pantalla = una intención**
2. **Un endpoint = una responsabilidad**
3. **Neon guarda, no piensa**
4. **GPT escribe, no decide flujos**

---

## Flujo de usuario

```
┌─────────────┐
│ / (Landing) │ → Explica qué va a pasar
└──────┬──────┘
       │
       v
┌──────────────┐
│  /practice   │ → Graba audio (10-30s)
└──────┬───────┘
       │ POST /api/analysis
       v
┌──────────────┐
│  /results    │ → Muestra feedback real
└──────────────┘
```

---

## Responsabilidades de cada capa

### Pantallas (app/)

| Ruta | Responsabilidad | NO hace |
|------|----------------|---------|
| `/` | Redirect a `/listen` | - |
| `/listen` | Landing: promesa emocional | Grabar, analizar |
| `/practice` | Capturar audio + enviar a API | Analizar, calcular |
| `/results` | Renderizar datos de localStorage | Pensar, procesar |

**Regla**: Las pantallas NO calculan. Solo muestran datos que ya vienen procesados.

---

### API Routes (app/api/)

| Endpoint | Responsabilidad |
|----------|----------------|
| `POST /api/analysis` | **Único** punto de análisis de voz |

**Regla**: Un solo endpoint para análisis. No duplicar lógica.

**Flujo de /api/analysis**:
```
1. Recibe audio (FormData)
2. → analyzeVoiceUseCase(audioBuffer)
3. → saveVoiceAnalysis(userId, result)  // cuando haya auth
4. → Retorna VoiceAnalysisResult
```

---

### Application Layer (src/application/)

| Archivo | Responsabilidad |
|---------|----------------|
| `analyzeVoice/analyzeVoiceUseCase.ts` | Orquesta el análisis completo |
| `tracking/saveVoiceSession.ts` | Guarda resultado en Neon |

**analyzeVoiceUseCase** hace:
1. Transcribir con Whisper
2. Extraer métricas de audio
3. Calcular score de autoridad
4. Generar feedback con GPT-4o-mini
5. Retornar `VoiceAnalysisResult`

**saveVoiceAnalysis** hace:
- Insertar TODO el resultado en Neon
- NO calcula, NO procesa, SOLO guarda

---

### Domain Layer (src/domain/)

#### VoiceMetrics
```ts
export type VoiceMetrics = {
  wordsPerMinute: number;
  avgPauseDuration: number;
  pauseCount: number;
  fillerCount: number;
  pitchVariation: number;
  energyStability: number;
}

export function extractMetrics(
  transcription: string,
  segments: TranscriptionSegment[],
  durationSeconds: number
): VoiceMetrics
```

**Responsabilidad**: Calcular métricas técnicas del audio.

---

#### AuthorityScore
```ts
export type AuthorityLevel = "LOW" | "MEDIUM" | "HIGH";

export interface AuthorityScore {
  level: AuthorityLevel;
  strengths: string[];
  weaknesses: string[];
  priorityAdjustment: PriorityAdjustment;
  score: number;
}

export function buildAuthorityScore(metrics: VoiceMetrics): AuthorityScore
```

**Responsabilidad**: Convertir métricas técnicas en score de autoridad.

---

#### VoiceAnalysisResult
```ts
export interface VoiceAnalysisResult {
  transcription: string;
  transcriptionWithSilences: string;
  metrics: VoiceMetrics;
  durationSeconds: number;
  authorityScore: AuthorityScore;
  feedback: {
    diagnostico: string;
    lo_que_suma: string[];
    lo_que_resta: string[];
    decision: string;
    payoff: string;
  };
  createdAt?: string;
  sessionId?: string;
}
```

**Contrato único**: Este es el tipo que circula por toda la app.

---

### Infrastructure Layer (src/infrastructure/)

#### OpenAI

| Archivo | Responsabilidad |
|---------|----------------|
| `transcription.ts` | Llamar Whisper API |
| `feedback.ts` | Llamar GPT-4o-mini para feedback |

**Regla**: Infrastructure NO decide qué hacer con los datos. Solo ejecuta servicios externos.

---

#### Database (Neon)

| Archivo | Responsabilidad |
|---------|----------------|
| `client.ts` | Pool de conexiones |
| `repositories/voiceRepository.ts` | (Actualmente vacío) |

**saveVoiceAnalysis** guarda en tabla `voice_sessions`:
```sql
INSERT INTO voice_sessions (
  user_id,
  transcription,
  transcription_with_silences,
  words_per_minute,
  avg_pause_duration,
  pause_count,
  filler_count,
  pitch_variation,
  energy_stability,
  duration_seconds,
  authority_level,
  authority_score,
  strengths,
  weaknesses,
  priority_adjustment,
  feedback_diagnostico,
  feedback_lo_que_suma,
  feedback_lo_que_resta,
  feedback_decision,
  feedback_payoff,
  created_at
) VALUES (...)
```

**Regla**: Neon solo guarda. No calcula scoring ni feedback.

---

## Puntos de extensión futuros

### Historial Premium (/history)

Cuando implementes historial:

1. Crear `app/history/page.tsx`
2. Leer de Neon con query:
   ```sql
   SELECT * FROM voice_sessions
   WHERE user_id = $1
   ORDER BY created_at DESC
   ```
3. Mostrar lista de sesiones
4. Al hacer clic → redirigir a `/results?sessionId=xxx`

**Regla**: NO duplicar lógica. Reusar `/results` para mostrar detalles.

---

### Autenticación

Cuando agregues auth:

1. Descomentar en `/api/analysis`:
   ```ts
   const userId = await getUserIdFromSession();
   const sessionId = await saveVoiceAnalysis(userId, result);
   ```

2. Crear middleware de autenticación
3. Proteger rutas premium

---

## Estructura de archivos (limpia)

```
src/
├── application/
│   ├── analyzeVoice/
│   │   └── analyzeVoiceUseCase.ts
│   └── tracking/
│       └── saveVoiceSession.ts
│
├── domain/
│   ├── authority/
│   │   └── AuthorityScore.ts
│   └── voice/
│       ├── VoiceMetrics.ts
│       └── VoiceAnalysisResult.ts
│
├── infrastructure/
│   ├── db/
│   │   ├── client.ts
│   │   └── repositories/
│   │       └── voiceRepository.ts
│   └── openai/
│       ├── feedback.ts
│       └── transcription.ts
│
└── components/
    └── voice/
        └── VoiceRecorder.tsx

app/
├── api/
│   └── analysis/
│       └── route.ts          ← ÚNICO endpoint de análisis
├── listen/
│   └── page.tsx              ← Landing
├── practice/
│   └── page.tsx              ← Grabación
└── results/
    └── page.tsx              ← Feedback (pantalla principal)
```

---

## Qué NO existe (intencionalmente)

- ❌ `/analyzer` → Eliminado (violaba regla: la UI calculaba)
- ❌ `/api/ai` → Eliminado (endpoint duplicado)
- ❌ Lógica de negocio en pantallas
- ❌ Múltiples endpoints de análisis
- ❌ Cálculos en el frontend

---

## Checklist de calidad

Antes de hacer deploy, verificar:

- [ ] `/api/analysis` es el ÚNICO endpoint de análisis
- [ ] Las pantallas solo renderizan (no calculan)
- [ ] `VoiceAnalysisResult` es el contrato único
- [ ] Neon guarda TODO el resultado (no solo `authorityLevel`)
- [ ] Build pasa sin errores: `npm run build`
- [ ] No hay duplicación de lógica

---

## Próximos pasos recomendados

1. ✅ Crear tabla `voice_sessions` en Neon con el esquema completo
2. ✅ Implementar autenticación básica
3. ✅ Crear `/history` para historial premium
4. ⚠️  Agregar tests unitarios para `extractMetrics` y `buildAuthorityScore`
5. ⚠️  Implementar rate limiting en `/api/analysis`

---

**Última actualización**: 2024-12-21
**Versión de arquitectura**: 2.0 (limpia, sin código de finanzas)
