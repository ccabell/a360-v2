import { NextRequest, NextResponse } from "next/server";
import { agentSupabase } from "@/lib/supabase";
import { getOrCreateSession } from "@/lib/ask/session";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    citationNumber?: number;
    retrievalId?: string;
    signal?: string;
  };

  if (!body.signal || !["up", "down"].includes(body.signal)) {
    return NextResponse.json({ error: "invalid signal" }, { status: 400 });
  }

  const { sessionId } = await getOrCreateSession(req, "public");

  await agentSupabase.from("ask_log").insert({
    session_id: sessionId,
    surface: "public",
    question: `feedback:${body.signal}:cite_${body.citationNumber ?? "?"}`,
    status: "feedback",
    client_ip_hash: "feedback",
    latency_ms: 0,
  });

  return NextResponse.json({ ok: true });
}
