import { NextResponse } from "next/server";
import { getAccountState, getCandles } from "@/lib/hyperliquid";
import { WALLET } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [state, candles] = await Promise.all([
      getAccountState(),
      getCandles("ETH", "1h", 24),
    ]);

    const ms = state.marginSummary;
    const positions = (state.assetPositions || [])
      .filter((p: any) => parseFloat(p.position.szi) !== 0)
      .map((p: any) => p.position);

    const totalPnl = positions.reduce(
      (sum: number, p: any) => sum + parseFloat(p.unrealizedPnl || "0"),
      0
    );

    return NextResponse.json({
      wallet: WALLET,
      accountValue: ms.accountValue,
      totalMarginUsed: ms.totalMarginUsed,
      withdrawable: ms.withdrawable,
      unrealizedPnl: totalPnl.toFixed(4),
      positionCount: positions.length,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
