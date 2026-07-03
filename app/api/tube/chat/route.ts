import { NextRequest } from "next/server";
import { retrieveTubeSources, type TubeSource } from "@/lib/tube/chat-retrieval";
import { streamAnthropic } from "@/lib/academy/anthropic-stream";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
  const body = (await req.json().catch(() => ({}))) as { query?: string };
  const q = (body.query ?? "").trim().replace(/<[^>]*>/g, "");

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

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (ev: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));
      try {
        const sources = await retrieveTubeSources(q);
        emit({ type: "sources", sources });

        if (sources.length === 0) {
          const msg =
            "I couldn't find anything on that in the video library. Try a clinical topic like vascular occlusion, masseter Botox, tear trough technique, skin tightening, or body contouring.";
          for (const tok of msg.match(/\S+\s*/g) ?? [msg]) emit({ type: "token", text: tok });
          emit({ type: "done" });
          controller.close();
          return;
        }

        let fullText = "";
        if (process.env.ANTHROPIC_API_KEY) {
          try {
            const gen = streamAnthropic({
              model: "claude-opus-4-8",
              system: buildSystem(sources),
              prompt: `Question: ${q}\n\nAnswer using ONLY the sources above, citing [S#] for every claim:`,
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
        controller.close();
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
