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
      score: number;
    };
    transcription: string;
    metrics: {
      wordsPerMinute: number;
      avgPauseDuration: number;
      pauseCount: number;
      pitchVariation: number;
      energyStability: number;
    };
    durationBytes: number;
    diagnosis: string;
    strengths: string[];
    weaknesses: string[];
    decision: string;
    payoff: string;
    feedback: {
      levelLabel: string;
      adds: string;
      subtracts: string;
      today: string;
    };
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
        const newFocus =
          data.data?.weaknesses?.[0] ??
          data.data?.authorityScore?.weaknesses?.[0];
        if (newFocus) {
          setCurrentFocus(newFocus);
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
            <ResultState result={result} onRestart={onReRecord} />
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
}: {
  result: AnalysisResult;
  onRestart: () => void;
}) {
  if (!result.data) {
    return <div>Error: No hay datos disponibles</div>;
  }

  const { diagnosis, strengths, weaknesses, decision, payoff } = result.data;

  const renderList = (
    items: string[],
    emptyLabel: string,
    icon: string,
    iconColor: string
  ) => {
    if (items.length === 0) {
      return <p className="text-sm text-gray-400">{emptyLabel}</p>;
    }

    return (
      <ul className="space-y-2">
        {items.map((entry) => (
          <li key={entry} className="flex items-start gap-2 text-white text-sm">
            <span className={iconColor} aria-hidden>
              {icon}
            </span>
            <span>{entry}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <h2 className="text-3xl font-semibold text-white leading-relaxed">
        {diagnosis}
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Lo que suma
          </p>
          {renderList(
            strengths,
            "En tu grabación actual aún no detectamos puntos fuertes.",
            "✔",
            "text-emerald-400"
          )}
        </section>

        <section className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Lo que resta
          </p>
          {renderList(
            weaknesses,
            "El ritmo y energía están equilibrados en esta toma.",
            "⚠",
            "text-yellow-400"
          )}
        </section>
      </div>

      <section className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-6 space-y-3">
        <p className="text-xs uppercase tracking-[0.2em] text-yellow-200">
          Decisión
        </p>
        <p className="text-white text-base">{decision}</p>
      </section>

      <p className="text-sm text-gray-400">{payoff}</p>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={onRestart}
          className="btn-primary w-full max-w-xs py-4 text-lg mt-4 mb-4"
        >
          Volver a grabar para ganar autoridad
        </button>
      </div>
    </div>
  );
}
