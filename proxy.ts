import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SESSION_COOKIE, sessionToken, betaPassword } from "@/lib/auth";

/**
 * Beta gate + demo-mode boundary (Next 16 `proxy`, formerly middleware).
 *
 * - Access gate: a valid session cookie is required for all routes except the
 *   login page and the auth API. No-op when BETA_ACCESS_PASSWORD is unset.
 * - Demo mode (NEXT_PUBLIC_APP_MODE=demo): the studio/builder surfaces are
 *   404'd so an acquirer can't reach them by typing the URL. (Full code removal
 *   happens in the monorepo split — see docs/ARCHITECTURE_SPLIT.md.)
 */

const APP_MODE = process.env.NEXT_PUBLIC_APP_MODE ?? "internal";

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

  // Always-public: login page, auth endpoints, and public ask surface
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/ask") ||
    pathname.startsWith("/embed") ||
    pathname.startsWith("/api/ask")
  ) {
    return NextResponse.next();
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
