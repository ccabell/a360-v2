import { NextRequest } from "next/server";
import { gateway } from "@ai-sdk/gateway";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { retrieveSources } from "@/lib/retrieval/sources";
import { resolveCitations } from "@/lib/retrieval/post-process";
import { locatorTitle } from "@/lib/retrieval/locator";
import type { ResearchEvent, RetrievedSource } from "@/lib/types/retrieval";

export const dynamic = "force-dynamic";
export const maxDuration = 90;

// Deeper, more exhaustive briefing than the lightweight /api/ask answer.
const SYSTEM = `You are A360's senior clinical-intelligence analyst for medical aesthetics.
Produce a COMPREHENSIVE, exhaustively-sourced briefing that answers the clinician's question by drawing on EVERY relevant source provided.
Cite every factual claim with a source marker like [src_3]; combine when needed: [src_1][src_4].
NEVER state dosing, units, contraindications, safety warnings, interactions, sequencing, pregnancy/lactation, complications, or off-label use without citing a specific [src_N]. If the sources lack a safety topic, say so explicitly rather than speculating.
PRIORITIZE peer-reviewed evidence: whenever PubMed sources are provided, you MUST cite them explicitly in "What the evidence shows" — they are the highest-tier evidence. Also cite the FDA label for dosing/indications, manufacturer data for product specs, and Video Intelligence for technique. Aim to draw on ALL the source types provided, not just one.
Be thorough and specific — this is a deep briefing, not a summary. Use these ## sections where the sources support them (omit a section only if there is genuinely nothing to say):
## Bottom line  (2–3 sentence direct answer)
## What the evidence shows  (literature + FDA)
## Protocol & dosing  (specifics; use a markdown table when there are 2+ attributes)
## Safety & contraindications
## Product & pairing considerations
## Technique pearls  (from expert video Intelligence, if present)
## How to frame it with the patient
Prefer markdown pipe tables for any comparison, dosing range, or spec set (no blank lines inside the table).
Never invent PMIDs, URLs, or citations — cite ONLY [src_N] markers that appear in the source list.
First output a KEY_POINTS block: KEY_POINTS: <takeaway>[src_N]|<takeaway>[src_N]|... (5–8 takeaways). Then a blank line, then the briefing.`;

function buildSystem(sources: RetrievedSource[], knowledge: string): string {
  const blocks = sources
    .map((s) => {
      const tag =
        s.corpus === "fda" ? "FDA label"
          : s.corpus === "pubmed" ? `PubMed ${(s.locator as { pmid?: string }).pmid ?? ""}`.trim()
            : s.corpus === "youtube" ? `Video Intelligence — ${locatorTitle(s.locator)}`
              : s.corpus === "podcast" ? `Expert Intelligence — ${locatorTitle(s.locator)}`
                : s.corpus === "manufacturer" ? `Manufacturer — ${locatorTitle(s.locator)}`
                  : s.corpus === "practice" ? `Library — ${locatorTitle(s.locator)}`
                    : locatorTitle(s.locator);
      return `[${s.retrievalId}] (${tag})\n${s.text}`;
    })
    .join("\n\n");
  return `${SYSTEM}\n\n<knowledge>\n${knowledge}\n</knowledge>\n\n<sources>\n${blocks}\n</sources>`;
}

function buildPrompt(q: string): string {
  return `Question: ${q}\n\nWrite the full briefing, citing [src_N] for every claim. End with a new line: FOLLOW_UPS: q1|q2|q3 (three follow-up questions a clinician might ask next).`;
}

function splitTail(text: string, label: string): { body: string; items: string[] } {
  const m = text.match(new RegExp(`\\n?${label}:\\s*(.+)$`));
  if (!m || m.index === undefined) return { body: text, items: [] };
  return { body: text.slice(0, m.index).trimEnd(), items: m[1].split("|").map((s) => s.trim()).filter(Boolean) };
}
function splitHead(text: string, label: string): { body: string; items: string[] } {
  const m = text.match(new RegExp(`^${label}:\\s*(.+)\\n`));
  if (!m) return { body: text, items: [] };
  return { body: text.slice(m[0].length).trimStart(), items: m[1].split("|").map((s) => s.trim()).filter(Boolean) };
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as { query?: string };
  const q = (body.query ?? "").trim().replace(/<[^>]*>/g, "");
  const enc = new TextEncoder();

  if (!q) return new Response(JSON.stringify({ error: "query required" }), { status: 400, headers: { "Content-Type": "application/json" } });

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (e: ResearchEvent) => controller.enqueue(enc.encode(`data: ${JSON.stringify(e)}\n\n`));
      const t0 = Date.now();
      try {
        emit({ type: "status", stage: "searching" });
        const { sources, knowledge } = await retrieveSources(q);
        emit({ type: "status", stage: "ranking" });
        emit({ type: "sources", sources });

        if (sources.length === 0) {
          emit({ type: "token", text: "That's outside the A360 Library's current coverage." });
          emit({ type: "citations", citations: [], displayMap: {} });
          emit({ type: "done", runId: `run_${t0}`, usage: { inputTokens: 0, outputTokens: 0, durationMs: Date.now() - t0 } });
          return;
        }

        emit({ type: "status", stage: "generating" });

        const opts = { system: buildSystem(sources, knowledge), prompt: buildPrompt(q), temperature: 0.3, maxOutputTokens: 3200 };
        async function generate(model: Parameters<typeof streamText>[0]["model"]): Promise<string> {
          let buf = "";
          const r = streamText({ model, ...opts });
          for await (const d of r.textStream) buf += d;
          return buf;
        }

        let full = "";
        if (process.env.AI_GATEWAY_API_KEY) {
          try { full = await generate(gateway("anthropic/claude-haiku-4.5")); } catch { full = ""; }
        }
        if (!full && process.env.ANTHROPIC_API_KEY) {
          try { full = await generate(createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY })("claude-haiku-4-5-20251001")); } catch { full = ""; }
        }
        if (!full) {
          full = sources.slice(0, 6).map((s) => `${s.text.replace(/\s+/g, " ").trim()} [${s.retrievalId}]`).join(" ");
        }

        const afterFollow = splitTail(full, "FOLLOW_UPS");
        const afterKey = splitHead(afterFollow.body, "KEY_POINTS");
        const finalText = afterKey.body;

        const chunk = 14;
        const words = finalText.match(/\S+\s*/g) ?? [finalText];
        for (let i = 0; i < words.length; i += chunk) emit({ type: "token", text: words.slice(i, i + chunk).join("") });

        const { citations, displayMap } = resolveCitations(finalText, sources);
        emit({ type: "citations", citations, displayMap });
        emit({ type: "done", runId: `run_${t0}`, usage: { inputTokens: 0, outputTokens: 0, durationMs: Date.now() - t0 }, followUps: afterFollow.items, keyPoints: afterKey.items });
      } catch (err) {
        emit({ type: "error", code: "generation_failed", message: err instanceof Error ? err.message : "Unknown error", retryable: true });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache, no-transform", Connection: "keep-alive" } });
}
