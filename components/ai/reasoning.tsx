'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Lightbulb } from 'lucide-react'

interface ReasoningProps {
  content: string
  className?: string
}

export function Reasoning({ content, className = '' }: ReasoningProps) {
  return (
    <Card className={`bg-muted border-border ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm text-foreground">AI Reasoning</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-foreground">
        {content}
      </CardContent>
    </Card>
  )
}
