"use client";

import { useEffect, useRef, useState } from "react";

interface AudioRecorderProps {
  onAnalyze: (audio: Blob) => void;
}

type RecorderState = "idle" | "recording" | "recorded";

export default function AudioRecorder({ onAnalyze }: AudioRecorderProps) {
  const [state, setState] = useState<RecorderState>("idle");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    chunksRef.current = [];

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      const url = URL.createObjectURL(blob);

      setAudioBlob(blob);
      setAudioUrl(url);
      setState("recorded");

      stream.getTracks().forEach((track) => track.stop());
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setState("recording");
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const rerecord = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setState("idle");
  };

  return (
    <div className="space-y-6 rounded-xl border p-6 max-w-xl">
      {state === "idle" && (
        <>
          <button
            onClick={startRecording}
            className="w-full rounded-lg bg-black text-white py-3 text-lg"
          >
            Comenzar grabación
          </button>
          <p className="text-sm text-gray-500 text-center">
            Nadie te escucha. Puedes regrabar cuantas veces quieras.
          </p>
        </>
      )}

      {state === "recording" && (
        <>
          <p className="text-center font-medium">Grabando… habla con calma</p>
          <p className="text-sm text-gray-500 text-center">
            Menos velocidad = más autoridad
          </p>

          <button
            onClick={stopRecording}
            className="w-full rounded-lg bg-red-600 text-white py-3"
          >
            Detener
          </button>
        </>
      )}

      {state === "recorded" && audioUrl && (
        <>
          <p className="text-center font-medium">
            Escúchate con atención. ¿Suena como alguien al que seguirías?
          </p>

          <audio controls src={audioUrl} className="w-full" />

          <div className="flex gap-3">
            <button onClick={rerecord} className="flex-1 rounded-lg border py-3">
              Regrabar
            </button>

            <button
              onClick={() => audioBlob && onAnalyze(audioBlob)}
              className="flex-1 rounded-lg bg-black text-white py-3"
            >
              Analizar mi forma de hablar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
