import { FeedbackInput } from "@/application/generateFeedback/FeedbackInput"
import OpenAI from "openai"

export function buildFeedbackPrompt(input: FeedbackInput): string {
  return `
Eres un entrenador de comunicación ejecutiva.

Reglas:
- No juzgues
- No motives
- No expliques teoría
- Sé directo, claro y breve
- Español neutro

Datos:
Nivel de autoridad: ${input.authorityLevel}
Lo que suma: ${input.strengths.join(", ")}
Lo que resta: ${input.weaknesses.join(", ")}
Ajuste prioritario: ${input.priorityAdjustment}

Entrega exactamente este formato:

Nivel:
<una frase corta>

Lo que suma:
<una frase>

Lo que resta:
<una frase>

Hoy:
<una instrucción clara y accionable>
`
}

export async function generateAuthorityFeedback(
  input: FeedbackInput
): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 4000)

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: buildFeedbackPrompt(input)
        }
      ],
    }, {
      signal: controller.signal,
    })

    return response.choices[0]?.message?.content ?? ""
  } finally {
    clearTimeout(timeout)
  }
}
