"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlockCard } from "@/components/studio/BlockCard";
import type { BlockCardHandle } from "@/components/studio/BlockCard";
import { BlockConnector } from "@/components/studio/BlockConnector";
import { UserSearch, Lightbulb, Mail } from "lucide-react";
import { CampaignViewer } from "@/components/reach/campaign-viewer";
import type { CampaignStatus, EmailReview } from "@/components/reach/campaign-viewer";
import { parseCampaign, type ReachCampaign } from "@/lib/reach/campaign";

interface SavedMeta {
  id: string;
  status: CampaignStatus;
  reviews: EmailReview[];
}

interface PatientOption {
  id: string;
  name: string;
}

interface AgentRecord {
  id: string;
  agent_key: string;
  active_version_id: string | null;
}

type BlockStatus = "idle" | "running" | "done" | "error";

const BLOCKS = [
  {
    keys: ["consultation_summarizer"],
    icon: UserSearch,
    title: "Signal Extraction",
    subtitle: "Patient opportunity signals & intent markers",
    color: "blue" as const,
    tools: ["get_patient_context"],
    prompt: `You are a patient signal analyst for a medical aesthetics practice. Analyze this patient's consultation data and extract actionable reach signals.

## What to Extract

**Primary Opportunity Signal**
- What is the single highest-priority re-engagement opportunity for this patient?
- What treatment did they show the most interest in but didn't convert on?

**Intent Markers**
- Budget sensitivity level (high/medium/low) and any specific signals
- Timeline urgency (upcoming event, seasonal motivation, or open-ended)
- Objections raised and whether they were resolved
- Emotional drivers (confidence, special occasion, health concern)

**Patient Profile Tags**
- Consultation outcome (converted / interested / lost)
- Treatment history at this practice (new / returning)
- Communication preference signals from transcript

**Re-engagement Strategy Hint**
- Recommended outreach angle: educational, social proof, urgency/offer, or nurture
- Best channel: email, SMS, or in-person follow-up
- Ideal timing window for outreach

Be specific. Pull directly from consultation transcript signals. This feeds the campaign strategy and message copy.`,
  },
  {
    keys: ["reach_plan_agent", "consultation_summarizer"],
    icon: Lightbulb,
    title: "Campaign Strategy",
    subtitle: "Outreach angle, timing & channel plan",
    color: "violet" as const,
    tools: [
      "get_patient_context",
      "search_fuel_documents",
      "get_product_info",
      "query_product_database",
    ],
    prompt: `You are a patient re-engagement strategist for a medical aesthetics practice. Based on the signal extraction above, design a targeted outreach campaign strategy.

## Campaign Strategy Output

**Campaign Objective**
One sentence: what specific action do you want this patient to take?

**Messaging Angle**
Choose one primary angle and explain why it fits this patient:
- Educational (teach them something they didn't know during consult)
- Social proof (patient outcomes, before/after context)
- Urgency/scarcity (seasonal timing, limited availability)
- Value anchoring (reframe cost as investment, payment options)
- Nurture (build trust over time, not a push)

**Channel & Timing Plan**
| Touch | Channel | Timing | Goal |
|-------|---------|--------|------|
| 1 | (email/SMS/call) | (e.g. 3 days post-consult) | (goal) |
| 2 | ... | ... | ... |
| 3 | ... | ... | ... |

**Content Themes**
2-3 specific topics or proof points to weave into the outreach.

**Success Metric**
How do you know this campaign worked?`,
  },
  {
    keys: ["reach_email_composer"],
    icon: Mail,
    title: "Email Campaign",
    subtitle: "Hyperpersonalized email sequence + CRM payload",
    color: "orange" as const,
    tools: [
      "get_patient_context",
      "search_fuel_documents",
      "get_product_info",
      "query_product_database",
    ],
    prompt: `Generate the hyperpersonalized email campaign for this patient.

First call get_patient_context, then classify the campaign type and produce the full campaign as valid JSON exactly matching your output format. Use the campaign strategy context above to inform tone, cadence, and content themes.

Return JSON only — no markdown fences, no commentary.`,
  },
];

// The final block (`reach_email_composer`) emits structured campaign JSON —
// its output is rendered by CampaignViewer, not the raw BlockCard markdown.
const COMPOSER_INDEX = BLOCKS.length - 1;

