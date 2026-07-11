/**
 * Live deploy status (plan §3a-bis): the registry says what things ARE;
 * Vercel says whether they're UP. Requires a server-only VERCEL_API_TOKEN
 * (read-only) with access to the projects' scope; VERCEL_TEAM_ID optional.
 * Without a token, badges simply don't render. Cached 5 minutes in-process.
 */

export interface DeployStatus {
  project: string;
  state: "READY" | "ERROR" | "BUILDING" | "QUEUED" | "CANCELED" | "UNKNOWN";
  /** ISO time of the latest production deployment. */
  deployedAt: string | null;
}

export interface StatusMap {
  available: boolean;
  statuses: Record<string, DeployStatus>;
}

const CACHE_TTL_MS = 5 * 60 * 1000;
let cache: { key: string; map: StatusMap; at: number } | null = null;

function vercelToken(): string | undefined {
  return process.env.VERCEL_API_TOKEN || undefined;
}

async function fetchProjectStatus(
  project: string,
  token: string,
): Promise<DeployStatus> {
  try {
    const teamId = process.env.VERCEL_TEAM_ID;
    const params = new URLSearchParams({
      projectId: project,
      target: "production",
      limit: "1",
    });
    if (teamId) params.set("teamId", teamId);
    const res = await fetch(`https://api.vercel.com/v6/deployments?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    if (!res.ok) return { project, state: "UNKNOWN", deployedAt: null };
    const data = (await res.json()) as {
      deployments?: Array<{ state?: string; readyState?: string; created?: number }>;
    };
    const d = data.deployments?.[0];
    if (!d) return { project, state: "UNKNOWN", deployedAt: null };
    const raw = (d.readyState ?? d.state ?? "UNKNOWN").toUpperCase();
    const state = (
      ["READY", "ERROR", "BUILDING", "QUEUED", "CANCELED"].includes(raw)
        ? raw
        : "UNKNOWN"
    ) as DeployStatus["state"];
    return {
      project,
      state,
      deployedAt: d.created ? new Date(d.created).toISOString() : null,
    };
  } catch {
    return { project, state: "UNKNOWN", deployedAt: null };
  }
}

/** Latest production deploy state for each named Vercel project. */
export async function deployStatuses(projects: string[]): Promise<StatusMap> {
  const token = vercelToken();
  const unique = [...new Set(projects.filter(Boolean))].sort();
  if (!token || unique.length === 0) {
    return { available: false, statuses: {} };
  }
  const key = unique.join(",");
  if (cache && cache.key === key && Date.now() - cache.at < CACHE_TTL_MS) {
    return cache.map;
  }
  const results = await Promise.all(
    unique.map((p) => fetchProjectStatus(p, token)),
  );
  const map: StatusMap = {
    available: true,
    statuses: Object.fromEntries(results.map((r) => [r.project, r])),
  };
  cache = { key, map, at: Date.now() };
  return map;
}
