"use client";

export default function MarketSignals({ assets }: { assets: any[] }) {
  const highlighted = assets.filter((a: any) =>
    ["BTC", "ETH", "SOL", "DOGE", "SUI"].includes(a.coin)
  );

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">Market Signals</h3>
      <div className="space-y-2">
        {highlighted.map((a: any) => {
          const mark = parseFloat(a.markPx);
          const prev = parseFloat(a.prevDayPx);
          const change = prev > 0 ? ((mark - prev) / prev) * 100 : 0;
          const funding = (parseFloat(a.funding) * 100).toFixed(4);
          const color = change >= 0 ? "text-emerald-400" : "text-red-400";

          return (
            <div key={a.coin} className="flex items-center justify-between">
              <div>
                <span className="font-medium">{a.coin}</span>
                <span className={`ml-2 text-xs ${color}`}>
                  {change >= 0 ? "+" : ""}{change.toFixed(2)}%
                </span>
              </div>
              <div className="text-right text-xs">
                <span className="text-slate-400">FR: </span>
                <span className={parseFloat(funding) > 0 ? "text-emerald-400" : "text-red-400"}>
                  {funding}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
