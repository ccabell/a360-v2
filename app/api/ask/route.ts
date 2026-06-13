import { createHash } from "crypto";
import { NextRequest } from "next/server";
import { gateway } from "@ai-sdk/gateway";
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
Be concise — 2 to 4 short paragraphs. If the sources do not support an answer, say so.
Never invent PMIDs, URLs, or citations — cite ONLY src markers that appear in the source list.`;

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
              : locatorTitle(s.locator);
      return `[${s.retrievalId}] (${provenance})\n${s.text}`;
    })
    .join("\n\n");

  return `${SYSTEM}\n\n<knowledge>\n${knowledge}\n</knowledge>\n\n<sources>\n${sourceBlocks}\n</sources>`;
}

function buildPrompt(query: string): string {
  return `Question: ${query}\n\nAnswer the question, citing [src_N] for every claim:`;
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

        if (!isDemoBypass) {
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
            controller.close();
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
            controller.close();
            return;
          }
        }

        // 4. Cache check
        const qHash = questionHash(q);
        const { data: cacheRows } = await agentSupabase
          .from("ask_log")
          .select("answer_prose, citations")
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
          const hit = cacheRows[0];
          const cachedCitations: ResearchCitation[] = hit.citations ?? [];
          const cachedProse: string = hit.answer_prose ?? "";

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

          emit({ type: "status", stage: "searching" });
          emit({ type: "sources", sources: replaySources });
          emit({ type: "token", text: cachedProse });
          emit({ type: "citations", citations: cachedCitations, displayMap: replayDisplayMap });
          emit({
            type: "done",
            runId: `run_${Date.now()}`,
            usage: { inputTokens: 0, outputTokens: 0, durationMs: Date.now() - startTime },
          });

          // Log cache hit as a new row
          await agentSupabase.from("ask_log").insert({
            session_id: sessionId,
            surface,
            question: q,
            status: "complete",
            answer_prose: cachedProse,
            citations: cachedCitations,
            client_ip_hash: ipHash,
            latency_ms: Date.now() - startTime,
          });

          controller.close();
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

          controller.close();
          return;
        }

        emit({ type: "status", stage: "generating" });

        let fullText = "";

        if (process.env.AI_GATEWAY_API_KEY) {
          try {
            const result = streamText({
              model: gateway("anthropic/claude-haiku-4.5"),
              system: buildSystemPrompt(sources, knowledge),
              prompt: buildPrompt(q),
              temperature: 0.3,
              maxOutputTokens: 600,
            });
            for await (const delta of result.textStream) {
              fullText += delta;
              emit({ type: "token", text: delta });
            }
          } catch {
            fullText = "";
          }
        }

        if (!fullText) {
          fullText = fallbackProse(sources);
          for (const tok of fullText.match(/\S+\s*/g) ?? [fullText]) {
            emit({ type: "token", text: tok });
          }
        }

        const { citations, displayMap } = resolveCitations(fullText, sources);
        emit({ type: "citations", citations, displayMap });
        emit({
          type: "done",
          runId: `run_${Date.now()}`,
          usage: { inputTokens: 0, outputTokens: 0, durationMs: Date.now() - startTime },
        });

        // 7. Log
        await agentSupabase.from("ask_log").insert({
          session_id: sessionId,
          surface,
          question: q,
          status: "complete",
          answer_prose: fullText,
          citations,
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
