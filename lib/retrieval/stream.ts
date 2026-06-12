import type { ResearchEvent } from "@/lib/types/retrieval";

/** Example questions seeded in the empty Research chat (UI prompts, not retrieval data). */
export const EXAMPLE_QUERIES = [
  "How fast does Botox work and what's the glabellar dose?",
  "What are the FDA-approved indications for Botox Cosmetic?",
  "How does Dysport compare to Botox for onset and duration?",
];

/**
 * Live retrieval stream — reads the SSE from /api/research/chat and yields
 * ResearchEvent objects with the exact same signature as the old mock generator.
 * The client (research-chat.tsx) is unchanged: it consumes ResearchEvent either way.
 */
export async function* streamResearch(query: string): AsyncGenerator<ResearchEvent> {
  const res = await fetch("/api/research/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok || !res.body) {
    yield {
      type: "error",
      code: "request_failed",
      message: `HTTP ${res.status}`,
      retryable: true,
    };
    return;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let idx: number;
    while ((idx = buffer.indexOf("\n\n")) !== -1) {
      const raw = buffer.slice(0, idx);
      buffer = buffer.slice(idx + 2);
      const line = raw.startsWith("data:") ? raw.slice(5).trim() : raw.trim();
      if (!line) continue;
      try {
        yield JSON.parse(line) as ResearchEvent;
      } catch {
        // ignore malformed frames
      }
    }
  }
}
