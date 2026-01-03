"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function ListenPage() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden">
      {/* ... (rest of the file remains, just updating the button onClick) */}

      {/* TopAppBar: Skip Button */}
      <div className="flex items-center justify-between p-4 pt-6 pb-2">
        <div className="flex w-12 items-center justify-start">
          {/* Empty left side for balance */}
        </div>
        <div className="flex items-center justify-end">
          <button className="text-slate-500 dark:text-[#9dabb9] text-sm font-bold leading-normal tracking-wide shrink-0 hover:text-primary dark:hover:text-primary transition-colors">
            Omitir
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center w-full px-6 gap-6">
        {/* Hero Image Section */}
        <div className="w-full flex justify-center py-4">
          <div 
            className="relative w-full aspect-[4/5] max-w-sm overflow-hidden rounded-2xl bg-center bg-cover shadow-xl" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsg_obJLOwS2nVBOtyH35z-BE2fxyya8Z_uHs6fwCRR9w0XLek0_fyX3ywp93QKIk807iNb4-EVb-a2q78_Ek1GfCkohrsn79KJeka_3GR7eu_mZrap1IuPulOAOdLS9pVlJ1oNewOrLTyUvHVAS8lbEibBg94ziKRczHCzNSfBzPTwZBNwnkmNh6JyXKUJf5mFl1u7xZPC2yXCfSheMNSUHZ2H_X70bdiqPnf1NifFfaGju5unLtCIN7xdO2CNMVcHg0bPx_fh-4")' }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background-dark/20 dark:to-background-dark/50"></div>
          </div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center gap-2 text-center w-full max-w-xs mx-auto">
          <h1 className="text-white tracking-tight text-[28px] sm:text-[32px] font-bold leading-tight uppercase whitespace-nowrap">
            ORATORIA EFECTIVA
          </h1>
          <p className="text-gray-400 text-base font-normal leading-relaxed">
            La herramienta definitiva para mejorar tu confianza al hablar en público o en privado.
          </p>
        </div>

        {/* PageIndicators */}
        <div className="flex flex-row items-center justify-center gap-2 py-4">
          <div className="h-2 w-2 rounded-full bg-primary transition-all duration-300 w-6"></div>
          <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-[#3b4754]"></div>
          <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-[#3b4754]"></div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="w-full p-6 pt-0 mt-auto">
        <div className="flex flex-col gap-3 w-full max-w-md mx-auto">

          <button
            onClick={() => {
              if (session) {
                router.push("/practice");
              } else {
                router.push("/auth/signin");
              }
            }}
            className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-primary h-14 px-5 text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-blue-600 transition-colors shadow-lg shadow-primary/20"
          >
            <span className="mr-2 material-symbols-outlined text-[20px]">mic</span>
            Comenzar ahora
          </button>
          
          <button 
            onClick={() => router.push("/gym")}
            className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-transparent h-12 px-5 text-slate-600 dark:text-slate-400 text-sm font-bold leading-normal tracking-[0.015em] hover:text-white dark:hover:text-white transition-colors border border-slate-700 hover:bg-slate-800"
          >
            <span className="mr-2 text-lg">🏋️</span>
            Gimnasio Vocal
          </button>

          <button 
            onClick={() => router.push("/courses")}
            className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-transparent h-12 px-5 text-slate-600 dark:text-slate-400 text-sm font-bold leading-normal tracking-[0.015em] hover:text-amber-400 dark:hover:text-amber-400 transition-colors border border-slate-700 hover:border-amber-900/50 hover:bg-slate-900"
          >
            <span className="mr-2 text-lg">🗺️</span>
            Ruta del Héroe
          </button>
          
          <button 
            onClick={() => router.push("/auth/signin")}
            className="flex w-full items-center justify-center overflow-hidden rounded-xl bg-transparent h-12 px-5 text-slate-600 dark:text-slate-500 text-xs font-bold leading-normal tracking-[0.015em] hover:text-primary dark:hover:text-white transition-colors"
          >
            ¿Ya tienes cuenta? <span className="text-primary ml-1">Inicia sesión</span>
          </button>
        </div>
        {/* Bottom safe area spacer */}
        <div className="h-6 w-full"></div>
      </div>

      {/* SOS Button (Fixed) */}
      <Link href="/sos" className="fixed bottom-6 right-6 z-50 animate-bounce">
        <div className="flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-3 rounded-full shadow-lg transition-all hover:scale-105 border border-red-400">
          <span className="text-xl">🚨</span>
          <span className="font-bold">Pánico</span>
        </div>
      </Link>
    </div>
  );
}
