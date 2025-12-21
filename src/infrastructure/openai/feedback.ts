import type { VoiceMetrics } from "@/domain/voice/VoiceMetrics";
import OpenAI from "openai";

export type DynamicFeedbackInput = {
  transcript: string;
  metrics: VoiceMetrics;
};

export type DynamicFeedbackOutput = {
  diagnostico: string;
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

const SYSTEM_PROMPT = `Eres un analista experto en comunicación oral, autoridad vocal y percepción de liderazgo.

Tu tarea es evaluar cómo se percibe una voz al hablar en contextos reales
(reuniones, explicaciones, liderazgo).

No enseñas técnica.
No usas jerga.
Hablas claro, directo y humano.

Tu feedback debe ayudar a que la persona:
- entienda cómo suena
- sepa qué le suma
- sepa qué le resta
- sepa qué hacer en la próxima vez que hable`;

function buildUserPrompt(input: DynamicFeedbackInput): string {
  return `TRANSCRIPCIÓN COMPLETA (con muletillas y silencios):
"""
${input.transcript}
"""

MÉTRICAS OBJETIVAS:
- Palabras por minuto: ${input.metrics.wordsPerMinute}
- Cantidad de pausas: ${input.metrics.pauseCount}
- Duración promedio de pausas (seg): ${input.metrics.avgPauseDuration.toFixed(2)}
- Cantidad de muletillas: ${input.metrics.fillerCount}
- Variación tonal: ${input.metrics.pitchVariation.toFixed(2)}
- Estabilidad de energía: ${input.metrics.energyStability.toFixed(2)}

CONTEXTO:
La persona grabó su voz simulando una situación real
(reunión, explicación o presentación breve).

TAREA:
Genera un feedback ÚNICO y ESPECÍFICO para esta voz.

DEVUELVE ÚNICAMENTE este JSON (sin texto adicional):

{
  "diagnostico": "",
  "lo_que_suma": [],
  "lo_que_resta": [],
  "decision": "",
  "payoff": ""
}

REGLAS ESTRICTAS:
- El diagnóstico es UNA sola frase clara.
- "lo_que_suma": máximo 2 ítems.
- "lo_que_resta": máximo 2 ítems.
- Todo debe estar basado en ESTA transcripción y ESTAS métricas.
- No repitas frases genéricas.
- No menciones métricas ni números en el texto final.
- Lenguaje simple, cotidiano, sin tecnicismos.`;
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
