"use client";

import { useRouter } from "next/navigation";

const FOCUS_POINTS = [
  "Organiza tu energía para cerrar con firmeza.",
  "Imagina la próxima frase como una declaración, no una pregunta.",
];

export default function PracticePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-white">
      <div className="w-full max-w-2xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl">
        <p className="text-3xl font-semibold">Perfecto. Ya escuché tu voz.</p>
        <div className="space-y-3 text-sm text-zinc-300">
          <p>
            Hemos capturado el tono. Ahora vamos a enfocarnos en lo que sigue.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <span className="text-xs uppercase tracking-[0.4em] text-[#84d7ff]">◉</span>
            <span className="text-xs uppercase tracking-[0.4em] text-zinc-400">Foco confirmado</span>
          </div>
        </div>

        <div className="space-y-2 rounded-2xl border border-white/20 bg-black/30 p-6 text-left text-sm text-zinc-200">
          {FOCUS_POINTS.map((point) => (
            <p key={point} className="leading-relaxed">
              {point}
            </p>
          ))}
        </div>

        <button
          onClick={() => router.push("/analyzer")}
          className="w-full rounded-2xl bg-white py-4 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-900 transition hover:scale-[1.01]"
        >
          Ver análisis
        </button>
      </div>
    </div>
  );
}
