import { getAgentSupabase, getOpsSupabase, getRagSupabase } from "@/lib/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Typed data-source registry for the Command Center (plan §3b) — mirrors
 * A360_Hub/SUPABASE_REGISTRY.md. This file is deliberately the ONLY data
 * structure besides portfolio_projects/portfolio_tasks: sources change at
 * code-review cadence.
 *
 * Corpus counts are ALWAYS fetched live (hub rule) — never hardcoded here.
 * `ds:<id>` / `svc:<id>` are the tokens used in portfolio_projects.dependencies.
 */

export type DataSourceState = "active" | "hold" | "reserve" | "retired";

interface CountSpec {
  label: string;
  table: string;
  /** Which of the app's existing Supabase clients can count this table. */
  client: "ops" | "gl" | "rag";
}

export interface DataSource {
  id: string;
  name: string;
  kind: "supabase" | "service";
  /** Supabase project ref, or service URL env var name. */
  ref?: string;
  role: string;
  ownerApp: string;
  writerRules?: string;
  state: DataSourceState;
  dashboardUrl?: string;
  adminSurface?: { label: string; href: string };
  counts?: CountSpec[];
  notes?: string;
}

export const DATA_SOURCES: DataSource[] = [
  {
    id: "ops",
    name: "A360 Ops",
    kind: "supabase",
    ref: "uedajrdzcjfrmbiznflf",
    role: "Patients, consultations, transcripts, extractions, agent registry + outputs, Reach campaigns, portfolio registry.",
    ownerApp: "a360-v2",
    writerRules: "a360-v2 server routes (service key). Agent prompts come from agents/agent_versions here — never hardcoded.",
    state: "active",
    dashboardUrl: "https://supabase.com/dashboard/project/uedajrdzcjfrmbiznflf",
    counts: [
      { label: "patients", table: "patients", client: "ops" },
      { label: "consultations", table: "consultations", client: "ops" },
      { label: "agents", table: "agents", client: "ops" },
      { label: "extractions", table: "extractions", client: "ops" },
      { label: "reach campaigns", table: "reach_campaigns", client: "ops" },
      { label: "portfolio projects", table: "portfolio_projects", client: "ops" },
    ],
  },
  {
    id: "global-v3",
    name: "Global V3 (GL)",
    kind: "supabase",
    ref: "aejskvmpembryunnbgrk",
    role: "Global Library knowledge: products, offerings, fuel docs, evidence, compliance — plus the Exchange catalog and GL content.",
    ownerApp: "a360-tcp (Studio) + a360-v2 (read)",
    writerRules:
      "GL content (content_assets / offering_content): SINGLE writer = A360 Studio review station. Exchange admin lives in a360-v2-wse. gl_cms is FROZEN.",
    state: "active",
    dashboardUrl: "https://supabase.com/dashboard/project/aejskvmpembryunnbgrk",
    adminSurface: { label: "A360 Studio /library", href: "https://a360-tcp.vercel.app/library/gl" },
    counts: [
      { label: "products", table: "products", client: "gl" },
      { label: "offerings", table: "offerings", client: "gl" },
      { label: "exchange agents", table: "exchange_agents", client: "gl" },
      { label: "content assets", table: "content_assets", client: "gl" },
      { label: "fuel documents", table: "agent_fuel_documents", client: "gl" },
      { label: "evidence links", table: "evidence_links", client: "gl" },
    ],
  },
  {
    id: "internal-cms",
    name: "Internal CMS (RAG)",
    kind: "supabase",
    ref: "gjqicqldjgvrwmtkliie",
    role: "Vectorized corpora: podcasts, PubMed, manufacturer YouTube, industry articles, internal docs. Reached through the RAG search service.",
    ownerApp: "rag pipelines (write) · RAG service (read)",
    writerRules: "Corpora written only by the rag repo's pipelines. Apps query via RAG_SEARCH_URL, not direct SQL.",
    state: "active",
    dashboardUrl: "https://supabase.com/dashboard/project/gjqicqldjgvrwmtkliie",
    counts: [
      { label: "podcast chunks", table: "podcast_chunks", client: "rag" },
      { label: "podcast episodes", table: "podcast_episodes", client: "rag" },
      { label: "PubMed articles", table: "pubmed_articles_vectorized", client: "rag" },
      { label: "YouTube chunks", table: "manufacturer_youtube_transcript", client: "rag" },
      { label: "internal docs", table: "a360_internal_docs", client: "rag" },
    ],
  },
  {
    id: "pip-dev",
    name: "PIP (dedicated)",
    kind: "supabase",
    ref: "zwauujgnaobodbgizodl",
    role: "Strategic intelligence workspace — companies, products, features, opportunities. Real auth + RLS.",
    ownerApp: "pip",
    state: "active",
    dashboardUrl: "https://supabase.com/dashboard/project/zwauujgnaobodbgizodl",
    notes: "No keys in this app — counts live in PIP itself.",
  },
  {
    id: "pubmed-library",
    name: "PubMed Library",
    kind: "supabase",
    ref: "kmluxbhvqvlwaxvgrrnh",
    role: "23K structured books + 9.1K-term global term library (144K relationships).",
    ownerApp: "—",
    state: "hold",
    dashboardUrl: "https://supabase.com/dashboard/project/kmluxbhvqvlwaxvgrrnh",
    notes: "Consolidation Wave-2 HOLD — migration decision needed before retiring (content likely absent from the CMS corpus).",
  },
  {
    id: "extraction-model",
    name: "Extraction Model (legacy)",
    kind: "supabase",
    ref: "wvpgmawrizwkmvfnwqfl",
    role: "Legacy seed source — read-only archive.",
    ownerApp: "—",
    state: "retired",
    dashboardUrl: "https://supabase.com/dashboard/project/wvpgmawrizwkmvfnwqfl",
    notes: "RETIRED for new work. Voice Bot still writes sessions here — rewire before any revival.",
  },
  {
    id: "prompt-runner-db",
    name: "Prompt Runner DB",
    kind: "supabase",
    ref: "ksutsaiogmicgaarocba",
    role: "Legacy prompt-runner backend data.",
    ownerApp: "prompt-runner (reserve)",
    state: "retired",
    dashboardUrl: "https://supabase.com/dashboard/project/ksutsaiogmicgaarocba",
    notes: "Retired as a data route (2026-06-14). Deploys kept as reserve; no new work points here.",
  },
  {
    id: "agent-service",
    name: "Agent Service",
    kind: "service",
    ref: "AGENT_SERVICE_URL",
    role: "Registry-versioned, lineage-bearing agent runs (Railway, Aesthetics-360/a360-agent-service).",
    ownerApp: "a360-v2 + future consumers",
    state: "active",
    notes: "Opt-in bearer auth via SERVICE_AUTH_TOKEN.",
  },
  {
    id: "rag-search",
    name: "RAG Search Service",
    kind: "service",
    ref: "RAG_SEARCH_URL",
    role: "Semantic search over the Internal CMS corpora (Railway).",
    ownerApp: "a360-v2 (Ask, Tube, Podcast, Academy)",
    state: "active",
  },
];

export function getDataSource(id: string): DataSource | undefined {
  return DATA_SOURCES.find((d) => d.id === id);
}

const CLIENTS: Record<CountSpec["client"], () => SupabaseClient> = {
  ops: getOpsSupabase,
  gl: getAgentSupabase,
  rag: getRagSupabase,
};

export interface LiveCount {
  label: string;
  table: string;
  count: number | null;
}

/**
 * Live row counts for one data source ("corpus counts are always live").
 * A failed count renders as null ("—") rather than failing the page.
 */
export async function liveCounts(source: DataSource): Promise<LiveCount[]> {
  if (!source.counts) return [];
  return Promise.all(
    source.counts.map(async (spec): Promise<LiveCount> => {
      try {
        const { count, error } = await CLIENTS[spec.client]()
          .from(spec.table)
          .select("*", { count: "exact", head: true });
        if (error) throw error;
        return { label: spec.label, table: spec.table, count: count ?? null };
      } catch {
        return { label: spec.label, table: spec.table, count: null };
      }
    }),
  );
}
