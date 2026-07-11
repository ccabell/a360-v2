import { NextRequest, NextResponse } from "next/server";

import { getAudience } from "@/lib/portfolio/audiences";
import {
  AUDIENCE_COOKIE,
  shareSecret,
  verifyShareToken,
} from "@/lib/portfolio/share";

export const dynamic = "force-dynamic";

/**
 * Audience share-link entry point: verify the signed token, set the HttpOnly
 * audience cookie (the token itself, so proxy.ts re-verifies every request)
 * and land on the exchange catalog. Expired/invalid tokens fall back to the
 * normal beta gate.
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const secret = shareSecret();
  const payload = secret ? await verifyShareToken(token, secret) : null;

  if (!payload || !getAudience(payload.aud)) {
    const url = new URL("/login", req.url);
    url.searchParams.set("from", "/exchange");
    return NextResponse.redirect(url);
  }

  const res = NextResponse.redirect(new URL("/exchange", req.url));
  res.cookies.set(AUDIENCE_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: Math.max(1, payload.exp - Math.floor(Date.now() / 1000)),
  });
  return res;
}
