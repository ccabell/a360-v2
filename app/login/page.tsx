"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, ShieldCheck, Activity, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Incorrect access code");
      }
      const from = new URLSearchParams(window.location.search).get("from");
      router.push(from || "/exchange");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background p-6">
      {/* Background: teal mesh + dot grid (matches the Exchange) */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(80%_120%_at_15%_-10%,var(--primary)_0%,transparent_45%),radial-gradient(70%_110%_at_95%_110%,var(--primary)_0%,transparent_50%)] opacity-[0.12]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:22px_22px] opacity-40"
      />

      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            A
          </div>
          <span className="font-heading text-lg font-semibold tracking-tight">
            Aesthetics<span className="text-primary">360</span>
          </span>
        </div>

        <div className="rounded-2xl border border-border/70 bg-card/80 p-8 shadow-xl ring-1 ring-foreground/[0.03] backdrop-blur">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            The Agent Exchange
          </div>

          <h1 className="mt-5 font-heading text-2xl font-semibold tracking-tight">
            Welcome
          </h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Enter your access code to explore A360&apos;s agent marketplace.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            <Input
              type="password"
              autoFocus
              placeholder="Access code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 rounded-xl text-sm"
            />
            {error && (
              <div className="flex items-center gap-2 text-sm text-destructive">
                <AlertCircle className="size-4" />
                {error}
              </div>
            )}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loading || !password.trim()}
            >
              {loading ? "Verifying…" : "Enter the Exchange"}
              {!loading && <ArrowRight className="size-4" />}
            </Button>
          </form>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t pt-5 text-xs font-medium text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-primary" />
              HIPAA-aware
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Activity className="size-3.5 text-primary" />
              Clinically grounded
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          © Aesthetics360 — Intelligence Platform
        </p>
      </div>
    </div>
  );
}
