"use client";

import Link from "next/link";
import { useEffect } from "react";
import { logEvent } from "@/lib/events/logEvent";
import { useSession } from "next-auth/react";

export default function UpgradePage() {
  const { data: session } = useSession();
  
  useEffect(() => {
    logEvent("upgrade_page_viewed");
  }, []);


  const handlePlanSelect = (planName: string) => {
    logEvent("upgrade_plan_selected", { plan: planName });
    
    // 🔗 Checkout URLs para los nuevos planes
    // IMPORTANTE: Reemplazar [VARIANT_ID] con los IDs reales de Lemon Squeezy
    const checkoutUrls: Record<string, string> = {
      STARTER: "https://oratoria-efectiva.lemonsqueezy.com/checkout/buy/d5f9fc04-259c-4e38-a10e-9a5c6626013a", // Starter Mensual ($12)
      PREMIUM: "https://oratoria-efectiva.lemonsqueezy.com/checkout/buy/c7518e21-7638-44e7-a49b-79bbcdd0e9c6", // Premium Mensual ($29)
    };

    let url = checkoutUrls[planName];

    if (url && !url.startsWith("#")) {
      const user = session?.user as any;
      if (user?.id) {
        const separator = url.includes("?") ? "&" : "?";
        // Pasamos user_id para que el webhook sepa a quién asignar el plan
        url = `${url}${separator}checkout[custom][user_id]=${user.id}`;
      }
      window.location.href = url;
    } else {
      console.error(`Plan ${planName} no configurado correctamente.`);
    }
  };

  return (
    <main className="min-h-[100dvh] bg-[#0A0F14] text-white p-6 pb-24 font-display">
      <div className="max-w-6xl mx-auto space-y-12 py-12">
        
        {/* Header Ejecutivo */}
        <div className="text-center space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-2">
            Niveles de Acceso
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
            Invierte en tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Activo Más Valioso</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            No vendemos "clases de oratoria". Vendemos la certeza de que tu voz no te traicionará en momentos críticos.
          </p>
        </div>

        {/* Value Ladder Grid (Solo 3 Planes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* 1. PLAN GRATIS (Anchor) */}
          <div className="bg-[#111] border border-gray-800 rounded-3xl p-6 flex flex-col h-full relative overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
             <div className="space-y-1 mb-6">
                <h3 className="text-lg font-bold text-gray-300 flex items-center gap-2">
                  <span className="material-symbols-outlined text-gray-500 text-xl">person</span>
                  FREE
                </h3>
                <div className="pt-2">
                   <span className="text-3xl font-black text-white">$0</span>
                </div>
             </div>
             <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
               Para conocer tu línea base y calibrar tu hardware vocal.
             </p>
             <ul className="space-y-3 mb-8 flex-1 text-[13px]">
                <li className="flex items-center gap-2 text-gray-400">
                   <span className="material-symbols-outlined text-gray-600 text-sm">check</span>
                   3 Análisis Totales
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                   <span className="material-symbols-outlined text-gray-600 text-sm">check</span>
                   7 Días de Protocolo
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                   <span className="material-symbols-outlined text-gray-600 text-sm">check</span>
                   Sin feedback visual
                </li>
             </ul>
             <Link href="/listen" className="w-full py-3 rounded-xl border border-gray-700 hover:bg-gray-800 text-gray-400 text-center font-bold transition-all text-[11px] uppercase tracking-widest">
                Plan Actual
             </Link>
          </div>

          {/* 2. STARTER (Hábito / Best Value for Beginners) */}
          <div className="bg-[#0D131A] border-2 border-blue-600 rounded-3xl p-6 flex flex-col h-full relative overflow-hidden group shadow-[0_0_40px_-10px_rgba(37,99,235,0.2)] transform hover:-translate-y-1 transition-all">
             <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
             <div className="absolute top-4 right-4 bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest">
                Popular
             </div>
             
             <div className="space-y-1 mb-6 mt-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-blue-500 text-xl">bolt</span>
                  STARTER
                </h3>
                <div className="pt-2">
                   <span className="text-3xl font-black text-white">$12</span>
                   <span className="text-gray-500 text-[10px] ml-1 uppercase font-bold">/ mes</span>
                </div>
             </div>
             <p className="text-sm text-gray-400 mb-6 min-h-[40px]">
               Diseñado para crear el hábito diario y eliminar el miedo escénico.
             </p>
             <ul className="space-y-3 mb-8 flex-1 text-[13px]">
                <li className="flex items-center gap-2 text-white">
                   <span className="material-symbols-outlined text-blue-500 text-sm">verified</span>
                   100 Análisis / mes
                </li>
                <li className="flex items-center gap-2 text-white">
                   <span className="material-symbols-outlined text-blue-500 text-sm">verified</span>
                   21 Días de Protocolo
                </li>
                <li className="flex items-center gap-2 text-white">
                   <span className="material-symbols-outlined text-blue-500 text-sm">verified</span>
                   Cursos Básicos
                </li>
             </ul>
             <button 
                onClick={() => handlePlanSelect("STARTER")}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all text-[11px] uppercase tracking-widest shadow-lg shadow-blue-900/40"
             >
                Comenzar STARTER
             </button>
          </div>

          {/* 3. PREMIUM (Elite Pro) */}
          <div className="bg-[#111] border border-amber-500/30 rounded-3xl p-6 flex flex-col h-full relative overflow-hidden group hover:border-amber-500/60 transition-all">
             <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-600"></div>
             
             <div className="space-y-1 mb-6 mt-2">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-xl">workspace_premium</span>
                  PREMIUM
                </h3>
                <div className="pt-2">
                   <span className="text-3xl font-black text-white">$29</span>
                   <span className="text-gray-500 text-[10px] ml-1 uppercase font-bold">/ mes</span>
                </div>
             </div>
             <p className="text-sm text-gray-400 mb-6 min-h-[40px]">
               Para ejecutivos que necesitan dominar cada aspecto de su comunicación.
             </p>
             <ul className="space-y-3 mb-8 flex-1 text-[13px]">
                <li className="flex items-center gap-2 text-gray-300">
                   <span className="material-symbols-outlined text-amber-500 text-sm">check</span>
                   250 Análisis / mes
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                   <span className="material-symbols-outlined text-amber-500 text-sm">check</span>
                   Análisis de VIDEO + VOZ
                </li>
                <li className="flex items-center gap-2 text-gray-300">
                   <span className="material-symbols-outlined text-amber-500 text-sm">check</span>
                   30 Días de Protocolo (Completo)
                </li>
             </ul>
             <button 
                onClick={() => handlePlanSelect("PREMIUM")}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-700 to-yellow-700 hover:from-amber-600 hover:to-yellow-600 text-white font-bold transition-all text-[11px] uppercase tracking-widest border border-amber-500/30"
             >
                Obtener PREMIUM
             </button>
          </div>
        </div>

        <div className="mt-12 text-center text-[10px] text-gray-600 max-w-2xl mx-auto leading-relaxed border-t border-gray-800 pt-8">
          <p>
            GARANTÍA DE BIO-CALIBRACIÓN: Si tras 14 días de uso diario no sientes una reducción notable en tu ansiedad comunicativa, te devolvemos el 100% de tu inversión. Sin preguntas.
          </p>
        </div>
      </div>
    </main>
  );
}
