import { WALLET } from "./types";

const HL_API = "https://api.hyperliquid.xyz/info";

async function hlPost(body: Record<string, unknown>) {
  const res = await fetch(HL_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    next: { revalidate: 0 },
  });
  return res.json();
}

export async function getAccountState() {
  return hlPost({ type: "clearinghouseState", user: WALLET });
}

export async function getUserFills() {
  return hlPost({ type: "userFills", user: WALLET });
}

export async function getAllMids() {
  return hlPost({ type: "allMids" });
}

export async function getMetaAndAssetCtxs() {
  return hlPost({ type: "metaAndAssetCtxs" });
}

export async function getCandles(coin: string, interval: string, hours: number) {
  return hlPost({
    type: "candleSnapshot",
    req: {
      coin,
      interval,
      startTime: Date.now() - hours * 3600000,
      endTime: Date.now(),
    },
  });
}
