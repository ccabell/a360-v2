"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
import { BlockConnector } from "@/components/studio/BlockConnector";
import {
  Radio,
  Compass,
  MessageSquare,
  ListOrdered,
} from "lucide-react";

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

export default function ReachPage() {
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [agents, setAgents] = useState<Record<string, string | null>>({});
  const [blockStatuses, setBlockStatuses] = useState<BlockStatus[]>(["idle", "idle", "idle", "idle"]);
  const [completedCount, setCompletedCount] = useState(0);
  const [runAllActive, setRunAllActive] = useState(false);

  const runRefs = useRef<Array<(() => void) | null>>([null, null, null, null]);

  useEffect(() => {
    fetch("/api/patients")
      .then((r) => r.json())
      .then((data) => {
        const raw: Array<{ id: string; first_name: string; last_name: string }> =
          Array.isArray(data) ? data : (data?.data ?? []);
        setPatients(raw.map((p) => ({ id: p.id, name: `${p.first_name} ${p.last_name}` })));
      })
      .catch(() => {});

    fetch("/api/agents?status=active")
      .then((r) => r.json())
      .then((data: AgentRecord[]) => {
        const map: Record<string, string | null> = {};
        for (const a of data) {
          if (a.active_version_id) map[a.agent_key] = a.id;
        }
        setAgents(map);
      })
      .catch(() => {});
  }, []);

  const BLOCKS = [
    {
      key: "consultation_summarizer",
      icon: Radio,
      title: "Patient Signals",
      subtitle: "Outcome status, objections & signal tags",
      color: "blue" as const,
      prompt:
        "Extract the key patient signals for follow-up: outcome status (booked/not-booked/undecided), objections raised, signal tags (booked/price_objection/needs_to_think/future_interest/referred_out), and urgency level. Be specific.",
    },
    {
      key: "reach_plan_agent",
      icon: Compass,
      title: "Campaign Strategy",
      subtitle: "Approach, timing & channel priority",
      color: "violet" as const,
      prompt:
        "Based on this patient's signals, define the follow-up campaign strategy: primary approach type, timing of first touch, channel priority, and the core message angle. Strategy only — no copy yet.",
    },
    {
      key: "reach_plan_agent",
      icon: MessageSquare,
      title: "Message Copy",
      subtitle: "First touch, objection handling & value reinforcement",
      color: "emerald" as const,
      prompt:
        "Generate the actual message copy for the follow-up sequence: first touch message, objection-handling touchpoint (if applicable), and value-reinforcement message. Pull language from coaching_fuel and reach_fuel docs. Include the specific language, not just descriptions.",
    },
    {
      key: "reach_plan_agent",
      icon: ListOrdered,
      title: "Follow-Up Schedule",
      subtitle: "Complete numbered execution plan",
      color: "orange" as const,
      prompt:
        "Output the complete follow-up plan as a numbered schedule: each touchpoint with timing (Day 1, Day 3, Day 7, etc.), channel (text/email/call), action, and the message to use. Make it something the practice can execute directly.",
    },
  ];

  const handleComplete = useCallback(
    (blockIndex: number) => (_output: string) => {
      setCompletedCount((n) => n + 1);
      setBlockStatuses((prev) => {
        const next = [...prev] as BlockStatus[];
        next[blockIndex] = "done";
        return next;
      });
      const nextIndex = blockIndex + 1;
      if (nextIndex < BLOCKS.length) {
        setTimeout(() => {
          runRefs.current[nextIndex]?.();
        }, 0);
      } else {
        setRunAllActive(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleRunAll = useCallback(() => {
    if (!selectedPatientId) return;
    setRunAllActive(true);
    setCompletedCount(0);
    setBlockStatuses(["idle", "idle", "idle", "idle"]);
    setTimeout(() => {
      runRefs.current[0]?.();
    }, 0);
  }, [selectedPatientId]);

  const connectorDone = (i: number) => blockStatuses[i] === "done";
  const connectorActive = (i: number) => blockStatuses[i + 1] === "running";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Sticky header */}
      <div className="shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Share2 className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-none text-foreground">
                Reach Campaign
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Agent-generated follow-up campaigns from consultation signals
              </p>
            </div>
          </div>

          <div className="flex items-end gap-3 flex-wrap">
            <div className="flex flex-col gap-1.5 min-w-[260px]">
              <label className="text-xs font-medium text-muted-foreground">Patient</label>
              <Select value={selectedPatientId} onValueChange={(v) => setSelectedPatientId(v ?? "")}>
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
              disabled={!selectedPatientId || runAllActive}
              onClick={handleRunAll}
            >
              {runAllActive
                ? `${completedCount} / ${BLOCKS.length} complete…`
                : "Run All"}
            </Button>
          </div>
        </div>
      </div>

      {/* Block chain */}
      <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-0">
          {BLOCKS.map((block, i) => (
            <div key={`${block.key}-${i}`}>
              <BlockCard
                icon={block.icon}
                title={block.title}
                subtitle={block.subtitle}
                color={block.color}
                agentId={agents[block.key] ?? null}
                patientId={selectedPatientId}
                prompt={block.prompt}
                disabled={!selectedPatientId}
                onComplete={handleComplete(i)}
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
        </div>
      </div>
    </div>
  );
}
