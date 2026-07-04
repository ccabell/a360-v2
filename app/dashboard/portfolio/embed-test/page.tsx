/**
 * Iframe spike (design doc §2) — hidden internal test page, no sidebar entry.
 *
 * Empirically answers "do our external Vercel prototypes embed?" by iframing
 * them directly. Findings recorded in docs/portfolio-iframe-findings.md.
 */
export default function EmbedTestPage() {
  const targets = [
    {
      name: "Voice Bot (a360-voice-bot.vercel.app)",
      src: "https://a360-voice-bot.vercel.app",
      note: "Expect its own /login gate to render inside the frame; the session cookie is first-party to the embedded domain.",
    },
    {
      name: "Lumira (agelessdemo.vercel.app)",
      src: "https://agelessdemo.vercel.app",
      note: "Expected to render, but camera capture inside an iframe is flaky — Lumira stays linkout regardless.",
    },
  ];

  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">
          Portfolio embed test
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Internal iframe spike. If a frame below is blank, the target sends
          X-Frame-Options / CSP frame-ancestors. See
          docs/portfolio-iframe-findings.md.
        </p>
      </div>

      {targets.map((t) => (
        <section key={t.src} className="space-y-2">
          <h3 className="font-heading text-sm font-semibold">{t.name}</h3>
          <p className="text-xs text-muted-foreground">{t.note}</p>
          <iframe
            src={t.src}
            title={t.name}
            className="h-[520px] w-full max-w-4xl rounded-xl border bg-card"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </section>
      ))}
    </div>
  );
}
