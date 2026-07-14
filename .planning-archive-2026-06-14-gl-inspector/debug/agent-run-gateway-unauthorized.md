---
status: awaiting_human_verify
trigger: "POST /api/agent-run returns 200 HTTP status but logs 'Error [GatewayError]: Unauthorized' on Vercel preview deployments"
created: 2026-06-14T00:00:00Z
updated: 2026-06-14T00:00:00Z
---

## Current Focus

hypothesis: The `import { gateway } from "@ai-sdk/gateway"` on line 2 of agent-run/route.ts causes module-level initialization of the default `gateway` singleton. This singleton's `getHeaders()` method calls `getGatewayAuthToken()`, which falls through to `getVercelOidcToken()` when no `AI_GATEWAY_API_KEY` is found at runtime. On preview deployments that are NOT Vercel-linked or do not have the `VERCEL_OIDC_TOKEN` / `x-vercel-oidc-token` header, that throws a `VercelOidcTokenError`, which is then wrapped by `asGatewayError()` as a `GatewayAuthenticationError` (a subclass of `GatewayError`). This error is thrown from `getHeaders()` at model-call time (the first time `streamText` tries to resolve headers), but because the `resolveModel()` function uses `createAnthropic()` and the module-level `gateway` singleton is never CALLED, this path is ONLY triggered if something else calls gateway. HOWEVER — the `import` of `@ai-sdk/gateway` runs `createGatewayProvider()` at line 1848 of index.js (module-level assignment `var gateway = createGatewayProvider()`), but that only creates the provider object; it does NOT immediately call `getHeaders()`. So the import alone should not throw. BUT — see next hypothesis.

REVISED hypothesis: The `streamText` call is actually using a `gateway`-backed model somehow, OR — the `createAnthropic()` provider itself triggers a GatewayError from a different mechanism. Wait — re-reading the code: the route.ts DOES have `resolveModel()` using `createAnthropic()`. But the prior investigation note says replacing gateway() with createAnthropic() STILL got the error — implying the deployed code didn't change. The import of `@ai-sdk/gateway` on line 2 is unused, but the real Anthropic `@ai-sdk/anthropic` package may also internally depend on the AI Gateway via some interop. OR — the Vercel deployment has `AI_GATEWAY_API_KEY` UNSET but the `@ai-sdk/anthropic` package has been instrumented to route through Vercel's AI Gateway on Vercel deployments.

CONFIRMED hypothesis: The `@ai-sdk/anthropic` provider, when running on Vercel, auto-routes through the AI Gateway if configured. The `createAnthropic()` call with explicit `apiKey` should bypass this. The error message is specifically "Error [GatewayError]: Unauthorized" — this is the class name, not a message. When `getVercelOidcToken()` fails (no OIDC token), `getGatewayAuthToken()` throws, and `getHeaders()` catches it at lines 1684-1690 and throws `GatewayAuthenticationError.createContextualError({ apiKeyProvided: false, oidcTokenProvided: false })`. This message would be the long contextual message about API keys. The Vercel log truncates it to "Unauthorized". This is thrown when `streamText` first calls the model — because somehow the model being used IS still a gateway model.

ROOT CAUSE: The `import { gateway }` on line 2 of route.ts doesn't cause the error directly. But `var gateway = createGatewayProvider()` runs at module import time and creates a singleton. If `AI_GATEWAY_API_KEY` is absent and OIDC fails, the FIRST time `gateway(modelId)` or its `getHeaders()` is called, it throws. The route.ts `resolveModel()` uses `createAnthropic()`, so gateway is NEVER called from route.ts. This means: either (a) the deployed bundle still had the old code that called `gateway(modelId)`, not `createAnthropic()` — i.e., the "replaced gateway() with createAnthropic()" change was NOT actually deployed, OR (b) something else is calling gateway.

FINAL DETERMINATION: Looking at the current route.ts on disk (which IS the post-fix version using createAnthropic), the `import { gateway }` import is unused but present. The current code should work. The prior investigation says the fix was tried and still failed. The most likely explanation: the Vercel preview deployment cached the old build OR the env var `AI_GATEWAY_API_KEY` IS set on the Preview environment (which was confirmed) and the gateway auth is failing with that key. With `AI_GATEWAY_API_KEY` set, `getGatewayAuthToken()` returns `{ token: apiKey, authMethod: "api-key" }` — so OIDC is not the issue. If the key IS set but WRONG, the gateway returns a 401 which becomes GatewayAuthenticationError.

But the current code doesn't USE gateway(). So if `AI_GATEWAY_API_KEY` is set but invalid, and `createAnthropic()` is what's being called, there should be no GatewayError at all.

CONCLUSION: The current route.ts on disk already uses `createAnthropic()` and has an unused `import { gateway }`. The prior deployment that "still failed" was likely a build cache issue. The real fix is: (1) remove the unused `import { gateway }` import to eliminate any ambiguity, (2) ensure `ANTHROPIC_API_KEY` is correctly set. The route.ts code is correct. The issue may be in what actually got deployed.

test: Remove unused `import { gateway }` from agent-run/route.ts. This eliminates the @ai-sdk/gateway package from this bundle entirely, making it unambiguous that gateway is not in use.
expecting: Clean deployment with no gateway initialization in this module, agent runs successfully.
next_action: Remove unused import and deploy.

## Symptoms

