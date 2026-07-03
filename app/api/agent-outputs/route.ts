import { NextRequest } from "next/server";
import { opsSupabase } from "@/lib/supabase";
import { apiError, safeMessage } from "@/lib/api/error";

export const dynamic = "force-dynamic";

/**
 * GET /api/agent-outputs
 * List all agent outputs with optional filters.
 * De-identified: returns IDs and metadata, no patient names.
 *
 * Query params:
 *   limit   - max rows (default 50, max 200)
 *   offset  - pagination offset
 *   agent_key - filter by agent key
 *   status  - filter by status
 */
export async function GET(req: NextRequest) {
  try {
    const url = req.nextUrl;
    const limit = Math.min(Number(url.searchParams.get("limit") ?? 50), 200);
    const offset = Number(url.searchParams.get("offset") ?? 0);
    const agentKey = url.searchParams.get("agent_key");
    const status = url.searchParams.get("status");

    let query = opsSupabase
      .from("agent_outputs")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (agentKey) query = query.eq("agent_key", agentKey);
    if (status) query = query.eq("status", status);

    const { data, count, error } = await query;
    if (error) throw new Error(error.message);

    return Response.json({ data: data ?? [], total: count ?? 0 });
  } catch (err) {
    return apiError(safeMessage(err), 502);
  }
}
