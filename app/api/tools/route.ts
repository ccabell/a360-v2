import { NextRequest, NextResponse } from "next/server";
import { listTools } from "@/lib/api/tools";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const dataSource = req.nextUrl.searchParams.get("data_source") ?? undefined;
  try {
    const tools = await listTools(dataSource);
    return NextResponse.json(tools);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
