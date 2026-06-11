"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageWithCitations } from "@/components/citations/message-with-citations";
import { Citation } from "@/components/citations/types";
import { Send, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  citations?: Citation[];
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate agent response with citations
    setTimeout(() => {
      const mockCitations: Citation[] = [
        {
          id: "cit_1",
          number: 1,
          sourceType: "pubmed",
          sourceId: "12345678",
          title: "Clinical Efficacy of Botulinum Toxin in Aesthetic Medicine",
          evidence:
            "Botox has demonstrated efficacy in treating dynamic facial wrinkles with onset typically within 3-7 days",
          confidence: 0.95,
          metadata: {
            pmid: "12345678",
            authors: "Smith J, Johnson M, Williams R",
            journal: "Journal of Aesthetic Dermatology",
            year: 2024,
            doi: "10.1016/j.jaad.2024.01.015",
            publicationType: "research",
          },
        },
        {
          id: "cit_2",
          number: 2,
          sourceType: "youtube",
          sourceId: "dQw4w9WgXcQ",
          title: "Advanced Injection Techniques for Facial Aesthetics",
          evidence:
            "Expert demonstration of proper injection angles and depth for maximizing aesthetic outcomes",
          confidence: 0.87,
          metadata: {
            videoId: "dQw4w9WgXcQ",
            timestamp: 234,
            duration: 1542,
            thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
          },
        },
        {
          id: "cit_3",
          number: 3,
          sourceType: "supabase",
          sourceId: "products:botox_cosmetic",
          title: "Botox Cosmetic - Product Guide",
          evidence:
            "Recommended dosing: 20-40 units per treatment area. Maintenance: every 12 weeks",
          confidence: 0.98,
          metadata: {
            table: "gl_products",
            recordId: "products:botox_cosmetic",
          },
        },
      ];

      const agentMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        role: "agent",
        content: `Based on the consultation, Botox is FDA-approved for dynamic wrinkles[1]. The recommended injection technique is shown in this expert guide[2]. Our internal product guide[3] provides detailed dosing information. Would you like me to prepare a treatment plan?`,
        citations: mockCitations,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Chat with Agent</h2>
        <p className="text-sm text-slate-600 mt-1">
          Ask questions about treatments, evidence, and recommendations
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 pr-4 mb-6 border border-slate-200 rounded-lg bg-white p-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Sparkles className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <p className="text-slate-700 font-medium">
                Start a conversation with the agent
              </p>
              <p className="text-sm text-slate-500 mt-2">
                Ask about treatments, evidence, or recommendations
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Card
                  className={`max-w-2xl p-4 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  {message.role === "user" ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <MessageWithCitations
                      message={message.content}
                      citations={message.citations}
                      role="agent"
                    />
                  )}
                  <p
                    className={`text-xs mt-2 ${
                      message.role === "user"
                        ? "text-blue-100"
                        : "text-slate-500"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </Card>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <Card className="bg-slate-50 border-slate-200 p-4">
                  <div className="flex items-center gap-2">
                    <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-blue-600 rounded-full" />
                    <p className="text-sm text-slate-600">Agent thinking...</p>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="flex gap-3">
        <Input
          placeholder="Ask about treatments, evidence, or recommendations..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          disabled={loading}
          className="flex-1 border-slate-200"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim() || loading}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
