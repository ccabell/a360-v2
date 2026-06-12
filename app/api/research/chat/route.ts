import { NextRequest } from "next/server";
import { retrieveSources } from "@/lib/retrieval/sources";
import { resolveCitations } from "@/lib/retrieval/post-process";
import { locatorTitle } from "@/lib/retrieval/locator";
import { logActivity } from "@/lib/activity";
import type { ResearchEvent, RetrievedSource } from "@/lib/types/retrieval";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MODEL = "anthropic/claude-haiku-4.5"; // via Vercel AI Gateway (AI_GATEWAY_API_KEY)

const SYSTEM = `You are an evidence assistant for medical-aesthetics clinicians.
Answer ONLY from the provided <knowledge> and <sources>. Cite every factual claim with a
source marker in square brackets like [src_3]; you may cite multiple: [src_1][src_4].
Be concise — 2 to 4 short paragraphs. If the sources do not support an answer, say so.
Never invent PMIDs, URLs, or citations — cite [src_N] only.`;

function buildPrompt(query: string, knowledge: string, sources: RetrievedSource[]): string {
  const blocks = sources
    .map((s) => `[${s.retrievalId}] (${s.corpus} — ${locatorTitle(s.locator)})\n${s.text}`)
    .join("\n\n");
  return `Question: ${query}\n\n<knowledge>\n${knowledge}\n</knowledge>\n\n<sources>\n${blocks}\n</sources>\n\nAnswer the question, citing [src_N] for every claim:`;
}

/** Deterministic grounded fallback when no LLM gateway key is configured. */
function fallbackProse(sources: RetrievedSource[]): string {
  return sources
    .slice(0, 5)
    .map((s) => `${s.text.replace(/\s+/g, " ").trim()} [${s.retrievalId}]`)
    .join(" ");
}

export async function POST(req: NextRequest) {
  const { query } = (await req.json().catch(() => ({}))) as { query?: string };
  const q = (query ?? "").trim();

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (ev: ResearchEvent) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));

      try {
        if (!q) {
          send({ type: "error", code: "invalid_request", message: "Empty query", retryable: false });
          controller.close();
          return;
        }

        send({ type: "status", stage: "searching" });
        const { sources, knowledge } = await retrieveSources(q);
        send({ type: "sources", sources });

        if (sources.length === 0) {
          const msg =
            "I couldn't find grounded sources for that question in the current library.";
          send({ type: "token", text: msg });
          send({ type: "citations", citations: [], displayMap: {} });
          send({ type: "done", runId: `r_${Date.now()}`, usage: { inputTokens: 0, outputTokens: 0, durationMs: 0 } });
          controller.close();
          return;
        }

        send({ type: "status", stage: "generating" });

        let full = "";
        if (process.env.AI_GATEWAY_API_KEY) {
          try {
            const { streamText } = await import("ai");
            const result = streamText({
              model: MODEL,
              system: SYSTEM,
              prompt: buildPrompt(q, knowledge, sources),
              temperature: 0.3,
            });
            for await (const delta of result.textStream) {
              full += delta;
              send({ type: "token", text: delta });
            }
          } catch {
            full = ""; // fall through to deterministic
          }
        }

        if (!full) {
          full = fallbackProse(sources);
          for (const tok of full.match(/\S+\s*/g) ?? [full]) {
            send({ type: "token", text: tok });
          }
        }

        const { citations, displayMap } = resolveCitations(full, sources);
        send({ type: "citations", citations, displayMap });
        send({
          type: "done",
          runId: `r_${Date.now()}`,
          usage: { inputTokens: 0, outputTokens: full.length >> 2, durationMs: 0 },
        });

        logActivity({
          type: "research.query",
          entityType: "research",
          payload: { query: q, sources: sources.length, cited: citations.length },
        });
      } catch (err) {
        send({
          type: "error",
          code: "generation_failed",
          message: err instanceof Error ? err.message : "Unknown error",
          retryable: true,
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