function buildContextPrefix(outputs: string[], upToIndex: number): string {
  const parts: string[] = [];
  for (let i = 0; i < upToIndex; i++) {
    if (outputs[i]?.trim()) {
      parts.push(`## ${BLOCKS[i].title}\n\n${outputs[i].trim()}`);
    }
  }
  if (parts.length === 0) return "";
  return (
    `## Context from Prior Analysis\n\n` +
    parts.join("\n\n---\n\n") +
    `\n\n---\n\nUsing the above context, now perform your specific task:`
  );
}

function resolveAgent(
  keys: string[],
  agents: Record<string, string | null>,
): string | null {
  for (const key of keys) {
    if (agents[key]) return agents[key];
  }
  return null;
}

export function ReachWorkspace({ showHeader = true }: { showHeader?: boolean }) {
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [agents, setAgents] = useState<Record<string, string | null>>({});
  const [blockStatuses, setBlockStatuses] = useState<BlockStatus[]>(
    () => new Array(BLOCKS.length).fill("idle") as BlockStatus[],
  );
  const [completedCount, setCompletedCount] = useState(0);
  const [runAllActive, setRunAllActive] = useState(false);
  const [agentsError, setAgentsError] = useState<string | null>(null);
  const [campaign, setCampaign] = useState<ReachCampaign | null>(null);
  const [savedMeta, setSavedMeta] = useState<SavedMeta | null>(null);
  const [viewerKey, setViewerKey] = useState("fresh-0");
  const runNonce = useRef(0);

  const blockRefs = useRef<Array<React.RefObject<BlockCardHandle | null>>>(
    BLOCKS.map(() => React.createRef<BlockCardHandle | null>()),
  );
  const outputsRef = useRef<string[]>(new Array(BLOCKS.length).fill(""));

  const loadAgents = useCallback(() => {
    setAgentsError(null);
    fetch("/api/agents?status=active")
      .then((r) => {
        if (!r.ok) throw new Error(`Agent registry request failed (${r.status})`);
        return r.json();
      })
      .then((data: AgentRecord[]) => {
        const map: Record<string, string | null> = {};
        for (const a of data) {
          if (a.active_version_id) map[a.agent_key] = a.id;
        }
        const missing = BLOCKS.filter((b) => !resolveAgent(b.keys, map));
        if (missing.length === BLOCKS.length) {
          setAgentsError("No active agents found for this pipeline.");
        } else if (missing.length > 0) {
          setAgentsError(
            `No active agent for: ${missing.map((b) => b.title).join(", ")}.`,
          );
        }
        setAgents(map);
      })
      .catch((e: Error) => {
        setAgentsError(e.message || "Couldn't load the agent registry.");
      });
  }, []);

  useEffect(() => {
    fetch("/api/patients")
      .then((r) => r.json())
      .then((data) => {
        const raw: Array<{ id: string; first_name: string; last_name: string }> =
          Array.isArray(data) ? data : (data?.data ?? []);
        setPatients(
          raw.map((p) => ({ id: p.id, name: `${p.first_name} ${p.last_name}` })),
        );
      })
      .catch(() => {});

    loadAgents();
  }, [loadAgents]);

  const handleComplete = useCallback(
    (blockIndex: number) => (output: string) => {
      outputsRef.current[blockIndex] = output;
      setCompletedCount((n) => n + 1);
      setBlockStatuses((prev) => {
        const next = [...prev] as BlockStatus[];
        next[blockIndex] = "done";
        return next;
      });

      // The composer block's output is campaign JSON — parse it for the viewer.
      if (blockIndex === COMPOSER_INDEX) {
        setCampaign(parseCampaign(output));
      }

      const nextIndex = blockIndex + 1;
      if (nextIndex < BLOCKS.length) {
        const context = buildContextPrefix(outputsRef.current, nextIndex);
        setTimeout(() => {
          blockRefs.current[nextIndex]?.current?.run(context || undefined);
        }, 0);
      } else {
        setRunAllActive(false);
      }
    },
    [],
  );

  const handleBlockError = useCallback(
    (blockIndex: number) => () => {
      setBlockStatuses((prev) => {
        const next = [...prev] as BlockStatus[];
        next[blockIndex] = "error";
        return next;
      });
      // Stop the pipeline — the error is shown on the failed block card.
      setRunAllActive(false);
    },
    [],
  );

  // Selecting a patient restores any previously saved/approved campaign for
  // that patient (Phase 3 HITL), else clears the surface.
  const selectPatient = useCallback((v: string) => {
    setSelectedPatientId(v);
    setCampaign(null);
    setSavedMeta(null);
    if (!v) return;
    fetch(`/api/reach/campaigns?patient_id=${encodeURIComponent(v)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        const d = res?.data;
        if (d?.campaign) {
          setCampaign(d.campaign as ReachCampaign);
          setSavedMeta({
            id: d.id,
            status: d.status as CampaignStatus,
            reviews: Array.isArray(d.reviews) ? (d.reviews as EmailReview[]) : [],
          });
          setViewerKey(`saved-${d.id}`);
        }
      })
      .catch(() => {});
  }, []);

  const handleRunAll = useCallback(() => {
    if (!selectedPatientId) return;
    setRunAllActive(true);
    setCompletedCount(0);
    setCampaign(null);
    setSavedMeta(null);
    runNonce.current += 1;
    setViewerKey(`fresh-${runNonce.current}`);
    outputsRef.current = new Array(BLOCKS.length).fill("");
    setBlockStatuses(new Array(BLOCKS.length).fill("idle") as BlockStatus[]);
    setTimeout(() => {
      blockRefs.current[0]?.current?.run();
    }, 0);
  }, [selectedPatientId]);

  const handleCancelAll = useCallback(() => {
    for (const ref of blockRefs.current) ref.current?.stop();
    setRunAllActive(false);
  }, []);

  const connectorDone = (i: number) => blockStatuses[i] === "done";
  const connectorActive = (i: number) => blockStatuses[i + 1] === "running";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          {showHeader && (
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Share2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h1 className="text-sm font-semibold leading-none text-foreground">
                  A360 Reach
                </h1>
                <p className="mt-1 text-xs text-muted-foreground">
                  Campaign pipeline · signals → strategy → email campaign
                </p>
              </div>
            </div>
          )}

          <div className="flex items-end gap-3 flex-wrap">
            <div className="flex flex-col gap-1.5 min-w-[260px]">
              <label className="text-xs font-medium text-muted-foreground">
                Patient
              </label>
              <Select
                value={selectedPatientId}
                onValueChange={(v) => selectPatient(v ?? "")}
              >
                <SelectTrigger className="h-9 w-full">
                  <SelectValue placeholder="Select a patient…" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              className="h-9 gap-1.5"
              disabled={!selectedPatientId || runAllActive || agentsError != null}
              onClick={handleRunAll}
            >
              {runAllActive
                ? `${completedCount} / ${BLOCKS.length} complete…`
                : "Run Campaign"}
            </Button>
            {runAllActive && (
              <Button
                variant="outline"
                className="h-9 gap-1.5"
                onClick={handleCancelAll}
              >
                Cancel
              </Button>
            )}
          </div>

          {agentsError && (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-800/60 dark:bg-red-950/30 px-3 py-2 text-xs text-red-800 dark:text-red-300">
              <span>{agentsError}</span>
              <Button
                size="sm"
                variant="outline"
                className="h-7 shrink-0 text-xs"
                onClick={loadAgents}
              >
                Retry
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-0">
          {BLOCKS.map((block, i) => (
            <div key={i}>
              <BlockCard
                ref={blockRefs.current[i]}
                icon={block.icon}
                title={block.title}
                subtitle={block.subtitle}
                color={block.color}
                agentId={resolveAgent(block.keys, agents)}
                patientId={selectedPatientId}
                prompt={block.prompt}
                toolsOverride={block.tools}
                disabled={!selectedPatientId}
                onComplete={handleComplete(i)}
                onError={handleBlockError(i)}
                defaultExpanded={false}
              />
              {i < BLOCKS.length - 1 && (
                <BlockConnector
                  active={connectorActive(i)}
                  done={connectorDone(i)}
                  color={BLOCKS[i + 1].color}
                />
              )}
            </div>
          ))}

          {campaign && (
            <CampaignViewer
              key={viewerKey}
              campaign={campaign}
              agentId={resolveAgent(BLOCKS[COMPOSER_INDEX].keys, agents)}
              patientId={selectedPatientId}
              onCampaignChange={setCampaign}
              initialSaved={savedMeta}
            />
          )}
        </div>
      </div>
    </div>
  );
}
