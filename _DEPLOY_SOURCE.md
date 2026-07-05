# Deploy Source

**PRIMARY domain (Chris, 2026-07-04): `a360-v2-wse.vercel.app`** — Vercel project `a360-v2-wse`
(`prj_KXW7C1STkHbNTag6v0WEA1Ey8G3A`). Deploys **branch `main`** via CLI (`vercel --prod`) from a
clean worktree linked to that project. Secondary: Vercel project `a360-v2`
(`prj_fQJi3NmjWMRq2NqJyURuKzSPvyn7`) also serves `main` (a360-v2.vercel.app).
**Rule:** production deploys of either project come from `main` only; never `vercel --name` from
an unfamiliar folder; verify `.vercel/project.json` before every deploy. Both projects need the
same `SHARE_LINK_SECRET` so share links work on both domains.
**Required production env:** the lib/env.ts set (OPS/AGENT/RAG Supabase, AGENT_SERVICE_URL, RAG_SEARCH_URL, BETA_ACCESS_PASSWORD) + `SHARE_LINK_SECRET` (portfolio share links, added 2026-07-04).

Created 2026-07-04 during the audit remediation (deploy-safety standard, INFRASTRUCTURE.md).
