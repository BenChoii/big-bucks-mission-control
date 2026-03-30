"use client";

import { useEffect, useState, useCallback } from "react";
import StatCard from "./components/StatCard";
import PositionCards from "./components/PositionCards";
import RiskPanel from "./components/RiskPanel";
import AgentActivity from "./components/AgentActivity";
import MarketSignals from "./components/MarketSignals";
import TopMovers from "./components/TopMovers";
import FearGreed from "./components/FearGreed";
import TradeHistory from "./components/TradeHistory";

function useFetch<T>(url: string, interval: number, initial: T): T {
  const [data, setData] = useState<T>(initial);
  const load = useCallback(() => {
    fetch(url)
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [url]);

  useEffect(() => {
    load();
    const id = setInterval(load, interval);
    return () => clearInterval(id);
  }, [load, interval]);

  return data;
}

export default function Dashboard() {
  const account = useFetch<any>("/api/account", 10000, {});
  const positions = useFetch<any>("/api/positions", 10000, { positions: [] });
  const trades = useFetch<any>("/api/trades", 10000, { fills: [], wins: 0, losses: 0 });
  const market = useFetch<any>("/api/market", 30000, {
    fearAndGreed: { value: "--", value_classification: "N/A" },
    topMovers: [],
    assets: [],
  });
  const agentData = useFetch<any>("/api/agents", 15000, { agents: [] });

  const pnl = parseFloat(account.unrealizedPnl || "0");
  const pnlStr = pnl >= 0 ? `+$${pnl.toFixed(4)}` : `-$${Math.abs(pnl).toFixed(4)}`;
  const pnlColor = pnl >= 0 ? "text-emerald-400" : "text-red-400";
  const winRate =
    trades.wins + trades.losses > 0
      ? `${trades.wins}/${trades.wins + trades.losses}`
      : "0/0";

  return (
    <div className="min-h-screen p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Big Bucks Mission Control</h1>
          <p className="text-xs text-slate-500">
            Wallet: {account.wallet?.slice(0, 6)}...{account.wallet?.slice(-4)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Account Value"
          value={`$${parseFloat(account.accountValue || "0").toFixed(2)}`}
          sub={`Withdrawable: $${parseFloat(account.withdrawable || "0").toFixed(2)}`}
        />
        <StatCard label="Unrealized P&L" value={pnlStr} color={pnlColor} />
        <StatCard label="Win / Loss" value={winRate} sub={`Closed P&L: $${trades.totalClosedPnl || "0"}`} />
        <FearGreed
          value={market.fearAndGreed?.value || "--"}
          classification={market.fearAndGreed?.value_classification || "N/A"}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <PositionCards positions={positions.positions} />
        <RiskPanel
          accountValue={account.accountValue}
          marginUsed={account.totalMarginUsed}
          positions={positions.positions}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <AgentActivity agents={agentData.agents} />
        <MarketSignals assets={market.assets} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <TopMovers movers={market.topMovers} />
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase mb-3">Funding Rates (HL)</h3>
          <div className="space-y-1">
            {market.assets
              ?.filter((a: any) => ["BTC", "ETH", "SOL", "DOGE", "SUI"].includes(a.coin))
              .map((a: any) => {
                const fr = (parseFloat(a.funding) * 100).toFixed(4);
                const color = parseFloat(fr) > 0 ? "text-emerald-400" : "text-red-400";
                return (
                  <div key={a.coin} className="flex justify-between text-sm">
                    <span>{a.coin}</span>
                    <span className={`font-mono ${color}`}>{fr}%</span>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Trade History - Full Width */}
      <TradeHistory fills={trades.fills} />

      {/* Footer */}
      <div className="text-center text-xs text-slate-600 mt-6 pb-4">
        Big Bucks Fund &mdash; Powered by Hyperliquid &amp; Paperclip
      </div>
    </div>
  );
}
