import { NextRequest, NextResponse } from "next/server";
import { resolveTcp } from "@/lib/tcp/resolve";
import type { TcpResolveRequest } from "@/lib/tcp/types";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * POST /api/tcp/resolve
 * Body: { patientId, consultationId? }
 * Returns one TcpPlan (context + recommendations + education + roadmap + tiers).
 * Cached-first (deterministic, stage-safe); live assemble from the real
 * consultation extraction only for patients without a hand-authored fixture.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<TcpResolveRequest>;

  if (!body.patientId) {
    return NextResponse.json({ error: "patientId is required" }, { status: 400 });
  }

  try {
    const plan = await resolveTcp({
      patientId: body.patientId,
      consultationId: body.consultationId,
    });
    return NextResponse.json(plan);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
