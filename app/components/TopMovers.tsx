"use client";

export default function TopMovers({ movers }: { movers: any[] }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">24H Top Movers</h3>
      <div className="space-y-1">
        {movers.map((m: any, i: number) => {
          const pct = m.priceChangePercent;
          const color = pct >= 0 ? "text-emerald-400" : "text-red-400";
          const icon = pct >= 0 ? "▲" : "▼";
          return (
            <div key={i} className="flex items-center justify-between text-sm">
              <span className="font-medium">{m.symbol}</span>
              <span className={`font-mono ${color}`}>
                {icon} {Math.abs(pct).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
