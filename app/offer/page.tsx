"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OfferPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"weekly" | "monthly">("monthly");

  const handleBuy = (plan: string) => {
    // Si no está logueado, llevar a registro con query param del plan
    if (!session) {
      router.push(`/auth/register?redirect=/upgrade&plan=${plan}`);
      return;
    }
    // Si está logueado, ir a la página de upgrade para procesar (o procesar aquí directo)
    // Para simplificar, reusamos la lógica de redirección de /upgrade
    // En una implementación real, duplicaríamos la función handlePlanSelect aquí.
    router.push(`/upgrade?autoSelect=${plan}`);
  };

  return (
    <main className="min-h-screen bg-[#0B1120] text-white font-display overflow-x-hidden">
      {/* Navbar simplificado */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-tight">
          Oratoria<span className="text-blue-500">Efectiva</span>
        </div>
        <div className="flex gap-4">
           {session ? (
             <button onClick={() => router.push("/listen")} className="text-sm text-slate-400 hover:text-white">Ir al Dashboard</button>
           ) : (
             <button onClick={() => router.push("/auth/login")} className="text-sm text-slate-400 hover:text-white">Iniciar Sesión</button>
           )}
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          Elige tu nivel de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Transformación</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          Ya sea que quieras perfeccionar solo tu voz o dominar tu presencia completa en video.
          Tenemos un plan diseñado para tu velocidad de aprendizaje.
        </p>

        {/* Toggle (Visual Only for now, acts as filter concept) */}
        <div className="inline-flex bg-slate-900 p-1 rounded-full border border-slate-800 mb-16">
          <button 
            onClick={() => setBillingCycle("weekly")}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'weekly' ? 'bg-slate-700 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Semanal (Flexible)
          </button>
          <button 
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Mensual (Mejor Valor)
          </button>
        </div>
      </section>

      {/* PRODUCTOS SPLIT */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 px-6 pb-24">
        
        {/* PRODUCTO 1: SOLO VOZ (AUDIO ENGINE) */}
        <div className="relative bg-[#0F172A] border border-blue-900/30 rounded-[40px] p-8 md:p-12 overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
           {/* Background Glow */}
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
           
           <div className="relative z-10">
             <div className="mb-8">
               <span className="text-blue-400 font-bold tracking-widest text-xs uppercase mb-2 block">Opción 01</span>
               <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Voz de Poder</h2>
               <p className="text-slate-400 leading-relaxed">
                 Ideal para podcasters, ventas telefónicas y quienes quieren mejorar su dicción y seguridad sin cámaras.
               </p>
             </div>

             <div className="space-y-4 mb-8">
               <FeatureItem text="Análisis de Tono y Ritmo" />
               <FeatureItem text="Detección de Muletillas" />
               <FeatureItem text="Feedback de Seguridad (IA)" />
               <FeatureItem text="Historial de Grabaciones" />
             </div>

             <div className="bg-slate-900/50 rounded-3xl p-6 border border-slate-800">
                {billingCycle === 'weekly' ? (
                  <div className="flex justify-between items-center animate-fade-in">
                    <div>
                      <p className="text-sm text-slate-400 font-bold uppercase">Plan Semanal</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">$4</span>
                        <span className="text-sm text-slate-500">/sem</span>
                      </div>
                      <p className="text-xs text-blue-400 mt-1">50 Análisis / semana</p>
                    </div>
                    <button 
                      onClick={() => handleBuy("VOICE_WEEKLY")}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
                    >
                      Empezar
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center animate-fade-in">
                    <div>
                      <p className="text-sm text-slate-400 font-bold uppercase flex items-center gap-2">
                        Plan Pro Mensual 
                        <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full">AHORRA 25%</span>
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">$12</span>
                        <span className="text-sm text-slate-500">/mes</span>
                      </div>
                      <p className="text-xs text-emerald-400 mt-1">100 Análisis / mes + Prioridad</p>
                    </div>
                    <button 
                      onClick={() => handleBuy("VOICE_MONTHLY")}
                      className="px-6 py-3 bg-white text-blue-900 hover:bg-slate-200 font-bold rounded-xl transition-all shadow-lg"
                    >
                      Obtener Pro
                    </button>
                  </div>
                )}
             </div>
           </div>
        </div>

        {/* PRODUCTO 2: FULL EXPERIENCE (VIDEO + VOICE) */}
        <div className="relative bg-[#1A1625] border border-purple-900/30 rounded-[40px] p-8 md:p-12 overflow-hidden group hover:border-purple-500/30 transition-all duration-500">
           {/* Background Glow */}
           <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
           
           <div className="relative z-10">
             <div className="mb-8">
               <span className="text-purple-400 font-bold tracking-widest text-xs uppercase mb-2 block">Opción 02</span>
               <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Presencia de Impacto</h2>
               <p className="text-slate-400 leading-relaxed">
                 Para líderes, creadores de contenido y speakers. Analiza tu lenguaje corporal, contacto visual y gestos junto con tu voz.
               </p>
             </div>

             <div className="space-y-4 mb-8">
               <FeatureItem text="Todo lo de Audio Master" color="purple" />
               <FeatureItem text="Análisis de Contacto Visual" color="purple" />
               <FeatureItem text="Detección de Gestos y Postura" color="purple" />
               <FeatureItem text="Feedback Visual en Tiempo Real" color="purple" />
             </div>

             <div className="bg-slate-900/50 rounded-3xl p-6 border border-slate-800">
                {billingCycle === 'weekly' ? (
                  <div className="flex justify-between items-center animate-fade-in">
                    <div>
                      <p className="text-sm text-slate-400 font-bold uppercase">Pro Semanal</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">$9</span>
                        <span className="text-sm text-slate-500">/sem</span>
                      </div>
                      <p className="text-xs text-purple-400 mt-1">70 Análisis (Video+Voz)</p>
                    </div>
                    <button 
                      onClick={() => handleBuy("STARTER")}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-900/20"
                    >
                      Empezar
                    </button>
                  </div>
                ) : (
                  <div className="flex justify-between items-center animate-fade-in">
                    <div>
                      <p className="text-sm text-slate-400 font-bold uppercase flex items-center gap-2">
                        Elite Mensual
                        <span className="bg-purple-500/20 text-purple-300 text-[9px] px-2 py-0.5 rounded-full">MÁXIMOS RESULTADOS</span>
                      </p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-black text-white">$29</span>
                        <span className="text-sm text-slate-500">/mes</span>
                      </div>
                      <p className="text-xs text-purple-300 mt-1">250 Análisis + Coach 24/7</p>
                    </div>
                    <button 
                      onClick={() => handleBuy("PREMIUM")}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 text-white font-bold rounded-xl transition-all shadow-lg"
                    >
                      Ser Elite
                    </button>
                  </div>
                )}
             </div>
           </div>
        </div>

      </div>

      {/* Trust Elements */}
      <div className="text-center pb-16 text-slate-500 text-sm">
        <p>🔒 Pagos seguros vía Lemon Squeezy • Cancelación flexible en cualquier momento</p>
      </div>

    </main>
  );
}

function FeatureItem({ text, color = "blue" }: { text: string, color?: "blue" | "purple" }) {
  const colorClass = color === "blue" ? "text-blue-400" : "text-purple-400";
  return (
     <div className="flex items-center gap-3">
       <span className={`material-symbols-outlined ${colorClass} text-lg`}>check_circle</span>
       <span className="text-slate-300 font-medium">{text}</span>
     </div>
  );
}
