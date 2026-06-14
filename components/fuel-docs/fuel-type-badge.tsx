import { Badge } from "@/components/ui/badge"
import type { FuelDocType } from "@/lib/types/fuel-docs"

const typeLabels: Record<FuelDocType, string> = {
  combination: "Combination",
  product: "Product",
  concern: "Concern",
}

export function FuelTypeBadge({ type }: { type: FuelDocType }) {
  return <Badge variant="outline">{typeLabels[type] ?? type}</Badge>
}
