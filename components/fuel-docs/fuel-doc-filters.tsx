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
import type { FuelDocType, ReviewStatus } from "@/lib/types/fuel-docs"

const fuelDocTypes: FuelDocType[] = ["combination", "product", "concern"]
const reviewStatuses: ReviewStatus[] = ["draft", "approved", "active"]

const statusLabels: Partial<Record<ReviewStatus, string>> = {
  draft: "Draft",
  approved: "Approved",
  active: "Active",
}

interface FuelDocFiltersProps {
  type?: FuelDocType
  status?: ReviewStatus
  onTypeChange: (type: FuelDocType | undefined) => void
  onStatusChange: (status: ReviewStatus | undefined) => void
}

export function FuelDocFilters({
  type,
  status,
  onTypeChange,
  onStatusChange,
}: FuelDocFiltersProps) {
  const hasFilters = type || status

  return (
    <div className="flex items-center gap-2">
      <Select
        value={type ?? ""}
        onValueChange={(v) => onTypeChange((v || undefined) as FuelDocType | undefined)}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Types</SelectItem>
          {fuelDocTypes.map((t) => (
            <SelectItem key={t} value={t}>
              <span className="capitalize">{t}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={status ?? ""}
        onValueChange={(v) => onStatusChange((v || undefined) as ReviewStatus | undefined)}
      >
        <SelectTrigger size="sm">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="">All Statuses</SelectItem>
          {reviewStatuses.map((s) => (
            <SelectItem key={s} value={s}>
              {statusLabels[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onTypeChange(undefined)
            onStatusChange(undefined)
          }}
        >
          <X className="h-3.5 w-3.5 mr-1" />
          Clear
        </Button>
      )}
    </div>
  )
}
