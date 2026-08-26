"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, AlertCircle, Headphones } from "lucide-react";

export default function PodcastLoginPage() {
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
      const res = await fetch("/api/podcast-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || "Incorrect password");
      }
      const from = new URLSearchParams(window.location.search).get("from");
      router.push(from || "/podcast");
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-neutral-900 p-8">
        <div className="flex items-center gap-2 text-primary">
          <Headphones className="size-5" />
          <span className="text-xs font-semibold uppercase tracking-wider">
            Podcast Navigator
          </span>
        </div>
        <h1 className="mt-4 font-heading text-xl font-semibold text-white">
          Enter password
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          This library is shared by invitation.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <input
            type="password"
            autoFocus
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-neutral-950 px-3.5 py-2.5 text-sm text-white outline-none ring-primary/30 placeholder:text-neutral-500 focus:ring-2"
          />
          {error && (
            <div className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle className="size-4" />
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || !password.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {loading ? "Verifying…" : "Enter"}
            {!loading && <ArrowRight className="size-4" />}
          </button>
        </form>
      </div>
    </div>
  );
}
