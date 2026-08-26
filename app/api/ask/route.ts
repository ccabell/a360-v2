import { createHash } from "crypto";
import { NextRequest } from "next/server";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { agentSupabase } from "@/lib/supabase";
import { retrieveSources } from "@/lib/retrieval/sources";
import { resolveCitations } from "@/lib/retrieval/post-process";
import { locatorTitle } from "@/lib/retrieval/locator";
import type { ResearchEvent, RetrievedSource, ResearchCitation } from "@/lib/types/retrieval";
import { getOrCreateSession } from "@/lib/ask/session";
import { nearestTopics } from "@/lib/ask/nearest-topics";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SYSTEM = `You are an evidence assistant for medical-aesthetics clinicians.
Answer ONLY from the provided <knowledge> and <sources>. Cite every factual claim with a
source marker in square brackets like [src_3]; you may cite multiple: [src_1][src_4].
Structure your answer with short bold section headings on their own line (e.g. **Safety Considerations**,
**Recommended Protocol**, **Maintenance Scheduling**). Use 2 to 4 sections, each 1-2 paragraphs.
Prefer markdown tables when presenting comparisons, product specs, dosing ranges, timelines, or any data with 2+ attributes across items. Tables make clinical data scannable.
If the sources do not support an answer, say so.
NEVER make claims about dosing, contraindications, safety warnings, drug interactions, sequencing restrictions, pregnancy/lactation, complications, adverse events, or off-label use without citing a specific [src_N] source. If sources lack safety data for the question, explicitly state that the sources do not cover that safety topic rather than speculating.
Only include safety information that is relevant to the question asked. For example, do not mention pregnancy warnings when the question is about male patients. Tailor your answer to the specific patient population or context in the query.
Never invent PMIDs, URLs, or citations — cite ONLY src markers that appear in the source list.
When YouTube video sources are available, actively cite them — they contain expert demonstrations and KOL commentary that complement text sources. Cite video sources inline just like any other source.
Before your main answer, output a KEY_POINTS block with 3-7 short takeaways:
KEY_POINTS: <takeaway 1>[src_N]|<takeaway 2>[src_N]|<takeaway 3>[src_N]
Then a blank line, then your structured answer.
When writing tables, output them as standard markdown pipe tables with NO blank lines between header, separator, and data rows.`;

function buildSystemPrompt(sources: RetrievedSource[], knowledge: string): string {
  const sourceBlocks = sources
    .map((s) => {
      const provenance =
        s.corpus === "fda"
          ? "FDA label"
          : s.corpus === "pubmed"
            ? `PubMed ${(s.locator as { pmid?: string }).pmid ?? s.retrievalId}`
            : s.corpus === "practice"
              ? `Practice dossier — ${locatorTitle(s.locator)}`
              : s.corpus === "youtube"
                ? `YouTube video — ${locatorTitle(s.locator)}`
                : s.corpus === "podcast"
                  ? `Intelligence — ${locatorTitle(s.locator)}`
                  : s.corpus === "manufacturer"
                    ? `Manufacturer — ${locatorTitle(s.locator)}`
                    : locatorTitle(s.locator);
      return `[${s.retrievalId}] (${provenance})\n${s.text}`;
    })
    .join("\n\n");

  return `${SYSTEM}\n\n<knowledge>\n${knowledge}\n</knowledge>\n\n<sources>\n${sourceBlocks}\n</sources>`;
}

function buildPrompt(query: string): string {
  return `Question: ${query}\n\nAnswer the question, citing [src_N] for every claim. After your answer, on a new line output FOLLOW_UPS: followed by exactly 3 short follow-up questions separated by | that a clinician might ask next. Example format:
FOLLOW_UPS: What are the common side effects?|How does this compare to alternatives?|What is the typical treatment timeline?`;
}

function extractFollowUps(text: string): { cleanText: string; followUps: string[] } {
  const match = text.match(/\n?FOLLOW_UPS:\s*(.+)$/);
  if (!match) return { cleanText: text, followUps: [] };
  const cleanText = text.slice(0, match.index).trimEnd();
  const followUps = match[1]
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
  return { cleanText, followUps };
}

function extractKeyPoints(text: string): { cleanText: string; keyPoints: string[] } {
  const match = text.match(/^KEY_POINTS:\s*(.+)\n/);
  if (!match) return { cleanText: text, keyPoints: [] };
  const cleanText = text.slice(match[0].length).trimStart();
  const keyPoints = match[1]
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 7);
  return { cleanText, keyPoints };
}

function fallbackProse(sources: RetrievedSource[]): string {
  return sources
    .slice(0, 5)
    .map((s) => `${s.text.replace(/\s+/g, " ").trim()} [${s.retrievalId}]`)
    .join(" ");
}

function questionHash(q: string): string {
  return createHash("md5").update(q.toLowerCase().trim()).digest("hex");
}