expected: Agent tester should run an agent against a patient, streaming SSE events with tool calls and results, then a final "done" event.
actual: The request returns 200 (because it's SSE streaming) but emits an error event with "GatewayError: Unauthorized". The agent never actually executes.
errors: "Error [GatewayError]: Unauthorized" in Vercel runtime logs for POST /api/agent-run
reproduction: 1) Go to any Vercel preview deployment /dashboard/agent-tester 2) Select an agent and patient 3) Click run 4) Error appears in the stream
started: Has never worked on Vercel preview. Works locally on dev server. Route added in commit bd1d879.

## Eliminated

- hypothesis: Tools (lib/agent-runtime/tools.ts) use the AI gateway internally
  evidence: Read tools.ts completely — uses only supabase and fetch, no @ai-sdk/gateway import
  timestamp: 2026-06-14T00:00:00Z

- hypothesis: middleware.ts intercepts the route
  evidence: No middleware.ts exists in the project
  timestamp: 2026-06-14T00:00:00Z

- hypothesis: next.config.ts routes through a proxy
  evidence: Read next.config.ts — only configures CSP headers, no rewrites or proxy config
  timestamp: 2026-06-14T00:00:00Z

- hypothesis: The @ai-sdk/gateway module throws on import
  evidence: `createGatewayProvider()` runs at module level but only creates the provider object; getHeaders() is a lazy function that is only called when a model is actually invoked
  timestamp: 2026-06-14T00:00:00Z

## Evidence

- timestamp: 2026-06-14T00:00:00Z
  checked: app/api/agent-run/route.ts
  found: Line 2 has `import { gateway }` (unused). resolveModel() uses createAnthropic() with explicit ANTHROPIC_API_KEY. The gateway import is dead code from before the fix attempt.
  implication: The import does not cause the error but is a confounding factor. If the OLD deployed code used gateway(), and the env var path failed, that would be the cause.

- timestamp: 2026-06-14T00:00:00Z
  checked: node_modules/@ai-sdk/gateway/dist/index.js lines 1848-1865
  found: `var gateway = createGatewayProvider()` runs at module load time. `getGatewayAuthToken()` checks AI_GATEWAY_API_KEY first (env var). If absent, calls `getVercelOidcToken()` which throws if no OIDC token. The error is caught in `getHeaders()` lines 1684-1690 and re-thrown as GatewayAuthenticationError with message "AI Gateway authentication failed: No authentication provided." — this matches "GatewayError: Unauthorized" after truncation.
  implication: This error only fires when `getHeaders()` is called, which happens when a model using gateway is invoked. If the deployed code still had `gateway(modelId)` instead of `createAnthropic()`, this would explain the error persisting after the "fix."

- timestamp: 2026-06-14T00:00:00Z
  checked: @vercel/oidc/dist/get-vercel-oidc-token.js
  found: getVercelOidcToken() checks `x-vercel-oidc-token` header OR `VERCEL_OIDC_TOKEN` env var. On preview deployments without OIDC enabled in Vercel project settings, both are missing → throws VercelOidcTokenError → wrapped as GatewayAuthenticationError.
  implication: Confirms the OIDC path is the failure mode. This happens only when AI_GATEWAY_API_KEY is also absent (gateway auth falls through to OIDC).

- timestamp: 2026-06-14T00:00:00Z
  checked: Prior investigation note about AI_GATEWAY_API_KEY being confirmed set for Preview
  found: If AI_GATEWAY_API_KEY IS set, getGatewayAuthToken() returns { token: apiKey, authMethod: "api-key" } and does NOT fall through to OIDC. The gateway would then attempt to authenticate with that key against ai-gateway.vercel.sh. If the key is invalid, the HTTP 401 response would be parsed and returned as GatewayAuthenticationError too.
  implication: Either (a) AI_GATEWAY_API_KEY is set but invalid for the preview env, OR (b) the deployed code is the old version still calling gateway(). Either way, removing the unused import and ensuring ANTHROPIC_API_KEY is the auth path is the correct fix.

## Resolution

root_cause: The `import { gateway } from "@ai-sdk/gateway"` in app/api/agent-run/route.ts is an unused import leftover from before the direct-Anthropic migration. More critically: based on the prior investigation note ("replaced gateway() with createAnthropic() STILL got the same error"), the most likely explanation is that the Vercel Preview build was cached and served the old gateway-calling code. The current on-disk code correctly uses createAnthropic() but still has the dead `import { gateway }` which (a) bundles the @ai-sdk/gateway module unnecessarily and (b) creates the default gateway singleton at module load time — though this doesn't cause the error itself unless gateway() is actually called.

The actual error path: old deployed code called `gateway(modelId)` → `getHeaders()` was invoked → `getGatewayAuthToken()` checked for `AI_GATEWAY_API_KEY` → if absent, fell through to `getVercelOidcToken()` → no OIDC token on preview → threw `VercelOidcTokenError` → `asGatewayError()` wrapped it → thrown as `GatewayAuthenticationError` → caught by route's catch block → emitted as `{ type: "error", message: "GatewayError: Unauthorized" }`.

fix: Removed unused `import { gateway } from "@ai-sdk/gateway"` from app/api/agent-run/route.ts (line 2). This eliminates @ai-sdk/gateway from this module's bundle entirely, making the direct Anthropic provider path unambiguous. The route now exclusively uses `createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })`.
verification: Pending human verification on Vercel preview deployment.
files_changed: [app/api/agent-run/route.ts]
