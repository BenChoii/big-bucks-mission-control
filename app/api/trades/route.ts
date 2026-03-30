import { NextResponse } from "next/server";
import { getUserFills } from "@/lib/hyperliquid";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const fills = await getUserFills();
    const recent = (fills || []).slice(0, 50).map((f: any) => ({
      coin: f.coin,
      price: f.px,
      size: f.sz,
      side: f.side,
      time: f.time,
      closedPnl: f.closedPnl,
      fee: f.fee,
      crossed: f.crossed,
    }));

    const totalClosedPnl = recent.reduce(
      (sum: number, f: any) => sum + parseFloat(f.closedPnl || "0"),
      0
    );

    const wins = recent.filter((f: any) => parseFloat(f.closedPnl) > 0).length;
    const losses = recent.filter((f: any) => parseFloat(f.closedPnl) < 0).length;

    return NextResponse.json({
      fills: recent,
      totalClosedPnl: totalClosedPnl.toFixed(4),
      wins,
      losses,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
