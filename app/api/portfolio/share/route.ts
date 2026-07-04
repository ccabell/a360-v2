import { NextRequest, NextResponse } from "next/server";

import { SESSION_COOKIE, sessionToken, betaPassword } from "@/lib/auth";
import { getAudience } from "@/lib/portfolio/registry";
import { mintShareToken, shareSecret } from "@/lib/portfolio/share";

export const dynamic = "force-dynamic";

const ALLOWED_DAYS = [7, 30];

/**
 * Mint an audience share link (internal only). Defense in depth: proxy.ts
 * already gates this route, but re-check the beta session here so an audience
 * cookie can never mint links even if route grants change.
 */
export async function POST(req: NextRequest) {
  const password = betaPassword();
  if (password) {
    const session = req.cookies.get(SESSION_COOKIE)?.value;
    if (!session || session !== (await sessionToken(password))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const secret = shareSecret();
  if (!secret) {
    return NextResponse.json(
      { error: "SHARE_LINK_SECRET is not configured" },
      { status: 500 },
    );
  }

  const body = (await req.json().catch(() => ({}))) as {
    audience?: string;
    days?: number;
  };

  const audience = body.audience ? getAudience(body.audience) : undefined;
  if (!audience) {
    return NextResponse.json({ error: "Unknown audience" }, { status: 400 });
  }
  if (!ALLOWED_DAYS.includes(body.days ?? 0)) {
    return NextResponse.json(
      { error: `days must be one of ${ALLOWED_DAYS.join(", ")}` },
      { status: 400 },
    );
  }

  const expiresAt = new Date(Date.now() + body.days! * 24 * 60 * 60 * 1000);
  const token = await mintShareToken(audience.id, expiresAt, secret);
  const url = new URL(`/share/${token}`, req.nextUrl.origin);

  return NextResponse.json({
    url: url.toString(),
    audience: audience.id,
    expiresAt: expiresAt.toISOString(),
  });
}
