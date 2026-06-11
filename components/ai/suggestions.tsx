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
    <Card className={`bg-oklch(0.52 0.105 223.128 / 5%) border-oklch(0.52 0.105 223.128 / 30%) ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4 text-oklch(0.52 0.105 223.128)" />
          <CardTitle className="text-sm text-oklch(0.148 0.004 228.8)">Suggestions</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            className="w-full text-left p-3 rounded-lg bg-white border border-oklch(0.925 0.005 214.3) hover:border-oklch(0.52 0.105 223.128) transition-colors text-sm text-oklch(0.148 0.004 228.8)"
            onClick={() => onSuggestionClick?.(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </CardContent>
    </Card>
  )
}
