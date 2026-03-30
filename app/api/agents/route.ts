import { NextResponse } from "next/server";
import { getUserFills } from "@/lib/hyperliquid";

export const dynamic = "force-dynamic";

const PAPERCLIP_API = process.env.PAPERCLIP_API_URL || "http://127.0.0.1:3100";
const COMPANY_ID = process.env.PAPERCLIP_COMPANY_ID || "058374d2-1e23-46e8-bda1-7c07f90cfd1b";

async function getRecentFills() {
  try {
    const fills = await getUserFills();
    return (fills || []).slice(0, 10).map((f: any) => ({
      id: f.tid || `${f.coin}-${f.time}`,
      coin: f.coin,
      side: f.side,
      px: f.px,
      sz: f.sz,
      closedPnl: f.closedPnl,
      time: f.time,
    }));
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const res = await fetch(`${PAPERCLIP_API}/api/companies/${COMPANY_ID}/agents`, {
      headers: {
        Authorization: `Bearer ${process.env.PAPERCLIP_API_KEY || ""}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      const fills = await getRecentFills();
      return NextResponse.json({ agents: [], fills, note: "Paperclip API unavailable" });
    }

    const agents = await res.json();
    const mapped = (agents || []).map((a: any) => ({
      id: a.id,
      name: a.name,
      role: a.role,
      title: a.title,
      status: a.status,
      lastHeartbeatAt: a.lastHeartbeatAt,
    }));

    const fills = await getRecentFills();
    return NextResponse.json({ agents: mapped, fills });
  } catch {
    const fills = await getRecentFills();
    return NextResponse.json({ agents: [], fills, note: "Paperclip API unavailable" });
  }
}
