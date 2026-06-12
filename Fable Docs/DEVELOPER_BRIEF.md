# A360 GL Frontend — Developer Brief

**Date:** 2026-06-12  
**Repo:** `C:\projects\a360-v2` (Next.js 15, App Router, shadcn/ui, TypeScript)  
**For:** Frontend developer joining the build  
**TL;DR:** The framework is largely built. Your job is to complete, polish, and wire — not rebuild.

---

## 1. What Already Exists (Do Not Rebuild)

The site has a working shell with sidebar nav, all major page routes, and most components. Before writing any new code, read the existing file.

### Shell & Nav
- `components/layout/sidebar.tsx` — full sidebar with all nav items (Research, Patients, History, Chat, Agents, TCP, Reach, etc.). Active state, demo-mode filtering, sign-out. **Do not rebuild.**
- `app/dashboard/layout.tsx` — standard flex layout: sidebar + header + scrollable content area.

### Citation Components (the most important UI)
All built. The citation system is the core of the product.

| Component | File | What it does |
|-----------|------|-------------|
| `InlineCitationBadge` | `components/citations/inline-citation-badge.tsx` | Colored `[N]` chip — amber/emerald/blue/violet by authority tier |
| `ReferenceCard` | `components/citations/reference-card.tsx` | Source card with title, journal, URL link |
| `ReferencesSection` | `components/citations/references-section.tsx` | Groups cards by tier (FDA → Manufacturer → Research) |
| `MessageWithCitations` | `components/citations/message-with-citations.tsx` | Prose + inline chips combined |
| `GroundedAnswer` | `components/grounding/grounded-answer.tsx` | Full answer block with sources panel |
| `CitationCard` | `components/grounding/citation-card.tsx` | Alternate card style |
| `SourcePill` | `components/grounding/source-pill.tsx` | Compact source indicator |
| `YoutubeViewer` | `components/grounding/youtube-viewer.tsx` | YouTube embed with timestamp |

**Authority tier → color system (never hardcode source strings):**
```
fda_label      → Amber   #F59E0B
ifu/manufacturer/youtube → Blue  #3B82F6
pubmed         → Emerald #10B981
journal/industry → Violet #8B5CF6
```
The `ResearchCitation.authorityTier` field drives color. Read `lib/types/retrieval.ts` for all types.

### Research Chat (live on real data)
- `components/research/research-chat.tsx` — full SSE streaming chat. Already wired to real retrieval. Has a **Save button** (`Bookmark` icon) that POSTs to `/api/saved-outputs`. **Do not rebuild.**
- `app/dashboard/research/page.tsx` — the page wrapper.

### History / Saved Outputs
- `components/history/saved-outputs-list.tsx` — fetches `GET /api/saved-outputs`, renders expandable cards. **Already built.** Only needs the API route + DB table to work (see §3 below).
- `app/dashboard/history/page.tsx` — the page wrapper (may be a stub — check it).

### Patient & Extraction UI
- `components/patients/patients-table.tsx` — rich patient row cards with actions
- `components/patients/patient-workspace.tsx` — patient detail with transcript + extraction
- `components/extraction/extraction-setup.tsx` — catalog picker, prompt set, run options
- `components/extraction/extraction-results.tsx` — two-panel results viewer with evidence binding
- `components/extraction/evidence-block.tsx` — individual evidence anchor
- `components/extraction/offering-card.tsx` — product offering card

**Note:** The extraction screens (Setup + Results) are on the `extraction-ui` branch, not yet on `main`. Rebase after June 22 demo.

### Agent Manager
- `components/agents/` — full agent browser with tabs (Overview, Versions, Config, Tools, Test)
- `app/dashboard/agents/` — agent list + detail pages

### AI Stream Components
- `components/ai/reasoning.tsx` — reasoning/thinking display
- `components/ai/sources.tsx` — sources panel
- `components/ai/suggestions.tsx` — suggested follow-up questions

---

## 2. Tech Stack

| Layer | What it is |
|-------|-----------|
| Framework | Next.js 15, App Router, TypeScript |
| UI | **shadcn/ui** — use these components, do not introduce MUI or other libraries |
| Styling | Tailwind CSS with OKLch design tokens (light + dark mode) |
| State | Zustand for global state |
| Forms | React Hook Form |
| DB | `@supabase/supabase-js` — two clients (Agent Manager + CMS) |
| AI | Vercel AI SDK `streamText`, Vercel AI Gateway |
| Auth | Shared password gate at `/login` (no Supabase Auth — kept simple) |
| Deployment | Vercel |

**Design tokens live in CSS variables** (OKLch). Use `text-foreground`, `bg-muted`, `border-border`, `text-muted-foreground`, `bg-sidebar`, etc. — not raw hex values.

---

## 3. What Actually Needs Building

In priority order:

### Priority 1 — Make History work (demo-critical, small)
The components exist. The API routes do not yet.

**What to build:**
1. `app/api/saved-outputs/route.ts` — two handlers:
   - `GET` — fetch all rows from `saved_outputs` table, return `{ data: SavedOutput[] }`
   - `POST` — insert one row, return `{ data: SavedOutput }`

