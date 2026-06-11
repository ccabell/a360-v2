"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronRight, ChevronDown } from "lucide-react"

interface JSONViewerProps {
  data: unknown
  className?: string
  defaultExpanded?: boolean
  maxDepth?: number
}

export function JSONViewer({ data, className, defaultExpanded = true, maxDepth = 5 }: JSONViewerProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-muted/30 p-3 font-mono text-sm overflow-auto", className)}>
      <JSONNode value={data} depth={0} defaultExpanded={defaultExpanded} maxDepth={maxDepth} />
    </div>
  )
}

function JSONNode({
  value,
  depth,
  label,
  defaultExpanded,
  maxDepth,
}: {
  value: unknown
  depth: number
  label?: string
  defaultExpanded: boolean
  maxDepth: number
}) {
  const [expanded, setExpanded] = React.useState(defaultExpanded && depth < 2)

  if (value === null) return <JSONLine label={label} value="null" className="text-muted-foreground" depth={depth} />
  if (value === undefined) return <JSONLine label={label} value="undefined" className="text-muted-foreground" depth={depth} />
  if (typeof value === "boolean") return <JSONLine label={label} value={String(value)} className="text-orange-600 dark:text-orange-400" depth={depth} />
  if (typeof value === "number") return <JSONLine label={label} value={String(value)} className="text-blue-600 dark:text-blue-400" depth={depth} />
  if (typeof value === "string") return <JSONLine label={label} value={`"${value}"`} className="text-green-600 dark:text-green-400" depth={depth} />

  if (Array.isArray(value)) {
    if (value.length === 0) return <JSONLine label={label} value="[]" className="text-muted-foreground" depth={depth} />
    if (depth >= maxDepth) return <JSONLine label={label} value={`[${value.length} items]`} className="text-muted-foreground" depth={depth} />
    return (
      <JSONCollapsible
        label={label}
        bracket={["[", "]"]}
        count={value.length}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        depth={depth}
      >
        {value.map((item, i) => (
          <JSONNode key={i} value={item} depth={depth + 1} label={String(i)} defaultExpanded={defaultExpanded} maxDepth={maxDepth} />
        ))}
      </JSONCollapsible>
    )
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
    if (entries.length === 0) return <JSONLine label={label} value="{}" className="text-muted-foreground" depth={depth} />
    if (depth >= maxDepth) return <JSONLine label={label} value={`{${entries.length} keys}`} className="text-muted-foreground" depth={depth} />
    return (
      <JSONCollapsible
        label={label}
        bracket={["{", "}"]}
        count={entries.length}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        depth={depth}
      >
        {entries.map(([k, v]) => (
          <JSONNode key={k} value={v} depth={depth + 1} label={k} defaultExpanded={defaultExpanded} maxDepth={maxDepth} />
        ))}
      </JSONCollapsible>
    )
  }

  return <JSONLine label={label} value={String(value)} className="text-foreground" depth={depth} />
}

function JSONLine({ label, value, className, depth }: { label?: string; value: string; className?: string; depth: number }) {
  return (
    <div className="leading-6" style={{ paddingLeft: depth * 16 }}>
      {label !== undefined && <span className="text-foreground/70">{label}: </span>}
      <span className={className}>{value}</span>
    </div>
  )
}

function JSONCollapsible({
  label,
  bracket,
  count,
  expanded,
  onToggle,
  depth,
  children,
}: {
  label?: string
  bracket: [string, string]
  count: number
  expanded: boolean
  onToggle: () => void
  depth: number
  children: React.ReactNode
}) {
  return (
    <div>
      <div
        className="leading-6 cursor-pointer hover:bg-muted/50 -mx-1 px-1 rounded inline-flex items-center gap-0.5"
        style={{ paddingLeft: depth * 16 }}
        onClick={onToggle}
      >
        {expanded ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
        {label !== undefined && <span className="text-foreground/70">{label}: </span>}
        {!expanded && <span className="text-muted-foreground">{bracket[0]} {count} items {bracket[1]}</span>}
        {expanded && <span className="text-muted-foreground">{bracket[0]}</span>}
      </div>
      {expanded && (
        <>
          {children}
          <div className="leading-6 text-muted-foreground" style={{ paddingLeft: depth * 16 }}>{bracket[1]}</div>
        </>
      )}
    </div>
  )
}
