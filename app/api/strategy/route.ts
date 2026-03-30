import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET() {
  try {
    const filePath = join(process.cwd(), "strategy-state.json");
    const raw = readFileSync(filePath, "utf-8");
    const state = JSON.parse(raw);
    return NextResponse.json(state);
  } catch {
    return NextResponse.json({
      activeStrategy: "HALTED",
      status: "HALTED",
      history: [],
    });
  }
}
