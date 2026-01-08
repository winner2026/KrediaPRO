"use client";

import { useEffect, useRef, useState } from "react";

export default function VoiceRecorder() {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setSeconds(0);

      timerIntervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 60) {
            stopRecording();
            return 60;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.error("Error microfono:", err);
      alert("No pudimos acceder al micrófono.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      // Stop stream tracks
      mediaRecorderRef.current.stream.getTracks().forEach(t => t.stop());
    }
    setIsRecording(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  const reRecord = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setSeconds(0);
    audioChunksRef.current = [];
  };

  const submitAudio = async () => {
    if (!audioBlob) return;
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("audio", audioBlob);

    // Obtener userId del storage si es necesario, o dejar que la cookie lo maneje
    const userId = localStorage.getItem("user_id");
    if (userId) formData.append("userId", userId);

    try {
        const res = await fetch("/api/analysis", {
            method: "POST",
            body: formData,
        });

        if (res.ok) {
           const data = await res.json();
           // Redirigir a resultados con el ID
           window.location.href = `/results/${data.analysisId}`;
        } else {
           alert("Error al analizar. Intenta de nuevo.");
           setIsSubmitting(false);
        }
    } catch (e) {
        console.error(e);
        alert("Error de conexión");
        setIsSubmitting(false);
    }
  };

  // UI
  return (
    <div className="w-full max-w-sm mx-auto space-y-6 text-center">
      
      {!audioBlob ? (
        // STATE: READY OR RECORDING
        <div className="flex flex-col items-center">
             
             {/* Timer Display */}
             <div className="mb-8 font-mono text-4xl font-bold tracking-wider text-slate-200">
               00:{seconds < 10 ? `0${seconds}` : seconds} 
               <span className="text-slate-600 text-xl"> / 01:00</span>
             </div>

             {/* Main Button */}
             {!isRecording ? (
               <button 
                onClick={startRecording}
                className="group relative size-24 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:scale-105 hover:bg-blue-500 transition-all"
               >
                 <span className="material-symbols-outlined text-4xl text-white group-hover:scale-110 transition-transform">mic</span>
               </button>
             ) : (
                <div className="relative">
                    <span className="absolute inset-0 rounded-full bg-red-500/30 animate-ping"></span>
                    <button 
                        onClick={stopRecording}
                        className="relative z-10 size-24 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.4)] hover:scale-105 transition-all"
                    >
                        <span className="material-symbols-outlined text-4xl text-white">stop</span>
                    </button>
                    <p className="mt-4 text-xs text-red-400 font-bold uppercase tracking-widest animate-pulse">Grabando...</p>
                </div>
             )}

             <p className="mt-8 text-sm text-slate-500 max-w-[200px]">
               {isRecording ? "Termina antes de los 60s" : "Toca el micrófono para comenzar tu práctica"}
             </p>
        </div>
      ) : (
        // STATE: REVIEW (RE-RECORD OR SUBMIT)
        <div className="animate-fade-in bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Revisar Audio</h3>
            
            {/* Custom Audio Player Wrapper */}
            <div className="bg-slate-950 rounded-xl p-2 mb-6 border border-slate-800">
                 <audio controls src={audioUrl!} className="w-full h-8 opacity-80" />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={reRecord}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors text-sm font-bold"
                >
                  <span className="material-symbols-outlined text-lg">replay</span>
                  Repetir
                </button>

                <button 
                  onClick={submitAudio}
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20 text-sm font-bold"
                >
                  {isSubmitting ? (
                    <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <>
                      Analizar
                      <span className="material-symbols-outlined text-lg">auto_awesome</span>
                    </>
                  )}
                </button>
            </div>
        </div>
      )}
    </div>
  );
}
