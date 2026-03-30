import { NextResponse } from "next/server";
import { getMetaAndAssetCtxs } from "@/lib/hyperliquid";
import { getFearAndGreed, getBinanceTickers } from "@/lib/market-apis";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [metaResult, fgResult, tickers] = await Promise.allSettled([
      getMetaAndAssetCtxs(),
      getFearAndGreed(),
      getBinanceTickers(),
    ]);

    const meta = metaResult.status === "fulfilled" ? metaResult.value : null;
    const fg = fgResult.status === "fulfilled" ? fgResult.value : null;
    const binance = tickers.status === "fulfilled" ? tickers.value : [];

    let assets: any[] = [];
    if (meta && Array.isArray(meta) && meta.length >= 2) {
      const universe = meta[0].universe || [];
      const ctxs = meta[1] || [];
      assets = universe.map((u: any, i: number) => ({
        coin: u.name,
        funding: ctxs[i]?.funding || "0",
        openInterest: ctxs[i]?.openInterest || "0",
        volume24h: ctxs[i]?.dayNtlVlm || "0",
        markPx: ctxs[i]?.markPx || "0",
        prevDayPx: ctxs[i]?.prevDayPx || "0",
      }));
    }

    const topMovers = (Array.isArray(binance) ? binance : [])
      .map((t: any) => ({
        symbol: t.symbol?.replace("USDT", ""),
        priceChangePercent: parseFloat(t.priceChangePercent || "0"),
        lastPrice: t.lastPrice,
        volume: t.quoteVolume,
      }))
      .sort(
        (a: any, b: any) =>
          Math.abs(b.priceChangePercent) - Math.abs(a.priceChangePercent)
      );

    return NextResponse.json({
      fearAndGreed: fg?.data?.[0] || { value: "--", value_classification: "N/A" },
      topMovers,
      assets: assets.slice(0, 20),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
