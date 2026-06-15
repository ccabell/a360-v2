import { createClient, type SupabaseClient } from "@supabase/supabase-js";

function createSupabaseClient(urlKey: string, keyKey: string): SupabaseClient {
  const url = process.env[urlKey];
  const key = process.env[keyKey];
  if (!url || !key) {
    // Return a dummy client during build time (env vars not available)
    // API routes will fail at runtime if env vars are actually missing
    return createClient("https://placeholder.supabase.co", "placeholder");
  }
  return createClient(url, key);
}

/**
 * Ops Supabase — patients, consultations, transcripts, extractions, agents, agent_outputs.
 * Project: uedajrdzcjfrmbiznflf (A360 Ops)
 */
export const opsSupabase = createSupabaseClient(
  "OPS_SUPABASE_URL",
  "OPS_SUPABASE_SERVICE_KEY"
);

/**
 * Agent Manager Supabase — Global Library: products, offerings, fuel docs, evidence_links, compliance.
 * Project: aejskvmpembryunnbgrk (Global V3)
 */
export const agentSupabase = createSupabaseClient(
  "NEXT_PUBLIC_AGENT_SUPABASE_URL",
  "AGENT_SUPABASE_SERVICE_KEY"
);

/**
 * RAG Supabase — vectorized RAG content (podcasts, YouTube, PubMed, industry articles).
 * Project: gjqicqldjgvrwmtkliie
 */
export const ragSupabase = createSupabaseClient(
  "RAG_SUPABASE_URL",
  "RAG_SUPABASE_KEY"
);

// PR Supabase (ksutsaiogmicgaarocba) REMOVED 2026-06-14.
// Prompt Runner is accessed via HTTP API (lib/prompt-runner.ts), not direct Supabase.
