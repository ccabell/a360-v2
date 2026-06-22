import { NextRequest } from "next/server";
import { retrieveForChat, type ChatSource } from "@/lib/academy/chat-retrieval";
import { streamAnthropic } from "@/lib/academy/anthropic-stream";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Academy AI tutor — RAG over Dr Tim Pearce's video corpus + podcast corpus.
 *
 * Streams Server-Sent Events:
 *   { type: "sources", sources }   — retrieved, deep-linkable sources (first)
 *   { type: "token", text }        — answer tokens (streamed)
 *   { type: "done" }               — completion
 *   { type: "error", message }     — failure
 *
 * The answer is grounded ONLY in retrieved sources and cites them with [S#]/[P#]
 * markers, which the client maps back to deep-links (video + timestamp).
 */

const SYSTEM = `You are the Injector Academy tutor — an educational assistant for qualified aesthetic injectors, speaking in the voice and framing of Dr Tim Pearce's teaching.

RULES:
- Ground every factual claim in the provided <sources> and cite it with a marker in square brackets, e.g. [S1] or [P2]. You may combine: [S1][S3]. Use ONLY marker ids that appear in the source list. Never invent a marker, a video, a timestamp, a number, a dose, or a study.
- ALWAYS lead with the most useful answer the sources support — Dr Pearce's principles, technique, reasoning and judgement. Open with substance, NEVER with a disclaimer like "I don't have that."
- When the sources don't state an exact figure (a precise dose, quantity, depth, etc.), still give a genuinely helpful answer: explain the approach they DO describe (e.g. titrate to effect, the factors that change the decision, what to watch for) and, only as a brief closing caveat, note that a specific number isn't pinned down — framing it the way Dr Pearce does (often an open question he's still refining), not as a refusal.
- Only say you can't help if the sources are truly unrelated to the question. A missing number is not a missing answer.
- Be concise and clinical: 2–4 short paragraphs. Lead with the safety-critical point when relevant.
- Educational reference for qualified injectors, not medical advice.`;

function buildSystem(sources: ChatSource[]): string {
  const blocks = sources
    .map((s) => {
      const provenance =
        s.kind === "video"
          ? `Dr Tim Pearce video — "${s.title}" at ${s.meta ?? ""}`
          : `Podcast — ${s.meta ?? "aesthetics"} — "${s.title}"`;
      return `[${s.id}] (${provenance})\n${s.text}`;
    })
    .join("\n\n");
  return `${SYSTEM}\n\n<sources>\n${blocks}\n</sources>`;
}

/** Deterministic grounded fallback when no gateway key is configured. */
function fallbackProse(sources: ChatSource[]): string {
  const vids = sources.filter((s) => s.kind === "video").slice(0, 4);
  if (vids.length === 0) {
    return "I don't have grounded material on that in Dr Pearce's corpus yet. Try a clinical term like vascular occlusion, hyaluronidase, or masseter technique.";
  }
  const intro =
    "Here is what Dr Pearce's teaching covers on this, drawn directly from the transcripts:\n\n";
  const body = vids
    .map((s) => `${s.text.replace(/\s+/g, " ").trim().slice(0, 320)} [${s.id}]`)
    .join("\n\n");
  return intro + body;
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
        // 1. Retrieve grounded sources.
        const sources = retrieveForChat(q);
        emit({ type: "sources", sources });

        // 2. No grounded material — honest refusal.
        if (sources.length === 0) {
          const msg =
            "I couldn't find anything on that in Dr Pearce's material. I can help with vascular occlusion, hyaluronidase dissolving, danger zones, toxin dosing, regional technique (lips, cheeks, masseter, tear trough), complications, and consultation.";
          for (const tok of msg.match(/\S+\s*/g) ?? [msg]) {
            emit({ type: "token", text: tok });
          }
          emit({ type: "done" });
          controller.close();
          return;
        }

        // 3. Generate grounded answer (streamed) via the Anthropic Messages API.
        let fullText = "";
        if (process.env.ANTHROPIC_API_KEY) {
          try {
            const gen = streamAnthropic({
              model: "claude-opus-4-8",
              system: buildSystem(sources),
              prompt: `Question: ${q}\n\nAnswer using ONLY the sources above, citing [S#]/[P#] for every claim:`,
              temperature: 0.2,
              maxTokens: 700,
            });
            for await (const delta of gen) {
              fullText += delta;
              emit({ type: "token", text: delta });
            }
          } catch (err) {
            emit({
              type: "error",
              message: err instanceof Error ? err.message : "generation failed",
            });
            fullText = "";
          }
        }

        // 4. Deterministic fallback (no key / generation failed).
        if (!fullText) {
          const prose = fallbackProse(sources);
          for (const tok of prose.match(/\S+\s*/g) ?? [prose]) {
            emit({ type: "token", text: tok });
          }
        }

        emit({ type: "done" });
      } catch (err) {
        emit({
          type: "error",
          message: err instanceof Error ? err.message : "unknown error",
        });
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
