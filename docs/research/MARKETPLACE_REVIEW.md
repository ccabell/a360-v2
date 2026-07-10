# Marketplace Review — Patterns to Adopt for the A360 Agent Exchange

Synthesis of 13 marketplaces across 3 tiers (SaaS/CRM, app stores, healthcare/EMR),
reviewed 2026-07-09. Index of sources: `MARKETPLACE_BENCHMARKS.md`.

> **Bottom line:** Every serious marketplace converges on the same spine — a **named trust
> tier**, **outcome-led IA**, a **standardized listing card**, a **trust-earning detail-page
> order**, and a **data/permissions transparency block**. For us the healthcare tier adds the
> decisive twist: an **enforced compliance gate** and a **"connect once to your EMR" story**.
> These aren't cosmetic — several become **fields the CMS must manage**, so we should bake them
> in now rather than retrofit.

---

## 1. Convergent patterns (what essentially everyone does)

| Pattern | Seen at | What it looks like |
|---|---|---|
| **Named trust tier (earned, filterable)** | Shopify "Built for Shopify", Atlassian "Cloud Fortified", Salesforce "Passed Security Review", HubSpot "Certified App", athenahealth HITRUST gate | One badge that bundles security + quality + integration, gated by a published checklist, that buyers can *filter on* |
| **Outcome / workflow-led IA** | Shopify (merchant workflows), athenahealth (capabilities), Redox (use cases) | Browse by job-to-be-done ("Reactivate patients", "Cut charting time"), not by agent type or alphabetically |
| **Curated rails** | Shopify "In the spotlight", HubSpot "Essentials", Atlassian "Rising Stars" | Editorial collections layered on top of categories |
| **Standardized listing card** | All | Icon · one-line benefit · rating(count) · install count · one earned badge · price verb |
| **Trust-earning detail order** | Shopify, HubSpot, Atlassian | Hero+CTA → media → outcome features → pricing tiers → reviews w/ distribution → security/data |
| **Data / permissions transparency** | HubSpot "Shared Data" table, Atlassian "Privacy & Security" | Explicit "what this reads/writes" contract as a first-class section |
| **Compatibility line** | Atlassian version matrix, Zapier "works with", Innovaccer "EHR-agnostic" | "Works with YOUR system" answered on the card, before the click |

---

## 2. Prioritized adoption list for A360

### P0 — do these now (they shape the CMS + catalog)
1. **"A360 Verified — HIPAA-reviewed, BAA in place" badge.** Our version of Cloud Fortified /
   Passed Security Review. Earned, not automatic; buyers can filter on it. In healthcare this is
   *the* conversion lever — athenahealth even **delists** partners who let attestation lapse.
2. **Organize the catalog by practice workflow**, not agent type: **Consult Room · Front Office ·
   Revenue Growth · Analytics · Practice Ops · Marketing** (this already matches the 16-agent
   catalog's 6 categories — good). Add curated rails: "New", "Most installed", "Essentials for medspas".
3. **Standardize the listing card** to exactly: logo/letter · one-line benefit · rating(count) ·
   install count · one badge · price verb ("Free to try"). Nothing more — trust reads at a glance.
4. **"Works with your EMR" line on every card + an integration-depth tier** (Native / API / Read-only).
   Clinical buyers decide on this first.

### P1 — do these as the detail pages mature
5. **Canonical detail-page order** (below) — the template buyers from every other SaaS already know.
6. **"What this agent accesses" table** (our Shared-Data/Permissions block): what patient/practice
   data it reads and writes, retention, whether it trains on your data (it doesn't). Data
   transparency as a section, not fine print. The catalog FAQs already contain this content.
7. **Reviews with a star-distribution bar.** Even with demo data now, build the slot so real
   ratings drop in later. (Catalog already carries ratings + testimonials per agent.)

### P2 — the platform story (bigger than the CMS)
8. **"Connect once" A360 EMR layer** (Redox's model): the practice authorizes A360 to its EMR
   once; every agent inherits that verified, audit-logged connection — no per-agent integration
   project. This is the strongest long-term differentiator and worth a dedicated marketing surface.

---

## 3. Canonical detail-page order (adopt this template)

```
1. Hero        — name, logo, tagline, rating(count), install count,
                 "Works with [EMR]" line, [A360 Verified] badge, primary CTA
2. Media       — 30s demo video + 4–8 screenshot gallery (lightbox — already built)
3. Overview    — outcome-framed: the money/time it finds, not the tech
4. How it works— 3–4 numbered steps (Capture → Extract → Act …)
5. Proof KPIs  — 3 headline metrics ("$11,400 avg missed revenue surfaced")
6. Pricing     — transparent tier(s) with per-tier feature lists
7. What it accesses — data/permissions transparency table
8. Reviews     — star distribution bar + testimonials
9. FAQ         — compliance, EMR, "will my providers feel surveilled", data ownership
10. Footer     — built-by, support, compliance/BAA, version/last-updated
```
The 16-agent catalog PDF already supplies every one of these sections per agent — it maps
1:1 onto this template.

---

## 4. What this means for the CMS data model

Adopting the above adds these **fields the CMS must manage** (beyond the current name/tagline/
description/features/useCases/screenshots):

| Field | Type | Drives |
|---|---|---|
| `category` | enum (6 workflows) | Catalog IA + filtering |
| `badges` | string[] (Verified, Flagship, Staff Pick, New) | Card + hero trust markers |
| `verified` | bool + `verifiedDate` | The "A360 Verified" filter + delist logic |
| `emrCompatibility` | string[] ("Boulevard", "Aesthetic Record"…) | "Works with your EMR" line |
| `integrationDepth` | enum (native / api / read-only) | Card tier |
| `rating` + `reviewCount` | number | Card + reviews section |
| `installCount` | number/string | Card social proof |
| `pricingTiers` | json (name, price, features[]) | Pricing section |
| `kpis` | json (label, value)[] | Proof metrics |
| `dataAccess` | json (reads[], writes[], retention, trainsOnData:false) | Permissions table |
| `faqs` | json (q, a)[] | FAQ section |
| `testimonials` | json (quote, author, location)[] | Reviews section |
| `videoUrl` | string | Media section |
| `status` | enum (draft / live / archived) | Publish workflow |

**Recommendation:** define this schema **once, now**, so seeding the 16 catalog agents is pure
data entry through the CMS — not a code change per agent. Ratings/installs stay flagged as DEMO
until real figures exist (the catalog explicitly warns on this).

---

## 5. What NOT to copy (keep it simple)

- **No partner-tier bureaucracy** (Platinum/Gold/Bug-Bounty programs) — we're first-party;
  every agent is "Built by A360" for now.
- **No procurement/billing engine** (AWS/GCP contract flows) — out of scope for a demo/curated
  exchange.
- **No public developer sandbox / self-serve submission** yet — curation stays with us.
- **No alphabetical mega-catalog** — with 16 agents, outcome rails + search is plenty; don't
  build Zapier-scale taxonomy for a 16-item list.
