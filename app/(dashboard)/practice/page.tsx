"use client";

import { useState, useRef } from "react";

type RecordingState = "idle" | "recording" | "recorded" | "analyzing" | "result";

interface AnalysisResult {
  success: boolean;
  data: {
    authorityScore: {
      level: string;
      strengths: string[];
      weaknesses: string[];
      priorityAdjustment: string;
    };
    feedback: {
      levelLabel: string;
      adds: string;
      subtracts: string;
      today: string;
    };
    transcription: string;
  };
}

export default function PracticePage() {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [currentFocus, setCurrentFocus] = useState<string | null>(null);
  const [practiceCount, setPracticeCount] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        setRecordingState("recorded");

        // Detener el stream
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecordingState("recording");
    } catch (error) {
      console.error("Error al acceder al micrófono:", error);
      alert("No se pudo acceder al micrófono. Por favor, verifica los permisos.");
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  }

  function onReRecord() {
    // Liberar memoria
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    // Borrar audio actual
    setAudioBlob(null);
    setAudioUrl(null);

    // Incrementar contador de práctica
    setPracticeCount(prev => prev + 1);

    // Volver al estado inicial (manteniendo currentFocus para siguiente grabación)
    setRecordingState("idle");
  }

  async function onAnalyze() {
    if (!audioBlob) return;

    // Cambio inmediato en UI (antes de cualquier red)
    setRecordingState("analyzing");

    const formData = new FormData();
    formData.append("audio", audioBlob);

    try {
      const response = await fetch("/api/analysis", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);

        // Establecer el enfoque para la próxima práctica basado en la debilidad
        if (data.data?.authorityScore?.weaknesses?.[0]) {
          setCurrentFocus(data.data.authorityScore.weaknesses[0]);
        }

        setRecordingState("result");
      } else {
        console.error("Error en el análisis");
        setRecordingState("recorded");
      }
    } catch (error) {
      console.error("Error al analizar:", error);
      setRecordingState("recorded");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <section className="w-full max-w-md">
        <div className="card p-6 space-y-6">
          {recordingState === "idle" && (
            <IdleState
              onStart={startRecording}
              currentFocus={currentFocus}
              practiceCount={practiceCount}
            />
          )}

          {recordingState === "recording" && (
            <RecordingState onStop={stopRecording} />
          )}

          {recordingState === "recorded" && (
            <RecordedState
              audioUrl={audioUrl}
              onReRecord={onReRecord}
              onAnalyze={onAnalyze}
            />
          )}

          {recordingState === "analyzing" && (
            <AnalyzingState />
          )}

          {recordingState === "result" && result && (
            <ResultState
              result={result}
              onRestart={onReRecord}
              practiceCount={practiceCount}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function IdleState({
  onStart,
  currentFocus,
  practiceCount
}: {
  onStart: () => void;
  currentFocus: string | null;
  practiceCount: number;
}) {
  const getInstructions = () => {
    if (practiceCount === 0) {
      return "Graba entre 30 y 60 segundos explicando una idea importante para tu trabajo o tu vida.";
    }

    // Instrucciones contextuales basadas en el enfoque actual
    const focusInstructions: Record<string, string> = {
      "velocidad": "Graba nuevamente enfocándote en hablar un poco más lento y cerrar cada frase con firmeza.",
      "ritmo": "Graba nuevamente enfocándote en mantener un ritmo más pausado y controlado.",
      "claridad": "Graba nuevamente enfocándote en articular cada palabra con más precisión.",
      "pausas": "Graba nuevamente enfocándote en hacer pausas estratégicas entre ideas.",
      "volumen": "Graba nuevamente enfocándote en proyectar tu voz con más seguridad.",
    };

    const normalizedFocus = currentFocus?.toLowerCase() || "";

    for (const [key, instruction] of Object.entries(focusInstructions)) {
      if (normalizedFocus.includes(key)) {
        return instruction;
      }
    }

    return "Graba nuevamente aplicando el ajuste que identificamos.";
  };

  return (
    <div className="text-center space-y-6">
      {currentFocus && practiceCount > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 inline-block">
          <p className="text-gray-400 text-xs">Enfoque de esta práctica</p>
          <p className="text-white text-sm font-medium">{currentFocus}</p>
        </div>
      )}

      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-white">
          Listo para grabar
        </h2>
        <p className="text-gray-400">
          {getInstructions()}
        </p>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="btn-primary w-full py-4 text-lg"
      >
        Comenzar grabación
      </button>
    </div>
  );
}

function RecordingState({ onStop }: { onStop: () => void }) {
  return (
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <div className="w-24 h-24 mx-auto bg-red-500/20 rounded-full flex items-center justify-center animate-pulse">
          <div className="w-16 h-16 bg-red-500 rounded-full" />
        </div>

        <h2 className="text-2xl font-semibold text-white">Grabando...</h2>
        <p className="text-gray-400">Habla con claridad y naturalidad</p>
      </div>

      <button
        type="button"
        onClick={onStop}
        className="btn-secondary w-full py-4 text-lg"
      >
        Detener grabación
      </button>
    </div>
  );
}

function RecordedState({
  audioUrl,
  onReRecord,
  onAnalyze,
}: {
  audioUrl: string | null;
  onReRecord: () => void;
  onAnalyze: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <p className="text-gray-300 text-2xl font-semibold">Escúchate con atención.</p>
        <p className="text-gray-400 text-lg">
          ¿Suena como alguien al que seguirías?
        </p>
      </div>

      <div className="flex justify-center">
        <audio controls src={audioUrl ?? ""} className="w-full" />
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <button
          type="button"
          onClick={onReRecord}
          className="btn-secondary w-full py-3 text-xl"
        >
          Regrabar
        </button>

        <button
          type="button"
          onClick={onAnalyze}
          className="btn-primary w-full py-3 font-medium"
        >
          Analizar mi forma de hablar
        </button>
      </div>
    </div>
  );
}

function AnalyzingState() {
  return (
    <div className="text-center space-y-6 py-8">
      <div className="w-24 h-24 mx-auto">
        <div className="w-full h-full border-4 border-dark-600 border-t-white rounded-full animate-spin" />
      </div>

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-white">
          Analizando tu voz y tu presencia...
        </h2>
        <p className="text-gray-400 text-sm">
          Estamos midiendo ritmo, claridad y control
        </p>
      </div>
    </div>
  );
}

function ResultState({
  result,
  onRestart,
  practiceCount
}: {
  result: AnalysisResult;
  onRestart: () => void;
  practiceCount: number;
}) {
  if (!result.data) {
    return <div>Error: No hay datos disponibles</div>;
  }

  const { authorityScore, feedback } = result.data;

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-semibold text-white">
          Así se percibe tu autoridad al hablar
        </h2>
      </div>

      <div className="space-y-4">
        {/* Nivel de autoridad */}
        <div className="bg-dark-700/30 border border-dark-600 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-2">Nivel</p>
          <p className="text-white text-xl font-semibold">
            {feedback.levelLabel}
          </p>
        </div>

        {/* Lo que suma o Lo que mejoró */}
        <div className="bg-dark-700/30 border border-dark-600 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-2">
            {practiceCount > 0 ? "Lo que mejoró" : "Lo que suma"}
          </p>
          <p className="text-white text-lg">
            {feedback.adds}
          </p>
        </div>

        {/* Lo que resta */}
        <div className="bg-dark-700/30 border border-dark-600 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-2">Lo que resta</p>
          <p className="text-white text-lg">
            {feedback.subtracts}
          </p>
        </div>

        {/* Hoy */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 text-sm mb-3">Hoy</p>
          <p className="text-white text-lg leading-relaxed">
            {feedback.today}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="btn-primary w-full py-4 text-lg"
      >
        Practicar de nuevo
      </button>
    </div>
  );
}
