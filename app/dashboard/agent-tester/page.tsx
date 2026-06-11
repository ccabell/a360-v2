"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";
import { GroundedAnswer } from "@/components/grounding/grounded-answer";
import { pickScenario, type ResearchScenario } from "@/lib/mock/research-data";

export default function AgentTesterPage() {
  const [prompt, setPrompt] = useState(
    "Summarize the onset timeline and glabellar dosing for BOTOX Cosmetic, with sources.",
  );
  const [output, setOutput] = useState<ResearchScenario | null>(null);
  const [loading, setLoading] = useState(false);

  const run = () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setOutput(null);
    // Stand-in for a Prompt Runner call against a transcript. Returns the same
    // { text-with-[src_N], sources } shape the chat uses.
    setTimeout(() => {
      setOutput(pickScenario(prompt));
      setLoading(false);
    }, 900);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Agent Tester</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Run a prompt and inspect the grounded output — same citation rendering
          as chat, shown as a static prompt output.
        </p>
      </div>

      {/* Prompt */}
      <Card>
        <CardHeader>
          <CardTitle>Prompt</CardTitle>
          <CardDescription>
            Runs against the retrieval set and returns a grounded answer with
            citations across every source type.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-border bg-transparent p-3 text-sm text-foreground placeholder-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/50"
            placeholder="Enter a prompt to run…"
          />
          <div className="flex justify-end">
            <Button onClick={run} disabled={loading || !prompt.trim()}>
              <Zap className="h-4 w-4" />
              {loading ? "Running…" : "Run prompt"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {loading && (
        <Card>
          <CardContent className="flex items-center gap-3 py-6">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-sm text-muted-foreground">
              Running prompt against retrieval set…
            </span>
          </CardContent>
        </Card>
      )}

      {/* Output — reuses the exact grounded renderer from chat */}
      {output && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Prompt Output
              <Badge variant="secondary">
                grounded · {output.sources.length} sources
              </Badge>
            </CardTitle>
            <CardDescription>
              Rendered with the shared{" "}
              <code className="text-xs">&lt;GroundedAnswer&gt;</code> — identical
              to chat.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <GroundedAnswer text={output.answer} sources={output.sources} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
