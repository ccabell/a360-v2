import { NextRequest } from "next/server";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { retrieveSources } from "@/lib/retrieval/sources";
import { resolveCitations } from "@/lib/retrieval/post-process";
import { locatorTitle } from "@/lib/retrieval/locator";
import { logActivity } from "@/lib/activity";
import type { ResearchEvent, RetrievedSource } from "@/lib/types/retrieval";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SYSTEM = `You are an evidence assistant for medical-aesthetics clinicians.
Answer ONLY from the provided <knowledge> and <sources>. Cite every factual claim with a
source marker in square brackets like [src_3]; you may cite multiple: [src_1][src_4].
Be concise — 2 to 4 short paragraphs. If the sources do not support an answer, say so.
Never invent PMIDs, URLs, or citations — cite ONLY src markers that appear in the source list.`;

function buildSystemPrompt(sources: RetrievedSource[], knowledge: string): string {
  const sourceBlocks = sources
    .map((s) => {
      const provenance =
        s.corpus === "fda"
          ? "FDA label — BOTOX Cosmetic"
          : s.corpus === "pubmed"
            ? `PubMed ${(s.locator as { pmid?: string }).pmid ?? s.retrievalId}`
            : s.corpus === "practice"
              ? `Practice dossier — ${locatorTitle(s.locator)}`
              : locatorTitle(s.locator);
      return `[${s.retrievalId}] (${provenance})\n${s.text}`;
    })
    .join("\n\n");

  return `${SYSTEM}

<knowledge>
${knowledge}
</knowledge>

<sources>
${sourceBlocks}
</sources>`;
}

function buildPrompt(query: string): string {
  return `Question: ${query}\n\nAnswer the question, citing [src_N] for every claim:`;
}

/** Deterministic grounded fallback when no LLM gateway key is configured. */
function fallbackProse(sources: RetrievedSource[]): string {
  return sources
    .slice(0, 5)
    .map((s) => `${s.text.replace(/\s+/g, " ").trim()} [${s.retrievalId}]`)
    .join(" ");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as { query?: string };
  const q = (body.query ?? "").trim();

  if (!q) {
    return new Response(JSON.stringify({ error: "query required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (ev: ResearchEvent) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));

      try {
        // 1. Retrieve sources
        emit({ type: "status", stage: "searching" });
        const { sources, knowledge } = await retrieveSources(q);

        // 2. Rank status + emit sources
        emit({ type: "status", stage: "ranking" });
        emit({ type: "sources", sources });

        // 3. Graceful no-results (D-08)
        if (sources.length === 0) {
          emit({
            type: "token",
            text: "No grounded sources were found for this question in the current evidence library.",
          });
          emit({ type: "citations", citations: [], displayMap: {} });
          emit({
            type: "done",
            runId: `run_${Date.now()}`,
            usage: { inputTokens: 0, outputTokens: 0, durationMs: 0 },
          });
          return; // finally closes the controller — don't double-close
        }

        // 4. Generate
        emit({ type: "status", stage: "generating" });

        let fullText = "";

        const apiKey = process.env.ANTHROPIC_API_KEY || process.env.AI_GATEWAY_API_KEY;
        if (apiKey) {
          try {
            const anthropic = createAnthropic({ apiKey });
            const result = streamText({
              model: anthropic("claude-haiku-4-5-20251001"),
              system: buildSystemPrompt(sources, knowledge),
              prompt: buildPrompt(q),
              temperature: 0.3,
              maxOutputTokens: 600,
            });
            for await (const delta of result.textStream) {
              fullText += delta;
              emit({ type: "token", text: delta });
            }
          } catch (err) {
            // GatewayAuthenticationError or network error — fall through to deterministic fallback
            emit({
              type: "error",
              code: "generation_failed",
              message: err instanceof Error ? err.message : "Generation failed",
              retryable: false,
            });
            fullText = ""; // use fallback below
          }
        }

        // 5. Deterministic fallback when gateway key missing or generation failed
        if (!fullText) {
          fullText = fallbackProse(sources);
          for (const tok of fullText.match(/\S+\s*/g) ?? [fullText]) {
            emit({ type: "token", text: tok });
          }
        }

        // 6. resolveCitations on the FULL accumulated text — never inside the token loop
        const { citations, displayMap } = resolveCitations(fullText, sources);
        emit({ type: "citations", citations, displayMap });
        emit({
          type: "done",
          runId: `run_${Date.now()}`,
          usage: { inputTokens: 0, outputTokens: 0, durationMs: 0 },
        });

        logActivity({
          type: "research.query",
          entityType: "research",
          payload: { query: q, sources: sources.length, cited: citations.length },
        });
      } catch (err) {
        emit({
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
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
