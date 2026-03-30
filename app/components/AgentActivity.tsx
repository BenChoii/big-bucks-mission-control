"use client";

const STATUS_COLORS: Record<string, string> = {
  running: "bg-emerald-400",
  idle: "bg-slate-500",
  error: "bg-red-400",
  paused: "bg-amber-400",
};

function FillRow({ fill }: { fill: any }) {
  const pnl = parseFloat(fill.closedPnl || "0");
  const pnlColor = pnl > 0 ? "text-emerald-400" : pnl < 0 ? "text-red-400" : "text-slate-500";
  const sideColor = fill.side === "B" ? "text-emerald-400" : "text-red-400";
  const sideLabel = fill.side === "B" ? "BUY" : "SELL";
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2">
        <span className={`font-bold w-8 ${sideColor}`}>{sideLabel}</span>
        <span className="font-medium text-slate-200">{fill.coin}</span>
        <span className="text-slate-500">
          {parseFloat(fill.sz).toFixed(4)} @ ${parseFloat(fill.px).toFixed(2)}
        </span>
      </div>
      <div className="flex items-center gap-3">
        {pnl !== 0 && (
          <span className={`font-mono ${pnlColor}`}>
            {pnl > 0 ? "+" : ""}{pnl.toFixed(4)}
          </span>
        )}
        <span className="text-slate-600">
          {new Date(fill.time).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}

export default function AgentActivity({ agents, fills }: { agents: any[]; fills?: any[] }) {
  const showAgents = agents && agents.length > 0;
  const showFills = !showAgents && fills && fills.length > 0;

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">
        {showAgents ? "Agent Activity" : "Recent Trades"}
      </h3>
      <div className="space-y-2">
        {showAgents &&
          agents.map((a: any) => (
            <div key={a.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${STATUS_COLORS[a.status] || "bg-slate-600"}`} />
                <span className="text-sm font-medium">{a.name}</span>
                <span className="text-xs text-slate-500">{a.title || a.role}</span>
              </div>
              <span className="text-xs text-slate-500">
                {a.lastHeartbeatAt
                  ? new Date(a.lastHeartbeatAt).toLocaleTimeString()
                  : "never"}
              </span>
            </div>
          ))}
        {showFills && fills!.map((f: any) => <FillRow key={f.id} fill={f} />)}
        {!showAgents && !showFills && (
          <p className="text-xs text-slate-600">No recent activity</p>
        )}
      </div>
    </div>
  );
}
