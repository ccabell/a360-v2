import { getOpsSupabase, getAgentSupabase, getRagSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

interface ServiceStatus {
  status: "ok" | "error";
  latency_ms: number;
  error?: string;
}

async function checkSupabase(
  name: string,
  getClient: () => ReturnType<typeof getOpsSupabase>,
): Promise<[string, ServiceStatus]> {
  const start = Date.now();
  try {
    const client = getClient();
    // Lightweight query — just check the connection works
    const { error } = await client.from("_health_check_noop").select("1").limit(0);
    // Table doesn't need to exist — a "relation not found" error still proves the connection works.
    // Only auth/network errors indicate a real problem.
    const isConnectionOk =
      !error || error.message.includes("does not exist") || error.code === "42P01";
    return [
      name,
      {
        status: isConnectionOk ? "ok" : "error",
        latency_ms: Date.now() - start,
        ...(isConnectionOk ? {} : { error: error.message }),
      },
    ];
  } catch (err) {
    return [
      name,
      {
        status: "error",
        latency_ms: Date.now() - start,
        error: err instanceof Error ? err.message : "Unknown error",
      },
    ];
  }
}

/**
 * GET /api/health
 * Pings all three Supabase connections and reports status.
 */
export async function GET() {
  const checks = await Promise.all([
    checkSupabase("ops", getOpsSupabase),
    checkSupabase("agent_manager", getAgentSupabase),
    checkSupabase("rag", getRagSupabase),
  ]);

  const services = Object.fromEntries(checks);
  const allOk = checks.every(([, s]) => s.status === "ok");

  return Response.json(
    {
      status: allOk ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      services,
    },
    { status: allOk ? 200 : 503 },
  );
}
