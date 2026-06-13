"use client";

import { useEffect, useRef } from "react";

export default function BoulevardDemoPage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (!e.data?.type?.startsWith("a360:")) return;
      console.log("[boulevard-host] event:", e.data.type, e.data.payload);

      // Resize the iframe to match embed content
      if (e.data.type === "a360:resize" && e.data.payload?.height) {
        if (iframeRef.current) {
          iframeRef.current.style.height = `${e.data.payload.height}px`;
        }
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      {/* Partner portal chrome */}
      <aside className="w-56 shrink-0 border-r border-slate-700 bg-slate-800 p-6">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Boulevard
          </p>
          <p className="mt-1 text-base font-bold">Partner Portal</p>
        </div>
        <nav className="space-y-1">
          {["Practice resources", "Team", "Insights", "Settings"].map((item) => (
            <div
              key={item}
              className="rounded-md px-3 py-2 text-sm text-slate-400"
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col">
        <header className="border-b border-slate-700 px-8 py-5">
          <h1 className="text-lg font-semibold">Practice resources</h1>
          <p className="mt-0.5 text-sm text-slate-400">
            A360 Evidence — clinical Q&amp;A for your team
          </p>
        </header>

        <div className="flex-1 p-8">
          <div className="overflow-hidden rounded-xl border border-slate-700 bg-white shadow-lg">
            <iframe
              ref={iframeRef}
              src="/embed/ask?query="
              className="w-full"
              style={{ height: 720, display: "block" }}
              allow="clipboard-write"
              title="A360 Evidence"
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Open DevTools → Console to see <code>a360:*</code> events from the
            embed.
          </p>
        </div>
      </main>
    </div>
  );
}
