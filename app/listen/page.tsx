"use client";

import { useRouter } from "next/navigation";

export default function ListenPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] px-6 text-white">
      <div className="w-full max-w-2xl space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
        <div className="text-xs font-semibold uppercase tracking-[0.5em] text-zinc-300">
          KREDIA
        </div>

        <div className="space-y-2">
          <p className="text-3xl font-semibold">Hola.</p>
          <p className="text-lg text-zinc-200 leading-relaxed">
            Vamos a escuchar tu voz con atención.
          </p>
        </div>

        <div className="space-y-2 text-sm text-zinc-400">
          <p>No vamos a juzgarte.</p>
          <p>Vamos a decirte cómo se percibe cuando hablas.</p>
        </div>

        <p className="text-base text-zinc-100 leading-relaxed">
          Graba un fragmento corto hablando como lo harías en una reunión o al explicar una idea importante.
        </p>

        <div className="px-6">
          <div className="rounded-2xl border border-dashed border-white/40 bg-white/5 p-6 text-left text-sm text-zinc-300">
            <p className="font-semibold text-white">Grabación de audio</p>
            <p className="text-xs text-zinc-400">Tu voz se captura cuando presionas el botón. No hay juicios.</p>
          </div>
        </div>

        <button
          onClick={() => router.push("/practice")}
          className="w-full rounded-2xl bg-white py-4 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-900 transition hover:scale-[1.01]"
        >
          Analizar mi voz
        </button>

        <p className="text-xs uppercase tracking-[0.5em] text-zinc-500">
          Simple · Directo · Paz Mental
        </p>
      </div>
    </div>
  );
}
