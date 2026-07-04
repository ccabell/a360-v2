# Tube Explore — Cacheable Card Payload

Date: 2026-07-04 · Follows the Tube improvement round (deferred item #3, payload half).

**Problem:** `app/tube/explore/page.tsx` maps all 2,548 videos to `TubeCardVideo[]` and passes them as props to the client `TubeExplore`, so the full ~1.2 MB slim dataset is serialized into the RSC payload **on every visit** — HTML/RSC isn't cached between visits. For a demo where Explore is opened repeatedly, that's a re-download every time.

**Approach:** serve the card array from a single cacheable GET endpoint; `TubeExplore` fetches it once on mount. First visit is the same bytes but as a CDN/browser-cacheable resource; repeat visits hit cache ≈ instantly.

## 1. Endpoint — `app/tube/data/route.ts` (new)

- GET returns `TubeCardVideo[]` built from `getTubeVideos()` with the SAME slimming currently in page.tsx (drop url/audience/tagged/hasTranscript; `truncateSummary(summary, 240)`; keep publishedAt). Move `truncateSummary` into `lib/tube/server.ts` (or a small shared helper) and have both the route and — if still needed — the page import it; do not duplicate it.
- `export const dynamic = "force-static"` so it's baked at build and served from the CDN between deploys (the data only changes on a re-bake + redeploy).
- Response headers: `Cache-Control: public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400` and `Content-Type: application/json`. (Build ID changes on deploy, so stale data can't outlive a redeploy of new data.)

## 2. `components/tube/tube-explore.tsx`

- Change from `videos` prop to fetching `/tube/data` on mount (`useEffect`, `AbortController`, cache: "force-cache"). Hold `videos` in state, initialized `[]`.
- While loading, render the **existing** Skeleton pattern (they already use `components/ui/skeleton.tsx` elsewhere) in the results grid — a handful of card skeletons — so first paint isn't empty. Facet rail can render immediately from the `facets` prop (still passed from the page; facets are tiny).
- On fetch error, show the existing empty/error affordance with a retry.
- All existing behavior (URL-state filters, search, sorts incl. Newest/Oldest, patient-safe, pagination, facet type-to-filter) works unchanged once `videos` is populated.

## 3. `app/tube/explore/page.tsx`

- Stop building/passing `cardVideos`. Keep passing `facets` and `stats` (small). The page stays a server component and renders the chrome + `<TubeExplore facets={facets} />` inside its existing `<Suspense>`.

## Verification

- `npx tsc --noEmit` + `npx eslint` on touched files clean.
- `npx next build` succeeds; confirm `/tube/data` is emitted as static (○) in the route table.
- Local `next start`: load `/tube/explore` (with beta cookie) → cards appear after the fetch; apply a filter + search + a date sort → still works; reload with a filter in the URL → preserved. `curl` `/tube/data` → returns a JSON array of 2,548 objects with a long-lived Cache-Control header. Report the payload byte size.
