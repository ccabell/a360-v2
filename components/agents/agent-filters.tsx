"use client"

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import type { AgentStatus, AgentCategory } from "@/lib/types"

const statuses: AgentStatus[] = ["draft", "active", "deprecated"]
const categories: AgentCategory[] = [
  "extraction", "coaching", "sales", "marketing", "intelligence",
  "clinical", "gl_population", "reach", "runtime", "evaluation",
]

interface AgentFiltersProps {
  status?: AgentStatus
  category?: AgentCategory
  onStatusChange: (v?: AgentStatus) => void
  onCategoryChange: (v?: AgentCategory) => void
}

export function AgentFilters({
  status,
  category,
  onStatusChange,
  onCategoryChange,
}: AgentFiltersProps) {
  const hasFilters = status || category

  return (
    <div className="flex items-center gap-2">
      <Select
        value={status ?? ""}
        onValueChange={(v) => onStatusChange((v || undefined) as AgentStatus | undefined)}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Statuses</SelectItem>
          {statuses.map((s) => (
            <SelectItem key={s} value={s}>
              <span className="capitalize">{s}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={category ?? ""}
        onValueChange={(v) => onCategoryChange((v || undefined) as AgentCategory | undefined)}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Categories</SelectItem>
          {categories.map((c) => (
            <SelectItem key={c} value={c}>
              <span className="capitalize">{c.replace("_", " ")}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onStatusChange(undefined)
            onCategoryChange(undefined)
          }}
        >
          <X className="h-3.5 w-3.5 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
