import type { VoiceMetrics } from "@/domain/voice/VoiceMetrics";
import OpenAI from "openai";

export type DynamicFeedbackInput = {
  transcript: string;
  metrics: VoiceMetrics;
};

export type DynamicFeedbackOutput = {
  diagnostico: string;
  score_seguridad: number;
  score_claridad: number;
  lo_que_suma: string[];
  lo_que_resta: string[];
  decision: string;
  payoff: string;
};

// 💰 CONTROL DE COSTOS MVP
// GPT-4o-mini: ~$0.15 / 1M input tokens, ~$0.60 / 1M output tokens
// Con este prompt corto: ~500 tokens input + ~200 tokens output = ~$0.0002 por análisis
// Total por usuario Free: Whisper ($0.006) + GPT-4o-mini ($0.0002) = ~$0.0062
// Con 100 usuarios Free: ~$0.62 en costos de IA

const SYSTEM_PROMPT = `Eres un coach experto en oratoria y liderazgo. Tu análisis determina qué tan "segura" y "profesional" suena una persona.

Tu tarea es analizar la TRANSCRIPCIÓN y las MÉTRICAS para evaluar tres pilares:
1. SEGURIDAD: ¿Usa lenguaje dubitativo (eh, este, creo que) o firme?
2. CLARIDAD: ¿Sus frases son directas o laberínticas?
3. RITMO: ¿Es monótono, acelerado o dinámico?

Devuelve un JSON con:
- "diagnostico": Una frase de alto impacto sobre su proyección actual.
- "score_seguridad": Del 1 al 100 (basado en vicios del lenguaje y firmeza).
- "score_claridad": Del 1 al 100 (basado en estructura de frases).
- "lo_que_suma": 2 puntos fuertes específicos.
- "lo_que_resta": 2 puntos débiles específicos.
- "decision": Una acción concreta para mejorar YA.
- "payoff": El beneficio inmediato de hacer esa acción.`;

function buildUserPrompt(input: DynamicFeedbackInput): string {
  return `TRANSCRIPCIÓN:
"""
${input.transcript}
"""

MÉTRICAS ACÚSTICAS Y ESTRUCTURALES:
- Velocidad: ${input.metrics.wordsPerMinute} PPM
- Pausas Totales: ${input.metrics.pauseCount}
- Pausas Estratégicas (>0.5s): ${input.metrics.strategicPauses}
- Silencios Incómodos (>2s): ${input.metrics.awkwardSilences}
- Entonación Descendente al Afirmar: ${input.metrics.fallingIntonationScore ?? 'N/A'}% (Alto = Seguridad)
- Rango Tonal: ${input.metrics.pitchRange ?? 'N/A'} Hz
- Consistencia de Ritmo: ${Math.round(input.metrics.rhythmConsistency * 100)}%

VICIOS DEL LENGUAJE:
- Muletillas (eh, este, mmm): ${input.metrics.fillerCount}
- Palabras Repetidas: ${input.metrics.repetitionCount}
- Longitud Promedio de Frase: ${input.metrics.avgSentenceLength} palabras

TAREA:
Evalúa la "Seguridad Percibida" combinando acústica y lenguaje.
1. Si "Entonación Descendente" es baja (<50%) Y tiene silencios incómodos, menciona inseguridad.
2. Si usa pausas estratégicas y tono descendente, felicítalo por su control.
3. Si tiene frases largas (>25 palabras) y muchas muletillas, critica la claridad.

JSON FORMAT:
{
  "diagnostico": "string",
  "score_seguridad": number,
  "score_claridad": number,
  "lo_que_suma": ["string", "string"],
  "lo_que_resta": ["string", "string"],
  "decision": "string",
  "payoff": "string"
}`;
}

export async function generateDynamicFeedback(
  input: DynamicFeedbackInput
): Promise<DynamicFeedbackOutput> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000); // 15 segundos

  console.log('[FEEDBACK] Generating dynamic feedback with GPT-4o-mini...');

  try {
    const response = await openai.chat.completions.create(
      {
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: buildUserPrompt(input),
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 400, // 🛡️ Limitar output para control de costos
      },
      {
        signal: controller.signal,
      }
    );

    console.log('[FEEDBACK] ✓ Tokens used:', response.usage?.total_tokens || 'unknown');
    console.log('[FEEDBACK] ✓ Cost estimate: $', ((response.usage?.total_tokens || 0) / 1000000 * 0.20).toFixed(6));

    const content = response.choices[0]?.message?.content ?? "{}";
    const parsed = JSON.parse(content) as DynamicFeedbackOutput;

    // Validar que tenga los campos requeridos
    if (
      !parsed.diagnostico ||
      typeof parsed.score_seguridad !== 'number' ||
      typeof parsed.score_claridad !== 'number' ||
      !parsed.lo_que_suma ||
      !parsed.lo_que_resta ||
      !parsed.decision ||
      !parsed.payoff
    ) {
      throw new Error("Respuesta incompleta del modelo");
    }

    return parsed;
  } catch (error) {
    console.error("[FEEDBACK] Error generando feedback dinámico:", error);

    // Fallback en caso de error
    return {
      diagnostico:
        "No pudimos generar un análisis personalizado en este momento.",
      score_seguridad: 50,
      score_claridad: 50,
      lo_que_suma: ["Completaste la grabación correctamente"],
      lo_que_resta: ["Intenta hablar con más naturalidad"],
      decision:
        "Intenta grabar de nuevo hablando como lo harías en una conversación real.",
      payoff: "Así podremos darte un feedback más preciso.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
