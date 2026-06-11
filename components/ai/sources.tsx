'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ReferencesSection } from '@/components/citations/references-section'
import type { Citation } from '@/components/citations/types'
import { LinkIcon } from 'lucide-react'

interface SourcesProps {
  citations: Citation[]
  defaultExpanded?: boolean
  className?: string
}

export function Sources({ citations, defaultExpanded = false, className = '' }: SourcesProps) {
  if (!citations || citations.length === 0) return null

  return (
    <Card className={`bg-white border-oklch(0.925 0.005 214.3) ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4 text-oklch(0.52 0.105 223.128)" />
          <CardTitle className="text-sm">Sources ({citations.length})</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <ReferencesSection citations={citations} defaultExpanded={defaultExpanded} />
      </CardContent>
    </Card>
  )
}
