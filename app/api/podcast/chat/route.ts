import { NextRequest } from "next/server";
import { retrievePodcastSources } from "@/lib/podcast/chat-retrieval";
import { getAgent, buildSystemPrompt } from "@/lib/podcast/agents";
import { streamAnthropic } from "@/lib/academy/anthropic-stream";

export const dynamic = "force-dynamic";
// 60s was silently killing long generations mid-stream (confirmed: a
// truncated a360-product answer stopped well under its token budget, with
// no error/done frame — a dropped connection, not a token-cap stop, at an
// observed ~28 tok/s). Vercel's platform default is now 300s; stay under it.
export const maxDuration = 280;

/**
 * A360 Podcast Navigator AI chat — keyword RAG over the podcast transcript
 * corpus. Streams SSE: { sources } → { token }* → { done }.
 *
 * Accepts an optional `agentId` to select a different analysis lens.
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    query?: string;
    agentId?: string;
    history?: { role: "user" | "assistant"; content: string }[];
  };
  const q = (body.query ?? "").trim().replace(/<[^>]*>/g, "");
  const agent = getAgent(body.agentId ?? "research");

  // Last few turns for follow-up context (sanitized + truncated).
  const history = (Array.isArray(body.history) ? body.history : [])
    .filter(
      (m) =>
        (m?.role === "user" || m?.role === "assistant") &&
        typeof m.content === "string",
    )
    .slice(-6)
    .map((m) => ({
      role: m.role,
      content: m.content.replace(/<[^>]*>/g, "").slice(0, 1200),
    }));

  const encoder = new TextEncoder();
  if (!q) {
    return new Response(JSON.stringify({ error: "query required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  // 500 was sized for quick chat questions. The A360 Product Intelligence
  // lens is explicitly a deep-research tool for the founder — multi-part
  // questions with 5-6 sub-questions routinely run 1,500-2,500 characters,
  // and were being hard-rejected with no indication why beyond a generic
  // error. Give that lens real headroom; keep other lenses closer to chat-sized.
  const maxQuestionLength = agent.id === "a360-product" ? 4000 : 800;
  if (q.length > maxQuestionLength) {
    return new Response(
      JSON.stringify({ error: `Question too long (max ${maxQuestionLength} characters).` }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (ev: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));
      try {
        // Short follow-ups ("what about pricing?") retrieve poorly on their
        // own — augment with the previous user question for context.
        let retrievalQuery = q;
        if (history.length > 0 && q.split(/\s+/).length < 6) {
          const prevUser = [...history].reverse().find((m) => m.role === "user");
          if (prevUser) retrievalQuery = `${prevUser.content.slice(0, 200)} ${q}`;
        }
        // The Product Intelligence lens fields compound, multi-facet research
        // questions (e.g. 6 sub-questions on one topic) — 12 sources spread
        // that thin. Widen the retrieval net for that lens specifically.
        const sourceLimit = agent.id === "a360-product" ? 24 : 12;
        const sources = await retrievePodcastSources(retrievalQuery, sourceLimit);
        emit({ type: "sources", sources });

        if (sources.length === 0) {
          const msg =
            "I couldn't find anything on that in the podcast library. Try a topic like Botox techniques, practice growth, patient retention, treatment pricing, or filler complications.";
          for (const tok of msg.match(/\S+\s*/g) ?? [msg])
            emit({ type: "token", text: tok });
          emit({ type: "done" });
          controller.close();
          return;
        }

        let fullText = "";
        if (process.env.ANTHROPIC_API_KEY) {
          try {
            const convo =
              history.length > 0
                ? `Previous conversation:\n${history
                    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
                    .join("\n")}\n\n`
                : "";
            const gen = streamAnthropic({
              model: "claude-sonnet-4-6",
              system: buildSystemPrompt(agent, sources),
              prompt: `${convo}Question: ${q}\n\nAnswer using ONLY the sources above, citing [S#] for every claim:`,
              // 800 was clipping legitimately long, multi-section synthesis
              // answers mid-sentence (the FORMAT rules encourage headers/
              // steps for multi-part questions, which need more room).
              // The Product Intelligence lens answers a 6-part question with
              // EVIDENCE/PATTERN sections plus a "For A360" list — needs more
              // room still than a typical chat answer. Time, not tokens, was
              // the actual bottleneck (see maxDuration above) — 3800 tokens
              // at ~28 tok/s is ~135s, comfortably inside the new time budget.
              maxTokens: agent.id === "a360-product" ? 3800 : 1536,
              // Low temperature: the same question should produce a stable,
              // consistent answer run-to-run.
              temperature: 0.3,
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

        // Fallback: no API key or generation failed
        if (!fullText) {
          const intro =
            "Here's what the podcast library covers on this:\n\n";
          const prose = sources
            .slice(0, 4)
            .map(
              (s) =>
                `${s.text.replace(/\s+/g, " ").trim().slice(0, 320)} [${s.id}]`,
            )
            .join("\n\n");
          for (const tok of (intro + prose).match(/\S+\s*/g) ?? [])
            emit({ type: "token", text: tok });
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
