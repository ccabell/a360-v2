import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { messages, systemPrompt } = await req.json();

  if (!process.env.ANTHROPIC_KEY) {
    return NextResponse.json(
      { error: { message: "ANTHROPIC_KEY is not set on the server." } },
      { status: 500 },
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 800,
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
