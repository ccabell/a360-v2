/**
 * Minimal streaming client for the Anthropic Messages API.
 *
 * The repo's existing routes call Claude through the Vercel AI Gateway, but the
 * gateway key in this environment is unauthenticated. The Academy tutor instead
 * calls Anthropic directly with `ANTHROPIC_API_KEY` (per spec), streaming text
 * deltas so the UI can render tokens as they arrive. No SDK dependency — the
 * Messages streaming protocol is a simple SSE feed we parse inline.
 */

export interface AnthropicStreamOpts {
  model: string;
  system: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Stream a completion from Claude, yielding text deltas.
 *
 * Throws if the API key is missing or the request fails before streaming.
 * Yields nothing (returns) on a clean end.
 */
export async function* streamAnthropic(
  opts: AnthropicStreamOpts
): AsyncGenerator<string, void, unknown> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: opts.model,
      max_tokens: opts.maxTokens ?? 700,
      // NOTE: `temperature` is deprecated/rejected by claude-opus-4-8, so it is
      // only sent when explicitly provided AND the model accepts it. We omit it
      // by default to stay compatible with the latest Opus.
      ...(opts.temperature !== undefined && !opts.model.includes("opus-4-8")
        ? { temperature: opts.temperature }
        : {}),
      system: opts.system,
      stream: true,
      messages: [{ role: "user", content: opts.prompt }],
    }),
  });

  if (!res.ok || !res.body) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Anthropic API ${res.status}: ${detail.slice(0, 200)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const frames = buf.split("\n\n");
    buf = frames.pop() ?? "";
    for (const frame of frames) {
      // Each SSE frame may have "event:" and "data:" lines; we only need data.
      const dataLine = frame
        .split("\n")
        .find((l) => l.startsWith("data:"));
      if (!dataLine) continue;
      const json = dataLine.slice(5).trim();
      if (!json || json === "[DONE]") continue;
      try {
        const ev = JSON.parse(json) as {
          type: string;
          delta?: { type?: string; text?: string };
        };
        if (
          ev.type === "content_block_delta" &&
          ev.delta?.type === "text_delta" &&
          ev.delta.text
        ) {
          yield ev.delta.text;
        }
      } catch {
        /* ignore partial / non-JSON keep-alive frames */
      }
    }
  }
}
