import { NextRequest } from "next/server";
import { retrievePodcastSources } from "@/lib/podcast/chat-retrieval";
import { getAgent, buildSystemPrompt } from "@/lib/podcast/agents";
import { streamAnthropic } from "@/lib/academy/anthropic-stream";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

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
  };
  const q = (body.query ?? "").trim().replace(/<[^>]*>/g, "");
  const agent = getAgent(body.agentId ?? "research");

  const encoder = new TextEncoder();
  if (!q) {
    return new Response(JSON.stringify({ error: "query required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (q.length > 500) {
    return new Response(
      JSON.stringify({ error: "Question too long (max 500 characters)." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (ev: unknown) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));
      try {
        const sources = await retrievePodcastSources(q);
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
            const gen = streamAnthropic({
              model: "claude-sonnet-4-6",
              system: buildSystemPrompt(agent, sources),
              prompt: `Question: ${q}\n\nAnswer using ONLY the sources above, citing [S#] for every claim:`,
              maxTokens: 800,
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
