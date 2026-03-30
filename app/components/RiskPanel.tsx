"use client";

export default function RiskPanel({
  accountValue,
  marginUsed,
  positions,
}: {
  accountValue: string;
  marginUsed: string;
  positions: any[];
}) {
  const av = parseFloat(accountValue || "0");
  const mu = parseFloat(marginUsed || "0");
  const exposure = av > 0 ? ((mu / av) * 100).toFixed(1) : "0";
  const maxLev = positions.reduce(
    (max: number, p: any) => Math.max(max, p.leverage?.value || 0),
    0
  );

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">Risk Panel</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-400 text-sm">Margin Used</span>
          <span className="font-mono">${mu.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 text-sm">Exposure</span>
          <span className={`font-mono ${parseFloat(exposure) > 50 ? "text-amber-400" : "text-emerald-400"}`}>
            {exposure}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 text-sm">Max Leverage</span>
          <span className="font-mono">{maxLev > 0 ? `${maxLev}x` : "--"}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400 text-sm">Open Positions</span>
          <span className="font-mono">{positions.length}</span>
        </div>
      </div>
    </div>
  );
}
