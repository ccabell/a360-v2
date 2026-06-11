import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const PR_BASE =
  process.env.NEXT_PUBLIC_PROMPT_RUNNER_URL ||
  "https://prompt-runner-production.up.railway.app";

/**
 * POST /api/playground
 * Proxy to Prompt Runner's run_downstream endpoint for prompt_runner runtime agents.
 * Body: { agent_key, transcript_id, input_text?, run_id?, module_id? }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { agent_key, transcript_id, input_text, run_id, module_id } = body;

    if (!agent_key) {
      return NextResponse.json({ error: "agent_key is required" }, { status: 400 });
    }

    // Use run_downstream if we have a run_id, otherwise run_extraction with transcript
    const endpoint = run_id ? "/run_downstream" : "/run_extraction";
    const payload = run_id
      ? { run_id, module_id: module_id || agent_key, selected_outputs: [] }
      : { transcript_id, agent_key, input_text };

    const start = Date.now();
    const res = await fetch(`${PR_BASE}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.PROMPT_RUNNER_API_KEY && {
          Authorization: `Bearer ${process.env.PROMPT_RUNNER_API_KEY}`,
        }),
      },
      body: JSON.stringify(payload),
    });

    const duration_ms = Date.now() - start;

    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      return NextResponse.json(
        { error: `Prompt Runner ${res.status}: ${text}` },
        { status: 502 },
      );
    }

    const data = await res.json();
    return NextResponse.json({ ...data, duration_ms });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
