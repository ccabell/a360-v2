# A360 Evidence Ask — Business, Technical & Design Requirements
**Modeled on Heidi Evidence Ask (reverse-engineered 2026-06-12) · Mapped to the a360-v2 build**

---

# PART 0 — What Heidi Actually Built (Reverse-Engineering Findings)

Decompiled from the downloaded page bundle + live product documentation. This is the ground truth we're modeling.

## 0.1 Architecture

```
heidi.ai/en-us/evidence-ask?query=What+is+botox          ← marketing shell (Next.js + Sanity CMS)
  │  · minimal page: header only, FOOTER SUPPRESSED (code: /\/evidence-ask\/?$/ → return null)
  │  · full-bleed layout, the embed IS the page
  │
  └── <iframe id="heidi-chat"
        src="https://scribe.heidihealth.com/chat/embed?query=What%20is%20botox"
        allow="microphone; clipboard-write">                ← THE REAL PRODUCT APP, embed mode
        │
        └── postMessage protocol (origin-checked against allowlist):
            heidi:ready                  embed finished loading
            heidi:evidence_message_sent  user asked a question → shell fires GTM conversion
                                         event `evidence_unauth_message_sent` (value: 0 USD)
            heidi:openLoginModal         embed asks shell to open login
            heidi:openSignupModal        embed asks shell to open signup
            heidi:redirect               embed asks shell to navigate
            heidi:tracking               embed forwards analytics to shell's GTM
            heidi:modalOpened/Closed     scroll-lock coordination
```

**Key insight #1 — it's one product, two doors.** The "free public ask page" is not a separate demo app. It's the production Evidence app served in an embed mode with auth optional. No duplicate UI to maintain; the marketing page is ~50 lines of shell.

**Key insight #2 — the free ask IS the funnel.** Unauthenticated questions are tracked as $0 conversion events. Login/signup is triggered *from inside the experience* (after the user has gotten value), not as a gate in front of it. Title says it explicitly: "Unlimited Free Clinical Answers. No Ads. No login required."

**Key insight #3 — the SEO flywheel.** Bundles contain an `AnswersHub` component rendering `/answers/{slug}` pages with filters by specialty and questionType — they publish past Q&As as indexed static pages. Every good answer becomes a Google-rankable landing page that funnels into the ask experience ("Clinical question? Try Heidi Evidence").

## 0.2 The answer experience (from product docs + bundle)

- **Input**: rounded-xl single input, auto-focused on desktop, placeholder "Enter your query...", ArrowUp submit button that activates when text present, spinner while loading
- **Suggestion chips**: categorized example queries grouped by *verb* (their data model: `verbs[] → items[] → query`), shown as ghost chips under the input; a popover "suggestions" panel with tag + query rows
- **Streaming answer**: SSE; prose streams in; sources arrive as a JSON preamble before tokens; inline citation markers `[Source N]` resolved against the sources array into links
- **Inline citations**: chips like [RACGP], [CDC], [Cochrane] — every key clinical statement is linked; "Every answer is designed to be checkable"
- **Visible source hierarchy**: tiered — peer-reviewed research → regional guidelines → recognized clinical web content. The quality hierarchy is *visible, not assumed*
- **Follow-up suggestions**: suggested next questions to refine without retyping
- **Specialty-aware retrieval**: user's specialty re-weights which sources surface
- **History**: previous Q&As saved (authed)
- **Considerations**: context-aware related-evidence surfacing (in-session)

## 0.3 What we may copy vs. must not

Copy freely: the interaction architecture (embed pattern, postMessage protocol, ungated funnel, SSE + citation resolution, suggestion chips, SEO answers hub). These are functional patterns.
Do **not** copy: Heidi's name, logo, copy text, illustrations, exact visual identity. All copy below is original A360 language. (Also: we don't need to clone their cookie/GTM stack; we have our own analytics.)

---

# PART 1 — Business Requirements

## 1.1 Product definition

