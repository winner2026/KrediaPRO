"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logEvent } from "@/lib/events/logEvent";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

/**
 * Contrato único de salida del análisis - MVP (EXPANDIDO)
 */
type AnalysisResult = {
  transcription: string;
  transcriptionWithSilences?: string;
  authorityScore: {
    score: number;
    level?: "LOW" | "MEDIUM" | "HIGH";
    confidence?: number;
    detailedInsights?: string[];
    priorityAdjustment?: string;
  };
  metrics?: {
    wordsPerMinute: number;
    avgPauseDuration: number;
    pauseCount: number;
    fillerCount: number;
    pitchVariation: number;
    energyStability: number;
    repetitionCount: number;
    strategicPauses: number;
    awkwardSilences: number;
    paceVariability: number;
    avgSentenceLength: number;
    longSentences: number;
    rhythmConsistency: number;
  };
  durationSeconds?: number;
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
 *
 * Con tracking de scroll y engagement.
 */
export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [showLimitModal, setShowLimitModal] = useState(false);

  useEffect(() => {
    const savedResult = localStorage.getItem("voiceAnalysisResult");
    if (!savedResult) {
      router.push("/practice");
      return;
    }

    const analysisResult = JSON.parse(savedResult);
    setResult(analysisResult);

    // 📊 EVENTO: analysis_viewed
    logEvent("analysis_viewed");
  }, [router]);

  // Verificar si el usuario ya usó su análisis gratuito
  const handleRetakeClick = async () => {
    // 📊 EVENTO: cta_retake_clicked
    logEvent("cta_retake_clicked");

    try {
      // Obtener userId
      const { getAnonymousUserId } = await import("@/lib/anonymousUser");
      const userId = getAnonymousUserId();

      if (!userId) {
        // Si no hay userId, permitir ir a practice
        localStorage.removeItem("voiceAnalysisResult");
        router.push("/practice");
        return;
      }

      // Verificar uso actual
      const response = await fetch("/api/usage/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (data.limitReached) {
        // Mostrar modal indicando que ya terminó su prueba
        setShowLimitModal(true);
        logEvent("free_limit_reached");
      } else {
        // Permitir ir a practice
        localStorage.removeItem("voiceAnalysisResult");
        router.push("/practice");
      }
    } catch (error) {
      console.error("Error checking usage:", error);
      // En caso de error, permitir continuar
      localStorage.removeItem("voiceAnalysisResult");
      router.push("/practice");
    }
  };

  // Track section visibility with IntersectionObserver
  const diagnosisRef = useIntersectionObserver<HTMLDivElement>({
    onVisible: () => logEvent("analysis_section_viewed", { section: "diagnosis" }),
  });

  const strengthsRef = useIntersectionObserver<HTMLDivElement>({
    onVisible: () => logEvent("analysis_section_viewed", { section: "strengths" }),
  });

  const weaknessesRef = useIntersectionObserver<HTMLDivElement>({
    onVisible: () => logEvent("analysis_section_viewed", { section: "weaknesses" }),
  });

  const decisionRef = useIntersectionObserver<HTMLDivElement>({
    onVisible: () => {
      logEvent("analysis_section_viewed", { section: "decision" });
      // Track engagement after 2 seconds of visibility
      setTimeout(() => {
        logEvent("analysis_section_engaged", { section: "decision" });
      }, 2000);
    },
  });

  if (!result) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-gray-400">Cargando resultados...</div>
      </main>
    );
  }

  const score = result.authorityScore.score;
  const level = result.authorityScore.level || (score >= 75 ? "HIGH" : score >= 42 ? "MEDIUM" : "LOW");

  // Determinar color según nivel
  const levelConfig = {
    HIGH: {
      color: "text-green-500",
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      label: "Alto"
    },
    MEDIUM: {
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      label: "Medio"
    },
    LOW: {
      color: "text-red-500",
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      label: "Bajo"
    }
  };

  const config = levelConfig[level];

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card p-8 md:p-12 max-w-3xl w-full space-y-8">
        {/* Score principal - con color según nivel */}
        <div className="text-center space-y-4">
          <h1 className={`text-6xl md:text-7xl font-bold ${config.color}`}>
            {score}
          </h1>
          <div className="flex items-center justify-center gap-3">
            <div className={`inline-flex px-4 py-2 rounded-full ${config.bg} border ${config.border}`}>
              <span className={`text-sm font-semibold ${config.color}`}>
                Nivel {config.label}
              </span>
            </div>
          </div>
          <p className="text-gray-400 text-sm">Tu nivel de autoridad vocal</p>
        </div>

        {/* 🆕 Indicador de confianza y duración */}
        {(result.durationSeconds || result.authorityScore.confidence) && (
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            {result.durationSeconds && (
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>Análisis de {Math.round(result.durationSeconds)}s</span>
              </div>
            )}
            {result.authorityScore.confidence !== undefined && (
              <div className="flex items-center gap-2">
                <span>📊</span>
                <span>
                  Confianza:{" "}
                  {result.authorityScore.confidence >= 0.85
                    ? "Alta"
                    : result.authorityScore.confidence >= 0.6
                    ? "Media"
                    : "Baja"}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Diagnóstico */}
        <div ref={diagnosisRef} className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">Diagnóstico</h2>
          <p className="text-gray-300 leading-relaxed">{result.diagnosis}</p>
        </div>

        {/* 🆕 Insights Detallados */}
        {result.authorityScore.detailedInsights &&
          result.authorityScore.detailedInsights.length > 0 && (
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/30 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
                <span>💡</span>
                <span>Análisis Detallado</span>
              </h2>
              <ul className="space-y-3">
                {result.authorityScore.detailedInsights.map((insight, idx) => (
                  <li
                    key={idx}
                    className="text-gray-300 flex items-start gap-3 leading-relaxed"
                  >
                    <span className="text-blue-400 mt-1">•</span>
                    <span>{insight}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

        {/* Lo que suma */}
        {result.strengths && result.strengths.length > 0 && (
          <div ref={strengthsRef} className="bg-gray-800 rounded-xl p-6">
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
          <div ref={weaknessesRef} className="bg-gray-800 rounded-xl p-6">
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

        {/* 🆕 Visualización de Métricas Clave */}
        {result.metrics && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <span>📊</span>
              <span>Métricas Detalladas</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ritmo */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-400">Palabras por minuto</span>
                  <span className="text-lg font-semibold text-white">
                    {result.metrics.wordsPerMinute}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Ideal: 110-150{" "}
                  {result.metrics.wordsPerMinute >= 110 &&
                  result.metrics.wordsPerMinute <= 150
                    ? "✅"
                    : result.metrics.wordsPerMinute >= 90 &&
                      result.metrics.wordsPerMinute <= 170
                    ? "⚠️"
                    : "❌"}
                </div>
              </div>

              {/* Pausas */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-400">Pausa promedio</span>
                  <span className="text-lg font-semibold text-white">
                    {result.metrics.avgPauseDuration}s
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Ideal: 0.4-0.8s{" "}
                  {result.metrics.avgPauseDuration >= 0.4 &&
                  result.metrics.avgPauseDuration <= 0.8
                    ? "✅"
                    : result.metrics.avgPauseDuration >= 0.2
                    ? "⚠️"
                    : "❌"}
                </div>
              </div>

              {/* Pausas estratégicas */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-400">Pausas estratégicas</span>
                  <span className="text-lg font-semibold text-white">
                    {result.metrics.strategicPauses}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Ideal: ≥3 {result.metrics.strategicPauses >= 3 ? "✅" : "⚠️"}
                </div>
              </div>

              {/* Muletillas */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-400">Muletillas</span>
                  <span className="text-lg font-semibold text-white">
                    {result.metrics.fillerCount}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Ideal: 0-2{" "}
                  {result.metrics.fillerCount <= 2
                    ? "✅"
                    : result.metrics.fillerCount <= 5
                    ? "⚠️"
                    : "❌"}
                </div>
              </div>

              {/* Repeticiones */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-400">Repeticiones</span>
                  <span className="text-lg font-semibold text-white">
                    {result.metrics.repetitionCount}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Ideal: 0-2{" "}
                  {result.metrics.repetitionCount <= 2
                    ? "✅"
                    : result.metrics.repetitionCount <= 5
                    ? "⚠️"
                    : "❌"}
                </div>
              </div>

              {/* Longitud de frases */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-400">
                    Longitud de frases
                  </span>
                  <span className="text-lg font-semibold text-white">
                    {result.metrics.avgSentenceLength}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Ideal: 10-20 palabras{" "}
                  {result.metrics.avgSentenceLength >= 10 &&
                  result.metrics.avgSentenceLength <= 20
                    ? "✅"
                    : "⚠️"}
                </div>
              </div>

              {/* Consistencia del ritmo */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-400">Consistencia</span>
                  <span className="text-lg font-semibold text-white">
                    {Math.round(result.metrics.rhythmConsistency * 100)}%
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  Ideal: ≥75%{" "}
                  {result.metrics.rhythmConsistency >= 0.75
                    ? "✅"
                    : result.metrics.rhythmConsistency >= 0.5
                    ? "⚠️"
                    : "❌"}
                </div>
              </div>

              {/* Silencios incómodos */}
              {result.metrics.awkwardSilences > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-gray-400">
                      Silencios largos
                    </span>
                    <span className="text-lg font-semibold text-red-400">
                      {result.metrics.awkwardSilences}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">Evita pausas &gt;2s</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🆕 Tips Contextuales según Prioridad */}
        {result.authorityScore.priorityAdjustment && (
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <span>🎯</span>
              <span>Tu prioridad ahora</span>
            </h2>
            <div className="space-y-3">
              {result.authorityScore.priorityAdjustment === "SLOW_DOWN" && (
                <>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-purple-300">Desacelera tu ritmo.</strong>{" "}
                    Estás hablando demasiado rápido. Reduce a 120-140 palabras por
                    minuto.
                  </p>
                  <p className="text-sm text-gray-400">
                    💡 Ejercicio: Lee en voz alta contando hasta 3 entre cada frase.
                  </p>
                </>
              )}
              {result.authorityScore.priorityAdjustment === "PAUSE_MORE" && (
                <>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-purple-300">Usa más pausas.</strong> Las
                    pausas de 0.5-1.5s generan autoridad y dan tiempo a procesar.
                  </p>
                  <p className="text-sm text-gray-400">
                    💡 Ejercicio: Respira profundo después de cada idea importante.
                  </p>
                </>
              )}
              {result.authorityScore.priorityAdjustment ===
                "REDUCE_REPETITIONS" && (
                <>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-purple-300">
                      Evita repetir palabras.
                    </strong>{" "}
                    Busca sinónimos y varía tu vocabulario.
                  </p>
                  <p className="text-sm text-gray-400">
                    💡 Ejercicio: Grábate y cuenta cuántas veces repites la misma
                    palabra.
                  </p>
                </>
              )}
              {result.authorityScore.priorityAdjustment ===
                "SIMPLIFY_SENTENCES" && (
                <>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-purple-300">
                      Simplifica tus frases.
                    </strong>{" "}
                    Las frases largas pierden al oyente. Máximo 20 palabras por
                    frase.
                  </p>
                  <p className="text-sm text-gray-400">
                    💡 Ejercicio: Divide una frase larga en dos más cortas.
                  </p>
                </>
              )}
              {result.authorityScore.priorityAdjustment === "VARY_PACE" && (
                <>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-purple-300">
                      Mantén ritmo consistente.
                    </strong>{" "}
                    Tu velocidad cambia mucho. Busca un ritmo estable.
                  </p>
                  <p className="text-sm text-gray-400">
                    💡 Ejercicio: Usa un metrónomo o cuenta mentalmente al hablar.
                  </p>
                </>
              )}
              {result.authorityScore.priorityAdjustment === "INCREASE_ENERGY" && (
                <>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-purple-300">Aumenta tu energía.</strong>{" "}
                    Proyecta más convicción en tu voz.
                  </p>
                  <p className="text-sm text-gray-400">
                    💡 Ejercicio: Habla de pie y gesticula mientras practicas.
                  </p>
                </>
              )}
              {result.authorityScore.priorityAdjustment === "STABILIZE_PITCH" && (
                <>
                  <p className="text-gray-300 leading-relaxed">
                    <strong className="text-purple-300">Varía tu entonación.</strong>{" "}
                    Un tono monótono aburre. Sube y baja la voz estratégicamente.
                  </p>
                  <p className="text-sm text-gray-400">
                    💡 Ejercicio: Lee un cuento infantil exagerando las emociones.
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Decisión */}
        <div ref={decisionRef} className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            Qué hacer ahora
          </h2>
          <p className="text-gray-300 leading-relaxed mb-4">{result.decision}</p>
          {result.payoff && (
            <p className="text-gray-400 text-sm italic">{result.payoff}</p>
          )}
        </div>

        {/* Transcripción Mejorada */}
        <div className="bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-3">
            Transcripción
          </h2>
          {result.transcriptionWithSilences ? (
            <div className="text-gray-300 leading-relaxed space-y-2">
              {result.transcriptionWithSilences.split(/(\[silencio\])/).map((part, idx) => {
                if (part === "[silencio]") {
                  return (
                    <span
                      key={idx}
                      className="inline-block px-2 py-1 mx-1 bg-yellow-900/30 border border-yellow-600/40 rounded text-yellow-400 text-xs"
                      title="Pausa larga detectada"
                    >
                      [pausa larga]
                    </span>
                  );
                }
                // Resaltar muletillas comunes
                const fillerWords = [
                  "eh",
                  "ehh",
                  "ehhh",
                  "um",
                  "umm",
                  "ah",
                  "ahh",
                  "este",
                  "pues",
                  "o sea",
                  "bueno",
                  "entonces",
                  "como",
                  "tipo",
                ];
                const words = part.split(/(\s+)/);
                return (
                  <span key={idx}>
                    {words.map((word, widx) => {
                      const cleanWord = word
                        .toLowerCase()
                        .replace(/[.,!?;:]/g, "");
                      if (fillerWords.includes(cleanWord)) {
                        return (
                          <span
                            key={widx}
                            className="bg-red-900/30 border-b-2 border-red-600/60 text-red-300"
                            title="Muletilla detectada"
                          >
                            {word}
                          </span>
                        );
                      }
                      return <span key={widx}>{word}</span>;
                    })}
                  </span>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-300 leading-relaxed">{result.transcription}</p>
          )}
          <div className="mt-4 pt-4 border-t border-gray-700 flex flex-wrap gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-red-900/30 border border-red-600/60 rounded"></span>
              <span>Muletillas</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-yellow-900/30 border border-yellow-600/40 rounded"></span>
              <span>Pausas largas</span>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleRetakeClick}
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

      {/* Modal - Límite alcanzado */}
      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6">
          <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full space-y-6 border border-white/10">
            <div className="space-y-3 text-center">
              <h2 className="text-2xl font-bold text-white">
                Ya terminaste tu prueba gratuita
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Si quieres seguir mejorando tu voz, desbloquea más análisis.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.push("/upgrade")}
                className="w-full py-4 rounded-xl bg-white text-gray-900 font-bold hover:bg-gray-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Desbloquear más análisis
              </button>

              <button
                onClick={() => setShowLimitModal(false)}
                className="w-full py-3 text-gray-400 hover:text-white transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
