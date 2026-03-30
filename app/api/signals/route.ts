import { NextResponse } from "next/server";
import { getTrending, getDexScreenerBoosts } from "@/lib/market-apis";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [trendingResult, boostsResult] = await Promise.allSettled([
      getTrending(),
      getDexScreenerBoosts(),
    ]);

    const trendingData =
      trendingResult.status === "fulfilled" ? trendingResult.value : null;
    const boostsData =
      boostsResult.status === "fulfilled" ? boostsResult.value : [];

    const trending = (trendingData?.coins || []).slice(0, 10).map((c: any) => ({
      name: c.item?.name || "Unknown",
      symbol: c.item?.symbol || "?",
      marketCapRank: c.item?.market_cap_rank || null,
      priceBtc: c.item?.price_btc || 0,
      score: c.item?.score ?? null,
      thumb: c.item?.thumb || null,
    }));

    const boosts = (Array.isArray(boostsData) ? boostsData : [])
      .slice(0, 15)
      .map((b: any) => ({
        tokenAddress: b.tokenAddress || null,
        chainId: b.chainId || null,
        description: b.description || null,
        url: b.url || null,
        icon: b.icon || null,
        amount: b.amount || 0,
      }));

    return NextResponse.json({ trending, boosts });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
