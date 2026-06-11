'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { MessageCircle } from 'lucide-react'

interface SuggestionsProps {
  suggestions: string[]
  onSuggestionClick?: (suggestion: string) => void
  className?: string
}

export function Suggestions({ suggestions, onSuggestionClick, className = '' }: SuggestionsProps) {
  if (!suggestions || suggestions.length === 0) return null

  return (
    <Card className={`bg-primary/5 border-primary/30 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-primary" />
          <CardTitle className="text-sm text-foreground">Suggestions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            className="w-full text-left p-3 rounded-lg bg-card border border-border hover:border-primary transition-colors text-sm text-foreground"
            onClick={() => onSuggestionClick?.(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
