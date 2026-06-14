import { NextResponse } from "next/server";
import { listOpsAgents } from "@/lib/api/ops-store";

export const dynamic = "force-dynamic";

/** GET /api/ops-agents — active agents from the Ops registry */
export async function GET() {
  try {
    const agents = await listOpsAgents();
    return NextResponse.json(agents);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
