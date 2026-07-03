import { createHash } from "node:crypto";
import { streamText, stepCountIs } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { getAgent, getVersion } from "@/lib/api/agents";
import { createAgentOutput, updateAgentOutput } from "@/lib/api/runs";
import { buildTools } from "./tools";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ExecuteParams {
  agentId: string;
  userMessage: string;
  patientId?: string;
  signal?: AbortSignal;
  /** Override the agent version's tool list for this run only */
  toolsOverride?: string[];
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
  let outputId: string | undefined;

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

    // 3. Resolve model — strip provider prefix and map friendly names to API IDs
    const MODEL_ALIASES: Record<string, string> = {
      "claude-haiku-4.5": "claude-haiku-4-5-20251001",
      "claude-sonnet-4.5": "claude-sonnet-4-5-20250929",
      "claude-sonnet-4.6": "claude-sonnet-4-6",
      "claude-opus-4.6": "claude-opus-4-6",
    };
    const rawModel = (version.model ?? agent.model ?? "claude-haiku-4-5-20251001")
      .replace(/^anthropic\//, "");
    const modelId = MODEL_ALIASES[rawModel] ?? rawModel;

    // 4. Build tools — toolsOverride > knowledge_config.tools > all tools
    const toolNames = params.toolsOverride ?? (version.knowledge_config?.tools as string[] | undefined);
    const tools = buildTools(toolNames);
    const resolvedToolNames = Object.keys(tools);

    // 5. Create agent_output record with lineage snapshot
    // practice_id is NOT NULL — use a demo practice for tester runs
    const DEMO_PRACTICE_ID =
      process.env.DEMO_PRACTICE_ID ?? "a0000000-0000-0000-0000-000000000001";
    const output = await createAgentOutput({
      patient_id: params.patientId,
      practice_id: DEMO_PRACTICE_ID,
      agent_key: agent.agent_key,
      agent_version: version.version,
      agent_version_id: version.id,
      model: modelId,
      lineage: {
        prompt_sha256: createHash("sha256")
          .update(version.prompt_text ?? "")
          .digest("hex"),
        tools: resolvedToolNames,
        tools_overridden: params.toolsOverride != null,
        model_params: version.model_params ?? null,
      },
      input_envelope: {
        user_message: params.userMessage,
        patient_id: params.patientId,
      },
      status: "running",
    });
    outputId = output.id;
    emit({ type: "status", stage: "run_created", runId: output.id });

    // 6. Create Anthropic provider
    const apiKey =
      process.env.ANTHROPIC_API_KEY || process.env.AI_GATEWAY_API_KEY;
    if (!apiKey) {
      const errMsg = "No API key configured (ANTHROPIC_API_KEY or AI_GATEWAY_API_KEY)";
      emit({ type: "error", message: errMsg });
      await updateAgentOutput(output.id, {
        status: "failed",
        result: { error: errMsg, recommendation: "Set ANTHROPIC_API_KEY" },
        latency_ms: Date.now() - startMs,
      });
      return;
    }
    const anthropic = createAnthropic({ apiKey });

    // 7. Call streamText — include patient_id in prompt if provided
    const userPrompt = params.patientId
      ? `Patient ID: ${params.patientId}\n\n${params.userMessage}`
      : params.userMessage;
    const maxToolRounds = version.model_params?.max_tool_rounds ?? 5;
    // Graceful stop just under the Vercel function timeout (maxDuration) so the
    // run ends with a clean error event instead of an opaque 504. No output-size
    // cap — full responses stream through.
    const MAX_WALL_TIME_MS = 290_000;
    const abortController = new AbortController();

    // If the caller passes a signal (e.g. client disconnect), abort the LLM call
    if (params.signal) {
      params.signal.addEventListener("abort", () => abortController.abort(), { once: true });
    }

    const result = streamText({
      model: anthropic(modelId),
      system: version.prompt_text ?? "You are a helpful assistant.",
      prompt: userPrompt,
      stopWhen: stepCountIs(maxToolRounds),
      temperature: version.model_params?.temperature ?? 0.3,
      maxOutputTokens: version.model_params?.max_tokens ?? 16384,
      tools,
      abortSignal: abortController.signal,
    });

    // 8. Iterate fullStream
    emit({ type: "status", stage: "streaming", model: modelId });
    let fullText = "";
    let totalChars = 0;
    const toolErrors: string[] = [];
    const completedTools: string[] = [];

    for await (const part of result.fullStream) {
      // Graceful stop just under the function timeout (no output-size cap).
      if (Date.now() - startMs > MAX_WALL_TIME_MS) {
        abortController.abort();
        emit({ type: "error", message: "Run reached the maximum duration and was stopped." });
        break;
      }

      switch (part.type) {
        case "text-delta":
          fullText += part.text;
          totalChars += part.text.length;
          emit({ type: "token", text: part.text });
          break;

        case "tool-call":
          emit({
            type: "tool_call",
            toolName: part.toolName,
            toolCallId: part.toolCallId,
            input: part.input,
          });
          break;

        case "tool-result": {
          const outputStr = JSON.stringify(part.output);
          totalChars += outputStr.length;
          emit({
            type: "tool_result",
            toolName: part.toolName,
            toolCallId: part.toolCallId,
            result: part.output,
          });
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
        }

        case "tool-error":
          emit({ type: "tool_error", toolName: part.toolName, error: String(part.error) });
          toolErrors.push(`${part.toolName}: ${String(part.error)}`);
          break;
      }
    }

    // 9. Capture token usage
    let tokenUsage: { inputTokens?: number; outputTokens?: number; totalTokens?: number } = {};
    try {
      const usage = await result.totalUsage;
      tokenUsage = {
        inputTokens: usage.inputTokens,
        outputTokens: usage.outputTokens,
        totalTokens: usage.totalTokens,
      };
    } catch {
      // Usage unavailable (e.g. aborted stream) — proceed without it
    }

    // 10. Persist result
    const durationMs = Date.now() - startMs;
    if (fullText.trim().length > 0) {
      await updateAgentOutput(output.id, {
        status: "completed",
        result: {
          text: fullText,
          completed_tools: completedTools,
          token_usage: tokenUsage,
        },
        latency_ms: durationMs,
      });
    } else {
      await updateAgentOutput(output.id, {
        status: "failed",
        result: {
          error: "No output generated",
          failed_tools: toolErrors,
          completed_tools: completedTools,
          token_usage: tokenUsage,
          recommendation: "Check tool configurations and API key availability",
        },
        latency_ms: durationMs,
      });
    }

    // 11. Done
    emit({
      type: "done",
      runId: output.id,
      durationMs,
      tokenUsage,
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? err.message
        : typeof err === "object" && err !== null && "message" in err
          ? String((err as { message: unknown }).message)
          : JSON.stringify(err);
    console.error("[agent-runner] Error:", message);
    emit({ type: "error", message });

    if (outputId) {
      try {
        await updateAgentOutput(outputId, {
          status: "failed",
          result: { error: message },
          latency_ms: Date.now() - startMs,
        });
      } catch {
        // Swallow — persistence failure should not mask the original error
      }
    }
  }
}
