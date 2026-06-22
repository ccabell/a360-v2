import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { createAnthropic } from "@ai-sdk/anthropic";
import type { ClinicalRecord } from "@/lib/scribe/types";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * POST /api/scribe/edit — "magic edit". Rewrites one record per a natural-language
 * instruction. Live (Claude) with a graceful client fallback if unavailable.
 * Body: { record: ClinicalRecord, instruction: string }
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as {
    record?: ClinicalRecord;
    instruction?: string;
  };

  if (!body.record || !body.instruction?.trim()) {
    return NextResponse.json(
      { error: "record and instruction are required" },
      { status: 400 },
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Magic edit unavailable (no API key)." },
      { status: 503 },
    );
  }

  try {
    const anthropic = createAnthropic({ apiKey });
    const { text } = await generateText({
      model: anthropic("claude-haiku-4-5-20251001"),
      system:
        "You edit a clinical record per the user's instruction. Preserve clinical " +
        "accuracy; do not invent findings. Keep the same JSON shape. Return JSON only.",
      prompt: [
        `Record JSON:\n${JSON.stringify(body.record)}`,
        ``,
        `Instruction: ${body.instruction.trim()}`,
        ``,
        `Return the edited record as JSON with the same shape (type, title, subtitle?, sections[]).`,
        `Keep each line's "sources" array unchanged where the line is preserved.`,
      ].join("\n"),
      temperature: 0.2,
      maxOutputTokens: 2500,
    });

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    const edited = JSON.parse(text.slice(start, end + 1)) as ClinicalRecord;
    return NextResponse.json({ record: edited });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Edit failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
