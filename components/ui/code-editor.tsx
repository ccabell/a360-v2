"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  readOnly?: boolean
  language?: string
  minLines?: number
  maxLines?: number
  className?: string
}

export function CodeEditor({
  value,
  onChange,
  placeholder,
  readOnly = false,
  minLines = 10,
  maxLines = 30,
  className,
}: CodeEditorProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const lines = value.split("\n")
  const lineCount = Math.max(lines.length, minLines)
  const displayLines = Math.min(lineCount, maxLines)

  return (
    <div className={cn("relative rounded-lg border border-border bg-muted/30 font-mono text-sm overflow-hidden", className)}>
      {/* Line numbers */}
      <div className="flex">
        <div
          className="shrink-0 select-none border-r border-border bg-muted/50 px-3 py-3 text-right text-xs text-muted-foreground leading-[1.625rem]"
          aria-hidden
        >
          {Array.from({ length: Math.max(lines.length, minLines) }, (_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          spellCheck={false}
          className={cn(
            "flex-1 resize-none bg-transparent p-3 leading-[1.625rem] text-foreground outline-none placeholder:text-muted-foreground/50",
            readOnly && "cursor-default"
          )}
          rows={displayLines}
        />
      </div>
    </div>
  )
}
