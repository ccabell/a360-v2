'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageWithCitations } from '@/components/citations/message-with-citations'
import { Reasoning, Sources, Suggestions } from '@/components/ai'
import type { Citation } from '@/components/citations/types'
import { Send, Sparkles, BarChart3 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'agent'
  content: string
  citations?: Citation[]
  reasoning?: string
  suggestions?: string[]
  timestamp: Date
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const mockCitations: Citation[] = [
    {
      id: 'cit_1',
      number: 1,
      sourceType: 'pubmed',
      sourceId: '12345678',
      title: 'Clinical Efficacy of Botulinum Toxin in Aesthetic Medicine',
      evidence: 'Botox has demonstrated efficacy in treating dynamic facial wrinkles with onset typically within 3-7 days',
      confidence: 0.95,
      metadata: {
        pmid: '12345678',
        authors: 'Smith J, Johnson M, Williams R',
        journal: 'Journal of Aesthetic Dermatology',
        year: 2024,
      },
    },
    {
      id: 'cit_2',
      number: 2,
      sourceType: 'youtube',
      sourceId: 'dQw4w9WgXcQ',
      title: 'Advanced Injection Techniques for Facial Aesthetics',
      evidence: 'Expert demonstration of proper injection angles and depth',
      confidence: 0.87,
      metadata: {
        videoId: 'dQw4w9WgXcQ',
        timestamp: 234,
        duration: 1542,
      },
    },
    {
      id: 'cit_3',
      number: 3,
      sourceType: 'supabase',
      sourceId: 'products:botox_cosmetic',
      title: 'Botox Cosmetic - Product Guide',
      evidence: 'Recommended dosing: 20-40 units per treatment area',
      confidence: 0.98,
      metadata: {
        table: 'gl_products',
        recordId: 'products:botox_cosmetic',
      },
    },
  ]

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    setTimeout(() => {
      const agentMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        role: 'agent',
        content: `Based on the consultation, Botox is FDA-approved for dynamic wrinkles[1]. The recommended injection technique is shown in this expert guide[2]. Our internal product guide[3] provides detailed dosing information.`,
        citations: mockCitations,
        reasoning: 'I analyzed the patient consultation data and matched it against our evidence database. The symptoms described align with dynamic wrinkles, which have strong clinical evidence for Botox treatment.',
        suggestions: [
          'Would you like me to prepare a treatment plan?',
          'Should I show alternative treatment options?',
          'Do you want to see patient success rates?',
        ],
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, agentMessage])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="border-b border-oklch(0.925 0.005 214.3) p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-oklch(0.148 0.004 228.8)">Consultation Intelligence</h1>
          <p className="text-sm text-oklch(0.56 0.021 213.5) mt-1">
            Evidence-based treatment recommendations with AI reasoning
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-6xl mx-auto h-full flex flex-col p-6 gap-6">
          {/* Messages Area */}
          <ScrollArea className="flex-1 border border-oklch(0.925 0.005 214.3) rounded-lg bg-white">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-oklch(0.52 0.105 223.128 / 10%) rounded-lg">
                      <Sparkles className="h-8 w-8 text-oklch(0.52 0.105 223.128)" />
                    </div>
                  </div>
                  <p className="text-oklch(0.148 0.004 228.8) font-semibold">Start a consultation</p>
                  <p className="text-sm text-oklch(0.56 0.021 213.5) mt-2">
                    Ask about treatments, patient concerns, or recommendations
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-6 pr-4">
                {messages.map((message) => (
                  <div key={message.id} className="space-y-3">
                    {/* User Message */}
                    {message.role === 'user' && (
                      <div className="flex justify-end">
                        <Card className="max-w-md bg-oklch(0.52 0.105 223.128) border-oklch(0.52 0.105 223.128) text-white">
                          <div className="p-4">
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-2 opacity-70">{message.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </Card>
                      </div>
                    )}

                    {/* Agent Message */}
                    {message.role === 'agent' && (
                      <div className="space-y-3">
                        {/* Main Message */}
                        <Card className="bg-white border-oklch(0.925 0.005 214.3)">
                          <div className="p-4">
                            <MessageWithCitations
                              message={message.content}
                              citations={message.citations}
                              role="agent"
                            />
                            <p className="text-xs text-oklch(0.56 0.021 213.5) mt-3">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </Card>

                        {/* Reasoning */}
                        {message.reasoning && <Reasoning content={message.reasoning} />}

                        {/* Sources */}
                        {message.citations && <Sources citations={message.citations} defaultExpanded={false} />}

                        {/* Suggestions */}
                        {message.suggestions && (
                          <Suggestions
                            suggestions={message.suggestions}
                            onSuggestionClick={(suggestion) => setInput(suggestion)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <Card className="bg-oklch(0.963 0.002 197.1) border-oklch(0.925 0.005 214.3)">
                    <div className="p-4 flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-oklch(0.52 0.105 223.128) border-t-transparent rounded-full" />
                      <p className="text-sm text-oklch(0.56 0.021 213.5)">AI is thinking...</p>
                    </div>
                  </Card>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input Area */}
          <div className="flex gap-3">
            <Input
              placeholder="Describe the patient consultation..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              disabled={loading}
              className="flex-1 border-oklch(0.925 0.005 214.3) bg-white"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || loading}
              className="bg-oklch(0.52 0.105 223.128) hover:bg-oklch(0.45 0.085 224.283) text-oklch(0.984 0.019 200.873)"
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
