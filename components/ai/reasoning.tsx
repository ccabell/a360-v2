'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

interface ReasoningProps {
  content: string
  className?: string
}

export function Reasoning({ content, className = '' }: ReasoningProps) {
  return (
    <Card className={`bg-oklch(0.963 0.002 197.1) border-oklch(0.925 0.005 214.3) ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-oklch(0.52 0.105 223.128)" />
          <CardTitle className="text-sm text-oklch(0.148 0.004 228.8)">AI Reasoning</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-oklch(0.148 0.004 228.8)">
        {content}
      </CardContent>
    </Card>
  )
}
