"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ChevronDown } from "lucide-react";

interface Citation {
  id: string;
  type: "transcript" | "vector" | "gl_product" | "agent_output";
  sourceName: string;
  evidence: string;
  confidence?: number;
  timestamp?: string;
  url?: string;
}

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
  const [expandedCitation, setExpandedCitation] = useState<string | null>(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: `msg_${Date.now() + 1}`,
        role: "agent",
        content: `Response to: "${input}"\n\nThis is a demonstration of the chat interface with interactive citations. Click on citations to expand and see the evidence.`,
        citations: [
          {
            id: "cit_1",
            type: "transcript",
            sourceName: "Patient Consultation",
            evidence: "The patient mentioned experiencing symptoms for the past week.",
            confidence: 0.95,
            timestamp: "14:32",
            url: "#",
          },
          {
            id: "cit_2",
            type: "vector",
            sourceName: "Medical Knowledge Base",
            evidence: "Treatment options for this condition include...",
            confidence: 0.87,
            url: "#",
          },
          {
            id: "cit_3",
            type: "gl_product",
            sourceName: "Botox Cosmetic",
            evidence: "FDA-approved for dynamic facial wrinkles",
            confidence: 0.92,
            url: "#",
          },
        ],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, agentMessage]);
      setLoading(false);
    }, 1000);
  };

  const getCitationColor = (type: Citation["type"]) => {
    const colors = {
      transcript: { bg: "bg-blue-50", badge: "bg-blue-100 text-blue-900" },
      vector: { bg: "bg-purple-50", badge: "bg-purple-100 text-purple-900" },
      gl_product: { bg: "bg-green-50", badge: "bg-green-100 text-green-900" },
      agent_output: { bg: "bg-orange-50", badge: "bg-orange-100 text-orange-900" },
    };
    return colors[type];
  };

  return (
    <div className="flex flex-col h-full p-6">
      {/* Messages */}
      <ScrollArea className="flex-1 mb-6 pr-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <p className="text-gray-600">Start a conversation with an agent</p>
                <p className="text-sm text-gray-500 mt-1">
                  Ask questions and explore interactive citations
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-2xl">
                {/* Message bubble */}
                <Card
                  className={`p-4 ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </Card>

                {/* Citations */}
                {message.citations && message.citations.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-600">
                      Citations: {message.citations.length}
                    </p>
                    {message.citations.map((citation) => {
                      const isExpanded = expandedCitation === citation.id;
                      const colors = getCitationColor(citation.type);

                      return (
                        <Card
                          key={citation.id}
                          className={`p-3 cursor-pointer border-l-4 border-l-blue-500 ${colors.bg}`}
                          onClick={() =>
                            setExpandedCitation(
                              isExpanded ? null : citation.id
                            )
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className="text-xs font-semibold">
                                {citation.sourceName}
                              </p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {citation.type}
                              </Badge>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>

                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-gray-300 space-y-2">
                              <div>
                                <p className="text-xs font-semibold mb-1">Evidence:</p>
                                <p className="text-xs italic text-gray-700">
                                  "{citation.evidence}"
                                </p>
                              </div>

                              {citation.confidence && (
                                <p className="text-xs text-gray-600">
                                  ✓ {Math.round(citation.confidence * 100)}% confidence
                                </p>
                              )}

                              {citation.timestamp && (
                                <p className="text-xs text-gray-600">
                                  📍 {citation.timestamp}
                                </p>
                              )}

                              {citation.url && (
                                <a
                                  href={citation.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-600 hover:underline"
                                >
                                  View Source →
                                </a>
                              )}
                            </div>
                          )}
                        </Card>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <Card className="p-4 bg-gray-100">
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-gray-400 border-t-gray-600 rounded-full" />
                  <p className="text-sm text-gray-600">Agent thinking...</p>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          placeholder="Ask an agent..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSendMessage();
            }
          }}
          disabled={loading}
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim() || loading}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
