import { Badge } from "@/components/ui/badge"
import type { ReviewStatus } from "@/lib/types/fuel-docs"

const statusColors: Record<ReviewStatus, string> = {
  draft: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  in_review: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  approved: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  active: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
}

export function ReviewStatusBadge({ status }: { status: ReviewStatus }) {
  return (
    <Badge className={statusColors[status] ?? ""}>
      {status.replace("_", " ")}
    </Badge>
  )
}
