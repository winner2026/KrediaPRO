export async function transcribeAudio(audio: Buffer): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is required to run Whisper transcription.');
  }

  const formData = new FormData();
  formData.append('model', 'whisper-1');
  formData.append('file', new Blob([new Uint8Array(audio)]), 'audio-input.mp3');

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Whisper transcription failed (${response.status}): ${body}`);
  }

  const payload = (await response.json()) as { text?: string };
  if (!payload.text) {
    throw new Error('Whisper returned an unexpected payload without text.');
  }

  return payload.text.trim();
}