**A360 Evidence Ask** — a public, ungated, citation-backed Q&A experience for medical aesthetics. Anyone (provider, injector, front desk, prospective Boulevard buyer, curious patient) can ask a question about aesthetic treatments and get a grounded answer with clickable FDA, PubMed, and manufacturer citations in seconds. No login. The same engine that powers the in-app Research tab.

**Positioning line (ours):** *"Ask anything about aesthetic medicine. Every answer cited. Free, no login."*

**Why this wins for A360 specifically:** Heidi cites Cochrane and CDC for general medicine. Nobody has done this for aesthetics — where the evidence layer (FDA labels, IFUs, aesthetic journals, manufacturer trials) is fragmented and practices run on rep-supplied marketing sheets. A360's Global Library is purpose-built for exactly this corpus. Heidi proved the pattern; the aesthetics vertical is empty.

## 1.2 Strategic objectives (in priority order)

1. **Boulevard demo wow (June 22).** The single most legible demonstration of the GL: CEO/CTO types any question on a public URL, watches a grounded, cited answer stream in. No login friction in the demo. The embed architecture is itself a pitch: *"this drops into boulevard.com as an iframe — your 35,000 practices get an evidence layer overnight."*
2. **Distribution-ready embed.** The `/embed` route + postMessage protocol makes A360 Evidence embeddable in Boulevard's product, in manufacturer portals, in practice websites. One build, many surfaces.
3. **Lead funnel.** Ungated asks → tracked as conversion events → contextual signup prompt after N answers → practice leads.
4. **SEO moat (post-demo).** Publish curated Q&As as `/answers/{slug}` pages. "Can you do Botox and filler in the same appointment?" is a high-volume query nobody answers with citations today.

## 1.3 Audiences

| Audience | Job to be done | Success looks like |
|---|---|---|
| Boulevard exec (demo) | Believe the GL is real and deep | Asks an unscripted question, gets a cited answer |
| Provider/injector | Pre-consult refresh, contraindication check | Answer + FDA label link in <15s |
| Practice staff (non-clinical) | Patient question they can't answer | Plain-language education answer, safety floor cited |
| Prospective customer | Evaluate A360 | Converts to demo request / signup |

## 1.4 KPIs & instrumentation

