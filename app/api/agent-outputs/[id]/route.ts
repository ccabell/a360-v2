import { NextRequest } from "next/server";
import { opsSupabase } from "@/lib/supabase";
import { apiError, safeMessage } from "@/lib/api/error";

export const dynamic = "force-dynamic";

/**
 * GET /api/agent-outputs/[id]
 * Single agent output by ID.
 */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const { data, error } = await opsSupabase
      .from("agent_outputs")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    if (!data) return apiError("Agent output not found", 404);

    return Response.json(data);
  } catch (err) {
    return apiError(safeMessage(err), 502);
  }
}

/**
 * PATCH /api/agent-outputs/[id]
 * Update the demo-canonical (baseline) flag on a run.
 * Body: { is_demo_canonical: boolean }
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  try {
    const body = (await req.json().catch(() => ({}))) as {
      is_demo_canonical?: unknown;
    };
    if (typeof body.is_demo_canonical !== "boolean") {
      return apiError("is_demo_canonical (boolean) is required", 400);
    }

    const { data, error } = await opsSupabase
      .from("agent_outputs")
      .update({ is_demo_canonical: body.is_demo_canonical })
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return Response.json(data);
  } catch (err) {
    return apiError(safeMessage(err), 502);
  }
}
