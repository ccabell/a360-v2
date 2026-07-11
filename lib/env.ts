import { z } from "zod";

/**
 * Server-side environment validation. Imported by lib/supabase.ts and API routes.
 *
 * At build time Next.js may not have runtime env vars available, so we defer
 * validation to the first access via a lazy getter. Once validated, the result
 * is cached for the process lifetime.
 *
 * If any required var is missing at runtime the process throws immediately
 * instead of returning placeholder clients that fail silently on first request.
 */

const serverSchema = z.object({
  // Ops Supabase (patients, consultations, agents, agent_outputs)
  OPS_SUPABASE_URL: z.string().url(),
  OPS_SUPABASE_SERVICE_KEY: z.string().min(1),

  // Agent Manager / Global V3 (products, fuel docs, evidence)
  NEXT_PUBLIC_AGENT_SUPABASE_URL: z.string().url(),
  AGENT_SUPABASE_SERVICE_KEY: z.string().min(1),

  // RAG corpus (550K vectorized chunks)
  RAG_SUPABASE_URL: z.string().url(),
  RAG_SUPABASE_KEY: z.string().min(1),

  // External services. RAG_SEARCH_URL may be the literal "disabled" — the
  // RAG Search Railway service is optional and lib/retrieval/sources.ts
  // already checks for an http(s) prefix before using it.
  RAG_SEARCH_URL: z.string().refine(
    (v) => v === "disabled" || v.startsWith("http://") || v.startsWith("https://"),
    { message: "must be a URL or the literal 'disabled'" },
  ),
  AI_GATEWAY_API_KEY: z.string().min(1),

  // Auth
  BETA_ACCESS_PASSWORD: z.string().min(1),

  // Sentry (optional — disabled in dev)
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),

  // Command Center feeds (optional — features degrade gracefully without them)
  GITHUB_TOKEN: z.string().min(1).optional(), // commits + JOURNAL feeds (read-only PAT)
  VERCEL_API_TOKEN: z.string().min(1).optional(), // live deploy-status badges
  VERCEL_TEAM_ID: z.string().min(1).optional(),
  HUB_JOURNAL_REPO: z.string().min(1).optional(), // defaults to ccabell/a360-hub
});

export type ServerEnv = z.infer<typeof serverSchema>;

let _cached: ServerEnv | null = null;

/**
 * Returns validated server environment. Throws on first call if any required
 * var is missing — surfaces the problem at startup, not on the first user request.
 */
export function serverEnv(): ServerEnv {
  if (_cached) return _cached;

  // Defensive: some Vercel-stored values have picked up a trailing newline in
  // the past (e.g. from a piped-in CLI set that appended CRLF) which fails
  // exact-match/URL checks below even though the value is otherwise correct.
  // Trim every var before validating rather than chasing this field-by-field.
  const trimmedEnv: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(process.env)) {
    trimmedEnv[key] = typeof value === "string" ? value.trim() : value;
  }

  const result = serverSchema.safeParse(trimmedEnv);
  if (!result.success) {
    const missing = result.error.issues
      .map((i) => `  ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Missing or invalid environment variables:\n${missing}\n\nCheck .env.local or Vercel env settings.`,
    );
  }
  _cached = result.data;
  return _cached;
}
