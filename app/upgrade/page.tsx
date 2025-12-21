"use client";

import Link from "next/link";

/**
 * Upgrade Page - MVP
 *
 * Aparece cuando el usuario Free agota su análisis.
 * Simple, claro, sin distracciones.
 */
export default function UpgradePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card p-8 md:p-12 max-w-2xl w-full space-y-8">
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          Ya realizaste tu análisis gratuito
        </h1>

        {/* Explicación simple */}
        <p className="text-gray-300 text-center text-lg">
          Para seguir mejorando tu voz y autoridad, desbloquea Premium.
        </p>

        {/* Beneficios Premium */}
        <div className="space-y-4 bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            Con Premium obtienes:
          </h2>

          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold text-xl">✓</span>
              <span>Análisis ilimitados de tu voz</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold text-xl">✓</span>
              <span>Historial completo de tus sesiones</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold text-xl">✓</span>
              <span>Comparaciones entre grabaciones</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 font-bold text-xl">✓</span>
              <span>Ejercicios personalizados para mejorar</span>
            </li>
          </ul>
        </div>

        {/* CTA Principal */}
        <button
          onClick={() => alert('Integración de pago próximamente')}
          className="w-full py-6 rounded-xl bg-gray-300 text-dark-950 font-bold text-xl hover:bg-gray-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          Desbloquear Premium
        </button>

        {/* Link secundario */}
        <div className="text-center">
          <Link
            href="/"
            className="text-gray-400 hover:text-gray-300 transition-colors underline"
          >
            Volver al inicio
          </Link>
        </div>

        {/* Tagline */}
        <p className="text-gray-500 text-center text-sm">
          Simple · Directo · Paz Mental
        </p>
      </div>
    </main>
  );
}
