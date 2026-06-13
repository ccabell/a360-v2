"use client";

import { AskExperience } from "@/components/ask/ask-experience";

export function ResearchChat() {
  return (
    <AskExperience
      endpoint="/api/research/chat"
      variant="dashboard"
      showSave
    />
  );
}
