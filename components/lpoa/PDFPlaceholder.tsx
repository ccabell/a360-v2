import { FileText, BookOpen, ChevronRight } from "lucide-react";

interface Section {
  title: string;
  page: number;
  content: string;
}

const SECTIONS: Section[] = [
  {
    title: "1. Introduction & Safety Overview",
    page: 1,
    content:
      "This clinical manual provides comprehensive guidance for the safe and effective operation of the LaserDevice Pro system. All operators must complete certified training before use. Failure to follow protocols may result in patient injury or device damage.",
  },
  {
    title: "2. Device Specifications",
    page: 9,
    content:
      "Wavelength: 755nm / 810nm / 1064nm selectable. Maximum fluence: 40 J/cm². Pulse duration range: 2–400ms. Spot sizes: 6mm, 9mm, 12mm, 18mm. Repetition rate: up to 10 Hz. Integrated contact cooling: 0–5°C.",
  },
  {
    title: "3. Treatment Protocols",
    page: 15,
    content:
      "Select fluence based on Fitzpatrick skin type and treatment area. Always perform a test patch at least 24 hours before full treatment. Begin at conservative settings and titrate upward based on patient response. Document all parameters in the patient record.",
  },
  {
    title: "3.2 Skin Type Assessment (Fitzpatrick)",
    page: 16,
    content:
      "Type I–II: Fluence 20–26 J/cm², Pulse 6ms. Type III: Fluence 16–20 J/cm², Pulse 8ms. Type IV: Fluence 10–14 J/cm², Pulse 10–12ms. Type V–VI: 1064nm Nd:YAG preferred, Fluence 8–12 J/cm², Pulse 15–20ms. Contact cooling mandatory for Type IV+.",
  },
  {
    title: "3.3 Fluence & Pulse Duration",
    page: 20,
    content:
      "Higher fluence increases efficacy but also thermal injury risk. Pulse duration should be matched to the thermal relaxation time of the target chromophore. For hair follicles (large), use longer pulses (10–30ms). For vascular targets, use shorter pulses (2–6ms). Never exceed maximum rated fluence for the selected wavelength.",
  },
  {
    title: "4. Treatment Areas",
    page: 30,
    content:
      "Face & Neck: Use 9–12mm spot, reduce fluence by 10% vs. body. Periorbital: corneal shields mandatory, max 6mm spot. Body (chest, back, legs): 18mm spot preferred for efficiency. Bikini/sensitive zones: reduce overlap to 10%, apply topical anesthetic 45 min prior.",
  },
  {
    title: "5. Post-Inflammatory Hyperpigmentation",
    page: 42,
    content:
      "PIH risk is highest in Fitzpatrick Type IV–VI patients and those with prior PIH history. Mitigation: pre-treat with hydroquinone 4% for 4–6 weeks, mandatory SPF 50+ throughout course, conservative fluence (–15%), extended intervals (8–10 weeks). Assess at every visit.",
  },
  {
    title: "6. Adverse Events & Management",
    page: 50,
    content:
      "Immediately stop treatment if: skin graying/charring, blistering, patient pain >7/10, urticaria beyond treatment field. Apply cool compress, document, refer to adverse event log. Do not resume in same session. For severe reactions, follow emergency protocol §6.3 and contact the supervising physician.",
  },
];

interface PDFPlaceholderProps {
  currentPage: number;
}

export function PDFPlaceholder({ currentPage }: PDFPlaceholderProps) {
  // Find the section closest to currentPage
  const activeSection =
    [...SECTIONS].reverse().find((s) => s.page <= currentPage) ?? SECTIONS[0];

  return (
    <div className="flex flex-col h-full" style={{ background: "#f0f0f0" }}>
      {/* Page chrome */}
      <div
        className="flex-1 overflow-y-auto flex items-start justify-center py-8 px-6"
        style={{ background: "#525659" }}
      >
        {/* Paper */}
        <div
          className="w-full flex flex-col gap-8"
          style={{
            maxWidth: 680,
            background: "#fff",
            boxShadow: "0 4px 24px rgba(0,0,0,0.35)",
            borderRadius: 2,
            padding: "64px 72px",
            minHeight: "100%",
          }}
        >
          {/* Header */}
          <div style={{ borderBottom: "2px solid #1a1a2e", paddingBottom: 20 }}>
            <div className="flex items-center justify-between">
              <div>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#6b7280",
                  }}
                >
                  Clinical Reference Manual
                </p>
                <h1
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#1a1a2e",
                    marginTop: 4,
                    lineHeight: 1.2,
                  }}
                >
                  LaserDevice Pro
                </h1>
                <p style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>
                  Version 3.2 — January 2025
                </p>
              </div>
              <div
                className="flex items-center justify-center rounded-lg"
                style={{ width: 52, height: 52, background: "#1a1a2e" }}
              >
                <FileText size={24} color="#fff" />
              </div>
            </div>
          </div>

          {/* Currently viewing section */}
          <div>
            <div
              className="flex items-center gap-2"
              style={{ marginBottom: 16 }}
            >
              <BookOpen size={14} style={{ color: "#6b7280" }} />
              <p
                style={{
                  fontSize: 11,
                  color: "#6b7280",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Page {currentPage} — {activeSection.title}
              </p>
            </div>
            <div
              className="rounded-lg p-5"
              style={{ background: "#f8f9fb", border: "1px solid #e5e7eb" }}
            >
              <p style={{ fontSize: 14, color: "#1a1a2e", lineHeight: 1.8 }}>
                {activeSection.content}
              </p>
            </div>
          </div>

          {/* Table of contents preview */}
          <div>
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: 12,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Document Contents
            </p>
            <div className="flex flex-col" style={{ gap: 0 }}>
              {SECTIONS.map((section, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between py-2"
                  style={{
                    borderBottom:
                      i < SECTIONS.length - 1 ? "1px solid #f3f4f6" : "none",
                    background:
                      section.page === activeSection.page
                        ? "#f0f4ff"
                        : "transparent",
                    paddingLeft:
                      section.title.startsWith("3.") ||
                      section.title.startsWith("4.") ||
                      section.title.startsWith("5.")
                        ? 16
                        : 0,
                    paddingRight: 4,
                    borderRadius: 4,
                  }}
                >
                  <div className="flex items-center gap-2">
                    {section.page === activeSection.page && (
                      <ChevronRight
                        size={12}
                        style={{ color: "#4f46e5", flexShrink: 0 }}
                      />
                    )}
                    <span
                      style={{
                        fontSize: 13,
                        color:
                          section.page === activeSection.page
                            ? "#4f46e5"
                            : "#374151",
                        fontWeight:
                          section.page === activeSection.page ? 600 : 400,
                      }}
                    >
                      {section.title}
                    </span>
                  </div>
                  <span style={{ fontSize: 12, color: "#9ca3af" }}>
                    {section.page}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: 16,
              marginTop: "auto",
            }}
          >
            <p
              style={{
                fontSize: 10,
                color: "#9ca3af",
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              CONFIDENTIAL — FOR CLINICAL USE ONLY · LaserDevice Pro Clinical
              Manual v3.2
              <br />© 2025 LaserDevice Corp. All rights reserved. Unauthorized
              reproduction prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
