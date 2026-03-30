"use client";

const STATUS_COLORS: Record<string, string> = {
  running: "bg-emerald-400",
  idle: "bg-slate-500",
  error: "bg-red-400",
  paused: "bg-amber-400",
};

export default function AgentActivity({ agents }: { agents: any[] }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
      <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">Agent Activity</h3>
      <div className="space-y-2">
        {agents.map((a: any) => (
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
      </div>
    </div>
  );
}
