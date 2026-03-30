export const WALLET = "0xE47Ca7c2A90DEb7AaB62A0374784aFd08652f363";

export interface AccountState {
  accountValue: string;
  totalMarginUsed: string;
  totalNtlPos: string;
  totalRawUsd: string;
  withdrawable: string;
}

export interface Position {
  coin: string;
  szi: string;
  entryPx: string;
  positionValue: string;
  unrealizedPnl: string;
  returnOnEquity: string;
  leverage: { type: string; value: number };
  liquidationPx: string | null;
}

export interface Fill {
  coin: string;
  px: string;
  sz: string;
  side: string;
  time: number;
  closedPnl: string;
  fee: string;
  crossed: boolean;
}

export interface MarketAssetCtx {
  funding: string;
  openInterest: string;
  dayNtlVlm: string;
  prevDayPx: string;
  markPx: string;
}

export interface FearGreed {
  value: string;
  value_classification: string;
}

export interface AgentInfo {
  id: string;
  name: string;
  status: string;
  role: string;
  title: string | null;
  lastHeartbeatAt: string | null;
}
