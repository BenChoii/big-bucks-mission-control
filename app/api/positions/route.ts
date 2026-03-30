import { NextResponse } from "next/server";
import { getAccountState, getAllMids } from "@/lib/hyperliquid";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [state, mids] = await Promise.all([getAccountState(), getAllMids()]);

    const positions = (state.assetPositions || [])
      .filter((p: any) => parseFloat(p.position.szi) !== 0)
      .map((p: any) => {
        const pos = p.position;
        const mid = mids[pos.coin] || pos.entryPx;
        return {
          coin: pos.coin,
          size: pos.szi,
          entryPx: pos.entryPx,
          markPx: mid,
          positionValue: pos.positionValue,
          unrealizedPnl: pos.unrealizedPnl,
          returnOnEquity: pos.returnOnEquity,
          leverage: pos.leverage,
          liquidationPx: pos.liquidationPx,
        };
      });

    return NextResponse.json({ positions });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
