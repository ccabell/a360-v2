const OUT = [
  "a360:ready",
  "a360:ask_sent",
  "a360:answer_complete",
  "a360:citation_click",
  "a360:resize",
] as const;

type OutboundEvent = (typeof OUT)[number];

export function createBridge() {
  const allowed = (process.env.NEXT_PUBLIC_EMBED_PARENT_ORIGINS ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const inIframe =
    typeof window !== "undefined" && window.self !== window.top;

  const post = (type: OutboundEvent, payload?: unknown) => {
    if (!inIframe) return;
    // Use first configured origin for targetOrigin; fall back to '*' for
    // non-sensitive notification events.
    window.parent.postMessage({ type, payload }, allowed[0] ?? "*");
  };

  const onSeed = (handler: (q: string) => void) => {
    window.addEventListener("message", (e) => {
      if (allowed.length > 0 && !allowed.includes(e.origin)) {
        console.warn("[a360-embed] rejected origin", e.origin);
        return;
      }
      if (e.data?.type === "a360:seed" && typeof e.data.query === "string") {
        handler(e.data.query);
      }
    });
  };

  return { post, onSeed };
}
