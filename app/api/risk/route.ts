import { NextResponse } from "next/server";
import { getAccountState } from "@/lib/hyperliquid";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const state = await getAccountState();
    const ms = state.marginSummary;

    const accountValue = parseFloat(ms.accountValue || "0");
    const totalMarginUsed = parseFloat(ms.totalMarginUsed || "0");
    const totalNtlPos = parseFloat(ms.totalNtlPos || "0");
    const totalRawUsd = parseFloat(ms.totalRawUsd || "0");

    const positions = (state.assetPositions || [])
      .filter((p: any) => parseFloat(p.position.szi) !== 0)
      .map((p: any) => p.position);

    const totalUnrealizedPnl = positions.reduce(
      (sum: number, p: any) => sum + parseFloat(p.unrealizedPnl || "0"),
      0
    );

    // Effective leverage = total notional position value / account equity
    const effectiveLeverage =
      accountValue > 0 ? Math.abs(totalNtlPos) / accountValue : 0;

    // Margin usage = margin used / account value
    const marginUsage =
      accountValue > 0 ? (totalMarginUsed / accountValue) * 100 : 0;

    // Exposure = total notional / account value (as percentage)
    const exposure =
      accountValue > 0 ? (Math.abs(totalNtlPos) / accountValue) * 100 : 0;

    // Drawdown from deposited capital (rawUsd = deposited)
    const deposited = totalRawUsd > 0 ? totalRawUsd : accountValue;
    const drawdown =
      deposited > 0
        ? Math.min(0, ((accountValue - deposited) / deposited) * 100)
        : 0;

    // Per-position risk breakdown
    const positionRisks = positions.map((p: any) => {
      const posValue = Math.abs(parseFloat(p.positionValue || "0"));
      const lev = p.leverage;
      return {
        coin: p.coin,
        size: p.szi,
        positionValue: p.positionValue,
        unrealizedPnl: p.unrealizedPnl,
        leverage: typeof lev === "object" ? lev.value : parseFloat(lev || "0"),
        liquidationPx: p.liquidationPx,
        marginUsed: parseFloat(p.marginUsed || "0"),
        weightPct: accountValue > 0 ? (posValue / accountValue) * 100 : 0,
      };
    });

    return NextResponse.json({
      accountValue: accountValue.toFixed(4),
      effectiveLeverage: effectiveLeverage.toFixed(2),
      marginUsage: marginUsage.toFixed(2),
      exposure: exposure.toFixed(2),
      drawdown: drawdown.toFixed(2),
      totalUnrealizedPnl: totalUnrealizedPnl.toFixed(4),
      totalMarginUsed: totalMarginUsed.toFixed(4),
      positionCount: positions.length,
      positions: positionRisks,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
