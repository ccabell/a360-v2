# Deploy Source

**Vercel project:** `a360-v2` (`prj_fQJi3NmjWMRq2NqJyURuKzSPvyn7`, team chris-projects-a3d3bc4c)
**Deploys from:** this directory (`C:\Projects\a360-v2`), branch `main` only.
**Method:** `vercel --prod` from this folder, or Vercel git integration on push to `main` if connected.
**Rule:** never `vercel --name`/deploy this folder to any other project; never deploy a non-main branch to production from here. The wse demo suite is a SEPARATE Vercel project (`a360-v2-wse`) deployed via CLI from its own worktree — do not cross the streams.
**Required production env:** the lib/env.ts set (OPS/AGENT/RAG Supabase, AGENT_SERVICE_URL, RAG_SEARCH_URL, BETA_ACCESS_PASSWORD) + `SHARE_LINK_SECRET` (portfolio share links, added 2026-07-04).

Created 2026-07-04 during the audit remediation (deploy-safety standard, INFRASTRUCTURE.md).
