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

  // External services
  RAG_SEARCH_URL: z.string().url(),
  AI_GATEWAY_API_KEY: z.string().min(1),

  // Auth
  BETA_ACCESS_PASSWORD: z.string().min(1),

  // Sentry (optional — disabled in dev)
  SENTRY_DSN: z.string().url().optional(),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

export type ServerEnv = z.infer<typeof serverSchema>;

let _cached: ServerEnv | null = null;

/**
 * Returns validated server environment. Throws on first call if any required
 * var is missing — surfaces the problem at startup, not on the first user request.
 */
export function serverEnv(): ServerEnv {
  if (_cached) return _cached;

  const result = serverSchema.safeParse(process.env);
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
