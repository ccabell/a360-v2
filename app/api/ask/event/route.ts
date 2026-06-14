import { NextRequest } from "next/server";
import { agentSupabase } from "@/lib/supabase";
import { getOrCreateSession } from "@/lib/ask/session";

export const dynamic = "force-dynamic";

const ALLOWED_EVENTS = new Set([
  "evidence_unauth_ask",
  "evidence_answer_complete",
  "citation_click",
]);

interface EventBody {
  event_name?: string;
  surface?: string;
  latency_ms?: number;
  citation_count?: number;
  citation_url?: string;
  citation_tier?: string;
  question?: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as EventBody;

  if (!body.event_name || !ALLOWED_EVENTS.has(body.event_name)) {
    return new Response(
      JSON.stringify({ error: "invalid event_name" }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const { sessionId } = await getOrCreateSession(req, body.surface ?? "public");

  // Encode event data in the question field for queryability.
  // Format: event:{event_name} or event:{event_name}:url={url}:tier={tier}
  let questionField = `event:${body.event_name}`;
  if (body.citation_url) {
    questionField += `:url=${body.citation_url}`;
  }
  if (body.citation_tier) {
    questionField += `:tier=${body.citation_tier}`;
  }

  await agentSupabase.from("ask_log").insert({
    session_id: sessionId,
    surface: body.surface ?? "public",
    question: body.question ?? questionField,
    status: "event",
    client_ip_hash: "event",
    latency_ms: body.latency_ms ?? 0,
  });

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