2. Supabase table `saved_outputs` on Agent Manager (`aejskvmpembryunnbgrk`):
```sql
create table saved_outputs (
  id uuid primary key default gen_random_uuid(),
  practice_id text not null default 'a360-internal',
  output_type text not null default 'research_chat',
  title text,
  question text,
  answer_prose text,
  citations jsonb,
  evidence_link_ids uuid[],
  created_at timestamptz default now()
);
```

3. Check `app/dashboard/history/page.tsx` — if it's a stub, wire in `<SavedOutputsList />`.

That's it for Priority 1. The save button in the research chat and the history list component are already done.

### Priority 2 — Page polish (each page should have a real layout, not a blank stub)

Check each route. If it's a blank page or a placeholder, give it a minimal but real layout:

| Page | Expected content |
|------|-----------------|
| `/dashboard` | Overview: stat cards (products, evidence links, dossiers) + quick links to Research and Patients |
| `/dashboard/chat` | General chat interface — simpler than Research, no citations. Use AI SDK chat. |
| `/dashboard/reach` | Placeholder for Reach campaign output — can be a "coming soon" with description |
| `/dashboard/tcp` | Placeholder for Treatment Care Plan builder |
| `/dashboard/consultation` | Placeholder for Consultation Intelligence |
| `/dashboard/rag` | Can point to Research or show corpus stats |
| `/dashboard/agent-tester` | Agent run interface — select agent, provide input, run, see output |

For any page that's a genuine stub, use this pattern:
```tsx
// Minimal real page — not a blank
export default function PageName() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-foreground mb-2">Page Title</h2>
      <p className="text-muted-foreground mb-6">One-line description.</p>
      {/* content or coming-soon card */}
    </div>
  )
}
```

### Priority 3 — Extraction UI merge (post-June-22)
`extraction-ui` branch has 3 screens built and verified. After the demo:
1. `git rebase main extraction-ui`
2. Wire the "Run Extraction" stub button to the real Prompt Runner endpoint
3. Fix patient list to show run count instead of transcript count

---

## 4. Supabase Access

Two clients — both already configured in `.env.local`:

```
# Agent Manager (products, dossiers, evidence, agents, saved_outputs)
NEXT_PUBLIC_AGENT_SUPABASE_URL=https://aejskvmpembryunnbgrk.supabase.co
AGENT_SUPABASE_SERVICE_KEY=<in .env.local>

# CMS (vector corpus — YouTube, PubMed, Podcasts, Industry)
NEXT_PUBLIC_CMS_SUPABASE_URL=https://gjqicqldjgvrwmtkliie.supabase.co
CMS_SUPABASE_SERVICE_KEY=<in .env.local>
```

Use the service key only in server-side code (`route.ts`, `server.ts`). Never expose it client-side.

Existing client setup is at `lib/supabase/` — use whatever pattern is already there.

---

## 5. The Retrieval Flow (understand before touching research pages)

```
User types question
  → research-chat.tsx POSTs to /api/research/chat
  → Server: FTS on agent_reference_docs + evidence_links (offering_id join)
  → Server: streams SSE events: status → sources → tokens → citations → done
  → Client: assembles prose + citation markers [1][2]
  → Post-processor resolves markers to ResearchCitation objects
  → GroundedAnswer renders prose + colored citation chips + source cards
```

**Do not change** `lib/retrieval/stream.ts`, `lib/retrieval/sources.ts`, `lib/retrieval/post-process.ts`, or `app/api/research/chat/route.ts`. These are live and wired to real data.

---

## 6. Key Types (read before building anything citation-related)

`lib/types/retrieval.ts` defines:
- `RetrievedSource` — a source chunk with `corpus`, `title`, `locator`, `snippet`, `authorityTier`
- `ResearchCitation` — a resolved citation with display number, URL, locator
- `ResearchEvent` — SSE event union (`status | sources | token | citations | done | error`)
- `AuthorityTier` — `'fda' | 'manufacturer' | 'clinical' | 'journal'`
- `SourceLocator` — union of `PubMedLocator | DocumentLocator | VideoLocator | WebLocator`

**Read this file before writing any component that touches citations or retrieval.**

---

## 7. Rules

1. **shadcn/ui only.** Import from `@/components/ui/*`. Do not add MUI, Chakra, or other component libraries.
2. **Use design tokens.** `text-foreground`, `bg-muted`, `border-border` etc. No raw hex in className.
3. **Service keys server-side only.** `AGENT_SUPABASE_SERVICE_KEY` only in `route.ts` or server components.
4. **Do not touch the retrieval path.** `lib/retrieval/`, `app/api/research/chat/` — leave these alone.
5. **Do not merge `extraction-ui` to main before June 22.**
6. **No PHI.** The research chat is product/procedure-level. If you add any patient-facing data, ensure nothing identifies a real patient.
7. **Check before building.** The file tree has 40+ components. Read the existing component before writing a new one.

---

## 8. Getting Started

```bash
cd C:\projects\a360-v2
npm install
npm run dev     # starts on localhost:3000
```

First thing: open `app/dashboard/history/page.tsx` and check if `<SavedOutputsList />` is wired in. If not, add it. Then create `app/api/saved-outputs/route.ts` and the Supabase table. That completes the demo.

---

*Last updated: 2026-06-12*  
*Related: `GL_MULTITENANT_BRIEF.md`, `EXTRACTION_UI_HANDOFF.md`, `CHAT_CITATION_UI_SPEC.md`*