async function hashIp(ip: string): Promise<string> {
  const salt = process.env.IP_HASH_SALT ?? "a360_default";
  const data = new TextEncoder().encode(ip + salt);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({})) as {
    query?: string;
    surface?: string;
  };

  const surface = body.surface ?? "public";

  // 1. Sanitize
  const raw = (body.query ?? "").trim().replace(/<[^>]*>/g, "");
  if (!raw) {
    return new Response(JSON.stringify({ error: "query required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const encoder = new TextEncoder();

  function makeErrorStream(code: string, message: string): ReadableStream<Uint8Array> {
    return new ReadableStream({
      start(controller) {
        const emit = (ev: ResearchEvent) =>
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));
        emit({ type: "error", code, message, retryable: false });
        emit({
          type: "done",
          runId: `run_${Date.now()}`,
          usage: { inputTokens: 0, outputTokens: 0, durationMs: 0 },
        });
        controller.close();
      },
    });
  }

  if (raw.length > 500) {
    return new Response(makeErrorStream("too_long", "Question too long (max 500 characters)."), {
      headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
    });
  }

  const q = raw;

  // Session + IP
  const { sessionId, setCookieHeader } = await getOrCreateSession(req, surface);
  const rawIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = await hashIp(rawIp);

  const responseHeaders: Record<string, string> = {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  };
  if (setCookieHeader) responseHeaders["Set-Cookie"] = setCookieHeader;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (ev: ResearchEvent) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));

      const startTime = Date.now();

      try {
        // 2. Demo bypass
        const demoToken = req.headers.get("x-demo-token");
        const bypassToken = process.env.DEMO_BYPASS_TOKEN;
        const isDemoBypass = Boolean(bypassToken && demoToken === bypassToken);
        const isLocalDev = process.env.NODE_ENV === "development";

        if (!isDemoBypass && !isLocalDev) {
          // 3. Rate limit — session (10/hr)
          const { count: sessionCount } = await agentSupabase
            .from("ask_log")
            .select("*", { count: "exact", head: true })
            .eq("session_id", sessionId)
            .gte(
              "created_at",
              new Date(Date.now() - 60 * 60 * 1000).toISOString(),
            );

          if ((sessionCount ?? 0) >= 10) {
            await agentSupabase.from("ask_log").insert({
              session_id: sessionId,
              surface,
              question: q,
              status: "rate_limited",
              client_ip_hash: ipHash,
              latency_ms: Date.now() - startTime,
            });
            emit({
              type: "error",
              code: "rate_limited",
              message:
                "You've hit the free limit for now — full access is available inside A360.",
              retryable: false,
            });
            emit({
              type: "done",
              runId: `run_${Date.now()}`,
              usage: { inputTokens: 0, outputTokens: 0, durationMs: 0 },
            });
            return;
          }

          // Rate limit — IP (30/day)
          const { count: ipCount } = await agentSupabase
            .from("ask_log")
            .select("*", { count: "exact", head: true })
            .eq("client_ip_hash", ipHash)
            .gte(
              "created_at",
              new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            );

          if ((ipCount ?? 0) >= 30) {
            await agentSupabase.from("ask_log").insert({
              session_id: sessionId,
              surface,
              question: q,
              status: "rate_limited",
              client_ip_hash: ipHash,
              latency_ms: Date.now() - startTime,
            });
            emit({
              type: "error",
              code: "rate_limited",
              message:
                "You've hit the free limit for now — full access is available inside A360.",
              retryable: false,
            });
            emit({
              type: "done",
              runId: `run_${Date.now()}`,
              usage: { inputTokens: 0, outputTokens: 0, durationMs: 0 },
            });
            return;
          }
        }

        // 4. Cache check
        const qHash = questionHash(q);
        const { data: cacheRows } = await agentSupabase
          .from("ask_log")
          .select("answer_prose, citations, key_points, follow_ups")
          .eq("question_hash", qHash)
          .eq("status", "complete")
          .not("answer_prose", "is", null)
          .gte(
            "created_at",
            new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          )
          .order("created_at", { ascending: false })
          .limit(1);

        if (cacheRows && cacheRows.length > 0) {
          const hit = cacheRows[0] as {
            answer_prose?: string;
            citations?: ResearchCitation[];
            key_points?: string[];
            follow_ups?: string[];
          };
          const cachedCitations: ResearchCitation[] = hit.citations ?? [];
          const cachedProse: string = hit.answer_prose ?? "";
          const cachedKeyPoints: string[] = hit.key_points ?? [];
          const cachedFollowUps: string[] = hit.follow_ups ?? [];

          // Reconstruct minimal sources from citations for the source pills
          const replaySources: RetrievedSource[] = cachedCitations.map((c) => ({
            retrievalId: c.retrievalId,
            chunkRef: c.chunkRef,
            corpus: c.corpus,
            scores: {
              fused: 0,
              authorityWeight: 1,
              final: c.relevance ?? 0.5,
            },
            text: c.evidence,
            locator: c.locator,
          }));

          const replayDisplayMap: Record<string, number> = {};
          cachedCitations.forEach((c) => {
            replayDisplayMap[c.retrievalId] = c.number;
          });

          // Supplement cache replay with fresh YouTube/video sources
          emit({ type: "status", stage: "searching" });
          const { sources: freshSources } = await retrieveSources(q);
          const cachedChunkRefs = new Set(replaySources.map((s) => s.chunkRef));
          const videoSources = freshSources.filter(
            (s) => s.corpus === "youtube" && !cachedChunkRefs.has(s.chunkRef),
          );
          const allSources = [...replaySources, ...videoSources];
          emit({ type: "sources", sources: allSources });
          emit({ type: "token", text: cachedProse });
          emit({ type: "citations", citations: cachedCitations, displayMap: replayDisplayMap });
          emit({
            type: "done",
            runId: `run_${Date.now()}`,
            usage: { inputTokens: 0, outputTokens: 0, durationMs: Date.now() - startTime },
            followUps: cachedFollowUps,
            keyPoints: cachedKeyPoints,
          });

          // Log cache hit as a new row (preserve key_points/follow_ups for future cache hits)
          await agentSupabase.from("ask_log").insert({
            session_id: sessionId,
            surface,
            question: q,
            status: "complete",
            answer_prose: cachedProse,
            citations: cachedCitations,
            key_points: cachedKeyPoints,
            follow_ups: cachedFollowUps,
            client_ip_hash: ipHash,
            latency_ms: Date.now() - startTime,
          });

          return;
        }

        // 5. Live path
        emit({ type: "status", stage: "searching" });
        const { sources, knowledge } = await retrieveSources(q);

        emit({ type: "status", stage: "ranking" });
        emit({ type: "sources", sources });

        // 6. Out-of-scope: 0 sources
        if (sources.length === 0) {
          const topics = nearestTopics(q);
          const topicList = topics.map((t) => `• ${t}`).join("\n");
          const outOfScopeText = `That's outside the A360 Global Library right now — it covers FDA-cleared aesthetic treatments. Closest topics I can answer on:\n\n${topicList}`;

          emit({ type: "token", text: outOfScopeText });
          emit({ type: "citations", citations: [], displayMap: {} });
          emit({
            type: "done",
            runId: `run_${Date.now()}`,
            usage: { inputTokens: 0, outputTokens: 0, durationMs: Date.now() - startTime },
          });

          await agentSupabase.from("ask_log").insert({
            session_id: sessionId,
            surface,
            question: q,
            status: "out_of_scope",
            client_ip_hash: ipHash,
            latency_ms: Date.now() - startTime,
          });

          return;
        }

        emit({ type: "status", stage: "generating" });

        let fullText = "";

        // Try AI Gateway first, fall back to direct Anthropic SDK
        const streamOpts = {
          system: buildSystemPrompt(sources, knowledge),
          prompt: buildPrompt(q),
          temperature: 0.3,
          maxOutputTokens: 800,
        };

        // Collect full text first — KEY_POINTS/FOLLOW_UPS markers must be
        // stripped before emitting tokens so the client never sees them.
        async function generate(
          model: Parameters<typeof streamText>[0]["model"],
        ): Promise<string> {
          let buf = "";
          const result = streamText({ model, ...streamOpts });
          for await (const delta of result.textStream) {
            buf += delta;
          }
          return buf;
        }

        // Call Anthropic directly. The Vercel AI Gateway path was removed: the
        // configured AI_GATEWAY_API_KEY is an Anthropic key (sk-ant-…), not a
        // Vercel gateway key (vck_…), so gateway() always 401'd and silently
        // fell through here anyway. Going direct removes a guaranteed-failing
        // round-trip per request and surfaces real errors. Matches /api/research/chat.
        if (process.env.ANTHROPIC_API_KEY) {
          try {
            const anthropic = createAnthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
            fullText = await generate(anthropic("claude-haiku-4-5-20251001"));
          } catch (err) {
            console.error("[ask] Anthropic generation failed:", err);
            fullText = "";
          }
        }

        // Strip KEY_POINTS / FOLLOW_UPS before emitting tokens
        const { cleanText: answerText, followUps } = extractFollowUps(fullText);
        const { cleanText: finalText, keyPoints } = extractKeyPoints(answerText);
        fullText = finalText;

        if (!fullText) {
          fullText = fallbackProse(sources);
        }

        // Emit clean answer as chunked tokens for streaming feel
        const chunkSize = 12;
        const words = fullText.match(/\S+\s*/g) ?? [fullText];
        for (let wi = 0; wi < words.length; wi += chunkSize) {
          emit({ type: "token", text: words.slice(wi, wi + chunkSize).join("") });
        }

        const { citations, displayMap } = resolveCitations(fullText, sources);
        emit({ type: "citations", citations, displayMap });
        emit({
          type: "done",
          runId: `run_${Date.now()}`,
          usage: { inputTokens: 0, outputTokens: 0, durationMs: Date.now() - startTime },
          followUps,
          keyPoints,
        });

        // 7. Log
        await agentSupabase.from("ask_log").insert({
          session_id: sessionId,
          surface,
          question: q,
          status: "complete",
          answer_prose: fullText,
          citations,
          key_points: keyPoints,
          follow_ups: followUps,
          client_ip_hash: ipHash,
          latency_ms: Date.now() - startTime,
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

  return new Response(stream, { headers: responseHeaders });
}
