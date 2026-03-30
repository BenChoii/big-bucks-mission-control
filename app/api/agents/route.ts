import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PAPERCLIP_API = process.env.PAPERCLIP_API_URL || "http://127.0.0.1:3100";
const COMPANY_ID = process.env.PAPERCLIP_COMPANY_ID || "058374d2-1e23-46e8-bda1-7c07f90cfd1b";

export async function GET() {
  try {
    const res = await fetch(`${PAPERCLIP_API}/api/companies/${COMPANY_ID}/agents`, {
      headers: {
        Authorization: `Bearer ${process.env.PAPERCLIP_API_KEY || ""}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      return NextResponse.json({
        agents: [],
        note: "Paperclip API unavailable",
      });
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

    return NextResponse.json({ agents: mapped });
  } catch {
    return NextResponse.json({ agents: [], note: "Paperclip API unavailable" });
  }
}
