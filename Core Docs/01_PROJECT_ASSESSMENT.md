# CTO-Level Assessment: A360

**Date:** 2026-06-14

---

## What A360 Is

A360 is an AI-powered SaaS platform for the medical aesthetics industry. The core loop:

**Real-time transcription → Structured extraction → Agent intelligence → Treatment planning → Marketing automation**

The domain thesis is strong: medical aesthetics practices generate high-value conversations that are poorly captured today. The vertical is underserved, the economics work (high ACV, repeat visits, elective spend), and the data moat (550K+ vectorized chunks across PubMed, podcasts, YouTube, FDA) is genuinely hard to replicate.

---

## What's Working

- **Core extraction pipeline** works (Prompt Runner → structured outputs → downstream agents)
- **RAG corpus** is substantial and well-organized (550K+ chunks, 22K PubMed articles, 202K podcast chunks)
- **Agent architecture** (Prompt Runner → structured outputs → downstream agents) is sound
- **GL v2.1 schema redesign** shows real domain thinking (3-tier intelligence model)
- **The a360-v2 app** (this project) has real data flowing through both products

**This is a real product.** The question isn't viability — it's execution sequencing.

---

## The Honest Problems

### 1. Massive Surface Area, Thin Depth

As of June 14, 2026:
- **149 items** in `C:\Projects\` (including 48 orphaned `tmpclaude-*` worktrees)
- **17 active workstreams** tracked in STATE.md
- **21 Vercel projects, 11 Railway projects, 3 Supabase instances, 4 AWS environments**
- **8+ demo/prototype apps** across different repos

For a company this size, this is 5-10x more surface area than can be maintained. Every new prototype creates another thing to keep alive.

**Risk:** Spreading bandwidth across so many fronts means nothing reaches the depth needed to close a deal.

### 2. Data Completeness is the Real Blocker

Per the project's own CLAUDE.md:
- `gl_product_anatomy`: **14%** populated
- `gl_product_concerns`: **13%** populated
- `gl_product_relationships`: **16%** populated
- Extraction accuracy: **"not systematically measured"**
- TCP latency: **2-5 minutes** (commercially unviable)

The stacking agent is blocked on data. The pairing agent has 10 fuel docs for 425 products. Agents can't give body-part-aware answers for 86% of the catalog.

**Risk:** Increasingly sophisticated UIs and pipelines built on top of 13-16% data coverage. The demo looks great until someone asks about a product that isn't in the 14%.

### 3. Too Many Demo Vehicles

Current demo-like surfaces:
- `a360_demo` — static HTML demo (GitHub Pages)
- `a360-shell` — 6-tab MUI demo (Vercel)
- `a360-v2` / `a360-v2-wse` — Next.js demo with real data (Vercel)
- `a360-intelligence-dashboard` — older dashboard (dormant)
- `pulse` — retired but not cleaned up
- Mid-Stream — Manus-built internal admin
- A360_Base — real-time consultation demo
- Voice Bot — live voice consultation

A buyer asks: "Which one is the product?" The answer right now is "parts of all of them."

### 4. Direction is Correct, Sequencing Isn't

The architecture is right. The execution order keeps going: **new schema → partial population → new UI → new demo → new schema**. The loop that's missing is: **populate → verify → demonstrate → sell**.

---

## Recommended Focus (30-Day Sprint)

1. **Pick ONE demo vehicle** — a360-v2 is the strongest candidate. Kill or archive the others.
2. **Spend 2 weeks grinding data completeness** to 80%+ on the tables agents actually read
3. **Measure extraction accuracy** on 20 transcripts and get a real number
4. **Result:** One demo that works end-to-end on real data, agents that can answer questions about most products, a measured accuracy number. That's a fundraise deck. That's a product.

---

## Bottom Line

**Not a mess. A sprawl.** The underlying architecture, domain knowledge, and data assets are genuinely strong. But AI-assisted speed means breadth grows faster than depth. Collapse the surface area, grind the data, measure the accuracy, and you have a real company.
