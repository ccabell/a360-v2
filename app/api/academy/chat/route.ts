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

STRICT GROUNDING RULES:
- Answer ONLY from the provided <sources>. Do NOT use outside knowledge.
- Cite every factual statement with a source marker in square brackets, e.g. [S1] or [P2]. You may combine: [S1][S3].
- Use ONLY marker ids that appear in the source list. Never invent a marker, a video, a timestamp, or a study.
- If the sources do not contain the answer, say so plainly: "I don't have that in Dr Pearce's material" — and suggest what IS covered. Do not guess.
- Be concise and clinical: 2–4 short paragraphs. Lead with the safety-critical point when relevant.
- This is an educational reference, not medical advice. Do not give patient-specific instructions.`;

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
