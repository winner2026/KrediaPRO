import OpenAI from "openai";
import { toFile } from "openai/uploads";

export type TranscriptionSegment = {
  id: number;
  start: number;
  end: number;
  text: string;
};

export type TranscriptionResult = {
  text: string;
  segments: TranscriptionSegment[];
  duration: number;
};

// 💰 CONTROL DE COSTOS MVP
// Whisper cobra ~$0.006 por minuto
// Límite: 60 segundos = ~$0.006 por análisis Free
const MAX_AUDIO_DURATION_SECONDS = 60;

export async function transcribeAudio(audio: Buffer): Promise<TranscriptionResult> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log('[WHISPER] Audio buffer size:', audio.length, 'bytes');

  // Convertir Buffer a File usando el helper de OpenAI
  const file = await toFile(audio, "audio-input.mp3");

  console.log('[WHISPER] Calling Whisper API...');
  const transcription = await openai.audio.transcriptions.create({
    file,
    model: "whisper-1",
    response_format: "verbose_json",
    language: "es",
  });

  // ✅ LOG CRÍTICO: Ver respuesta cruda de Whisper
  console.log('[WHISPER] Raw response:', JSON.stringify(transcription, null, 2));

  // ✅ VALIDACIÓN CRÍTICA: Verificar que text existe
  if (!transcription.text) {
    console.error('[WHISPER] ❌ Whisper devolvió payload sin text:', transcription);
    throw new Error('Whisper returned an unexpected payload without text. El audio podría estar vacío, corrupto, o ser demasiado corto.');
  }

  // ✅ VALIDACIÓN ADICIONAL: Verificar que text no está vacío
  if (transcription.text.trim() === '') {
    console.error('[WHISPER] ❌ Whisper devolvió texto vacío');
    throw new Error('Whisper no detectó ningún contenido de audio. El audio podría ser solo silencio o ruido.');
  }

  const duration = (transcription as any).duration || 0;

  // 🛡️ VALIDACIÓN DE DURACIÓN (control de costos)
  if (duration > MAX_AUDIO_DURATION_SECONDS) {
    console.error('[WHISPER] ❌ Audio demasiado largo:', duration, 'segundos (máximo:', MAX_AUDIO_DURATION_SECONDS, ')');
    throw new Error(`El audio es demasiado largo (${Math.round(duration)}s). Máximo permitido: ${MAX_AUDIO_DURATION_SECONDS}s.`);
  }

  console.log('[WHISPER] ✓ Transcription successful:', transcription.text.substring(0, 100) + '...');
  console.log('[WHISPER] ✓ Duration:', duration, 'seconds');
  console.log('[WHISPER] ✓ Segments count:', ((transcription as any).segments || []).length);

  return {
    text: transcription.text.trim(),
    segments: (transcription as any).segments || [],
    duration
  };
}
