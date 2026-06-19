"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Blocks, Plus, Save, Play, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { BuilderBlock } from "@/components/studio/BuilderBlock";
import type { BlockConfig, AgentOption } from "@/components/studio/BuilderBlock";
import type { BlockColor } from "@/components/studio/BlockCard";

// ── Helpers ───────────────────────────────────────────────────────────────────

function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

const STORAGE_KEY = "studio_pipeline_v1";

function savePipeline(name: string, blocks: BlockConfig[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name, blocks }));
  } catch {
    // ignore
  }
}

function loadPipeline(): { name: string; blocks: BlockConfig[] } | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as { name: string; blocks: BlockConfig[] };
  } catch {
    return null;
  }
}

// ── Default pipeline ──────────────────────────────────────────────────────────

function makeDefaultBlocks(): BlockConfig[] {
  return [
    {
      id: uid(),
      name: "Patient Context",
      subtitle: "Consultation signals & outcomes",
      agentKey: "consultation_summarizer",
      color: "blue" as BlockColor,
      prompt:
        "Provide a focused patient context brief: patient name, primary concerns from the consultation, outcome status, objections raised, and key signal tags. Be specific and brief — this feeds downstream blocks.",
    },
    {
      id: uid(),
      name: "Package Analysis",
      subtitle: "GL-grounded treatment recommendations",
      agentKey: "package_recommender",
      color: "teal" as BlockColor,
      prompt:
        "Recommend a specific treatment package for this patient grounded in GL fuel docs. Focus on the products, candidacy rationale, pairing logic, and any critical candidacy flags.",
    },
  ];
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface AgentRecord {
  id: string;
  agent_key: string;
  active_version_id: string | null;
}

interface PatientOption {
  id: string;
  name: string;
}

type BlockStatus = "idle" | "running" | "done" | "error";

// ── Studio Page ───────────────────────────────────────────────────────────────

export default function StudioPage() {
  const [pipelineName, setPipelineName] = useState("My Pipeline");
  const [blocks, setBlocks] = useState<BlockConfig[]>(makeDefaultBlocks);
  const [agents, setAgents] = useState<AgentOption[]>([]);
  const [agentMap, setAgentMap] = useState<Record<string, string | null>>({});
  const [patients, setPatients] = useState<PatientOption[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState("");
  const [mode, setMode] = useState<"edit" | "run">("edit");
  const [blockStatuses, setBlockStatuses] = useState<BlockStatus[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [runAllActive, setRunAllActive] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const [shouldStartRun, setShouldStartRun] = useState(false);

  // Stable ref map: block id → ref
  const refsMap = useRef<Map<string, React.RefObject<BlockCardHandle | null>>>(
    new Map(),
  );

  function getRef(id: string): React.RefObject<BlockCardHandle | null> {
    if (!refsMap.current.has(id)) {
      refsMap.current.set(id, React.createRef<BlockCardHandle | null>());
    }
    return refsMap.current.get(id)!;
  }

  // Load saved pipeline on mount
  useEffect(() => {
    const saved = loadPipeline();
    if (saved) {
      setPipelineName(saved.name);
      setBlocks(saved.blocks);
    }
  }, []);

  // Fetch agents
  useEffect(() => {
    fetch("/api/agents?status=active")
      .then((r) => r.json())
      .then((data: AgentRecord[]) => {
        const options: AgentOption[] = data
          .filter((a) => a.active_version_id)
          .map((a) => ({
            id: a.id,
            key: a.agent_key,
            name: a.agent_key
              .split("_")
              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
              .join(" "),
          }));
        setAgents(options);
        const map: Record<string, string | null> = {};
        for (const a of data) {
          if (a.active_version_id) map[a.agent_key] = a.id;
        }
        setAgentMap(map);
      })
      .catch(() => {});

    fetch("/api/patients")
      .then((r) => r.json())
      .then((data) => {
        const raw: Array<{
          id: string;
          first_name: string;
          last_name: string;
        }> = Array.isArray(data) ? data : (data?.data ?? []);
        setPatients(
          raw.map((p) => ({ id: p.id, name: `${p.first_name} ${p.last_name}` })),
        );
      })
      .catch(() => {});
  }, []);

  // Fire first block after mode switches to "run"
  useEffect(() => {
    if (!shouldStartRun || mode !== "run" || blocks.length === 0) return;
    setShouldStartRun(false);
    const ref = getRef(blocks[0].id);
    ref.current?.run();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldStartRun, mode]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleSave = useCallback(() => {
    savePipeline(pipelineName, blocks);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  }, [pipelineName, blocks]);

  const handleAddBlock = useCallback(() => {
    setBlocks((prev) => [
      ...prev,
      {
        id: uid(),
        name: "New Block",
        subtitle: "Block description",
        agentKey: "",
        color: "violet" as BlockColor,
        prompt: "",
      },
    ]);
  }, []);

  const handleChangeBlock = useCallback((index: number, cfg: BlockConfig) => {
    setBlocks((prev) => prev.map((b, i) => (i === index ? cfg : b)));
  }, []);

  const handleMoveUp = useCallback((index: number) => {
    setBlocks((prev) => {
      const next = [...prev];
      [next[index - 1], next[index]] = [next[index], next[index - 1]];
      return next;
    });
  }, []);

  const handleMoveDown = useCallback((index: number) => {
    setBlocks((prev) => {
      const next = [...prev];
      [next[index], next[index + 1]] = [next[index + 1], next[index]];
      return next;
    });
  }, []);

  const handleDelete = useCallback((index: number) => {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleComplete = useCallback(
    (blockIndex: number) => (_output: string) => {
      setCompletedCount((n) => n + 1);
      setBlockStatuses((prev) => {
        const next = [...prev] as BlockStatus[];
        next[blockIndex] = "done";
        return next;
      });
      const nextIndex = blockIndex + 1;
      if (nextIndex < blocks.length) {
        const ref = getRef(blocks[nextIndex].id);
        setTimeout(() => ref.current?.run(), 0);
      } else {
        setRunAllActive(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blocks],
  );

  const handleRunAll = useCallback(() => {
    if (!selectedPatientId || blocks.length === 0) return;
    setRunAllActive(true);
    setCompletedCount(0);
    setBlockStatuses(new Array(blocks.length).fill("idle") as BlockStatus[]);
    if (mode !== "run") {
      setMode("run");
      setShouldStartRun(true);
    } else {
      // Already in run mode — fire immediately
      const ref = getRef(blocks[0].id);
      ref.current?.run();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPatientId, blocks, mode]);

  const connectorDone = (i: number) => blockStatuses[i] === "done";
  const connectorActive = (i: number) => blockStatuses[i + 1] === "running";

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Sticky header */}
      <div className="shrink-0 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto">
          {/* Title row */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <Blocks className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <Input
                value={pipelineName}
                onChange={(e) => setPipelineName(e.target.value)}
                className="h-6 text-sm font-semibold border-none bg-transparent p-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground"
                placeholder="Pipeline name…"
              />
              <p className="text-xs text-muted-foreground mt-0.5">
                {blocks.length} block{blocks.length !== 1 ? "s" : ""}
                {" · "}
                Agent workflow builder
              </p>
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-end gap-3 flex-wrap">
            <div className="flex flex-col gap-1.5 min-w-[240px]">
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

            <div className="flex items-center gap-2 ml-auto">
              {/* Mode toggle */}
              <div className="flex rounded-lg border border-border overflow-hidden text-xs">
                <button
                  onClick={() => setMode("edit")}
                  className={`px-3 py-2 flex items-center gap-1.5 transition-colors ${
                    mode === "edit"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <Pencil className="h-3 w-3" />
                  Build
                </button>
                <button
                  onClick={() => setMode("run")}
                  className={`px-3 py-2 flex items-center gap-1.5 transition-colors border-l border-border ${
                    mode === "run"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <Play className="h-3 w-3" />
                  Run
                </button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 min-w-[72px]"
                onClick={handleSave}
              >
                {savedFlash ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    Saved
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5" />
                    Save
                  </>
                )}
              </Button>

              <Button
                size="sm"
                className="h-9 gap-1.5"
                disabled={!selectedPatientId || runAllActive || blocks.length === 0}
                onClick={handleRunAll}
              >
                {runAllActive
                  ? `${completedCount} / ${blocks.length} done…`
                  : "Run All"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto min-h-0 px-6 py-6">
        <div className="max-w-3xl mx-auto">
          {mode === "edit" ? (
            /* ── Build mode ── */
            <div className="space-y-2">
              {blocks.length === 0 && (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  No blocks yet. Add one to start building your pipeline.
                </div>
              )}
              {blocks.map((block, i) => (
                <BuilderBlock
                  key={block.id}
                  config={block}
                  index={i}
                  total={blocks.length}
                  agents={agents}
                  onChange={(cfg) => handleChangeBlock(i, cfg)}
                  onMoveUp={() => handleMoveUp(i)}
                  onMoveDown={() => handleMoveDown(i)}
                  onDelete={() => handleDelete(i)}
                />
              ))}
              <button
                onClick={handleAddBlock}
                className="w-full mt-1 rounded-xl border-2 border-dashed border-border/50 py-4 flex items-center justify-center gap-2 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
              >
                <Plus className="h-4 w-4" />
                Add block
              </button>
            </div>
          ) : (
            /* ── Run mode ── */
            <div className="space-y-0">
              {blocks.length === 0 && (
                <div className="text-center py-12 text-muted-foreground text-sm">
                  Switch to Build mode to add blocks to your pipeline.
                </div>
              )}
              {blocks.map((block, i) => (
                <div key={block.id}>
                  <BlockCard
                    ref={getRef(block.id)}
                    icon={Blocks}
                    title={block.name}
                    subtitle={block.subtitle}
                    color={block.color}
                    agentId={agentMap[block.agentKey] ?? null}
                    patientId={selectedPatientId}
                    prompt={block.prompt}
                    disabled={!selectedPatientId}
                    onComplete={handleComplete(i)}
                    defaultExpanded={false}
                  />
                  {i < blocks.length - 1 && (
                    <BlockConnector
                      active={connectorActive(i)}
                      done={connectorDone(i)}
                      color={blocks[i + 1].color}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
