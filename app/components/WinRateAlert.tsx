"use client";

export default function WinRateAlert({
  winRatePct,
  wins,
  total,
}: {
  winRatePct: number | null;
  wins: number;
  total: number;
}) {
  if (winRatePct === null || total === 0) return null;

  if (winRatePct < 40) {
    return (
      <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-950 p-4 animate-pulse">
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div className="text-center">
            <p className="text-red-400 font-black text-xl tracking-wide uppercase">
              KILL SWITCH TRIGGERED — Win Rate: {winRatePct.toFixed(0)}% ({wins}/{total} trades) — FVG Strategy Halted
            </p>
            <p className="text-red-300 text-sm mt-1">
              Trading halted. Review performance before resuming.
            </p>
          </div>
          <span className="text-2xl">⚠️</span>
        </div>
      </div>
    );
  }

  if (winRatePct <= 50) {
    return (
      <div className="mb-6 rounded-lg border-2 border-yellow-500 bg-yellow-950 p-4">
        <div className="flex items-center justify-center gap-3">
          <span className="text-2xl">⚠️</span>
          <div className="text-center">
            <p className="text-yellow-400 font-black text-xl tracking-wide uppercase">
              WARNING — Win Rate: {winRatePct.toFixed(0)}% ({wins}/{total} trades) — Monitor Closely
            </p>
            <p className="text-yellow-300 text-sm mt-1">
              Win rate below 50%. Review strategy before scaling.
            </p>
          </div>
          <span className="text-2xl">⚠️</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-lg border-2 border-emerald-500 bg-emerald-950 p-3">
      <div className="flex items-center justify-center gap-2">
        <span className="text-xl">✅</span>
        <p className="text-emerald-400 font-bold text-lg tracking-wide uppercase">
          Strategy Healthy — Win Rate: {winRatePct.toFixed(0)}% ({wins}/{total} trades)
        </p>
        <span className="text-xl">✅</span>
      </div>
    </div>
  );
}
