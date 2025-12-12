"use client";

export default function PieChart({ data }: { data: Record<string, number> }) {
  const entries = Object.entries(data);
  const total = entries.reduce((sum, [, v]) => sum + v, 0);

  return (
    <div className="space-y-4">
      {entries.map(([cat, val]) => {
        const pct = total === 0 ? 0 : ((val / total) * 100).toFixed(1);
        return (
          <div key={cat} className="flex items-center gap-3">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="font-medium">{cat}</span>
            <span className="text-gray-500">{pct}%</span>
          </div>
        );
      })}

      {entries.length === 0 && (
        <p className="text-gray-500">Aún no hay categorías.</p>
      )}
    </div>
  );
}
