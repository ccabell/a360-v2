import type { ResearchEvent } from "@/lib/types/retrieval";
import { resolveCitations } from "@/lib/retrieval/post-process";
import { pickScenario } from "./research-data";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

let runCounter = 0;

/** Split text into stream chunks while keeping [src_N] markers intact. */
function tokenize(text: string): string[] {
  return text.split(/(\[src_\d+\]|\s+)/).filter((t) => t.length > 0);
}

/**
 * Simulated SSE stream (§12) for the Research chat demo. Mirrors the real
 * event sequence: status → sources → status(generating) → token* → citations → done.
 * Swap this generator for a fetch + EventSource reader when the service is live.
 */
export async function* streamResearch(query: string): AsyncGenerator<ResearchEvent> {
  const started = 0;
  const scenario = pickScenario(query);

  yield { type: "status", stage: "searching" };
  await delay(650);

  yield { type: "status", stage: "ranking" };
  await delay(550);

  // Sources arrive before generation — UI renders pills immediately.
  yield { type: "sources", sources: scenario.sources };
  await delay(350);

  yield { type: "status", stage: "generating" };
  await delay(250);

  let output = "";
  for (const tok of tokenize(scenario.answer)) {
    output += tok;
    yield { type: "token", text: tok };
    await delay(tok.trim().length === 0 ? 8 : 22);
  }

  const { citations, displayMap } = resolveCitations(scenario.answer, scenario.sources);
  yield { type: "citations", citations, displayMap };

  yield {
    type: "done",
    runId: `mock_run_${++runCounter}`,
    usage: {
      inputTokens: 1840 + scenario.sources.length * 120,
      outputTokens: output.length >> 2,
      durationMs: 2050 + started,
    },
  };
}
