"use client";

export default function PositionCards({ positions }: { positions: any[] }) {
  if (!positions?.length) {
    return (
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">Active Positions</h3>
        <p className="text-slate-500 text-sm">No open positions</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">Active Positions</h3>
      <div className="space-y-3">
        {positions.map((p: any, i: number) => {
          const pnl = parseFloat(p.unrealizedPnl || "0");
          const side = parseFloat(p.size) > 0 ? "LONG" : "SHORT";
          const sideColor = side === "LONG" ? "text-emerald-400" : "text-red-400";
          const pnlColor = pnl >= 0 ? "text-emerald-400" : "text-red-400";

          return (
            <div key={i} className="flex items-center justify-between border-b border-slate-800 pb-2 last:border-0">
              <div>
                <span className="font-bold">{p.coin}</span>
                <span className={`ml-2 text-xs font-semibold ${sideColor}`}>{side}</span>
                <p className="text-xs text-slate-500">
                  Entry: ${parseFloat(p.entryPx).toFixed(2)} | Mark: ${parseFloat(p.markPx).toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-bold ${pnlColor}`}>
                  {pnl >= 0 ? "+" : ""}${pnl.toFixed(4)}
                </p>
                <p className="text-xs text-slate-500">
                  Lev: {p.leverage?.value || "--"}x | Liq: ${p.liquidationPx ? parseFloat(p.liquidationPx).toFixed(0) : "--"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
