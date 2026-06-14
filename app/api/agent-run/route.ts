import { NextRequest } from "next/server";
import { gateway } from "@ai-sdk/gateway";
import { streamText, stepCountIs } from "ai";
import { agentSupabase, opsSupabase } from "@/lib/supabase";
import { agentTools } from "@/lib/agent-runtime/tools";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

/**
 * POST /api/agent-run
 *
 * Run an agent against a patient with tool use.
 * Body: { agent_id, patient_id }
 *
 * Streams SSE events:
 *   { type: "step",      step }        — tool call / reasoning step
 *   { type: "text",      text }        — streamed answer tokens
 *   { type: "tool_call", name, args }  — tool invocation
 *   { type: "tool_result", name, result } — tool return value
 *   { type: "done",      summary }     — final metadata
 *   { type: "error",     message }     — error
 */
export async function POST(req: NextRequest) {
  const encoder = new TextEncoder();
  const start = Date.now();

  const stream = new ReadableStream({
    async start(controller) {
      function emit(event: Record<string, unknown>) {
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
        );
      }

      try {
        const body = await req.json();
        const { agent_id, patient_id } = body;

        if (!agent_id || !patient_id) {
          emit({ type: "error", message: "agent_id and patient_id are required" });
          controller.close();
          return;
        }

        // ----- 1. Load agent + active version -----
        emit({ type: "step", step: "Loading agent definition..." });

        const { data: agent, error: agentErr } = await opsSupabase
          .from("agents")
          .select("*")
          .eq("id", agent_id)
          .single();

        if (agentErr || !agent) {
          emit({ type: "error", message: `Agent not found: ${agentErr?.message ?? agent_id}` });
          controller.close();
          return;
        }

        // Load the active version (has the system prompt, model, tool config)
        let systemPrompt = "";
        let modelId = agent.model || "anthropic/claude-haiku-4.5";
        let enabledTools = Object.keys(agentTools);

        if (agent.active_version_id) {
          const { data: version } = await opsSupabase
            .from("agent_versions")
            .select("*")
            .eq("id", agent.active_version_id)
            .single();

          if (version) {
            systemPrompt = version.prompt_text || "";
            if (version.model) modelId = version.model;
            // Tool list from knowledge_config.tools if present
            const kc = version.knowledge_config as Record<string, unknown> | null;
            if (kc?.tools && Array.isArray(kc.tools)) {
              enabledTools = kc.tools as string[];
            }
          }
        }

        // Fallback: if no version or no system prompt, use a sensible default
        if (!systemPrompt) {
          systemPrompt = buildDefaultSystemPrompt(agent.name, agent.description);
        }

        emit({
          type: "step",
          step: `Agent loaded: ${agent.name} (${modelId})`,
          agent: { name: agent.name, model: modelId, tools: enabledTools },
        });

        // ----- 2. Load patient summary for the user message -----
        emit({ type: "step", step: "Loading patient overview..." });

        const { data: patient } = await opsSupabase
          .from("patients")
          .select("id, first_name, last_name, birth_date, biological_sex, patient_summary")
          .eq("id", patient_id)
          .single();

        if (!patient) {
          emit({ type: "error", message: "Patient not found" });
          controller.close();
          return;
        }

        const patientBrief = `Patient: ${patient.first_name} ${patient.last_name}, DOB ${patient.birth_date}, ${patient.biological_sex}.\n${patient.patient_summary || "No summary available."}`;

        emit({ type: "step", step: `Patient: ${patient.first_name} ${patient.last_name}` });

        // ----- 3. Build the user message -----
        const userMessage = `Analyze this patient's most recent consultation. Use your tools to gather the information you need — load the patient context, search the Global Library for relevant product intelligence, and find clinical evidence. Then provide your analysis.

Patient ID: ${patient_id}

${patientBrief}

Use your tools step by step:
1. First, call get_patient_context to load the full consultation transcript and extraction
2. Based on what you find, search for relevant fuel documents and product information
3. Search clinical literature for evidence supporting your recommendations
4. Synthesize everything into a comprehensive analysis`;

        // ----- 4. Filter tools to only enabled ones -----
        const tools: Record<string, typeof agentTools[keyof typeof agentTools]> = {};
        for (const key of enabledTools) {
          if (key in agentTools) {
            tools[key] = agentTools[key as keyof typeof agentTools];
          }
        }

        // ----- 5. Call Claude with tools via AI SDK -----
        emit({ type: "step", step: "Starting agent execution..." });

        const result = streamText({
          model: gateway(modelId),
          system: systemPrompt,
          messages: [{ role: "user", content: userMessage }],
          tools,
          stopWhen: stepCountIs(8),
          onStepFinish: (event) => {
            // Emit tool calls from this step
            if (event.toolCalls?.length) {
              for (const tc of event.toolCalls) {
                emit({
                  type: "tool_call",
                  name: tc.toolName,
                  args: tc.input,
                });
              }
            }
            // Emit tool results from this step
            if (event.toolResults?.length) {
              for (const tr of event.toolResults) {
                const resultStr = JSON.stringify(tr.output);
                emit({
                  type: "tool_result",
                  name: tr.toolName,
                  result_preview: resultStr.slice(0, 500) + (resultStr.length > 500 ? "..." : ""),
                  result_length: resultStr.length,
                });
              }
            }
          },
        });

        // Stream text chunks
        for await (const chunk of result.textStream) {
          if (chunk) {
            emit({ type: "text", text: chunk });
          }
        }

        const usage = await result.usage;
        const duration = Date.now() - start;

        // ----- 6. Save result to agent_runs -----
        const fullText = await result.text;
        const steps = await result.steps;

        // Collect tool calls for the run record
        const toolCallLog = steps.flatMap((s) =>
          (s.toolCalls ?? []).map((tc) => ({
            tool: tc.toolName,
            input: tc.input,
          })),
        );

        // Save to agent_outputs so it shows up in the patient workspace
        const { data: savedOutput } = await opsSupabase.from("agent_outputs").insert({
          patient_id,
          consultation_id: null,
          practice_id: null,
          agent_key: agent.agent_key,
          agent_version: "tester",
          input_envelope: { patient_id },
          result: { text: fullText, tool_calls: toolCallLog },
          status: "completed",
          latency_ms: duration,
        }).select("id").single();

        emit({
          type: "done",
          summary: {
            agent: agent.name,
            patient: `${patient.first_name} ${patient.last_name}`,
            model: modelId,
            duration_ms: duration,
            tokens: usage?.totalTokens ?? null,
            tool_calls: toolCallLog.length,
            output_id: savedOutput?.id ?? null,
          },
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        emit({ type: "error", message });
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

// ---------------------------------------------------------------------------
// Default system prompt when no version is configured
// ---------------------------------------------------------------------------

function buildDefaultSystemPrompt(name: string, description: string | null): string {
  return `You are "${name}", an AI agent in the A360 medical aesthetics intelligence platform.
${description ? `\nYour role: ${description}` : ""}

You have access to tools that let you query real data:
- get_patient_context: Load patient demographics, consultation transcript, and extraction outputs
- search_fuel_documents: Search the Global Library for curated product intelligence and pairing guides
- get_evidence_links: Fetch FDA labels, PubMed citations, and manufacturer documentation
- search_clinical_literature: Search PubMed, YouTube, podcasts, and industry articles
- get_product_info: Look up product details, relationships, and concern mappings

IMPORTANT GUIDELINES:
- Use tools to gather data BEFORE making claims. Do not invent facts.
- Cite your sources: reference fuel documents, PubMed PMIDs, FDA labels, etc.
- Be specific about products, dosing, timing, and indications — use data from tools.
- Flag any safety concerns or contraindications you find in the evidence.
- If a tool returns no data for a product, say so — do not fill the gap with assumptions.
- Structure your response with clear sections and evidence.`;
}
