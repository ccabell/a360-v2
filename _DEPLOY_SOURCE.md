# Deploy Source

**PRIMARY domain (Chris, 2026-07-04): `a360-v2-wse.vercel.app`** — Vercel project `a360-v2-wse`
(`prj_KXW7C1STkHbNTag6v0WEA1Ey8G3A`). Deploys **branch `main`** via CLI (`vercel --prod`) from a
clean worktree linked to that project (the designated deploy worktree: `C:\Projects\a360-v2-portfolio`).
Secondary: Vercel project `a360-v2` (`prj_fQJi3NmjWMRq2NqJyURuKzSPvyn7`) also serves `main`
(a360-v2.vercel.app).
**Rule:** production deploys of either project come from `main` only; never `vercel --name` from
an unfamiliar folder; verify `.vercel/project.json` before every deploy. Both projects need the
same `SHARE_LINK_SECRET` so share links work on both domains.

## Agent Exchange (Chris, 2026-07-16)

- **THE Agent Exchange is `https://a360-v2-wse.vercel.app/exchange` — the ONLY URL to share or link.**
  `a360-v2.vercel.app/exchange` is the same code/DB via the secondary project; it is NOT canonical,
  must never be shared, and no redirect is maintained (nothing durable points at it — the only
  share link ever minted against a360-v2.vercel.app expired 2026-07-11). Mint all future share
  links with `--base https://a360-v2-wse.vercel.app`. The secondary project may be paused/retired
  in the Vercel dashboard at any time without breaking anything.
- **Listings are managed ONLY through `/admin/exchange`** (DB: `exchange_agents` + `exchange-media`
  bucket in Global V3 `aejskvmpembryunnbgrk`). The hardcoded-array era is closed.
- **Asset Factory import works in LOCAL DEV ONLY** (by design, Chris 2026-07-16): the import button
  in `/admin/exchange` reads `C:\Projects\asset_factory\assets\_handoff\exchange\APPROVED_MANIFEST.json`
  from local disk and uploads to the shared bucket/DB that the deployed storefront reads. On a
  deployed instance the import button has nothing to read — expected, not a bug. Run content
  updates locally; they appear on the live site immediately (no deploy needed for content).
- **Do not edit exchange code in the `C:\Projects\a360-v2-wse` worktree** (it sits on a feature
  branch); exchange code changes land on `main` and ship via the CLI path above.
**Required production env:** the lib/env.ts set (OPS/AGENT/RAG Supabase, AGENT_SERVICE_URL, RAG_SEARCH_URL, BETA_ACCESS_PASSWORD) + `SHARE_LINK_SECRET` (portfolio share links, added 2026-07-04).

Created 2026-07-04 during the audit remediation (deploy-safety standard, INFRASTRUCTURE.md).
