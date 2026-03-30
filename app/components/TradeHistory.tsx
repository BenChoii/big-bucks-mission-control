"use client";

export default function TradeHistory({ fills }: { fills: any[] }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">Trade History</h3>
      {!fills?.length ? (
        <p className="text-slate-500 text-sm">No trades yet</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-500 text-xs uppercase">
                <th className="text-left pb-2">Time</th>
                <th className="text-left pb-2">Pair</th>
                <th className="text-left pb-2">Side</th>
                <th className="text-right pb-2">Price</th>
                <th className="text-right pb-2">Size</th>
                <th className="text-right pb-2">P&L</th>
                <th className="text-right pb-2">Fee</th>
              </tr>
            </thead>
            <tbody>
              {fills.map((f: any, i: number) => {
                const pnl = parseFloat(f.closedPnl || "0");
                const pnlColor = pnl > 0 ? "text-emerald-400" : pnl < 0 ? "text-red-400" : "text-slate-400";
                const sideColor = f.side === "B" ? "text-emerald-400" : "text-red-400";
                return (
                  <tr key={i} className="border-t border-slate-800">
                    <td className="py-1.5 text-slate-400">
                      {new Date(f.time).toLocaleTimeString()}
                    </td>
                    <td className="py-1.5 font-medium">{f.coin}</td>
                    <td className={`py-1.5 ${sideColor}`}>
                      {f.side === "B" ? "BUY" : "SELL"}
                    </td>
                    <td className="py-1.5 text-right font-mono">
                      ${parseFloat(f.price).toFixed(2)}
                    </td>
                    <td className="py-1.5 text-right font-mono">{f.size}</td>
                    <td className={`py-1.5 text-right font-mono ${pnlColor}`}>
                      {pnl !== 0 ? `${pnl >= 0 ? "+" : ""}$${pnl.toFixed(4)}` : "--"}
                    </td>
                    <td className="py-1.5 text-right font-mono text-slate-500">
                      ${parseFloat(f.fee).toFixed(4)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
