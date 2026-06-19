"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ClipboardList } from "lucide-react";
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
  FileText,
  Package,
  Calendar,
  ShieldAlert,
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

export default function TCPPage() {
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [agents, setAgents] = useState<Record<string, string | null>>({});
  const [blockStatuses, setBlockStatuses] = useState<BlockStatus[]>(["idle", "idle", "idle", "idle"]);
  const [completedCount, setCompletedCount] = useState(0);
  const [runAllActive, setRunAllActive] = useState(false);

  // Trigger refs: each block's run function
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
      icon: FileText,
      title: "Patient Context",
      subtitle: "Consultation signals & outcomes",
      color: "blue" as const,
      prompt:
        "Provide a focused patient context brief: patient name, primary concerns from the consultation, outcome status, objections raised, and key signal tags. Be specific and brief — this feeds downstream blocks.",
    },
    {
      key: "package_recommender",
      icon: Package,
      title: "Package Analysis",
      subtitle: "GL-grounded treatment recommendations",
      color: "teal" as const,
      prompt:
        "Recommend a specific treatment package for this patient grounded in GL fuel docs. Focus on the products, candidacy rationale, pairing logic, and any critical candidacy flags. Pull from fuel doc §0 Operating Contract for detection triggers.",
    },
    {
      key: "tcp_builder",
      icon: Calendar,
      title: "Treatment Timeline",
      subtitle: "Visit sequence & maintenance cadence",
      color: "amber" as const,
      prompt:
        "Build the treatment arc: visit sequence, timing between visits, onset/peak/duration per treatment from the fuel docs, and maintenance cadence. Format as a clear timeline the practice can follow.",
    },
    {
      key: "clinical_enrichment",
      icon: ShieldAlert,
      title: "Clinical Safety",
      subtitle: "Contraindications & provider sign-off flags",
      color: "rose" as const,
      prompt:
        "Identify all clinical flags for this patient's planned treatments: contraindications, FDA approval scope, off-label items, and anything requiring explicit provider sign-off. Reference the fuel doc source-tension tiers.",
    },
  ];

  // onComplete callbacks chained: block N completion triggers block N+1
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
        // Trigger next block via ref
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
    // Start first block
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
              <ClipboardList className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-semibold leading-none text-foreground">
                Treatment Care Planning
              </h1>
              <p className="mt-1 text-xs text-muted-foreground">
                Agent-generated treatment arc from patient signals and GL fuel documents
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
            <div key={block.key}>
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
