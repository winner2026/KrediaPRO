import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card p-8 md:p-12 max-w-2xl w-full space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
            KREDIA
          </h1>
          <p className="text-gray-400 text-center">
            Mejora tu forma de hablar y comunica con autoridad
          </p>
        </div>

        <div className="flex justify-center">
          <Link href="/practice" className="w-full max-w-md">
            <button
              type="button"
              className="w-full py-5 rounded-xl bg-gray-300 text-dark-950 font-bold text-2xl hover:bg-gray-200 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              Comienza
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
