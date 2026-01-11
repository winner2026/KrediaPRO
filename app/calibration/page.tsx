
"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Chrome } from "lucide-react";
import { signIn } from "next-auth/react";

type Step = "diagnosis" | "analysis" | "improvement" | "contrast" | "capture";

function CalibrationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Leemos el step de la URL, o usamos baseline por defecto
  const currentStep = (searchParams.get("step") as Step) || "diagnosis";
  
  // Audio State
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlobBaseline, setAudioBlobBaseline] = useState<Blob | null>(null);
  const [audioBlobCalibration, setAudioBlobCalibration] = useState<Blob | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Analytics State
  const [metricsBaseline, setMetricsBaseline] = useState<{ rms: number, stability: number } | null>(null);
  const [metricsCalibration, setMetricsCalibration] = useState<{ rms: number, stability: number } | null>(null);
  const [improvement, setImprovement] = useState<{ projection: number, stability: number } | null>(null);

  // Intervention State
  const [interventionTime, setInterventionTime] = useState(30);

  // Auth State
  const [isLoading, setIsLoading] = useState(false);

  // Función helper para cambiar de paso y actualizar URL
  const navigateToStep = (nextStep: Step) => {
      router.push(`/calibration?step=${nextStep}`);
  };

  // --- AUDIO PROCESSING ENGINE ---
  const processAudioMetrics = async (blob: Blob): Promise<{ rms: number, stability: number }> => {
     try {
       const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
       const arrayBuffer = await blob.arrayBuffer();
       const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
       
       const rawData = audioBuffer.getChannelData(0); // Canal izquierdo
       let sumSquares = 0;
       let lastVal = 0;
       let stabilitySum = 0;

       for (let i = 0; i < rawData.length; i++) {
          const val = rawData[i];
          sumSquares += val * val;
          stabilitySum += Math.abs(val - lastVal);
          lastVal = val;
       }
       
       const rms = Math.sqrt(sumSquares / rawData.length) * 100;
       const stabilityRaw = stabilitySum / rawData.length;
       const stabilityScore = Math.max(0, 100 - (stabilityRaw * 200)); 

       return { rms, stability: stabilityScore };
     } catch (e) {
       console.error("Error analyzing audio", e);
       return { rms: 50, stability: 50 }; // Fallback
     }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) clearInterval(timerRef.current);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const metrics = await processAudioMetrics(blob);

        if (currentStep === "diagnosis") {
           setAudioBlobBaseline(blob);
           setMetricsBaseline(metrics);
           navigateToStep("analysis");
        } else if (currentStep === "improvement") {
           setAudioBlobCalibration(blob);
           setMetricsCalibration(metrics);
           
           if (metricsBaseline) {
              const projDiff = ((metrics.rms - metricsBaseline.rms) / (metricsBaseline.rms || 1)) * 100;
              const stabDiff = ((metrics.stability - metricsBaseline.stability) / (metricsBaseline.stability || 1)) * 100;
              setImprovement({
                  projection: Math.round(Math.max(5, projDiff)), 
                  stability: Math.round(Math.max(5, stabDiff))
              });
           }
           navigateToStep("contrast");
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= 15) { 
            stopRecording();
            return prev;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Necesitamos acceso al micrófono.");
    }
  };


  // --- AUDIO-ONLY BIO-HACK ENGINE ---
  // No camera here. We infer needs from baseline audio.
  
  const [hackMessage, setHackMessage] = useState({
      title: "Hemos detectado tensión en tu resonancia.",
      instruction: "Baja los hombros, separa los dientes traseros y habla desde el pecho."
  });

  useEffect(() => {
    if (metricsBaseline) {
        // Dynamic Inference Logic
        if (metricsBaseline.rms < 10) { // Umbral arbitrario de volumen bajo
            setHackMessage({
                title: "Tu proyección es baja.",
                instruction: "Imagina que tu voz es una flecha que debe tocar la pared opuesta. ¡Lanza el aire!"
            });
        } else if (metricsBaseline.stability < 40) {
            setHackMessage({
                title: "Tu voz tiembla ligeramente.",
                instruction: "Aprieta el abdomen (core) como si fueras a recibir un golpe. Eso estabilizará tu aire."
            });
        }
        // Default: Resilience/Tension hack (already set)
    }
  }, [metricsBaseline]);



  const handleSaveWithGoogle = async () => {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/listen" });
  };


  // RENDER SECTIONS
  if (currentStep === "diagnosis") {
    // ... (Mismo código de baseline-record)
    return (
      <main className="min-h-screen bg-[#0A0F14] font-display flex flex-col items-center justify-center p-6 text-white text-center">
         <div className="max-w-md w-full">
            <h2 className="text-3xl font-bold mb-2 text-red-500">Diagnóstico Ácido</h2>
            <p className="text-gray-400 mb-8 text-sm">Prueba de fuego: Tienes 15 segundos para convencer a la IA.</p>
            
            <div className="flex flex-col items-center gap-6">
                {!isRecording ? (
                    <button onClick={startRecording} className="size-40 rounded-full bg-red-600/10 border-2 border-red-600/50 hover:bg-red-600 hover:border-red-500 transition-all flex items-center justify-center group active:scale-95 shadow-[0_0_40px_rgba(220,38,38,0.2)]">
                        <span className="material-symbols-outlined text-5xl text-red-500 group-hover:text-white transition-colors">mic</span>
                    </button>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-5xl font-mono font-bold text-white tracking-widest">
                            00:0{recordingTime}
                        </div>
                        <div className="flex gap-1 h-8 items-end">
                             {[...Array(5)].map((_,i) => <div key={i} className="w-1.5 bg-blue-500 animate-pulse rounded-full" style={{height: `${Math.random()*100}%`}}/>)}
                        </div>
                        <button onClick={stopRecording} className="mt-4 px-6 py-2 bg-gray-800 rounded-lg text-sm font-bold text-gray-300">Detener</button>
                    </div>
                )}
            </div>
            
            <p className="mt-8 text-xs text-gray-600 font-mono uppercase">
               Análisis en dispositivo
            </p>
         </div>
      </main>
    );
  }

  if (currentStep === "analysis") {
    // ANALISIS RÁPIDO (MOCK O BASADO EN RMS)
    const authorityScore = metricsBaseline ? Math.min(100, Math.round(metricsBaseline.rms * 1.5)) : 50;
    
    return (
      <main className="min-h-screen bg-[#05080a] font-display flex flex-col items-center justify-center p-6 text-white text-center">
         <div className="max-w-lg w-full relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-[80px] animate-pulse"></div>
            
            <div className="relative z-10 animate-fade-in-up">
               <span className="text-red-500 text-xs font-black uppercase tracking-[0.3em] mb-4 block">
                  Resultado del Diagnóstico
               </span>
               <h2 className="text-5xl md:text-7xl font-black mb-2 text-white tracking-tighter">
                  {authorityScore}%
               </h2>
               <p className="text-xl font-medium text-gray-400 mb-8">Nivel de Autoridad</p>
               
               <div className="bg-[#111] border border-red-900/30 p-8 rounded-2xl mb-8 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4 justify-center">
                      <span className="material-symbols-outlined text-yellow-400">lightbulb</span>
                      <span className="text-xs font-bold text-yellow-400 uppercase tracking-widest">Tip de IA</span>
                  </div>
                  <p className="text-2xl text-white font-bold mb-2">
                     "{hackMessage.instruction}"
                  </p>
                  <p className="text-gray-500 text-sm">
                     Detectamos {hackMessage.title.toLowerCase()}
                  </p>
               </div>
               
               <button 
                  onClick={() => navigateToStep("improvement")}
                  className="w-full py-5 bg-white text-black font-black text-lg rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center justify-center gap-2"
                 >
                   <span className="material-symbols-outlined">restart_alt</span>
                   Grabar otra vez (Aplicando Tip)
               </button>
            </div>
         </div>
      </main>
    );
  }

  if (currentStep === "improvement") {
     // ... (Mismo código de calibration-record)
     return (
      <main className="min-h-screen bg-[#0A0F14] font-display flex flex-col items-center justify-center p-6 text-white text-center">
         <div className="max-w-md w-full">
            <h2 className="text-2xl font-bold mb-2 text-blue-400">Paso 2: Aplicación</h2>
            <p className="text-gray-300 mb-8">
               Ahora, <strong className="text-white">aplicando el Tip</strong>, repite tu presentación.
            </p>
            
            <div className="flex flex-col items-center gap-6">
                {!isRecording ? (
                    <button onClick={startRecording} className="size-32 rounded-full bg-blue-600 hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center group active:scale-95">
                        <span className="material-symbols-outlined text-4xl text-white">mic</span>
                    </button>
                ) : (
                    <div className="flex flex-col items-center gap-4">
                        <div className="text-5xl font-mono font-bold text-white tracking-widest">
                            00:0{recordingTime}
                        </div>
                        <button onClick={stopRecording} className="mt-4 px-6 py-2 bg-gray-800 rounded-lg text-sm font-bold text-gray-300">Terminar</button>
                    </div>
                )}
            </div>
         </div>
      </main>
    );
  }

  if (currentStep === "contrast") {
    // Valores por defecto para fallback visual
    const projGain = improvement?.projection || 18;
    const stabGain = improvement?.stability || 12;

    return (
      <main className="min-h-screen bg-[#0A0F14] font-display flex flex-col items-center justify-center p-6 text-white">
         <div className="max-w-4xl w-full">
            <h2 className="text-3xl md:text-5xl font-black mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
               Evolución Instantánea
            </h2>
            <p className="text-gray-400 text-center mb-10 text-lg">Evidencia de tu capacidad de mejora en 30 segundos.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
               {/* BEFORE CARD */}
               <div className="bg-[#111] border border-gray-800 p-8 rounded-3xl opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 block">Diagnóstico Inicial</span>
                  <div className="h-24 flex items-center justify-center bg-gray-900 rounded-xl mb-6">
                     {audioBlobBaseline && (
                       <audio controls src={URL.createObjectURL(audioBlobBaseline)} className="w-full px-4" />
                     )}
                     {!audioBlobBaseline && <span className="text-gray-600 font-mono text-xs">Sin Audio</span>}
                  </div>
                  <div className="space-y-4">
                     <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Autoridad</span>
                        <span className="font-mono text-gray-400">{metricsBaseline?.rms.toFixed(1) || "45.0"}</span>
                     </div>
                     <div className="w-full bg-gray-800 h-1.5 rounded-full">
                        <div className="bg-gray-600 h-full rounded-full" style={{width: `${Math.min(100, (metricsBaseline?.rms || 0))}%`}}></div>
                     </div>
                  </div>
               </div>

               {/* AFTER CARD */}
               <div className="bg-gradient-to-b from-blue-900/20 to-purple-900/20 border border-blue-500/50 p-8 rounded-3xl relative shadow-[0_0_50px_rgba(59,130,246,0.15)] transform md:scale-105">
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-400 text-black text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider shadow-lg transform rotate-3">
                     Mejorado
                  </div>
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 block">Resultado Optimizado</span>
                  <div className="h-24 flex items-center justify-center bg-blue-900/20 rounded-xl mb-6 border border-blue-500/10">
                     {audioBlobCalibration && (
                       <audio controls src={URL.createObjectURL(audioBlobCalibration)} className="w-full px-4" />
                     )}
                  </div>
                  <div className="space-y-6">
                      <div>
                          <div className="flex justify-between items-end mb-2">
                             <span className="text-gray-200 font-medium">Proyección Vocal</span>
                             <span className="text-green-400 font-bold text-lg">+{projGain}%</span>
                          </div>
                          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                             <div className="bg-green-500 h-full rounded-full shadow-[0_0_10px_#22c55e]" style={{width: `${Math.min(100, projGain * 2.5)}%`}}></div>
                          </div>
                      </div>
                      
                      <div>
                          <div className="flex justify-between items-end mb-2">
                             <span className="text-gray-200 font-medium">Estabilidad</span>
                             <span className="text-blue-400 font-bold text-lg">+{stabGain}%</span>
                          </div>
                          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
                             <div className="bg-blue-500 h-full rounded-full shadow-[0_0_10px_#3b82f6]" style={{width: `${Math.min(100, stabGain * 2.5)}%`}}></div>
                          </div>
                      </div>
                  </div>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-lg mx-auto">
               <Link href="/warmup" className="w-full">
                   <button 
                     className="w-full px-8 py-4 bg-white text-black font-black text-lg rounded-xl hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-2"
                   >
                     <span className="material-symbols-outlined">piano</span>
                     Analizar Tono (Siguiente Paso)
                   </button>
               </Link>
               
               <button 
                 onClick={() => navigateToStep("capture")}
                 className="w-full px-8 py-4 bg-transparent border border-gray-700 text-gray-300 font-bold text-sm rounded-xl hover:bg-gray-900 transition-all"
               >
                 Guardar Progreso y Salir
               </button>
            </div>
         </div>
      </main>
    );
  }

  if (currentStep === "capture") {
    return (
      <main className="min-h-screen bg-[#0A0F14] font-display flex flex-col items-center justify-center p-6 text-white">
        <div className="max-w-md w-full bg-[#161B22] border border-gray-800 p-8 rounded-2xl shadow-2xl text-center">
           <h2 className="text-2xl font-bold mb-2">Acceso al Dashboard</h2>
           <p className="text-gray-400 text-sm mb-8">
              Tu calibración ha sido un éxito. Continúa con tu cuenta segura para empezar el Hábito Diario.
           </p>

           <button
            onClick={handleSaveWithGoogle}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-black font-bold py-4 px-6 rounded-2xl transition-all mb-4 group"
           >
            {isLoading ? (
               <div className="size-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            ) : (
                <Chrome size={20} className="text-blue-600" />
            )}
            <span>Guardar y Continuar con Google</span>
           </button>
           
           <p className="mt-4 text-[10px] text-gray-600">
              Plan Gratuito Permanente activado.
           </p>
        </div>
      </main>
    );
  }

  return null;
}

export default function CalibrationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0A0F14] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <CalibrationContent />
    </Suspense>
  );
}
