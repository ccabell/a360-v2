"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageWithCitations } from "@/components/citations/message-with-citations";
import { Citation } from "@/components/citations/types";
import { CheckCircle, AlertCircle, Lightbulb } from "lucide-react";

interface TreatmentPlan {
  tier: 1 | 2 | 3;
  name: string;
  cost: string;
  timeline: string;
  treatments: string[];
  benefits: string[];
  considerations: string[];
  citations: Citation[];
}

const mockPlans: TreatmentPlan[] = [
  {
    tier: 1,
    name: "Foundation Plan",
    cost: "$400-600",
    timeline: "6-8 weeks to full results",
    treatments: ["Botox Cosmetic (20 units)", "Skincare regimen upgrade"],
    benefits: [
      "Addresses dynamic wrinkles",
      "Immediate skin improvement",
      "Non-invasive approach",
      "Minimal downtime",
    ],
    considerations: [
      "Results visible 3-7 days",
      "Peak effect at 2 weeks",
      "Requires maintenance (every 12 weeks)",
    ],
    citations: [
      {
        id: "cit_1",
        number: 1,
        sourceType: "pubmed",
        sourceId: "12345678",
        title: "Clinical Efficacy of Botulinum Toxin",
        evidence:
          "FDA-approved for glabellar lines, crow's feet, and forehead lines. 90% of patients see improvement within 2 weeks.",
        confidence: 0.95,
        metadata: {
          pmid: "12345678",
          publicationType: "research",
        },
      },
    ],
  },
  {
    tier: 2,
    name: "Advanced Plan",
    cost: "$1,200-1,800",
    timeline: "8-12 weeks to full results",
    treatments: [
      "Botox Cosmetic (40 units)",
      "Juvederm Voluma (1.0 mL)",
      "Professional skincare",
    ],
    benefits: [
      "Multi-modal approach",
      "Addresses volume and lines",
      "Comprehensive rejuvenation",
      "Natural results",
    ],
    considerations: [
      "Multiple injection sessions",
      "Combination effects maximize results",
      "Higher cost but longer-lasting",
      "Maintenance every 12-18 months",
    ],
    citations: [
      {
        id: "cit_2",
        number: 1,
        sourceType: "pubmed",
        sourceId: "87654321",
        title: "Long-term Safety and Efficacy",
        evidence:
          "Combined treatment shows 85% patient satisfaction in clinical studies.",
        confidence: 0.92,
        metadata: {
          pmid: "87654321",
          publicationType: "research",
        },
      },
    ],
  },
  {
    tier: 3,
    name: "Premium Plan",
    cost: "$2,500-4,000",
    timeline: "12-16 weeks to full results",
    treatments: [
      "Botox Cosmetic (60 units)",
      "Juvederm Voluma (2.0 mL)",
      "Restylane Lyft (1.0 mL)",
      "Skin booster treatments",
    ],
    benefits: [
      "Comprehensive facial rejuvenation",
      "Addresses all concerns",
      "Maximum volume restoration",
      "Enhanced skin quality",
    ],
    considerations: [
      "More invasive approach",
      "Requires multiple sessions (3-4)",
      "Longer recovery period",
      "Annual maintenance recommended",
    ],
    citations: [
      {
        id: "cit_3",
        number: 1,
        sourceType: "pubmed",
        sourceId: "99999999",
        title: "Multi-product Treatment Approaches",
        evidence:
          "Multi-product approach shows highest patient satisfaction (92%) and longest results.",
        confidence: 0.98,
        metadata: {
          pmid: "99999999",
          publicationType: "practice_guideline",
        },
      },
    ],
  },
];

export default function TCPPage() {
  const [patientInfo, setPatientInfo] = useState("");
  const [showPlan, setShowPlan] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    if (!patientInfo.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setShowPlan(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Treatment Care Planning</h2>
        <p className="text-sm text-slate-600 mt-1">
          Generate evidence-based 3-tier treatment plans tailored to patient needs
        </p>
      </div>

      {/* Input Section */}
      {!showPlan && (
        <Card className="p-8 mb-8 border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            Patient Information
          </h3>
          <textarea
            placeholder="Enter patient details: chief complaint, medical history, aesthetic goals, budget considerations..."
            value={patientInfo}
            onChange={(e) => setPatientInfo(e.target.value)}
            className="w-full p-4 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-500 mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
            rows={4}
          />
          <Button
            onClick={handleGeneratePlan}
            disabled={loading || !patientInfo.trim()}
            className="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white"
            size="lg"
          >
            {loading ? "Generating Treatment Plan..." : "Generate 3-Tier Plan"}
          </Button>
        </Card>
      )}

      {/* Treatment Plans */}
      {showPlan && (
        <div className="space-y-6">
          {/* Recommended Approach */}
          <Card className="p-6 border-blue-200 bg-blue-50">
            <div className="flex items-start gap-4">
              <Lightbulb className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">
                  Recommended Approach
                </h3>
                <p className="text-sm text-slate-700">
                  Start with the Foundation Plan to assess patient response, then progress
                  to Advanced or Premium based on goals and satisfaction.
                </p>
              </div>
            </div>
          </Card>

          {/* Treatment Tiers */}
          <div className="grid gap-6">
            {mockPlans.map((plan) => (
              <Card key={plan.tier} className="border-slate-200 overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-200 bg-slate-50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          variant={
                            plan.tier === 2 ? "default" : "secondary"
                          }
                        >
                          Tier {plan.tier}
                        </Badge>
                        {plan.tier === 2 && (
                          <Badge className="bg-amber-100 text-amber-800">
                            RECOMMENDED
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {plan.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">
                        {plan.cost}
                      </p>
                      <p className="text-sm text-slate-600">{plan.timeline}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 grid grid-cols-3 gap-6">
                  {/* Treatments */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-600" />
                      Treatments
                    </h4>
                    <ul className="space-y-2">
                      {plan.treatments.map((treatment, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-slate-700 flex items-start gap-2"
                        >
                          <span className="text-blue-600 font-bold mt-1">
                            •
                          </span>
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {plan.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-slate-700 flex items-start gap-2"
                        >
                          <span className="text-emerald-600 font-bold mt-1">
                            •
                          </span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Considerations */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      Considerations
                    </h4>
                    <ul className="space-y-2">
                      {plan.considerations.map((consideration, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-slate-700 flex items-start gap-2"
                        >
                          <span className="text-amber-600 font-bold mt-1">
                            •
                          </span>
                          {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Evidence Citations */}
                {plan.citations.length > 0 && (
                  <div className="px-6 pb-6 border-t border-slate-200">
                    <MessageWithCitations
                      message={
                        plan.citations[0].evidence +
                        `[${plan.citations[0].number}]`
                      }
                      citations={plan.citations}
                      role="agent"
                    />
                  </div>
                )}
              </Card>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setShowPlan(false);
                setPatientInfo("");
              }}
              variant="outline"
              className="flex-1 py-6"
            >
              Generate New Plan
            </Button>
            <Button className="flex-1 py-6 bg-blue-600 hover:bg-blue-700 text-white">
              Send Plan to Patient
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
