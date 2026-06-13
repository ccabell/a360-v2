"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, ExternalLink } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  page: number;
  section: string;
  tags: string[];
}

const FAQS: FAQ[] = [
  {
    id: "f1",
    question:
      "What laser classification is the Joule system, and why does it matter?",
    answer:
      "The Joule system is classified as a Class IV laser by the FDA's National Center for Devices and Radiological Health. Class IV represents the highest-power lasers, meaning users must take precautions to prevent eye and skin exposure from both direct and diffusely reflected beams. Additional precautions are required to prevent fire and electrical hazards in the surgical environment.",
    page: 8,
    section: "Safety and Regulatory Compliance",
    tags: ["classification", "Class IV", "laser safety"],
  },
  {
    id: "f2",
    question:
      "What signage and door protocol is required when the Joule system is in use?",
    answer:
      "A warning sign must be posted on the outside of the treatment room door whenever the system is in use to alert personnel before they enter the controlled area. The treatment room door should remain closed during operation. Protective eyewear should be placed outside the door for anyone who needs to enter the room.",
    page: 8,
    section: "Safety and Regulatory Compliance",
    tags: ["warning sign", "door safety", "treatment room"],
  },
  {
    id: "f3",
    question: "What is the emergency turn-off button and how is it reset?",
    answer:
      "The system has a red emergency-off button on top of the console that latches when pressed, immediately de-energizing the system. Once latched, the button must be depressed and rotated clockwise to release it and re-enable operation. This button should be used in emergency situations only.",
    page: 9,
    section: "Regulatory Compliance Safety Features",
    tags: ["emergency stop", "shutdown", "safety"],
  },
  {
    id: "f4",
    question: "How is the Joule system turned on and off correctly?",
    answer:
      "To turn on, switch the main power circuit breaker to ON, ensure the emergency-off button is released, then insert the key and turn clockwise to the START position, hold for one second, then release — the key spring-returns to the ON position. To turn off, rotate the key switch to the O position and remove the key. If needed, the main circuit breaker can then be switched off and the power cord disconnected.",
    page: 15,
    section: "Operation",
    tags: ["startup", "shutdown", "key switch"],
  },
  {
    id: "f5",
    question:
      "What should you do if a fault message appears on the display screen?",
    answer:
      "If an advisory message (such as Footswitch, Low Energy, Pulse Rate, Remote Interlock, Overheating, or Calibration) appears, the operator can take corrective action as described in the Maintenance section — the message will clear and the system will enter Standby. If a fault message like Simmer Fault persists after pressing Ready, turn the system off momentarily and back on. If the fault continues, record the error code, turn the system off, and contact Sciton Service.",
    page: 10,
    section: "Regulatory Compliance Safety Features",
    tags: ["fault", "error message", "troubleshooting"],
  },
  {
    id: "f6",
    question:
      "How should external surfaces, handpieces, and scanners be cleaned?",
    answer:
      "External console surfaces should be wiped with a soft, damp cloth using a non-caustic solution such as water, isopropyl alcohol, or a hospital-grade disinfectant. Never spray or pour solution directly onto the display screen, fiber delivery port, or console. Handpieces should be cleaned within 30 minutes of use using a neutral pH enzymatic agent. Never soak a handpiece or place it under running liquid. Scanner lenses can be wiped with a soft cotton swab moistened with isopropyl alcohol or sterile water.",
    page: 28,
    section: "Maintenance",
    tags: ["cleaning", "disinfection", "handpiece"],
  },
  {
    id: "f7",
    question:
      "What are the operating environment requirements for the Joule system?",
    answer:
      "The system must operate at altitudes up to 10,000 feet (3,048 m), ambient temperatures between 50°F and 95°F (10°C–35°C) above dew point, and at maximum 90% non-condensing humidity. For storage and shipping, the system can withstand altitudes up to 45,000 feet and temperatures from 5°F to 113°F (-15°C to 45°C).",
    page: 26,
    section: "Joule System Specifications",
    tags: ["environment", "temperature", "specifications"],
  },
  {
    id: "f8",
    question:
      "What precautions apply when using a smoke evacuator during procedures?",
    answer:
      "NIOSH and OSHA recommend using a smoke evacuator during any procedure that creates smoke or plume. It is strongly recommended for all 2940 nm Er:YAG procedures specifically. In poorly ventilated rooms, a smoke evacuator should always be considered to protect both the operator and patient from laser-generated plume.",
    page: 9,
    section: "Safety and Regulatory Compliance",
    tags: ["smoke evacuator", "Er:YAG", "ventilation"],
  },
];

interface FAQCardProps {
  faq: FAQ;
  onJumpToPage: (page: number) => void;
}

function FAQCard({ faq, onJumpToPage }: FAQCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border border-border transition-all"
      style={{ background: "var(--card)", overflow: "visible" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-3 text-left transition-colors"
        style={{ padding: "14px 16px" }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.background = open
            ? "transparent"
            : "var(--accent)")
        }
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <p
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: "var(--foreground)",
            lineHeight: 1.5,
          }}
        >
          {faq.question}
        </p>
        <div
          style={{
            flexShrink: 0,
            marginTop: 2,
            color: "var(--muted-foreground)",
          }}
        >
          {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {open && (
        <div style={{ borderTop: "1px solid var(--border)" }}>
          <div style={{ padding: "12px 16px" }}>
            <p
              style={{
                fontSize: 13,
                color: "var(--muted-foreground)",
                lineHeight: 1.7,
              }}
            >
              {faq.answer}
            </p>
          </div>

          <div className="flex items-center justify-between px-4 pb-3">
            <div className="flex flex-wrap gap-1">
              {faq.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md px-2 py-0.5"
                  style={{
                    fontSize: 10,
                    background: "var(--muted)",
                    color: "var(--muted-foreground)",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <button
              onClick={() => onJumpToPage(faq.page)}
              className="flex items-center gap-1.5 rounded-md border border-border transition-colors"
              style={{
                padding: "4px 10px",
                fontSize: 11,
                color: "var(--muted-foreground)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--accent)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <BookOpen size={11} />
              {faq.section} — p.{faq.page}
              <ExternalLink size={10} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

interface FAQsPanelProps {
  onJumpToPage: (page: number) => void;
}

export function FAQsPanel({ onJumpToPage }: FAQsPanelProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-4 border-b border-border">
        <h2
          style={{ fontSize: 14, fontWeight: 600, color: "var(--foreground)" }}
        >
          Frequently Asked Questions
        </h2>
        <p
          style={{
            fontSize: 12,
            color: "var(--muted-foreground)",
            marginTop: 2,
          }}
        >
          Click to expand · Jump to source section
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-2">
        {FAQS.map((faq) => (
          <FAQCard key={faq.id} faq={faq} onJumpToPage={onJumpToPage} />
        ))}
      </div>
    </div>
  );
}
