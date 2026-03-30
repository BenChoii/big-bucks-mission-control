"use client";

const CLASS_COLORS: Record<string, string> = {
  "Extreme Fear": "text-red-400",
  Fear: "text-red-300",
  Neutral: "text-amber-400",
  Greed: "text-emerald-300",
  "Extreme Greed": "text-emerald-400",
};

export default function FearGreed({
  value,
  classification,
}: {
  value: string;
  classification: string;
}) {
  const color = CLASS_COLORS[classification] || "text-slate-400";

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <p className="text-xs text-slate-400 uppercase tracking-wide">Fear & Greed</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
      <p className={`text-xs mt-1 ${color}`}>{classification}</p>
    </div>
  );
}
