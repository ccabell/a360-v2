"use client";

import { useEffect, useRef, useCallback } from "react";
import { AskExperience } from "@/components/ask/ask-experience";
import { createBridge } from "@/lib/embed/bridge";

export default function EmbedAskPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query;
  const bridgeRef = useRef<ReturnType<typeof createBridge> | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bridge = createBridge();
    bridgeRef.current = bridge;

    bridge.post("a360:ready");

    // ResizeObserver → throttled a360:resize
    let rafId: number;
    const ro = new ResizeObserver(() => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (contentRef.current) {
          bridge.post("a360:resize", {
            height: contentRef.current.scrollHeight,
          });
        }
      });
    });
    if (contentRef.current) ro.observe(contentRef.current);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleAskSent = useCallback(
    (m: { messageId: string; ts: number }) => {
      bridgeRef.current?.post("a360:ask_sent", m);
    },
    [],
  );

  const handleAnswerComplete = useCallback(
    (m: { messageId: string; citationsCount: number }) => {
      bridgeRef.current?.post("a360:answer_complete", m);
    },
    [],
  );

  const handleCitationClick = useCallback((m: { url: string; tier: string }) => {
    bridgeRef.current?.post("a360:citation_click", m);
  }, []);

  return (
    <div ref={contentRef} className="flex min-h-screen flex-col bg-transparent">
      <div className="flex flex-1 flex-col">
        <AskExperience
          endpoint="/api/ask"
          variant="embed"
          initialQuery={query}
          autoSubmitInitial={Boolean(query)}
          placeholder="e.g. Can Botox and filler be done the same day?"
          onAskSent={handleAskSent}
          onAnswerComplete={handleAnswerComplete}
          onCitationClick={handleCitationClick}
        />
      </div>
      <div className="border-t border-border px-4 py-3 text-center">
        <p className="text-xs text-muted-foreground">
          A360 Evidence provides educational information for licensed aesthetic
          professionals. It is not medical advice.
        </p>
      </div>
    </div>
  );
}
