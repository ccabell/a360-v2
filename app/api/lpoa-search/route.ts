import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, systemPrompt } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: { message: "ANTHROPIC_API_KEY is not set on the server." } },
      { status: 500 },
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      // 800 truncated structured answers mid-<followups>, leaking raw tags into
      // the UI; 1600 gives tables + citations + followups room to complete.
      max_tokens: 1600,
      temperature: 0.3,
      system: systemPrompt,
      messages: messages,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(
      {
        error: {
          message: data?.error?.message || `Anthropic error: ${response.status}`,
        },
      },
      { status: response.status },
    );
  }

  // Transform Anthropic response to match the existing OpenAI structure expected by the frontend
  return NextResponse.json({
    choices: [
      {
        message: {
          content: data.content?.[0]?.text || "",
        },
      },
    ],
  });
}
