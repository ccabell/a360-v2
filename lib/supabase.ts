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
 * CMS Supabase — vectorized RAG content (podcasts, YouTube, PubMed, industry articles).
 * Project: gjqicqldjgvrwmtkliie
 */
export const cmsSupabase = createSupabaseClient(
  "NEXT_PUBLIC_CMS_SUPABASE_URL",
  "CMS_SUPABASE_SERVICE_KEY"
);

/**
 * Prompt Runner Supabase — transcripts, extraction runs, prompts, evaluation.
 * Project: ksutsaiogmicgaarocba
 */
export const prSupabase = createSupabaseClient(
  "NEXT_PUBLIC_PR_SUPABASE_URL",
  "PR_SUPABASE_SERVICE_KEY"
);
