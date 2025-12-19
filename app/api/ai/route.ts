import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// MODELO FIJO DEL PRODUCTO
const MODEL = "gpt-4o-mini";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await client.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente financiero calmado, breve y humano. No juzgas. Máximo una frase.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 60,
    temperature: 0.4,
  });

  const text = response.choices[0]?.message?.content ?? "";
  return Response.json({ text });
}
