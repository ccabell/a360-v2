"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ChevronDown, Sparkles } from "lucide-react";

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

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

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
      transcript: { bg: "bg-blue-600/10 border-blue-500/30", text: "text-blue-200" },
      vector: { bg: "bg-purple-600/10 border-purple-500/30", text: "text-purple-200" },
      gl_product: { bg: "bg-emerald-600/10 border-emerald-500/30", text: "text-emerald-200" },
      agent_output: { bg: "bg-pink-600/10 border-pink-500/30", text: "text-pink-200" },
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
                <div className="flex justify-center mb-4">
                  <div className="p-3 glass rounded-2xl">
                    <Sparkles className="h-8 w-8 gradient-text" />
                  </div>
                </div>
                <p className="text-gray-300 font-medium">Start a conversation with an agent</p>
                <p className="text-sm text-gray-500 mt-2">
                  Ask questions and explore interactive citations
                </p>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex fade-in ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="max-w-2xl">
                {/* Message bubble */}
                <div
                  className={`p-4 rounded-2xl glass ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-blue-600/40 to-purple-600/40 border-blue-500/30"
                      : "bg-slate-800/40 border-gray-700/50"
                  }`}
                >
                  <p className="text-sm text-gray-100 whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Citations */}
                {message.citations && message.citations.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <p className="text-xs text-gray-500">
                      Citations: {message.citations.length}
                    </p>
                    {message.citations.map((citation) => {
                      const isExpanded = expandedCitation === citation.id;
                      const colors = getCitationColor(citation.type);

                      return (
                        <div
                          key={citation.id}
                          className={`p-3 rounded-xl glass cursor-pointer border-l-2 transition-all hover:bg-white/10 ${colors.bg}`}
                          onClick={() =>
                            setExpandedCitation(
                              isExpanded ? null : citation.id
                            )
                          }
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <p className={`text-xs font-semibold ${colors.text}`}>
                                {citation.sourceName}
                              </p>
                              <Badge variant="outline" className="mt-1 text-xs bg-white/5 border-white/10">
                                {citation.type}
                              </Badge>
                            </div>
                            <ChevronDown
                              className={`h-4 w-4 text-gray-400 transition-transform ${
                                isExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>

                          {isExpanded && (
                            <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
                              <div>
                                <p className="text-xs font-semibold text-gray-300 mb-1">Evidence:</p>
                                <p className="text-xs italic text-gray-400">
                                  "{citation.evidence}"
                                </p>
                              </div>

                              {citation.confidence && (
                                <p className="text-xs text-gray-400">
                                  ✓ {Math.round(citation.confidence * 100)}% confidence
                                </p>
                              )}

                              {citation.timestamp && (
                                <p className="text-xs text-gray-400">
                                  📍 {citation.timestamp}
                                </p>
                              )}

                              {citation.url && (
                                <a
                                  href={citation.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-blue-400 hover:text-blue-300"
                                >
                                  View Source →
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start fade-in">
              <div className="p-4 rounded-2xl glass bg-slate-800/40 border-gray-700/50">
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-blue-400 border-t-blue-600 rounded-full" />
                  <p className="text-sm text-gray-400">Agent thinking...</p>
                </div>
              </div>
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
          className="flex-1 glass bg-slate-800/30 border-white/10 text-gray-100 placeholder-gray-500"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!input.trim() || loading}
          size="icon"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
