"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

// Definición de contenidos por Plan
const PLAN_CONTENT: Record<string, {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  features: string[];
  cta: string;
  ctaLink: string;
}> = {
  "voice-weekly": {
    title: "¡Pase Semanal Activado!",
    subtitle: "Tienes 7 días de acceso total a nuestro motor de IA auditiva.",
    icon: "mic",
    color: "blue",
    features: [
      "50 Análisis de voz listos",
      "Detección de muletillas activada",
      "Feedback de tono y ritmo"
    ],
    cta: "Empezar mi primer análisis",
    ctaLink: "/practice?mode=voice"
  },
  "voice-monthly": {
    title: "¡Bienvenido al Club Pro!",
    subtitle: "Tu voz está a punto de convertirse en tu mejor activo.",
    icon: "record_voice_over",
    color: "blue",
    features: [
      "100 Análisis mensuales",
      "Prioridad en procesamiento",
      "Historial ilimitado"
    ],
    cta: "Ir al Gimnasio de Voz",
    ctaLink: "/practice?mode=voice"
  },
  "video-starter": {
    title: "¡Pack de Video Semanal Listo!",
    subtitle: "Cámara, acción y... ¡feedback inmediato!",
    icon: "videocam",
    color: "purple",
    features: [
      "70 Análisis (Video + Voz)",
      "Lectura de lenguaje corporal",
      "Análisis de contacto visual"
    ],
    cta: "Probar Análisis de Video",
    ctaLink: "/practice?mode=video"
  },
  "video-premium": {
    title: "¡Eres Miembro Elite!",
    subtitle: "La experiencia completa de transformación comunicativa.",
    icon: "diamond",
    color: "purple",
    features: [
      "250 Análisis mensuales",
      "Coach IA disponible 24/7",
      "Acceso antes que nadie a novedades"
    ],
    cta: "Entrar a mi Dashboard Elite",
    ctaLink: "/listen"
  }
};

export default function SuccessPage() {
  const params = useParams();
  const router = useRouter();
  const planId = params.planId as string;
  const content = PLAN_CONTENT[planId] || PLAN_CONTENT["voice-weekly"]; // Fallback
  
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    // Aquí podríamos disparar una llamada al backend para confirmar la activación si no se hizo por webhook
  }, []);

  return (
    <main className="min-h-screen bg-[#0B1120] text-white font-display flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Glows */}
      <div className={`absolute top-[-20%] left-[-10%] w-[600px] h-[600px] ${content.color === 'purple' ? 'bg-purple-600/20' : 'bg-blue-600/20'} rounded-full blur-[120px] pointer-events-none`} />
      
      <div className="z-10 max-w-lg w-full text-center">
        
        {/* Animated Icon */}
        <div className={`mx-auto w-24 h-24 rounded-full ${content.color === 'purple' ? 'bg-purple-500/20' : 'bg-blue-500/20'} flex items-center justify-center mb-8 animate-bounce-slow`}>
           <span className={`material-symbols-outlined text-5xl ${content.color === 'purple' ? 'text-purple-400' : 'text-blue-400'}`}>
             {content.icon}
           </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-black mb-4 animate-fade-in-up">
          {content.title}
        </h1>
        <p className="text-xl text-slate-400 mb-10 animate-fade-in-up delay-100">
          {content.subtitle}
        </p>

        {/* Features Card */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 mb-10 text-left animate-fade-in-up delay-200">
          <p className="text-xs font-bold uppercase text-slate-500 mb-4 tracking-wider">Tu nuevo arsenal incluye:</p>
          <ul className="space-y-3">
            {content.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className={`material-symbols-outlined ${content.color === 'purple' ? 'text-purple-400' : 'text-blue-400'} text-sm`}>check_circle</span>
                <span className="text-slate-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <button 
          onClick={() => router.push(content.ctaLink)}
          className={`w-full py-5 rounded-xl font-bold text-lg shadow-lg hover:scale-[1.02] transition-all animate-pulse-soft
            ${content.color === 'purple' 
              ? 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/30 text-white' 
              : 'bg-blue-600 hover:bg-blue-500 shadow-blue-900/30 text-white'
            }`}
        >
          {content.cta}
        </button>

        <p className="mt-6 text-sm text-slate-600">
          ¿Dudas? Escríbenos a soporte@oratoriaefectiva.com
        </p>

      </div>
    </main>
  );
}
