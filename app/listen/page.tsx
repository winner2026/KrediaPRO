"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getStreakData, getStreakBadge, getStreakMessage, hasPracticedToday, type StreakData } from "@/lib/streaks/streakSystem";
import { getTipOfTheDay, getTipNumber } from "@/lib/tips/dailyTips";

export default function ListenPage() {
  const router = useRouter();
  const { data: session } = useSession();
  
  // Estado local para usuario simulado o sesión real
  const [userName, setUserName] = useState<string | null>(null);
  
  // Estado para streak y tip (se cargan en cliente)
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [practicedToday, setPracticedToday] = useState(false);
  const [tipOfDay, setTipOfDay] = useState<string>("");
  const [tipNumber, setTipNumber] = useState<number>(1);
  const [planType, setPlanType] = useState<string>("FREE");

  useEffect(() => {
    // Cargar datos del streak desde localStorage
    const streakData = getStreakData();
    setStreak(streakData);
    setPracticedToday(hasPracticedToday());
    setTipOfDay(getTipOfTheDay());
    setTipNumber(getTipNumber());

    // Login simulado chequeo
    if (typeof window !== 'undefined') {
       const storedEmail = localStorage.getItem("user_email");
       if (storedEmail) setUserName(storedEmail.split('@')[0]);

       // Simulación de plan para demo (o fetch real si hubiera API)
       const storedPlan = localStorage.getItem("user_plan") || "FREE";
       setPlanType(storedPlan);
    }
  }, []);

  const badge = streak ? getStreakBadge(streak.currentStreak) : null;

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-slate-950 pb-24">

      {/* TopAppBar: Streak Counter */}
      <div className="flex items-center justify-between p-4 pt-6 pb-2">
        <div className="flex items-center gap-2">
          {streak && streak.currentStreak > 0 && (
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur px-4 py-2 rounded-full border border-slate-700">
              <span className="text-orange-500 text-xl">🔥</span>
              <span className="text-white font-bold">{streak.currentStreak}</span>
              <span className="text-slate-400 text-sm">días</span>
              {badge && <span className={`${badge.color} ml-1`}>{badge.emoji}</span>}
            </div>
          )}
        </div>
        <div className="flex items-center justify-end gap-3">
          <Link href="/upgrade" className={`text-[10px] font-bold px-2 py-1 rounded border transition-all ${
            planType === 'PREMIUM' ? 'bg-blue-500/20 border-blue-500 text-blue-400' :
            planType === 'STARTER' ? 'bg-amber-500/20 border-amber-500 text-amber-500' :
            'bg-slate-800 border-slate-700 text-slate-500'
          }`}>
            Nivel: {planType}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center w-full px-6 gap-4">
        
        {/* Tip del Día */}
        {tipOfDay && (
          <div className="w-full max-w-sm bg-gradient-to-r from-blue-900/40 to-indigo-900/40 rounded-2xl p-4 border border-blue-800/50 mb-2">
            <div className="flex items-start gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-blue-300 text-xs font-bold uppercase tracking-wider mb-1">
                  Tip #{tipNumber}
                </p>
                <p className="text-white text-sm leading-relaxed">
                  {tipOfDay}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Banner Curso Destacado: Sin Miedo a Hablar */}
        <Link 
          href="/go/sin-miedo"
          target="_blank"
          className="w-full max-w-sm group"
        >
          <div className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl bg-center bg-cover shadow-2xl border border-white/10 group-hover:border-amber-500/50 transition-all duration-500 group-hover:-translate-y-1" 
               style={{ backgroundImage: 'url("/course-banner.jpg")' }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
            <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
               <div>
                 <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-0.5">Curso Destacado</p>
                 <h4 className="text-white font-bold text-sm">Sin Miedo a Hablar</h4>
               </div>
               <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/20">
                  Ver Curso
               </span>
            </div>
          </div>
        </Link>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2 text-center w-full max-w-xs mx-auto">
          <h1 className="text-white tracking-tight text-[28px] sm:text-[32px] font-black leading-tight uppercase">
            Practica tu oratoria
          </h1>
          <p className="text-gray-400 text-sm font-normal leading-relaxed">
            {streak ? getStreakMessage(streak.currentStreak, practicedToday) : "Mejora tu impacto al hablar con inteligencia artificial."}
          </p>
        </div>

        {/* PageIndicators */}
        <div className="flex flex-row items-center justify-center gap-2 py-2">
          <div className="h-2 w-6 rounded-full bg-primary transition-all duration-300"></div>
          <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-[#3b4754]"></div>
          <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-[#3b4754]"></div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full p-6 pt-0 mt-auto">
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto">

          <button
            onClick={() => {
              if (session || userName || localStorage.getItem("user_email")) {
                router.push("/practice");
              } else {
                router.push("/");
              }
            }}
            className={`flex w-full items-center justify-center overflow-hidden rounded-2xl h-16 px-5 text-white text-lg font-black leading-normal tracking-wider transition-all shadow-2xl ${
              practicedToday 
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/30' 
                : 'bg-primary hover:bg-blue-600 shadow-primary/40'
            }`}
          >
            <span className="mr-3 material-symbols-outlined text-[24px]">mic</span>
            {practicedToday ? "Practicar de nuevo" : "Comenzar práctica"}
          </button>
          
          <button 
            onClick={() => router.push("/referrals")}
            className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-transparent h-12 px-5 text-slate-500 text-xs font-bold hover:text-white transition-colors"
          >
            Invitar amigos y ganar premios
          </button>
        </div>
        {/* Bottom safe area spacer */}
        <div className="h-6 w-full"></div>
      </div>

    </div>
  );
}
