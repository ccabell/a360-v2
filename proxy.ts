import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, sessionToken, betaPassword } from "@/lib/auth";
import { audienceRoutePrefixes, getAudience } from "@/lib/portfolio/registry";
import {
  AUDIENCE_COOKIE,
  shareSecret,
  verifyShareToken,
} from "@/lib/portfolio/share";

/**
 * Beta gate + demo-mode boundary (Next 16 `proxy`, formerly middleware).
 *
 * - Access gate: a valid session cookie is required for all routes except the
 *   login page and the auth API. No-op when BETA_ACCESS_PASSWORD is unset.
 * - Demo mode (NEXT_PUBLIC_APP_MODE=demo): the studio/builder surfaces are
 *   404'd so an acquirer can't reach them by typing the URL. (Full code removal
 *   happens in the monorepo split — see docs/ARCHITECTURE_SPLIT.md.)
 * - Exchange-only (EXCHANGE_ONLY=true): the ONLY surface exposed is the Agent
 *   Exchange. Every other page redirects to it and every other API 404s, so an
 *   externally-shared link (e.g. to the CEO) can't reach internal tools by URL.
 * - Audience share links (/share/<token>): a valid signed `portfolio_audience`
 *   cookie grants the exchange landing plus ONLY that audience's native
 *   prototype routes (lib/portfolio/registry.ts), bypassing the beta password
 *   — and the exchange-only containment — for those routes only. Everything
 *   else stays gated exactly as before; expired/invalid tokens fall through to
 *   the normal gate. A beta session keeps full access. The demo-mode studio
 *   404 still applies to audience visitors.
 */

const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE ?? "internal";
const EXCHANGE_ONLY = process.env.EXCHANGE_ONLY === "true";

const STUDIO_PREFIXES = [
  "/dashboard/agents",
  "/api/agents",
  "/api/tools",
  "/api/playground",
];

function isStudioPath(pathname: string): boolean {
  return STUDIO_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always-public: login page, auth endpoints, public surfaces, health check,
  // and the share-link entry point (it verifies its own signed token).
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/health") ||
    pathname.startsWith("/ask") ||
    pathname.startsWith("/embed") ||
    pathname.startsWith("/api/ask") ||
    pathname.startsWith("/podcast") ||
    pathname.startsWith("/api/podcast") ||
    pathname.startsWith("/share/")
  ) {
    return NextResponse.next();
  }

  // Standalone apps under /apps/* — public unless listed in GATED_APPS
  if (pathname.startsWith("/apps/")) {
    const GATED_APPS = ["/apps/studio"];
    const isGated = GATED_APPS.some(
      (p) => pathname === p || pathname.startsWith(p + "/"),
    );
    if (!isGated) return NextResponse.next();
    // Gated apps fall through to the password gate below
  }

  // Audience share-link grant: a valid signed audience cookie opens the
  // exchange landing + that audience's native prototype routes, nothing else.
  // The token is re-verified on every request; the cookie is never trusted raw.
  let audienceAllowed = false;
  const audienceToken = request.cookies.get(AUDIENCE_COOKIE)?.value;
  const secret = shareSecret();
  if (audienceToken && secret) {
    const payload = await verifyShareToken(audienceToken, secret);
    if (payload && getAudience(payload.aud)) {
      audienceAllowed = audienceRoutePrefixes(payload.aud).some(
        (p) => pathname === p || pathname.startsWith(p + "/"),
      );
    }
  }

  // Exchange-only containment: nothing but the Exchange is reachable.
  if (EXCHANGE_ONLY) {
    const isExchange =
      pathname === "/" ||
      pathname === "/exchange" ||
      pathname.startsWith("/exchange/") ||
      // The Video Navigator and Podcast Navigator are Exchange agents — their
      // standalone surfaces and chat APIs stay reachable here.
      pathname === "/tube" ||
      pathname.startsWith("/tube/") ||
      pathname.startsWith("/api/tube/") ||
      pathname === "/podcast" ||
      pathname.startsWith("/podcast/") ||
      pathname.startsWith("/api/podcast/") ||
      pathname.startsWith("/_next"); // framework assets/RSC
    if (!isExchange && !audienceAllowed) {
      if (pathname.startsWith("/api")) {
        return new NextResponse("Not found", { status: 404 });
      }
      const url = request.nextUrl.clone();
      url.pathname = "/exchange";
      url.search = "";
      return NextResponse.redirect(url);
    }
  }

  // Demo build: studio surfaces simply don't exist
  if (APP_MODE === "demo" && isStudioPath(pathname)) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Access gate (disabled when no password is configured)
  const password = betaPassword();
  if (!password) return NextResponse.next();

  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  const expected = await sessionToken(password);
  if (cookie && cookie === expected) return NextResponse.next();

  // Audience share-link visitors bypass the password for their routes only.
  // (Checked after the demo-mode studio 404 above, so that still wins.)
  if (audienceAllowed) return NextResponse.next();

  if (pathname.startsWith("/api")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("from", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
