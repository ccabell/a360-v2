import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, adminSessionToken, adminPassword } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { password?: string };
  const expected = adminPassword();

  if (!expected) {
    return NextResponse.json(
      { error: "Admin access is not configured (EXCHANGE_ADMIN_PASSWORD unset)" },
      { status: 503 },
    );
  }

  if (body.password !== expected) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE, await adminSessionToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}
