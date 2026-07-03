import { opsSupabase } from "@/lib/supabase";
import { apiError, safeMessage } from "@/lib/api/error";

export const dynamic = "force-dynamic";

/**
 * GET /api/dashboard/stats
 * Returns live practice metrics from the Ops Supabase.
 * De-identified per PHI policy — IDs only, no patient names.
 */
export async function GET() {
  try {
    const [patientsRes, consultsRes, extractionsRes, agentOutputsRes, recentConsultsRes] =
      await Promise.all([
        // Total active patients
        opsSupabase
          .from("patients")
          .select("id", { count: "exact", head: true })
          .eq("is_active", true),

        // Total consultations
        opsSupabase
          .from("consultations")
          .select("id", { count: "exact", head: true }),

        // Total verified extractions
        opsSupabase
          .from("extractions")
          .select("id", { count: "exact", head: true })
          .eq("is_verified", true),

        // Total agent runs
        opsSupabase
          .from("agent_outputs")
          .select("id", { count: "exact", head: true }),

        // Recent consultations (de-identified: ID, treatment type, timestamps)
        opsSupabase
          .from("consultations")
          .select("id, consultation_type, status, started_at, ended_at")
          .order("started_at", { ascending: false })
          .limit(5),
      ]);

    // Active agents count
    const { count: activeAgents } = await opsSupabase
      .from("agents")
      .select("id", { count: "exact", head: true })
      .eq("status", "active");

    return Response.json({
      patients: patientsRes.count ?? 0,
      consultations: consultsRes.count ?? 0,
      extractions: extractionsRes.count ?? 0,
      agentRuns: agentOutputsRes.count ?? 0,
      activeAgents: activeAgents ?? 0,
      recentConsultations: recentConsultsRes.data ?? [],
    });
  } catch (err) {
    return apiError(safeMessage(err), 502);
  }
}
