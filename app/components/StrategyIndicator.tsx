"use client";

type HistoryEntry = {
  strategy: string;
  status: string;
  startedAt: string;
  endedAt: string | null;
  reason?: string;
};

function formatTs(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusColor(status: string) {
  switch (status) {
    case "ACTIVE": return "text-emerald-400 bg-emerald-900/40 border-emerald-700";
    case "HALTED": return "text-yellow-400 bg-yellow-900/40 border-yellow-700";
    case "KILLED": return "text-red-400 bg-red-900/40 border-red-700";
    default: return "text-slate-400 bg-slate-800 border-slate-700";
  }
}

export default function StrategyIndicator({
  activeStrategy,
  status,
  history,
  lastSignal,
  nextEntryCriteria,
}: {
  activeStrategy: string;
  status: string;
  history: HistoryEntry[];
  lastSignal?: string;
  nextEntryCriteria?: string;
}) {
  const badgeClass = statusColor(status);
  const currentEntry =
    history.find((h) => h.endedAt === null) ||
    (history.length > 0 ? history[history.length - 1] : null);

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <div className="flex flex-col md:flex-row md:items-start gap-4">
        {/* Strategy Name + Status */}
        <div className="flex-shrink-0">
          <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Current Strategy</p>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-black">{activeStrategy}</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${badgeClass}`}>
              {status}
            </span>
          </div>
          {currentEntry && (
            <p className="text-xs text-slate-500">
              Since: <span className="text-slate-300">{formatTs(currentEntry.startedAt)}</span>
            </p>
          )}
        </div>

        {/* Next Entry Criteria */}
        {nextEntryCriteria && (
          <div className="md:flex-1">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Next Entry Criteria</p>
            <p className="text-xs text-slate-300 font-mono">{nextEntryCriteria}</p>
          </div>
        )}

        {/* Last Signal */}
        {lastSignal && (
          <div className="md:flex-shrink-0 md:max-w-xs">
            <p className="text-xs text-slate-400 uppercase tracking-wide mb-1">Last Signal</p>
            <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{lastSignal}</p>
          </div>
        )}
      </div>

      {/* Strategy History */}
      {history.length > 1 && (
        <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2 text-xs">
          <span className="text-slate-500">History:</span>
          {history.map((h, i) => (
            <span key={i} className={`px-1.5 py-0.5 rounded border ${statusColor(h.status)}`}>
              {h.strategy}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
