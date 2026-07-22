"use client";

import { useState, useCallback, useRef } from "react";
import { extractPDFChunks, findRelevantChunks } from "./pdfSearch";
import { activeDevice } from "./lpoa/devices/gentlemax-pro";
import { buildDeviceFactsBlock } from "./lpoa/deviceFacts";

export interface PatientInfo {
  name: string;
  age: string;
  sex: string;
  concerns: string[];
}

export interface Citation {
  label: string;
  section: string;
  page: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
  followups?: string[];
}

function buildSystemPrompt(
  patient: PatientInfo | null,
  context: string,
): string {
  const pdfName = "Candela GentleMax Pro Operator's Manual";

  const patientSection = patient
    ? `
CURRENT PATIENT CONTEXT:
- Name/ID: ${patient.name}
- Age: ${patient.age}
- Sex: ${patient.sex}
- Treatment concerns: ${patient.concerns.join(", ")}

Tailor your recommendations to this specific patient's profile. Highlight any age- or sex-specific considerations, contraindications, or adjusted treatment parameters.`
    : `
NOTE: No patient is currently loaded. Provide general protocol guidance. Remind the clinician to consider individual patient factors.`;

  return `You are an expert clinical assistant for the ${pdfName}.
Your role is to answer questions from licensed medical practitioners about laser treatment protocols, settings, safety, and procedures described in this manual.

${patientSection}

${buildDeviceFactsBlock()}

RELEVANT MANUAL CONTENT (keyword-retrieved from the actual PDF — supplements the verified device data above):
${context}

Based on the above content, provide accurate answers with the EXACT page numbers shown in brackets like [Page X] above.

RESPONSE GUIDELINES:
1. Answer STRICTLY from the VERIFIED DEVICE DATA and RELEVANT MANUAL CONTENT above. Do not use outside knowledge or general laser-treatment assumptions. The VERIFIED DEVICE DATA is authoritative manual content — device capability/limit/range/spec questions should be answered from it directly.
2. Be concise and clinically precise — use proper terminology.
3. Always include safety notes when the content above contains them (eyewear, cryogen/cooling, contraindications, burns risk).
4. IMPORTANT — this manual does NOT contain per-indication recommended treatment settings (Candela defers those to a separate Clinical Treatment Guidelines document). If asked for a recommended fluence/pulse/DCD for an indication or skin type, say so plainly and never invent a value — but DO state the device's allowed range for that configuration from the tables above, and note that the Settings Builder module provides literature-based starting points.
5. After your main answer, output a JSON block of citations in this exact format:
   <citations>
   [
     {"label": "Manual", "section": "Section Name", "page": N}
   ]
   </citations>
   Use ONLY the exact [Page N] numbers that appear in the content above. NEVER estimate, guess, or fabricate a page number. If the content has no page you can cite, output an empty array [].
6. After citations, suggest 2-3 natural follow-up questions the clinician might ask next, based on your answer and the manual content. Output them as:
   <followups>
   ["Follow-up question 1?", "Follow-up question 2?", "Follow-up question 3?"]
   </followups>
   Keep them concise, clinically relevant, and different from what was already asked.
7. If the content above does not answer the question, say so clearly and do not fabricate an answer.`;
}

function parseResponse(raw: string): {
  content: string;
  citations: Citation[];
  followups: string[];
} {
  const citationMatch = raw.match(/<citations>([\s\S]*?)<\/citations>/);
  let citations: Citation[] = [];
  let content = raw;

  if (citationMatch) {
    try {
      citations = JSON.parse(citationMatch[1].trim());
    } catch {
      citations = [];
    }
    content = content.replace(/<citations>[\s\S]*?<\/citations>/, "").trim();
  }

  const followupMatch = content.match(/<followups>([\s\S]*?)<\/followups>/);
  let followups: string[] = [];

  if (followupMatch) {
    try {
      followups = JSON.parse(followupMatch[1].trim());
    } catch {
      followups = [];
    }
    content = content.replace(/<followups>[\s\S]*?<\/followups>/, "").trim();
  }

  return { content, citations, followups };
}

async function callOpenAI(
  messages: { role: string; content: string }[],
  systemPrompt: string,
  signal: AbortSignal,
): Promise<string> {
  const response = await fetch("/api/lpoa-search", {
    method: "POST",
    signal,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, systemPrompt }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      (err as { error?: { message?: string } }).error?.message ||
        `API error: ${response.status}`,
    );
  }

  const data = (await response.json()) as {
    choices: { message: { content: string } }[];
  };
  return data.choices[0]?.message?.content ?? "";
}

const PDF_URL = activeDevice.manual.url;

export function useAISearch(patient: PatientInfo | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isLoading) return;

      abortRef.current?.abort();
      abortRef.current = new AbortController();

      const userMsg: Message = {
        id: Date.now().toString(),
        role: "user",
        content: text,
      };
      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setError(null);

      const historyForAPI = [...messages, userMsg]
        .slice(-8)
        .map((m) => ({ role: m.role, content: m.content }));

      try {
        // Extract relevant pages from the actual PDF
        const allChunks = await extractPDFChunks(PDF_URL);
        const relevant = findRelevantChunks(allChunks, text);
        const context =
          relevant.length > 0
            ? relevant
                .map((c) => `[Page ${c.page}]: ${c.text.slice(0, 1200)}`)
                .join("\n\n")
            : "No specific content found — use general manual knowledge.";

        const systemPrompt = buildSystemPrompt(patient, context);
        console.log(
          "Relevant pages found:",
          relevant.map((c) => c.page),
        );
        console.log("Context length:", context.length);
        const raw = await callOpenAI(
          historyForAPI,
          systemPrompt,
          abortRef.current.signal,
        );
        const { content, citations, followups } = parseResponse(raw);

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content,
            citations: citations.length > 0 ? citations : undefined,
            followups: followups.length > 0 ? followups : undefined,
          },
        ]);
      } catch (err: unknown) {
        if ((err as { name?: string }).name === "AbortError") return;
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: `⚠️ Error: ${msg}`,
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading, patient],
  );

  const clearMessages = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isLoading, error, sendMessage, clearMessages };
}