- `evidence_unauth_ask` (per question; our analog of Heidi's `evidence_unauth_message_sent`, value $0 conversion)
- Answer completion rate (stream finished / asks), p50 time-to-first-token, p50 time-to-complete
- Citation click-through rate (proves the citations matter — Boulevard talking point)
- Follow-up rate (asks per session)
- Signup-modal conversion after soft prompt
- Post-demo: indexed `/answers/*` pages, organic entrances

## 1.5 Guardrails (business-level)

- **Education, not medical advice.** Persistent, non-blocking disclaimer: educational information for licensed professionals; not a substitute for clinical judgment or the product label. Matches the locked gateway posture: characterize + point to FDA source; assert the safety floor authoritatively.
- **Scope fence.** The public surface answers about the 20-product catalog + categories/concerns. Out-of-corpus questions get an honest "not in our library yet" with nearest covered topics — never an uncited improvisation. (An empty-but-honest answer is a *credibility feature* in front of a CTO.)
- **No PHI** anywhere in the public surface (already rule #6 in DEVELOPER_BRIEF).
- **No login wall, but rate limits** (see 3.6) so "free and unlimited" doesn't become a token bonfire.

---

# PART 2 — Functional Requirements

FR-numbered; **[EXISTS]** = already in a360-v2 per DEVELOPER_BRIEF, **[WIRE]** = exists but needs config/wiring, **[BUILD]** = net-new.

## FR-1 Public Ask page — `/ask`
1.1 **[BUILD]** Route `/ask` (and marketing-site alias later): no auth, no sidebar, no footer. Full-bleed single-purpose page: logo, one-line value prop, the Ask input, suggestion chips, disclaimer line.
1.2 **[BUILD]** Accepts `?query=` URL param → auto-seeds and auto-submits the question (Heidi's exact pattern; this is what makes ads/QR codes/demo links work).
1.3 **[WIRE]** The answer experience is the existing `GroundedAnswer` + citation components rendered in this page — same engine as `/dashboard/research`, different chrome.
1.4 **[BUILD]** Suggested-question chips under the input, grouped by verb — data-driven from a config (e.g., **Compare** "Botox vs Dysport vs Daxxify — how do they differ?", **Safety** "Who should not get Sculptra?", **Pairing** "Can Morpheus8 and filler be done the same day?", **Timing** "How long before a wedding should filler be done?", **Value** "Why does Daxxify cost more than Botox?"). Clicking a chip submits it.
1.5 **[EXISTS]** Streaming prose + inline citation chips + tiered references section (`MessageWithCitations`, `ReferencesSection`).
1.6 **[WIRE]** Follow-up suggestions after each answer (`components/ai/suggestions.tsx` exists — wire to the public page).
1.7 **[BUILD]** Soft conversion moment: after the 3rd answer in a session, a dismissible inline card ("Want this inside your practice? →") — never a blocking modal mid-answer.

## FR-2 Embed mode — `/embed/ask`
2.1 **[BUILD]** Same component tree as `/ask`, minus logo/nav, transparent-friendly background, compact spacing. Designed to live inside an iframe.
2.2 **[BUILD]** postMessage protocol (our analog of Heidi's):
```
a360:ready            → parent        embed mounted
a360:ask_sent         → parent        { message_id, ts }  (parent fires its analytics)
a360:answer_complete  → parent        { message_id, citations_count }
a360:citation_click   → parent        { url, tier }
a360:cta_click        → parent        { target }          (parent decides nav)
a360:resize           → parent        { height }          (for non-fullscreen embeds)
parent → a360:seed    { query }                            (programmatic ask)
```
Origin allowlist via env (`EMBED_ALLOWED_ORIGINS`), reject and log anything else — Heidi does exactly this (`[ChatClient] Rejected: untrusted origin`).
2.3 **[BUILD]** `Content-Security-Policy: frame-ancestors` set from the same allowlist; `allow="clipboard-write"` documented for embedders.
2.4 Demo configuration: allowlist includes `joinblvd.com` staging — so in the meeting you can show it framed inside a Boulevard-looking page.

## FR-3 Ask API — public retrieval endpoint
3.1 **[WIRE]** `POST /api/ask` — thin public wrapper around the existing retrieval path (`lib/retrieval/*` + the SSE shape already shipped in `/api/research/chat`). **Do not fork the pipeline** (DEVELOPER_BRIEF rule 4: don't touch the retrieval path — wrap it).
3.2 **[EXISTS]** SSE event sequence `status → sources → token* → citations → done` (already the live contract; Heidi's is the same idea: sources JSON preamble, then tokens, then resolve `[Source N]` markers).
3.3 **[BUILD]** Public hardening on the wrapper only: rate limiting, input length cap (~500 chars), scope classifier ("is this an aesthetics question about our corpus?"), abuse strings filter, no session cookies required.
3.4 **[BUILD]** Out-of-scope response template: honest decline + 3 nearest covered topics as chips.

## FR-4 History & sessions (public)
4.1 **[BUILD]** Anonymous session id (cookie, 30 days) so follow-ups have conversational context and rate limits have a subject. No account.
4.2 **[EXISTS]** Authenticated history is already the `saved_outputs` work in Priority 1 of the DEVELOPER_BRIEF — unchanged.
4.3 **[BUILD]** `ask_log` table (see 3.5) capturing public Q&A pairs + citations for (a) analytics, (b) curating the SEO answers hub, (c) the demo's "look what people asked" reel.

## FR-5 Answers Hub (post-demo, SEO)
5.1 **[BUILD]** `/answers` index + `/answers/{slug}` static pages generated from *curated* `ask_log` rows (human-approved only — runs through the Phase 11 review posture).
5.2 Filters by category (Neurotoxins, Fillers, Energy, Body, Weight Loss) and question type (Safety, Comparison, Timing, Cost, Pairing) — Heidi filters by specialty/questionType; ours map to the GL taxonomy.
5.3 Each page: question as H1, the cited answer, references section, "Ask a follow-up →" CTA seeding `/ask?query=`.
5.4 JSON-LD `FAQPage`/`MedicalWebPage` schema; canonical URLs; sitemap.

## FR-6 Context awareness (post-demo)
6.1 **[BUILD]** Optional context selector analogous to Heidi's specialty setting: practice type / category focus re-weights retrieval (e.g., an injector-focused context boosts neurotoxin/filler docs; a med-spa-GM context boosts value/education lens docs). Maps directly to the GL `lens` column — this is where the three-lens dossier system becomes a visible product feature.

---

# PART 3 — Technical Requirements

## 3.1 Stack alignment (no new tech)

Everything lands inside the existing a360-v2 stack: Next.js 15 App Router, shadcn/ui, Tailwind + OKLch tokens, Vercel AI SDK `streamText` via AI Gateway, two Supabase clients. The build is mostly *routing and chrome* around the retrieval engine that is already live on `/dashboard/research`.

## 3.2 Routes

```
app/ask/page.tsx                 public ask page (no dashboard layout)
app/ask/layout.tsx               bare layout: no sidebar, no auth gate
app/embed/ask/page.tsx           embed variant (chrome-less)
app/api/ask/route.ts             public SSE wrapper → lib/retrieval/*
app/api/ask/suggest/route.ts     follow-up suggestions (optional; can ride the main stream)
app/answers/page.tsx             hub index        (post-demo)
app/answers/[slug]/page.tsx      static Q&A page  (post-demo)
```
**Auth note:** the password gate currently protects the whole app at `/login`. `/ask`, `/embed/*`, `/api/ask` must be excluded in middleware. Everything under `/dashboard` stays gated.

## 3.3 Reuse map (the point of this whole doc)

| Heidi element | A360 equivalent | Status |
|---|---|---|
| Embed chat app | `research-chat.tsx` minus Save/dashboard chrome | EXISTS — extract shared `<AskExperience>` |
| Sources JSON preamble + token stream | `ResearchEvent` SSE union | EXISTS |
| `[Source N]` → link resolution | `lib/retrieval/post-process.ts` | EXISTS |
| Inline citation chips | `InlineCitationBadge` (amber/blue/emerald/violet by tier) | EXISTS |
| Visible source hierarchy | `ReferencesSection` grouped FDA → Manufacturer → Research | EXISTS — *stronger than Heidi's: color-coded tiers* |
| Follow-up suggestions | `components/ai/suggestions.tsx` | EXISTS — wire |
| Suggestion verb chips | new `AskSuggestionChips` (config-driven) | BUILD (small) |
| postMessage bridge | new `lib/embed/bridge.ts` | BUILD (small) |
| Answer hub | new, generated from `ask_log` | BUILD (post-demo) |
| YouTube timestamp viewer | `YoutubeViewer` | EXISTS — Heidi doesn't even have this |

Refactor required: lift the answer experience out of `research-chat.tsx` into a shared `<AskExperience endpoint variant>` component consumed by (a) dashboard Research (endpoint `/api/research/chat`, variant `dashboard`, Save button on), (b) `/ask` (endpoint `/api/ask`, variant `public`), (c) `/embed/ask` (variant `embed`). One engine, three doors — Heidi's exact play.

## 3.4 Public API hardening

- **Rate limits:** 10 asks/hour per anon session, 30/day per IP (sliding window; Vercel KV or Upstash). 429 returns a friendly inline message with a "get full access" CTA — the limit itself is a funnel.
- **Input validation:** ≤500 chars, strip HTML, reject if scope classifier says non-aesthetics (cheap Haiku-class call or keyword gate against taxonomy + aliases — the 286-row `aliases` table is the matcher).
- **Model budget:** public tier pinned to the cheaper model config; in-app Research keeps its current config.
- **Caching:** identical normalized question within 24h → serve cached answer + citations (massive for demo-day repeated questions and for ad traffic).
- **Observability:** log question, latency, token counts, citation count, completion, scope-rejections to `ask_log`. Sentry already in stack.

## 3.5 Data (Agent Manager Supabase — `aejskvmpembryunnbgrk`)

```sql
create table ask_log (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,                  -- anon cookie id
  surface text not null default 'public',    -- public | embed | dashboard
  question text not null,
  answer_prose text,
  citations jsonb,                           -- ResearchCitation[]
  evidence_link_ids uuid[],
  status text not null default 'complete',   -- complete | error | rate_limited | out_of_scope
  latency_ms int,
  created_at timestamptz default now()
);

create table answer_pages (                  -- post-demo, curated SEO hub
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  question text not null,
  answer_prose text not null,
  citations jsonb,
  category text,                             -- maps to GL categories
  question_type text,                        -- safety | comparison | timing | cost | pairing
  status text not null default 'draft',      -- draft | approved | published
  approved_by text, approved_at timestamptz,
  created_at timestamptz default now()
);
```
**RLS note:** these are new tables on a project with RLS disabled (Phase 12 flag). The public API uses the service key server-side only (existing rule), so demo-safe; but `ask_log` strengthens the Phase 12 case — pull RLS forward before any external traffic beyond the demo.

## 3.6 Embed security

- `frame-ancestors` from `EMBED_ALLOWED_ORIGINS` env (comma-sep), applied only on `/embed/*`
- postMessage handlers validate `event.origin` against the same list; reject + console-tag otherwise (Heidi pattern)
- No service keys, no privileged calls client-side in the embed (it only talks to `/api/ask`)

## 3.7 Performance targets

- Time-to-first-token ≤ 2.5s p50 (it streams — perceived speed is the demo)
- Suggestion chips render instantly (static config, no fetch)
- `/ask` LCP ≤ 1.5s (page is mostly an input; keep it that way)
- Cached-answer path ≤ 800ms full render

---

# PART 4 — Design Requirements

## 4.1 Page anatomy — `/ask` (initial state)

```
────────────────────────────────────────────
            [A360 wordmark, small]

      Ask anything about aesthetic medicine
   Grounded answers. Every claim cited. Free.

   ┌──────────────────────────────────────┐
   │  e.g. Can Botox and filler be same   │
   │  day?                          [ ↑ ] │
   └──────────────────────────────────────┘

   ( Compare ▸ )( Safety ▸ )( Timing ▸ )( Pairing ▸ )( Cost ▸ )
     — tapping a verb reveals 2–3 example questions as chips —

   Educational information for licensed professionals.
   Not medical advice. Always confirm against the FDA label.
────────────────────────────────────────────
```
Answer state: question echoes as a user bubble → status shimmer ("Searching the Global Library…") → sources rail/cards appear → prose streams with inline `[N]` chips → References section grouped by tier → follow-up suggestion chips. This is already the `/dashboard/research` behavior; the public page mostly *removes* chrome.

## 4.2 Component specs (delta only — everything else exists)

**Ask input** (mirror the proven pattern, our tokens): `rounded-xl border border-border bg-card px-4 py-4 shadow-sm`, `focus-within:border-ring`, autofocus desktop only (Heidi checks `max-width: 768px` and skips mobile autofocus — do the same), circular submit button inactive until trimmed input non-empty, spinner replaces arrow while streaming. Enter submits; Esc clears.

**Suggestion chips**: ghost style — `rounded-md border border-border bg-background px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-accent`. Verb groups as a single row, wrap on mobile. Max 5 verbs × 3 questions.

**Citation system**: unchanged — the existing amber/blue/emerald/violet tier system is the brand. In the public variant add a one-line tier legend above References ("Color = source authority: FDA · Manufacturer · Peer-reviewed · Industry") because public users lack the in-app context. This is the "quality hierarchy visible, not assumed" idea, executed better than Heidi.

**Disclaimer**: persistent, `text-xs text-muted-foreground`, never a modal, never blocks streaming.

**Embed variant**: no wordmark/headline (the host page provides context), `bg-transparent` page background, content max-w ~720px, spacing scale -1. Everything else identical.

## 4.3 Design tokens & dark mode

Use existing OKLch tokens exclusively (`bg-background`, `text-foreground`, `border-border`, `bg-card`, `text-muted-foreground`, `bg-accent`) — DEVELOPER_BRIEF rule 2, no raw hex. Both modes must work day one because embeds inherit unknown host backgrounds; test embed on white, near-black, and brand-colored hosts.

## 4.4 Motion & states

- Stream-in: tokens append without layout shift; sources cards fade/slide once (no per-card stagger > 150ms)
- Loading: 3-line skeleton under a "Searching the Global Library…" status (reuse `components/ai/reasoning.tsx` status pattern)
- Error: inline card, retry button, never a dead end
- Rate-limited: friendly card + CTA (see 3.4)
- Out-of-scope: honest card + 3 nearest-topic chips
- Reduced motion: respect `prefers-reduced-motion` (Heidi passes this down to SourceCard — match it)

## 4.5 Accessibility

Labelled input (`aria-label` + visible-on-focus label), `aria-live="polite"` on the streaming region, chips are real buttons, citation chips have discernible text (`[1] FDA label: BOTOX Cosmetic`), focus ring on all interactive elements, contrast AA in both modes.

---

# PART 5 — Build Plan vs June 22

## P0 — in the demo window (≈2–3 dev-days, all reuse)
1. Extract `<AskExperience>` from `research-chat.tsx` (the only refactor; everything else composes it)
2. `/ask` page + bare layout + middleware exclusion from the password gate
3. `/api/ask` wrapper: rate limit, length cap, cache, `ask_log` writes — **no changes inside `lib/retrieval/*`**
4. Suggestion chips (static config: 5 verbs × 3 questions, written against the 20-product catalog)
5. `?query=` seeding + auto-submit
6. Disclaimer + tier legend
7. `/embed/ask` + minimal bridge (`a360:ready`, `a360:ask_sent`) + frame-ancestors allowlist — enough to show it framed in a Boulevard-styled host page

**Demo script unlock:** open `a360.com/ask?query=Can+Botox+and+filler+be+done+the+same+day` on the boardroom screen → answer streams with FDA amber + PubMed emerald chips → click a citation → land on the actual FDA label. Then show the same experience inside a Boulevard-framed page. Two minutes, no login, unscripted questions invited.

## P1 — fast-follow (week after demo)
Follow-up suggestions wired · soft signup card after 3 asks · `a360:resize`/`citation_click` bridge events · answer caching tune · `ask_log` analytics view

## P2 — post-demo program
Answers Hub (`/answers/*`, curated via `answer_pages`, JSON-LD, sitemap) · context selector mapped to GL lenses · embed pilot with a real host · RLS (Phase 12) before any sustained public traffic · public-tier model budget review

## Dependencies on the GL roadmap
- Answer quality on the public surface = **Phase 02 dossier batch** (the corpus is the product; ship the batch before heavy public promotion)
- Citation links resolving = **Phase 01 citations** (already executing)
- Out-of-scope matcher = `aliases` table (grows with the structured-emission addendum)
- Answers Hub curation = Phase 11 review workflow (lightweight version is fine initially)

---

# PART 6 — Open Decisions for Chris

1. **URL & name.** `/ask` on the app domain for the demo; marketing domain alias later. Product name on the page: "A360 Evidence"? "Global Library Ask"? (Recommend **A360 Evidence** — the category term Heidi/OpenEvidence trained buyers on, and the Boulevard audience will instantly place it.)
2. **Patient-facing tone?** Recommendation: launch professional-facing only (matches gateway posture and the disclaimer), revisit a patient mode as a separate lens later.
3. **Rate-limit numbers** (10/hr, 30/day proposed) and whether demo day gets an allowlist bypass for the boardroom IP.
4. **Embed pilot target** after Boulevard: manufacturer portal vs. flagship practice website.
5. Confirm: hold Answers Hub until the dossier batch + review workflow exist (recommended), even though it's the cheapest SEO win.

---
*Sources: decompiled heidi.ai/en-us/evidence-ask bundle (EvidenceDemoInput, SectionEvidenceDemo, SearchModal/ask streaming, AnswersHub, chat_iframe postMessage protocol), Heidi product documentation, a360-v2 DEVELOPER_BRIEF.md. All copy herein is original.*
