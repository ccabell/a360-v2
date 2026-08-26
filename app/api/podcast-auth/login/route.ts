import { NextRequest, NextResponse } from "next/server";
import { PODCAST_SESSION_COOKIE, podcastSessionToken, podcastPassword } from "@/lib/podcast-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { password?: string };
  const expected = podcastPassword();

  if (!expected) {
    return NextResponse.json(
      { error: "Podcast access is not configured (PODCAST_ACCESS_PASSWORD unset)" },
      { status: 503 },
    );
  }

  if (body.password !== expected) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(PODCAST_SESSION_COOKIE, await podcastSessionToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
  return res;
}
