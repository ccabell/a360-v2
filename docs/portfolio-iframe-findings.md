# Portfolio iframe spike — findings (2026-07-04)

Per `A360_Hub/audit-2026-07/04_PORTFOLIO_ARCHITECTURE.md` §2. Test page:
`/dashboard/portfolio/embed-test` (internal, hidden — no sidebar entry).
Screenshot evidence: `e2e/screenshots/portfolio-embed-test.png`.

## Question

Do our external Vercel-hosted prototypes send `X-Frame-Options` /
`Content-Security-Policy: frame-ancestors`, i.e. can the portfolio iframe them?

## Header check (curl -sI, 2026-07-04)

### https://agelessdemo.vercel.app (Lumira) — HTTP/1.1 200 OK

```
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=0, must-revalidate
Content-Type: text/html; charset=utf-8
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /
```

No `X-Frame-Options`. No `Content-Security-Policy` (so no `frame-ancestors`).

### https://a360-voice-bot.vercel.app — HTTP/1.1 307 → /login; /login 200 OK

```
Accept-Ranges: bytes
Access-Control-Allow-Origin: *
Cache-Control: public, max-age=0, must-revalidate
Content-Type: text/html; charset=utf-8
Server: Vercel
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Matched-Path: /login
```

No `X-Frame-Options`. No `Content-Security-Policy`.

### https://ageless-demo.vercel.app — HTTP/1.1 404 Not Found

The audit's Lumira URL is wrong/stale: `ageless-demo.vercel.app` is not a
deployment. The live app is `agelessdemo.vercel.app` (registry updated).

## Empirical embed test (Chromium, embed-test page)

- **Lumira renders fully inside the iframe** — landing page, styling, CTA all
  load. Technically embeddable.
- **Voice Bot renders its own /login gate inside the iframe** — its
  `SITE_PASSWORD` cookie is first-party to `a360-voice-bot.vercel.app`, and
  when set from inside a cross-origin iframe it becomes a third-party cookie:
  blocked outright in Safari/Firefox and partitioned (CHIPS) in Chrome. A
  password entered inside the frame may not persist across visits or browsers.

## Conclusions

1. **Vercel does not add frame-blocking headers by default.** Neither app
   sends `X-Frame-Options` or `frame-ancestors` — external prototypes embed
   unless they opt into blocking.
2. **The beta-cookie problem is real for gated apps.** Any cookie-gated app
   (Voice Bot today; a360-v2 itself if ever embedded elsewhere) is unreliable
   inside a cross-origin iframe because its session cookie is third-party
   there. Keep cookie-gated prototypes **linkout**.
3. **Lumira stays linkout anyway**: it embeds, but camera capture inside an
   iframe is flaky (needs `allow="camera"` + permissions-policy delegation and
   still varies by browser), and the full-screen consumer journey is the
   point. Registry keeps `tier: "linkout"` for both.
4. Future genuine embed candidates (podcast pages, kpi-explainer) are
   unauthenticated and camera-free — those should embed fine; reuse the
   `/embed/ask` postMessage bridge pattern (origin allowlist) if interaction
   is needed.
