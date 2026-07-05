import { NextRequest, NextResponse } from "next/server";
import { opsSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * Reach HITL persistence (Ops Supabase `reach_campaigns`).
 *
 * GET  /api/reach/campaigns?patient_id=UUID
 *   → the latest saved campaign for that patient (or `data: null`).
 *   Used to restore review state when a patient is re-selected.
 *
 * POST /api/reach/campaigns
 *   body: { id?, patient_id, campaign, campaign_type?, status?, reviews?, editor?, action? }
 *   → insert (no id) or update (with id). Appends an entry to the append-only
 *     `edit_history` audit. v1 exports only — this never sends anything.
 */

const STATUSES = ["draft", "edited", "approved", "rejected"] as const;

const SELECT =
  "id, patient_id, campaign_type, status, campaign, reviews, edit_history, editor, created_at, updated_at";

export async function GET(req: NextRequest) {
  const patientId = req.nextUrl.searchParams.get("patient_id");
  if (!patientId) {
    return NextResponse.json({ error: "patient_id is required" }, { status: 400 });
  }
  try {
    const { data, error } = await opsSupabase
      .from("reach_campaigns")
      .select(SELECT)
      .eq("patient_id", patientId)
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw error;
    return NextResponse.json({ data: data ?? null });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to load campaign: ${errMessage(err)}` },
      { status: 502 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as {
      id?: string;
      patient_id?: string;
      campaign?: unknown;
      campaign_type?: string;
      status?: string;
      reviews?: unknown;
      editor?: string;
      action?: string;
    };

    const { id, patient_id, campaign, campaign_type, reviews, editor, action } = body;
    if (!patient_id || !campaign || typeof campaign !== "object") {
      return NextResponse.json(
        { error: "patient_id and campaign are required" },
        { status: 400 },
      );
    }
    const status = (STATUSES as readonly string[]).includes(body.status ?? "")
      ? (body.status as string)
      : "draft";
    const now = new Date().toISOString();
    const historyEntry = {
      at: now,
      action: action ?? "save",
      status,
      editor: editor ?? null,
    };

    if (id) {
      const { data: existing, error: exErr } = await opsSupabase
        .from("reach_campaigns")
        .select("edit_history")
        .eq("id", id)
        .maybeSingle();
      if (exErr) throw exErr;
      const history = Array.isArray(existing?.edit_history)
        ? (existing!.edit_history as unknown[])
        : [];
      history.push(historyEntry);

      const { data, error } = await opsSupabase
        .from("reach_campaigns")
        .update({
          campaign,
          campaign_type: campaign_type ?? null,
          status,
          reviews: reviews ?? [],
          editor: editor ?? null,
          edit_history: history,
          updated_at: now,
        })
        .eq("id", id)
        .select("id, status, updated_at")
        .single();
      if (error) throw error;
      return NextResponse.json({ ok: true, ...data });
    }

    const { data, error } = await opsSupabase
      .from("reach_campaigns")
      .insert({
        patient_id,
        campaign,
        campaign_type: campaign_type ?? null,
        status,
        reviews: reviews ?? [],
        editor: editor ?? null,
        edit_history: [historyEntry],
      })
      .select("id, status, updated_at")
      .single();
    if (error) throw error;
    return NextResponse.json({ ok: true, ...data });
  } catch (err) {
    return NextResponse.json(
      { error: `Failed to save campaign: ${errMessage(err)}` },
      { status: 502 },
    );
  }
}

/** Supabase throws PostgrestError objects (not Error instances) — extract their message. */
function errMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (err && typeof err === "object") {
    const e = err as Record<string, unknown>;
    return (
      [e.message, e.details, e.hint, e.code].filter(Boolean).join(" | ") ||
      JSON.stringify(err)
    );
  }
  return "Unknown error";
}
