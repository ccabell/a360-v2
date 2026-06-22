import { NextRequest, NextResponse } from "next/server";
import { executeAgentRun } from "@/lib/agent-runtime/executor";
import type { AgentRunnerEvent } from "@/lib/agent-runtime/executor";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    agent_id?: string;
    user_message?: string;
    patient_id?: string;
    tools_override?: string[];
  };

  if (!body.agent_id || !body.user_message?.trim()) {
    return NextResponse.json(
      { error: "agent_id and user_message are required" },
      { status: 400 },
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (ev: AgentRunnerEvent) =>
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));
      try {
        await executeAgentRun(
          {
            agentId: body.agent_id!,
            userMessage: body.user_message!.trim(),
            patientId: body.patient_id,
            signal: req.signal,
            toolsOverride: body.tools_override,
          },
          emit,
        );
      } catch (err) {
        emit({
          type: "error",
          message: err instanceof Error ? err.message : "Unknown error",
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
