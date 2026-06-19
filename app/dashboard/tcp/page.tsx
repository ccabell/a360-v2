"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
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
import type { BlockCardHandle } from "@/components/studio/BlockCard";
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

const BLOCKS = [
  {
    key: "consultation_summarizer",
    icon: FileText,
    title: "Patient Context",
    subtitle: "Consultation signals & outcomes",
    color: "blue" as const,
    tools: ["get_patient_context", "search_fuel_documents"],
    prompt: `Provide a focused patient context brief for the treatment care planning workflow.

Include:
- Patient name and key demographics
- Primary aesthetic concerns from the consultation
- Outcome/conversion status and any objections raised
- Key signal tags (e.g. budget-sensitive, combination-ready, safety-first)
- Physician notes or extraction insights if available

Be specific and clinically precise. This output feeds directly into the package recommendation, treatment timeline, and clinical safety blocks — so surface every relevant detail.`,
  },
  {
    key: "package_recommender",
    icon: Package,
    title: "Package Analysis",
    subtitle: "GL-grounded treatment recommendations",
    color: "teal" as const,
    tools: ["search_fuel_documents", "get_product_info", "query_product_database", "get_evidence_links"],
    prompt: `Based on the patient context above, recommend a specific treatment package grounded in GL fuel documents.

Structure your output:
## Recommended Package
List each recommended treatment with product name, dose/units/area, and candidacy rationale.

## Pairing Logic
Explain which treatments pair well together and why (GL pairing intelligence).

## Candidacy Flags
Surface any critical candidacy concerns: contraindications, timing conflicts, or candidacy gaps.

## Revenue Impact
Estimate the approximate value range for this package.

Reference specific fuel doc content when available. Do not speculate beyond what GL fuel docs support.`,
  },
  {
    key: "tcp_builder",
    icon: Calendar,
    title: "Treatment Timeline",
    subtitle: "Visit sequence & maintenance cadence",
    color: "amber" as const,
    tools: ["search_fuel_documents", "get_product_info"],
    prompt: `Based on the patient context and recommended package above, build the treatment arc.

Structure your output:
## Visit Sequence
List each visit (Visit 1, Visit 2, etc.) with: date/timing, treatments performed, and rationale.

## Onset & Results Timeline
For each treatment: onset (days), peak (weeks), duration (months). Pull from fuel doc timing data.

## Maintenance Cadence
Recommended maintenance schedule after initial treatment arc completes.

## Patient Education Points
2-3 key things the patient should know before starting (realistic expectations, downtime, etc.).

Format as a clear timeline the practice can follow and share with the patient.`,
  },
  {
    key: "clinical_enrichment",
    icon: ShieldAlert,
    title: "Clinical Safety",
    subtitle: "Contraindications & provider sign-off flags",
    color: "rose" as const,
    tools: ["get_evidence_links", "search_fuel_documents", "get_product_info"],
    prompt: `Based on all prior analysis, produce the clinical safety and compliance checklist for this patient's treatment plan.

Structure your output:
## Contraindications
List any absolute or relative contraindications identified from the patient history and planned treatments.

## FDA Scope
For each planned treatment: FDA-approved indication vs. proposed use. Flag any off-label applications explicitly.

## Provider Sign-off Items
Items requiring physician review, documented consent, or explicit sign-off before treatment.

## Source-Tension Flags
Any areas where evidence is limited, emerging, or where clinical consensus differs from practice patterns.

## Pre-Treatment Checklist
Step-by-step verification items for the day of treatment.

Be precise and conservative. These flags protect the practice and patient.`,
  },
];

function buildContextPrefix(
  outputs: string[],
  upToIndex: number,
): string {
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

export default function TCPPage() {
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [agents, setAgents] = useState<Record<string, string | null>>({});
  const [blockStatuses, setBlockStatuses] = useState<BlockStatus[]>(
    () => new Array(BLOCKS.length).fill("idle") as BlockStatus[],
  );
  const [completedCount, setCompletedCount] = useState(0);
  const [runAllActive, setRunAllActive] = useState(false);

  const blockRefs = useRef<Array<React.RefObject<BlockCardHandle | null>>>(
    BLOCKS.map(() => React.createRef<BlockCardHandle | null>()),
  );
  const outputsRef = useRef<string[]>(new Array(BLOCKS.length).fill(""));

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

  const handleComplete = useCallback(
    (blockIndex: number) => (output: string) => {
      outputsRef.current[blockIndex] = output;
      setCompletedCount((n) => n + 1);
      setBlockStatuses((prev) => {
        const next = [...prev] as BlockStatus[];
        next[blockIndex] = "done";
        return next;
      });

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

  const handleRunAll = useCallback(() => {
    if (!selectedPatientId) return;
    setRunAllActive(true);
    setCompletedCount(0);
    outputsRef.current = new Array(BLOCKS.length).fill("");
    setBlockStatuses(new Array(BLOCKS.length).fill("idle") as BlockStatus[]);
    setTimeout(() => {
      blockRefs.current[0]?.current?.run();
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
                4-agent pipeline · context chaining · GL fuel grounded
              </p>
            </div>
          </div>

          <div className="flex items-end gap-3 flex-wrap">
            <div className="flex flex-col gap-1.5 min-w-[260px]">
              <label className="text-xs font-medium text-muted-foreground">
                Patient
              </label>
              <Select
                value={selectedPatientId}
                onValueChange={(v) => setSelectedPatientId(v ?? "")}
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
                ref={blockRefs.current[i]}
                icon={block.icon}
                title={block.title}
                subtitle={block.subtitle}
                color={block.color}
                agentId={agents[block.key] ?? null}
                patientId={selectedPatientId}
                prompt={block.prompt}
                toolsOverride={block.tools}
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
