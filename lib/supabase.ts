import { createClient } from "@supabase/supabase-js";

/**
 * GL Supabase — structured data (agents, products, extractions, runs, opportunities).
 * Project: wvpgmawrizwkmvfnwqfl
 */
export const glSupabase = createClient(
  process.env.NEXT_PUBLIC_GL_SUPABASE_URL!,
  process.env.GL_SUPABASE_SERVICE_KEY!
);

/**
 * CMS Supabase — vectorized RAG content (podcasts, YouTube, PubMed, internal docs).
 * Project: gjqicqldjgvrwmtkliie
 */
export const cmsSupabase = createClient(
  process.env.NEXT_PUBLIC_CMS_SUPABASE_URL!,
  process.env.CMS_SUPABASE_SERVICE_KEY!
);
