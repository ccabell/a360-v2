import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { serverEnv } from "./env";

/**
 * Lazily-created Supabase clients. Each client is instantiated on first access
 * using validated env vars from lib/env.ts. If env vars are missing the process
 * throws at startup instead of returning a placeholder that fails silently.
 *
 * During `next build` (no runtime env), the getter defers creation until the
 * first API request — build-time pages never call these.
 */

let _ops: SupabaseClient | null = null;
let _agent: SupabaseClient | null = null;
let _rag: SupabaseClient | null = null;

/**
 * Ops Supabase — patients, consultations, transcripts, extractions, agents, agent_outputs.
 * Project: uedajrdzcjfrmbiznflf (A360 Ops)
 */
export function getOpsSupabase(): SupabaseClient {
  if (!_ops) {
    const e = serverEnv();
    _ops = createClient(e.OPS_SUPABASE_URL, e.OPS_SUPABASE_SERVICE_KEY);
  }
  return _ops;
}

/**
 * Agent Manager Supabase — Global Library: products, offerings, fuel docs, evidence_links, compliance.
 * Project: aejskvmpembryunnbgrk (Global V3)
 */
export function getAgentSupabase(): SupabaseClient {
  if (!_agent) {
    const e = serverEnv();
    _agent = createClient(
      e.NEXT_PUBLIC_AGENT_SUPABASE_URL,
      e.AGENT_SUPABASE_SERVICE_KEY,
    );
  }
  return _agent;
}

/**
 * RAG Supabase — vectorized RAG content (podcasts, YouTube, PubMed, industry articles).
 * Project: gjqicqldjgvrwmtkliie
 */
export function getRagSupabase(): SupabaseClient {
  if (!_rag) {
    const e = serverEnv();
    _rag = createClient(e.RAG_SUPABASE_URL, e.RAG_SUPABASE_KEY);
  }
  return _rag;
}

// ── Backwards-compatible exports ─────────────────────────────────────────────
// Existing code imports `opsSupabase`, `agentSupabase`, `ragSupabase` as module
// constants. These lazy getters preserve that pattern via Object.defineProperty
// so we don't need to update every import site right now.

function lazyClient(getter: () => SupabaseClient): SupabaseClient {
  // Return a proxy that defers to the real client on first property access.
  // This avoids calling serverEnv() at module load time (which breaks next build).
  return new Proxy({} as SupabaseClient, {
    get(_target, prop, receiver) {
      const real = getter();
      const val = Reflect.get(real, prop, receiver);
      return typeof val === "function" ? val.bind(real) : val;
    },
  });
}

export const opsSupabase = lazyClient(getOpsSupabase);
export const agentSupabase = lazyClient(getAgentSupabase);
export const ragSupabase = lazyClient(getRagSupabase);

// PR Supabase (ksutsaiogmicgaarocba) REMOVED 2026-06-14.
// Prompt Runner is accessed via HTTP API (lib/prompt-runner.ts), not direct Supabase.
