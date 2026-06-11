import { Badge } from "@/components/ui/badge"
import type { AgentStatus, VersionStatus, AgentRuntimeType } from "@/lib/types"

const statusStyles: Record<AgentStatus, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  deprecated: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
}

export function AgentStatusBadge({ status }: { status: AgentStatus }) {
  return (
    <Badge className={statusStyles[status]}>
      {status}
    </Badge>
  )
}

const versionStatusStyles: Record<VersionStatus, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  candidate: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  draft: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  archived: "bg-gray-100 text-gray-600 dark:bg-gray-800/30 dark:text-gray-400",
}

export function VersionStatusBadge({ status }: { status: VersionStatus }) {
  return (
    <Badge className={versionStatusStyles[status]}>
      {status}
    </Badge>
  )
}

const runtimeLabels: Record<AgentRuntimeType, string> = {
  prompt_runner: "Prompt Runner",
  claude_tool_use: "Claude Tool Use",
  openai_agents_sdk: "OpenAI Agents",
  dify_workflow: "Dify",
  custom_fastapi: "Custom FastAPI",
  bedrock: "Bedrock",
}

export function RuntimeBadge({ runtime }: { runtime: AgentRuntimeType }) {
  return (
    <Badge variant="outline" className="font-normal">
      {runtimeLabels[runtime] ?? runtime}
    </Badge>
  )
}
