import { NextRequest, NextResponse } from "next/server";
import { agentSupabase } from "@/lib/supabase";
import { getDefaultTenantId, logActivity } from "@/lib/activity";

export const dynamic = "force-dynamic";

/**
 * GET  /api/saved-outputs        — list saved outputs for the current tenant (newest first)
 * POST /api/saved-outputs        — save a research answer / agent output
 *
 * No Supabase Auth yet (hybrid scope): tenant is derived from APP_MODE.
 */

export async function GET() {
  try {
    const tenantId = await getDefaultTenantId();
    let q = agentSupabase
      .from("app_saved_outputs")
      .select("id, output_type, title, question, answer_prose, citations, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (tenantId) q = q.eq("tenant_id", tenantId);
    const { data, error } = await q;
    if (error) throw error;
    return NextResponse.json({ data: data ?? [] });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Failed to load saved outputs: ${message}` }, { status: 502 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const {
      output_type = "research_chat",
      title,
      question,
      answer_prose,
      citations,
      evidence_link_ids,
      payload,
    } = body ?? {};

    if (!answer_prose && !question) {
      return NextResponse.json({ error: "Nothing to save" }, { status: 400 });
    }

    const tenantId = await getDefaultTenantId();
    const { data, error } = await agentSupabase
      .from("app_saved_outputs")
      .insert({
        tenant_id: tenantId,
        output_type,
        title: title ?? (question ? String(question).slice(0, 80) : "Saved output"),
        question: question ?? null,
        answer_prose: answer_prose ?? null,
        citations: citations ?? [],
        evidence_link_ids: evidence_link_ids ?? [],
        payload: payload ?? {},
      })
      .select("id")
      .single();
    if (error) throw error;

    await logActivity({
      type: "output.saved",
      entityType: output_type,
      entityId: data?.id,
    });

    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Failed to save output: ${message}` }, { status: 502 });
  }
}
