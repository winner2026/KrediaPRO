"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Contrato único de salida del análisis - MVP
 */
type AnalysisResult = {
  transcription: string;
  authorityScore: {
    score: number;
  };
  diagnosis: string;
  strengths: string[];
  weaknesses: string[];
  decision: string;
  payoff: string;
};

/**
 * Results Page - MVP
 *
 * Sin comparaciones, sin historial, sin complicaciones.
 * Solo el feedback de esta sesión.
 */
export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const savedResult = localStorage.getItem("voiceAnalysisResult");
    if (!savedResult) {
      router.push("/practice");
      return;
    }

    const analysisResult = JSON.parse(savedResult);
    setResult(analysisResult);
  }, [router]);

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-gray-400">Cargando resultados...</div>
      </main>
    );
  }

  const score = result.authorityScore.score;

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card p-8 md:p-12 max-w-3xl w-full space-y-8">
        {/* Score principal - sin color, sin juicio */}
        <div className="text-center space-y-2">
          <h1 className="text-6xl md:text-7xl font-bold text-white">
            {score}
          </h1>
          <p className="text-gray-400 text-sm">Tu nivel de autoridad vocal</p>
        </div>

        {/* Diagnóstico */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Diagnóstico</h2>
          <p className="text-gray-300 leading-relaxed">{result.diagnosis}</p>
        </div>

        {/* Lo que suma */}
        {result.strengths && result.strengths.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-3">
              Lo que suma
            </h2>
            <ul className="space-y-2">
              {result.strengths.map((strength, idx) => (
                <li key={idx} className="text-gray-300 flex items-start gap-2">
                  <span className="text-green-500 font-bold">+</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Lo que resta */}
        {result.weaknesses && result.weaknesses.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-3">
              Lo que resta
            </h2>
            <ul className="space-y-2">
              {result.weaknesses.map((weakness, idx) => (
                <li key={idx} className="text-gray-300 flex items-start gap-2">
                  <span className="text-red-500 font-bold">-</span>
                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Decisión */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            Qué hacer ahora
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">{result.decision}</p>
          {result.payoff && (
            <p className="text-gray-400 text-sm italic">{result.payoff}</p>
          )}
        </div>

        {/* Transcripción */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            Transcripción
          </h2>
          <p className="text-gray-300 leading-relaxed">{result.transcription}</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {
              localStorage.removeItem("voiceAnalysisResult");
              router.push("/practice");
            }}
            className="w-full py-4 rounded-xl bg-gray-300 text-dark-950 font-bold hover:bg-gray-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Volver a grabar
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full py-4 rounded-xl bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-all duration-200"
          >
            Volver al inicio
          </button>
        </div>

        {/* Tagline */}
        <p className="text-gray-500 text-center text-sm">
          Simple · Directo · Paz Mental
        </p>
      </div>
    </main>
  );
}
