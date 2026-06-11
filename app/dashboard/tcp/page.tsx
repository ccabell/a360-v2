"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Lightbulb } from "lucide-react";

interface TreatmentPlan {
  tier: 1 | 2 | 3;
  name: string;
  cost: string;
  timeline: string;
  treatments: string[];
  benefits: string[];
  considerations: string[];
  evidence: string;
}

const mockPlan: TreatmentPlan[] = [
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
    evidence:
      "FDA-approved for glabellar lines, crow's feet, and forehead lines. 90% of patients see improvement within 2 weeks.",
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
    evidence:
      "Combined treatment shows 85% patient satisfaction in clinical studies. Volumization combined with neurotoxin creates optimal aesthetic outcomes.",
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
      "Significant aesthetic transformation",
      "Annual maintenance recommended",
    ],
    evidence:
      "Multi-product approach shows highest patient satisfaction (92%) and longest results. Evidence supports progressive treatment planning.",
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
    <div className="p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">TCP - Treatment Care Plans</h2>
        <p className="text-gray-400">
          Generate evidence-based 3-tier treatment plans tailored to patient needs
        </p>
      </div>

      {/* Input Section */}
      {!showPlan && (
        <div className="p-8 glass rounded-2xl bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10 border border-white/10 mb-8">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Patient Information</h3>
          <textarea
            placeholder="Enter patient details: chief complaint, medical history, aesthetic goals, budget considerations..."
            value={patientInfo}
            onChange={(e) => setPatientInfo(e.target.value)}
            className="w-full p-4 rounded-xl glass bg-slate-800/30 border-white/10 text-gray-100 placeholder-gray-500 mb-4 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
            rows={4}
          />
          <Button
            onClick={handleGeneratePlan}
            disabled={loading || !patientInfo.trim()}
            className="w-full py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
            size="lg"
          >
            {loading ? "Generating Treatment Plan..." : "Generate 3-Tier Plan"}
          </Button>
        </div>
      )}

      {/* Treatment Plans */}
      {showPlan && (
        <div className="space-y-6">
          {/* Plan Summary */}
          <div className="p-6 glass rounded-2xl bg-blue-600/10 border border-blue-500/30">
            <div className="flex items-start gap-4">
              <Lightbulb className="h-6 w-6 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-100 mb-2">Recommended Approach</h3>
                <p className="text-sm text-gray-300">
                  We recommend starting with the Foundation Plan to assess patient response, then
                  progressing to Advanced or Premium based on goals and satisfaction.
                </p>
              </div>
            </div>
          </div>

          {/* Treatment Tiers */}
          <div className="grid gap-6">
            {mockPlan.map((plan) => (
              <div
                key={plan.tier}
                className="glass rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all fade-in"
              >
                {/* Header */}
                <div
                  className={`p-6 border-b border-white/10 bg-gradient-to-r ${
                    plan.tier === 1
                      ? "from-emerald-600/20 to-emerald-600/5"
                      : plan.tier === 2
                        ? "from-blue-600/20 to-blue-600/5"
                        : "from-purple-600/20 to-purple-600/5"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          className={
                            plan.tier === 1
                              ? "glass bg-emerald-600/30 border-emerald-500/30 text-emerald-200"
                              : plan.tier === 2
                                ? "glass bg-blue-600/30 border-blue-500/30 text-blue-200"
                                : "glass bg-purple-600/30 border-purple-500/30 text-purple-200"
                          }
                        >
                          Tier {plan.tier}
                        </Badge>
                        {plan.tier === 2 && (
                          <Badge className="glass bg-amber-600/30 border-amber-500/30 text-amber-200">RECOMMENDED</Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-100">{plan.name}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold gradient-text">{plan.cost}</p>
                      <p className="text-sm text-gray-400">{plan.timeline}</p>
                    </div>
                  </div>

                  {/* Evidence */}
                  <div className="mt-4 p-3 glass rounded-xl border border-white/10 bg-slate-800/30">
                    <p className="text-xs font-semibold text-gray-300 mb-2">CLINICAL EVIDENCE</p>
                    <p className="text-sm text-gray-300">{plan.evidence}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 grid grid-cols-3 gap-6">
                  {/* Treatments */}
                  <div>
                    <h4 className="font-semibold text-gray-100 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-400" />
                      Treatments
                    </h4>
                    <ul className="space-y-2">
                      {plan.treatments.map((treatment, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-blue-400 font-bold mt-1">•</span>
                          {treatment}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="font-semibold text-gray-100 mb-3 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      Benefits
                    </h4>
                    <ul className="space-y-2">
                      {plan.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold mt-1">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Considerations */}
                  <div>
                    <h4 className="font-semibold text-gray-100 mb-3 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-400" />
                      Considerations
                    </h4>
                    <ul className="space-y-2">
                      {plan.considerations.map((consideration, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-amber-400 font-bold mt-1">•</span>
                          {consideration}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setShowPlan(false);
                setPatientInfo("");
              }}
              variant="outline"
              className="flex-1 py-6 glass border-white/10 hover:bg-white/5"
            >
              Generate New Plan
            </Button>
            <Button className="flex-1 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500">
              Send Plan to Patient
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
