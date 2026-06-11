'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MessageWithCitations } from '@/components/citations/message-with-citations'
import { ReferencesSection } from '@/components/citations/references-section'
import type { Citation } from '@/components/citations/types'
import { Send, Sparkles, Lightbulb, MessageCircle, LinkIcon } from 'lucide-react'

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
        doi: '10.1016/j.jaad.2024.01.015',
        publicationType: 'research',
      },
    },
    {
      id: 'cit_2',
      number: 2,
      sourceType: 'youtube',
      sourceId: 'dQw4w9WgXcQ',
      title: 'Advanced Injection Techniques for Facial Aesthetics',
      evidence: 'Expert demonstration of proper injection angles and depth for maximizing aesthetic outcomes',
      confidence: 0.87,
      metadata: {
        videoId: 'dQw4w9WgXcQ',
        timestamp: 234,
        duration: 1542,
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
      },
    },
    {
      id: 'cit_3',
      number: 3,
      sourceType: 'supabase',
      sourceId: 'products:botox_cosmetic',
      title: 'Botox Cosmetic - Product Guide',
      evidence: 'Recommended dosing: 20-40 units per treatment area. Maintenance: every 12 weeks',
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

    // Simulate agent response with reasoning, citations, and suggestions
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
    <div className="flex flex-col h-screen bg-oklch(1 0 0)">
      {/* Header */}
      <div className="border-b border-oklch(0.925 0.005 214.3) bg-white p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-oklch(0.148 0.004 228.8)">Consultation Intelligence</h1>
          <p className="text-oklch(0.56 0.021 213.5) mt-2">
            Evidence-based treatment recommendations with AI reasoning
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-8 overflow-hidden p-8">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Messages */}
          <ScrollArea className="flex-1 mb-6 border border-oklch(0.925 0.005 214.3) rounded-lg bg-white p-6">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-oklch(0.52 0.105 223.128 / 10%) rounded-full">
                      <Sparkles className="h-8 w-8 text-oklch(0.52 0.105 223.128)" />
                    </div>
                  </div>
                  <p className="text-oklch(0.148 0.004 228.8) font-medium">Start a consultation</p>
                  <p className="text-sm text-oklch(0.56 0.021 213.5) mt-2">
                    Ask about treatments, patient concerns, or recommendations
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-2xl ${message.role === 'user' ? 'w-full' : 'w-full'}`}>
                      {/* User Message */}
                      {message.role === 'user' && (
                        <Card className="bg-oklch(0.52 0.105 223.128) border-oklch(0.52 0.105 223.128) text-white ml-auto">
                          <CardContent className="p-4">
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs mt-2 text-oklch(0.984 0.019 200.873) opacity-70">
                              {message.timestamp.toLocaleTimeString()}
                            </p>
                          </CardContent>
                        </Card>
                      )}

                      {/* Agent Message with Reasoning */}
                      {message.role === 'agent' && (
                        <div className="space-y-3">
                          {/* Main Message */}
                          <Card className="bg-white border-oklch(0.925 0.005 214.3)">
                            <CardContent className="p-4">
                              <MessageWithCitations
                                message={message.content}
                                citations={message.citations}
                                role="agent"
                              />
                              <p className="text-xs text-oklch(0.56 0.021 213.5) mt-3">
                                {message.timestamp.toLocaleTimeString()}
                              </p>
                            </CardContent>
                          </Card>

                          {/* Reasoning Section */}
                          {message.reasoning && (
                            <Card className="bg-oklch(0.963 0.002 197.1) border-oklch(0.925 0.005 214.3)">
                              <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                  <Lightbulb className="h-4 w-4 text-oklch(0.52 0.105 223.128)" />
                                  <CardTitle className="text-sm text-oklch(0.148 0.004 228.8)">AI Reasoning</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent className="text-sm text-oklch(0.148 0.004 228.8)">
                                {message.reasoning}
                              </CardContent>
                            </Card>
                          )}

                          {/* Citations/Sources */}
                          {message.citations && message.citations.length > 0 && (
                            <Card className="bg-white border-oklch(0.925 0.005 214.3)">
                              <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                  <LinkIcon className="h-4 w-4 text-oklch(0.52 0.105 223.128)" />
                                  <CardTitle className="text-sm">Sources</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <ReferencesSection citations={message.citations} defaultExpanded={false} />
                              </CardContent>
                            </Card>
                          )}

                          {/* Suggestions */}
                          {message.suggestions && message.suggestions.length > 0 && (
                            <Card className="bg-oklch(0.52 0.105 223.128 / 5%) border-oklch(0.52 0.105 223.128 / 30%)">
                              <CardHeader className="pb-3">
                                <div className="flex items-center gap-2">
                                  <MessageCircle className="h-4 w-4 text-oklch(0.52 0.105 223.128)" />
                                  <CardTitle className="text-sm text-oklch(0.148 0.004 228.8)">Suggestions</CardTitle>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-2">
                                {message.suggestions.map((suggestion, idx) => (
                                  <button
                                    key={idx}
                                    className="w-full text-left p-3 rounded-lg bg-white border border-oklch(0.925 0.005 214.3) hover:border-oklch(0.52 0.105 223.128) transition-colors text-sm text-oklch(0.148 0.004 228.8)"
                                    onClick={() => setInput(suggestion)}
                                  >
                                    {suggestion}
                                  </button>
                                ))}
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <Card className="bg-oklch(0.963 0.002 197.1) border-oklch(0.925 0.005 214.3)">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="animate-spin h-4 w-4 border-2 border-oklch(0.52 0.105 223.128) border-t-transparent rounded-full" />
                        <p className="text-sm text-oklch(0.56 0.021 213.5)">AI is thinking...</p>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </ScrollArea>

          {/* Input */}
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

        {/* Sidebar - Metrics & Info */}
        <div className="w-80 space-y-4 hidden lg:flex lg:flex-col">
          {/* Confidence Card */}
          <Card className="bg-white border-oklch(0.925 0.005 214.3)">
            <CardHeader>
              <CardTitle className="text-sm text-oklch(0.148 0.004 228.8)">Confidence Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <p className="text-xs text-oklch(0.56 0.021 213.5)">Evidence Match</p>
                    <Badge className="bg-oklch(0.52 0.105 223.128) text-white text-xs">95%</Badge>
                  </div>
                  <div className="h-2 bg-oklch(0.963 0.002 197.1) rounded-full overflow-hidden">
                    <div className="h-full w-95% bg-oklch(0.52 0.105 223.128)" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Consultations */}
          <Card className="bg-white border-oklch(0.925 0.005 214.3)">
            <CardHeader>
              <CardTitle className="text-sm text-oklch(0.148 0.004 228.8)">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-oklch(0.963 0.002 197.1) rounded-lg">
                <p className="text-xs text-oklch(0.56 0.021 213.5)">Messages Today</p>
                <p className="text-2xl font-bold text-oklch(0.148 0.004 228.8)">{messages.filter(m => m.role === 'user').length}</p>
              </div>
              <div className="p-3 bg-oklch(0.52 0.105 223.128 / 10%) rounded-lg">
                <p className="text-xs text-oklch(0.56 0.021 213.5)">Evidence Sources</p>
                <p className="text-2xl font-bold text-oklch(0.148 0.004 228.8)">
                  {messages.reduce((acc, m) => acc + (m.citations?.length || 0), 0)}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Component Legend */}
          <Card className="bg-white border-oklch(0.925 0.005 214.3)">
            <CardHeader>
              <CardTitle className="text-sm text-oklch(0.148 0.004 228.8)">Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-3 w-3 text-oklch(0.52 0.105 223.128) mt-0.5 flex-shrink-0" />
                <p className="text-oklch(0.56 0.021 213.5)">AI Reasoning - See how decisions are made</p>
              </div>
              <div className="flex items-start gap-2">
                <LinkIcon className="h-3 w-3 text-oklch(0.52 0.105 223.128) mt-0.5 flex-shrink-0" />
                <p className="text-oklch(0.56 0.021 213.5)">Inline Citations - Evidence for every claim</p>
              </div>
              <div className="flex items-start gap-2">
                <MessageCircle className="h-3 w-3 text-oklch(0.52 0.105 223.128) mt-0.5 flex-shrink-0" />
                <p className="text-oklch(0.56 0.021 213.5)">Suggestions - Click to explore options</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
