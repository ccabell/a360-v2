import { streamText, stepCountIs } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { getAgent, getVersion } from "@/lib/api/agents";
import { createRun, updateRun } from "@/lib/api/runs";
import { buildTools } from "./tools";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ExecuteParams {
  agentId: string;
  userMessage: string;
  patientId?: string;
}

export interface AgentRunnerEvent {
  type:
    | "status"
    | "token"
    | "tool_call"
    | "tool_result"
    | "tool_error"
    | "error"
    | "done";
  [key: string]: unknown;
}

export type EmitFn = (event: AgentRunnerEvent) => void;

// ---------------------------------------------------------------------------
// Executor
// ---------------------------------------------------------------------------

export async function executeAgentRun(
  params: ExecuteParams,
  emit: EmitFn,
): Promise<void> {
  const startMs = Date.now();
  let runId: string | undefined;

  try {
    // 1. Load agent
    const agent = await getAgent(params.agentId);
    if (!agent.active_version_id) {
      emit({
        type: "error",
        message: "Agent has no active version. Promote a version first.",
      });
      return;
    }

    // 2. Load version
    const version = await getVersion(agent.active_version_id);

    // 3. Create run record
    const run = await createRun({
      agent_id: agent.id,
      version_id: version.id,
      input: {
        user_message: params.userMessage,
        patient_id: params.patientId,
      },
      status: "running",
    });
    runId = run.id;
    emit({ type: "status", stage: "run_created", runId: run.id });

    // 4. Build tools
    const tools = buildTools(version.tool_config);

    // 5. Create Anthropic provider
    const apiKey =
      process.env.ANTHROPIC_API_KEY || process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      const errMsg = "No API key configured (ANTHROPIC_API_KEY or AI_GATEWAY_API_KEY)";
      emit({ type: "error", message: errMsg });
      await updateRun(run.id, {
        status: "failed",
        output: { error: errMsg, recommendation: "Set ANTHROPIC_API_KEY" },
        duration_ms: Date.now() - startMs,
      });
      return;
    }
    const anthropic = createAnthropic({ apiKey });

    // 6. Call streamText
    const result = streamText({
      model: anthropic(version.model ?? "claude-haiku-4-5-20251001"),
      system: version.system_prompt ?? "You are a helpful assistant.",
      prompt: params.userMessage,
      stopWhen: stepCountIs(version.constraints?.max_tool_rounds ?? 5),
      temperature: version.constraints?.temperature ?? 0.3,
      maxOutputTokens: version.constraints?.max_tokens ?? 4096,
      tools,
    });

    // 7. Iterate fullStream
    let fullText = "";
    const toolErrors: string[] = [];
    const completedTools: string[] = [];

    for await (const part of result.fullStream) {
      switch (part.type) {
        case "text-delta":
          fullText += part.text;
          emit({ type: "token", text: part.text });
          break;

        case "tool-call":
          emit({
            type: "tool_call",
            toolName: part.toolName,
            input: part.input,
          });
          break;

        case "tool-result":
          emit({
            type: "tool_result",
            toolName: part.toolName,
            result: part.output,
          });
          // Track tool success/failure from structured error returns
          if (
            part.output &&
            typeof part.output === "object" &&
            "success" in part.output &&
            (part.output as { success: boolean }).success === false
          ) {
            toolErrors.push(
              `${part.toolName}: ${(part.output as { error?: string }).error ?? "unknown"}`,
            );
          } else {
            completedTools.push(part.toolName);
          }
          break;

        case "tool-error":
          emit({ type: "tool_error", toolName: part.toolName, error: String(part.error) });
          toolErrors.push(`${part.toolName}: ${String(part.error)}`);
          break;
      }
    }

    // 8. Persist run
    if (fullText.trim().length > 0) {
      await updateRun(run.id, {
        status: "completed",
        output: { text: fullText },
        duration_ms: Date.now() - startMs,
      });
    } else {
      await updateRun(run.id, {
        status: "failed",
        output: {
          error: "No output generated",
          failed_tools: toolErrors,
          completed_tools: completedTools,
          recommendation:
            "Check tool configurations and API key availability",
        },
        duration_ms: Date.now() - startMs,
      });
    }

    // 9. Done
    emit({ type: "done", runId: run.id, durationMs: Date.now() - startMs });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    emit({ type: "error", message });

    // Update run to failed if we have a run ID
    if (runId) {
      try {
        await updateRun(runId, {
          status: "failed",
          error: message,
          duration_ms: Date.now() - startMs,
        });
      } catch {
        // Swallow — run persistence failure should not mask the original error
      }
    }
  }
}
