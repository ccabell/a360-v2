import { NextRequest, NextResponse } from "next/server";
import { listAgents, createAgent } from "@/lib/api/agents";
import type { AgentStatus, AgentCategory } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const status = (sp.get("status") ?? undefined) as AgentStatus | undefined;
  const category = (sp.get("category") ?? undefined) as AgentCategory | undefined;
  const search = sp.get("q") ?? undefined;

  try {
    const agents = await listAgents({ status, category, search });
    return NextResponse.json(agents);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const agent = await createAgent(body);
    return NextResponse.json(agent, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
