"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";

const SmartPiano = dynamic(() => import("@/components/warmup/SmartPiano"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen bg-[#05080a] flex items-center justify-center text-white">
            <span className="animate-pulse">Cargando Estudio Vocal...</span>
        </div>
    )
});

export default function WarmupPage() {
    return (
        <main className="min-h-screen bg-[#05080a] text-white font-display">
             {/* Dynamic background reuse */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-blue-900/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-900/10 blur-[150px] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
                 <SmartPiano isStandalone={true} />
            </div>
        </main>
    );
}
