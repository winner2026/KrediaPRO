import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OpenAI API key" },
      { status: 500 }
    );
  }

  const { default: OpenAI } = await import("openai");
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const { prompt } = await req.json();

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "Eres un asistente calmado, breve y humano. Máximo una frase.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: 60,
    temperature: 0.4,
  });

  const text = response.choices[0]?.message?.content ?? "";

  return NextResponse.json({ text });
}
