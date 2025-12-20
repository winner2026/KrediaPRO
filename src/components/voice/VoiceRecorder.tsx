"use client";

import { useEffect, useRef, useState } from "react";

export default function VoiceRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
      setAudioBlob(blob);
      setAudioUrl(URL.createObjectURL(blob));
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  const reRecord = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    audioChunksRef.current = [];
  };

  const submitAudio = async () => {
    if (!audioBlob) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("audio", audioBlob);

    await fetch("/api/analysis", {
      method: "POST",
      body: formData,
    });

    setIsSubmitting(false);
  };

  return (
    <div className="space-y-4">
      {!audioBlob && (
        <div>
          {!isRecording ? (
            <button onClick={startRecording} className="btn-primary">
              ??? Grabar
            </button>
          ) : (
            <button onClick={stopRecording} className="btn-danger">
              ?? Detener
            </button>
          )}
        </div>
      )}

      {audioUrl && (
        <div className="space-y-3">
          <audio controls src={audioUrl} />

          <div className="flex gap-2">
            <button onClick={reRecord} className="btn-secondary">
              ?? Regrabar
            </button>

            <button
              onClick={submitAudio}
              disabled={isSubmitting}
              className="btn-primary"
            >
              {isSubmitting ? "Analizando..." : "? Enviar"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
