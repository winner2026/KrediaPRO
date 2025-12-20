interface ResultStateProps {
  onRetry: () => void;
}

export function ResultState({ onRetry }: ResultStateProps) {
  return (
    <div className="rounded-xl border p-8 space-y-6">
      <h2 className="text-xl font-bold">Así se percibe tu autoridad al hablar</h2>

      <div className="space-y-2">
        <p>
          <strong>Nivel de autoridad:</strong>{" "}
          <span className="text-yellow-600">Media</span>
        </p>
        <p>
          <strong>Lo que haces bien:</strong> claridad
        </p>
        <p>
          <strong>Lo que debilita tu presencia:</strong> velocidad
        </p>
      </div>

      <div className="rounded-lg bg-gray-50 p-4 text-sm">
        Hoy, habla un poco más lento y termina las frases con firmeza.
      </div>

      <button
        onClick={onRetry}
        className="w-full rounded-lg bg-black text-white py-3"
      >
        Practicar de nuevo
      </button>
    </div>
  );
}
