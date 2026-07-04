import { NextRequest } from "next/server";
import { retrieveTubeSources, tokenize, type TubeSource } from "@/lib/tube/chat-retrieval";
import { streamAnthropic } from "@/lib/academy/anthropic-stream";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

// In-memory sliding-window rate limiter — fine for this single-instance demo
// (no shared store needed; state resets on redeploy/restart).
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > RATE_LIMIT;
}

/**
 * A360 Video Navigator AI chat — semantic RAG over the full YouTube aesthetics
 * transcript corpus. Streams SSE: { sources } then { token } then { done }.
 * Grounded ONLY in retrieved sources; cites [S#] which the client maps to
 * YouTube deep-links (video + exact second).
 */
const SYSTEM = `You are the A360 Video Navigator — an educational assistant for aesthetic-medicine clinicians. You answer by drawing on a large library of real aesthetics YouTube videos from many channels (clinicians, trainers and manufacturers).

RULES:
- Ground every factual claim in the provided <sources> and cite it with a marker, e.g. [S1]. You may combine: [S1][S3]. Use ONLY marker ids that appear in the source list. Never invent a marker, a video, a timestamp, a number, a dose, or a study.
- ALWAYS lead with the most useful answer the sources support — the technique, principles and reasoning the presenters describe. Open with substance, NEVER with a disclaimer like "I don't have that."
- When the sources don't state an exact figure (a precise dose, setting, depth, etc.), still give a genuinely helpful answer: explain the approach they DO describe and, only as a brief closing caveat, note that a specific number isn't pinned down — not as a refusal. A missing number is not a missing answer.
- Sources come from different presenters who may disagree; attribute and note disagreement where it exists.
- Only say you can't help if the sources are truly unrelated to the question.
- Be concise and clinical: 2–4 short paragraphs. Lead with the safety-critical point when relevant.
- Educational reference for qualified clinicians, not medical advice.`;

function buildSystem(sources: TubeSource[]): string {
  const blocks = sources
    .map((s) => `[${s.id}] (${s.channel} — "${s.title}" at ${s.meta})\n${s.text}`)
    .join("\n\n");
  return `${SYSTEM}\n\n<sources>\n${blocks}\n</sources>`;
}

export async function POST(req: NextRequest) {
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim() || "unknown";
  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: "Too many requests — try again in a moment." }),
      { status: 429, headers: { "Content-Type": "application/json" } },
    );
  }

  const body = (await req.json().catch(() => ({}))) as {
    query?: string;
    messages?: ChatTurn[];
    videoId?: string;
  };
  const videoId = typeof body.videoId === "string" && body.videoId.trim() ? body.videoId.trim() : undefined;
  // Accept the new { messages } shape (transcript so far) while keeping the
  // old { query } shape working for compatibility.
  const rawMessages: ChatTurn[] =
    Array.isArray(body.messages) && body.messages.length > 0
      ? body.messages
      : body.query
        ? [{ role: "user", content: body.query }]
        : [];

  const lastUserIdx = rawMessages.reduce((acc, m, i) => (m.role === "user" ? i : acc), -1);
  const q = (rawMessages[lastUserIdx]?.content ?? "").trim().replace(/<[^>]*>/g, "");

  const encoder = new TextEncoder();
  if (!q) {
    return new Response(JSON.stringify({ error: "query required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (q.length > 500) {
    return new Response(JSON.stringify({ error: "Question too long (max 500 characters)." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Replace the latest user turn with its sanitized text for both retrieval and generation.
  const conversation = rawMessages.map((m, i) => (i === lastUserIdx ? { ...m, content: q } : m));

  // Retrieval: tokenize the latest question; if that yields too few terms,
  // merge in tokens from earlier user turns (most recent first) so a
  // pronoun-only follow-up ("what dose for that?") still retrieves on-topic.
  // The earlier turns the merge consumed are also prepended to the natural-
  // language text used for semantic embedding, so "what about aftercare for
  // that?" embeds with its antecedent context.
  const termSet = new Set(tokenize(q));
  const contextTurns: string[] = [];
  for (let i = lastUserIdx - 1; i >= 0 && termSet.size < 3; i--) {
    if (conversation[i].role !== "user") continue;
    for (const t of tokenize(conversation[i].content)) termSet.add(t);
    contextTurns.unshift(conversation[i].content);
  }
  const retrievalQuery = termSet.size > 0 ? Array.from(termSet).join(" ") : q;
  const semanticText = contextTurns.length > 0 ? `${contextTurns.join(" ")} ${q}` : q;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (ev: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));
      try {
        const sources = await retrieveTubeSources(retrievalQuery, 12, videoId, semanticText);
        emit({ type: "sources", sources });

        if (sources.length === 0) {
          const msg =
            "I couldn't find anything on that in the video library. Try a clinical topic like vascular occlusion, masseter Botox, tear trough technique, skin tightening, or body contouring.";
          for (const tok of msg.match(/\S+\s*/g) ?? [msg]) emit({ type: "token", text: tok });
          emit({ type: "done" });
          return; // finally handles the single close
        }

        let fullText = "";
        if (process.env.ANTHROPIC_API_KEY) {
          try {
            const grounding = "Answer using ONLY the sources above, citing [S#] for every claim:";
            let last8 = conversation.slice(-8);
            // The Anthropic API requires the first turn to be "user" — drop a
            // leading assistant turn left over from the 8-message window.
            if (last8[0]?.role === "assistant") last8 = last8.slice(1);
            const messages = last8.map((m, i) =>
              i === last8.length - 1 ? { ...m, content: `${m.content}\n\n${grounding}` } : m,
            );
            const gen = streamAnthropic({
              model: "claude-opus-4-8",
              system: buildSystem(sources),
              prompt: `Question: ${q}\n\n${grounding}`,
              messages,
              maxTokens: 700,
            });
            for await (const delta of gen) {
              fullText += delta;
              emit({ type: "token", text: delta });
            }
          } catch (err) {
            emit({ type: "error", message: err instanceof Error ? err.message : "generation failed" });
            fullText = "";
          }
        }

        if (!fullText) {
          const intro = "Here's what the library covers on this, straight from the videos:\n\n";
          const prose = sources
            .slice(0, 4)
            .map((s) => `${s.text.replace(/\s+/g, " ").trim().slice(0, 320)} [${s.id}]`)
            .join("\n\n");
          for (const tok of (intro + prose).match(/\S+\s*/g) ?? []) emit({ type: "token", text: tok });
        }

        emit({ type: "done" });
      } catch (err) {
        emit({ type: "error", message: err instanceof Error ? err.message : "unknown error" });
      } finally {
        try {
          controller.close();
        } catch {
          /* already closed or errored (e.g. client disconnected mid-stream) */
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
