import { opsSupabase } from "@/lib/supabase";
import { apiError, safeMessage } from "@/lib/api/error";

export const dynamic = "force-dynamic";

/**
 * GET /api/agents/stats
 * Per-agent run statistics from the agent_registry_stats view:
 * active version semver/model, run count, last run time, success rate.
 */
export async function GET() {
  try {
    const { data, error } = await opsSupabase
      .from("agent_registry_stats")
      .select("*");
    if (error) throw new Error(error.message);
    return Response.json(data ?? []);
  } catch (err) {
    return apiError(safeMessage(err), 502);
  }
}
