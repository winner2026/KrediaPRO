"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/practice" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
          if (isRegistering) {
              const res = await fetch("/api/auth/register", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, password })
              });
              
              const data = await res.json();
              
              if (!res.ok) throw new Error(data.error || "Error al registrarse");
              
              // Auto login after register
              const loginRes = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
              });
              
              if (loginRes?.error) throw new Error("Error al iniciar sesión automáticamente");
              
              window.location.href = "/practice";
          } else {
              const res = await signIn("credentials", {
                  email,
                  password,
                  redirect: false,
              });
              
              if (res?.error) throw new Error("Credenciales inválidas");
              
              window.location.href = "/practice";
          }
      } catch (err: any) {
          setError(err.message);
          setIsLoading(false);
      }
  };

  return (
    <main className="min-h-screen bg-background-dark text-white font-display flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md bg-surface-dark border border-[#3b4754] rounded-2xl p-8 z-10 shadow-2xl">
        <div className="flex flex-col items-center gap-2 mb-8 text-center">
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold tracking-tight uppercase text-white mb-2">
              {isRegistering ? "Crear Cuenta" : "Iniciar Sesión"}
            </h1>
            <p className="text-gray-400 text-sm">
              {isRegistering ? "Únete a Oratoria Efectiva" : "Accede para guardar tu progreso"}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="group relative flex items-center justify-center gap-3 w-full bg-white text-gray-900 font-bold py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
               <div className="size-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
            ) : (
                <img 
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                    alt="Google Logo" 
                    className="w-5 h-5"
                />
            )}
            <span>Continuar con Google</span>
          </button>
          
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#3b4754]"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-wider">O</span>
            <div className="flex-grow border-t border-[#3b4754]"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
             {error && (
                 <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-lg text-center">
                     {error}
                 </div>
             )}
             <input 
                type="email" 
                placeholder="Correo electrónico" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#1a2027] border border-[#3b4754] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors text-sm" 
             />
             <div className="relative">
               <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full bg-[#1a2027] border border-[#3b4754] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors text-sm pr-10" 
               />
               <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
               >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
               </button>
             </div>
             <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary/20 text-primary hover:bg-primary hover:text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
             >
                {isLoading ? "Procesando..." : (isRegistering ? "Registrarse" : "Iniciar Sesión con Correo")}
             </button>
          </form>
          
          <div className="text-center mt-2">
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-xs text-gray-400 hover:text-white underline decoration-dotted underline-offset-4"
              >
                  {isRegistering ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate gratis"}
              </button>
          </div>
          
        </div>

        <div className="mt-8 text-center">
           <Link href="/" className="text-sm text-gray-500 hover:text-white transition-colors">
              ← Volver al inicio
           </Link>
        </div>
      </div>
      
      <div className="mt-8 text-center z-10">
        <p className="text-gray-500 text-xs">
           Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.
        </p>
      </div>

    </main>
  );
}
