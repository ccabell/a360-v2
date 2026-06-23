/**
 * A360 Agent Exchange — demo catalog data.
 *
 * Clean, self-contained model harvested from the legacy MUI exchange (reference
 * only). Each entry is one agent card. `kind` makes this a registry: today every
 * entry is "static" (gallery + narrative); a future entry can be "live" (a real
 * component on the agent runtime) or "embed" (an external deployed demo) without
 * touching the grid or detail page.
 *
 * Add an agent = add one object here.
 */

export type AgentKind = "static" | "live" | "embed";

export interface ExchangeAgent {
  slug: string;
  name: string;
  publisher: string;
  developer: string;
  /** Drives the catalog filter chips. */
  category: string;
  tagline: string;
  description: string;
  price: "Free" | "Premium";
  rating: number;
  reviews: number;
  /** Path under /public. Omit to render a lettered chip fallback. */
  logo?: string;
  /** Catalog cover image. Defaults to screenshots[0] when omitted. */
  cover?: string;
  screenshots: string[];
  features: string[];
  useCases: { label: string; description: string }[];
  tagGroups: { category: string; items: string[] }[];
  updates: { title: string; date: string; description: string }[];
  size: string;
  lastUpdate: string;
  /** Registry hook: how this card is presented. Default "static". */
  kind: AgentKind;
  /** For kind === "embed". */
  href?: string;
}

export const AGENTS: ExchangeAgent[] = [
  {
    slug: "kpi",
    name: "KPI Agent",
    publisher: "Aesthetics360",
    developer: "Aesthetics360",
    category: "Analytics",
    tagline:
      "Performance intelligence to drive clinical efficiency and revenue growth.",
    description:
      "The KPI Agent monitors consultation behavior and provides actionable insights on sales performance, communication effectiveness, and patient education. It identifies coaching opportunities and tracks improvements across teams to maximize ROI per consult.",
    price: "Premium",
    rating: 4.5,
    reviews: 65,
    logo: "/exchange/logos/kpi.png",
    cover: "/exchange/shots/kpi/3.jpg",
    screenshots: [
      "/exchange/shots/kpi/1.jpg",
      "/exchange/shots/kpi/2.jpg",
      "/exchange/shots/kpi/3.jpg",
      "/exchange/shots/kpi/4.jpg",
      "/exchange/shots/kpi/5.jpg",
      "/exchange/shots/kpi/6.jpg",
    ],
    features: [
      "Speech analysis",
      "KPI scoring",
      "Performance benchmarking",
      "Conversion behavior detection",
    ],
    useCases: [
      {
        label: "Team coaching",
        description:
          "Identify individual and group coaching needs through performance insights.",
      },
      {
        label: "Consult analytics",
        description:
          "Analyze consultation metrics to optimize sales and clinical processes.",
      },
      {
        label: "Sales effectiveness monitoring",
        description:
          "Track and evaluate sales performance across staff for continuous improvement.",
      },
      {
        label: "Patient communication analysis",
        description:
          "Assess communication quality during consults to enhance patient engagement.",
      },
    ],
    tagGroups: [
      {
        category: "Use Cases",
        items: ["Team Coaching", "Consult Analytics", "Sales Monitoring", "Comm Analysis"],
      },
      {
        category: "Intelligence Layer",
        items: ["Speech Analysis", "KPI Scoring", "Benchmarking", "Conversion Detection"],
      },
      {
        category: "Business Value",
        items: ["Conversion Boost", "Performance Standards", "Manager Support", "Operational Insights"],
      },
    ],
    updates: [
      {
        title: "Enhanced KPI dashboard",
        date: "2024-12-05",
        description:
          "Introduced real-time performance dashboards and enhanced conversion tracking metrics.",
      },
      {
        title: "Initial release",
        date: "2024-11-01",
        description:
          "Launched KPI Agent with core analytics and coaching insights features.",
      },
    ],
    size: "130 MB",
    lastUpdate: "2024-12-05",
    kind: "static",
  },
  {
    slug: "dr-tim-pearce",
    name: "Dr. Tim Pearce Aesthetic Training Agent",
    publisher: "Dr. Tim Pearce",
    developer: "Aesthetics360 & SkinViva Training Academy",
    category: "Training",
    tagline:
      "AI-powered injector education assistant grounded in safety and mastery.",
    description:
      "An AI-powered injector education assistant grounded in safety and mastery, offering scenario-based coaching, complication management protocols, and anatomy-guided procedural guidance.",
    price: "Premium",
    rating: 4.8,
    reviews: 73,
    logo: "/exchange/logos/dr-tim-pearce.png",
    screenshots: [
      "/exchange/shots/dr-tim-pearce/1.jpg",
      "/exchange/shots/dr-tim-pearce/2.jpg",
      "/exchange/shots/dr-tim-pearce/3.jpg",
      "/exchange/shots/dr-tim-pearce/4.jpg",
      "/exchange/shots/dr-tim-pearce/5.jpg",
    ],
    features: [
      "NLP-driven training video synthesis",
      "Clinical decision trees for emergency management",
      "Case-based adaptive learning logic",
      "Visual anatomy overlays for procedural planning",
      "Structured eLearning modules for Botox® and fillers",
      "Interactive quizzes, case studies, and video demos",
      "Certification tracking and progress monitoring",
      "Comprehensive resource library of guidelines and articles",
    ],
    useCases: [
      {
        label: "Complication management training",
        description: "Simulate adverse event scenarios and practice reversal protocols.",
      },
      {
        label: "Injection technique refinement",
        description:
          "Receive guided feedback on neuromodulator and filler injection methods.",
      },
      {
        label: "Anatomy-based procedure guidance",
        description: "Overlay facial anatomy visuals to plan safe injection pathways.",
      },
      {
        label: "Safety-first clinical decision support",
        description:
          "Consult clinical decision trees for aesthetic emergencies in real time.",
      },
    ],
    tagGroups: [
      {
        category: "Use Cases",
        items: ["Complication Training", "Technique Refinement", "Anatomy Guidance", "Emergency Support"],
      },
      {
        category: "Specialty Focus",
        items: ["Neuromodulator Safety", "Filler Techniques", "Reversal Protocols", "Anatomy Education"],
      },
      {
        category: "Business Value",
        items: ["Risk Reduction", "Provider Confidence", "Training Standardization", "Safer Outcomes"],
      },
    ],
    updates: [
      {
        title: "Expanded complication management library",
        date: "2024-12-01",
        description:
          "Added new case studies and protocols for vascular occlusion and filler-related emergencies.",
      },
      {
        title: "Initial release",
        date: "2024-07-15",
        description:
          "Launched Dr. Tim Pearce Aesthetic Training Agent with foundational eLearning modules and anatomy-guided coaching.",
      },
    ],
    size: "120 MB",
    lastUpdate: "2024-12-01",
    kind: "static",
  },
  {
    slug: "carecredit",
    name: "CareCredit Patient Financing Agent",
    publisher: "Aesthetics360 & CareCredit",
    developer: "Aesthetics360 & CareCredit",
    category: "Financial",
    tagline:
      "AI-powered financing assistant for patient affordability and case acceptance.",
    description:
      "An AI-powered financing assistant that helps aesthetic providers present and manage CareCredit patient financing options directly within their consult workflow. It offers real-time prequalification, payment estimates, and tailored plan recommendations to boost acceptance of high-ticket treatments.",
    price: "Premium",
    rating: 4.2,
    reviews: 54,
    logo: "/exchange/logos/carecredit.png",
    screenshots: [
      "/exchange/shots/carecredit/1.jpg",
      "/exchange/shots/carecredit/2.jpg",
      "/exchange/shots/carecredit/3.jpg",
      "/exchange/shots/carecredit/4.jpg",
    ],
    features: [
      "Prequalification engine with soft credit checks",
      "NLP-powered consult script generator",
      "Dynamic offer matching by treatment type",
      "BNPL behavior modeling for conversion optimization",
      "Step-by-step CareCredit onboarding support",
      "Prequalification workflow templates for forms and follow-ups",
      "Automated financing reminders and tagging",
      "CRM integration for offer display and tracking",
    ],
    useCases: [
      {
        label: "Real-time financing prequalification",
        description: "Instant soft-credit checks and eligibility estimates during intake.",
      },
      {
        label: "Monthly payment calculator integration",
        description: "Embed dynamic payment estimators into consult presentations.",
      },
      {
        label: "Financing option presentation",
        description: "Display deferred interest or fixed-payment offers at point of care.",
      },
      {
        label: "Case acceptance workflow automation",
        description: "Trigger follow-up reminders and CRM tags for prequalified leads.",
      },
    ],
    tagGroups: [
      {
        category: "Use Cases",
        items: ["Prequalification", "Payment Estimates", "Option Presentation", "Workflow Automation"],
      },
      {
        category: "Specialty Focus",
        items: ["Affordability", "High-Ticket Financing", "POS/CRM Sync", "Deferred Interest"],
      },
      {
        category: "Business Value",
        items: ["Case Acceptance", "Objection Reduction", "Treatment Speed", "Revenue Alignment"],
      },
    ],
    updates: [
      {
        title: "Monthly compliance & UX update",
        date: "2024-12-01",
        description:
          "Updated workflows for branding, compliance, and enhanced application UX.",
      },
      {
        title: "Initial release",
        date: "2024-06-15",
        description:
          "Launched CareCredit Patient Financing Agent with core prequalification and payment estimation features.",
      },
    ],
    size: "84 MB",
    lastUpdate: "2024-12-01",
    kind: "static",
  },
  {
    slug: "lumira",
    name: "Lumira",
    publisher: "Aesthetics360",
    developer: "Aesthetics360",
    category: "Imaging",
    tagline: "Your aesthetic future, visualized.",
    description:
      "Lumira turns a single selfie into a clinical-grade aesthetic forecast. It renders a side-by-side 30-year age progression — the patient's future with and without a treatment plan — mapped to specific facial areas and explained in plain language, so the value of acting now is impossible to miss.",
    price: "Premium",
    rating: 4.9,
    reviews: 38,
    screenshots: [
      "/exchange/shots/lumira/1.jpg",
      "/exchange/shots/lumira/2.jpg",
      "/exchange/shots/lumira/3.jpg",
      "/exchange/shots/lumira/4.jpg",
    ],
    features: [
      "Single-photo facial analysis",
      "Clinical-grade skin, structure & potential assessment",
      "30-year age-progression visualization",
      "Side-by-side with / without a treatment plan",
      "Age timeline scrubber (36–65)",
      "Area-by-area treatment map",
      "Plain-language treatment library",
    ],
    useCases: [
      {
        label: "Consultation visualization",
        description:
          "Show patients their projected aging with and without treatment to anchor the conversation.",
      },
      {
        label: "Preventive planning",
        description:
          "Make the case for starting early by visualizing long-term outcomes of acting now vs. waiting.",
      },
      {
        label: "Treatment education",
        description:
          "Explain recommended areas and procedures in plain language tied to the patient's own face.",
      },
      {
        label: "Case acceptance",
        description:
          "Turn an abstract treatment plan into a concrete, personalized future the patient can see.",
      },
    ],
    tagGroups: [
      {
        category: "Experience",
        items: ["Selfie Analysis", "Age Progression", "With/Without", "Timeline Scrubber"],
      },
      {
        category: "Intelligence Layer",
        items: ["Facial Assessment", "Treatment Mapping", "Outcome Modeling"],
      },
      {
        category: "Business Value",
        items: ["Case Acceptance", "Preventive Demand", "Patient Engagement"],
      },
    ],
    updates: [
      {
        title: "Live demo",
        date: "2026-06-22",
        description:
          "Interactive consumer demo published — single-photo analysis with the with/without aging timeline.",
      },
    ],
    size: "Web app",
    lastUpdate: "2026-06-22",
    kind: "embed",
    href: "https://agelessdemo.vercel.app/",
  },
  {
    slug: "video-navigator",
    name: "Video Navigator",
    publisher: "Aesthetics360",
    developer: "Aesthetics360",
    category: "Knowledge",
    tagline: "Every aesthetics video, intelligently navigated.",
    description:
      "The Video Navigator turns a sprawling library of real aesthetics videos into curated, searchable intelligence. Every video is summarised and tagged by facial & body area, patient concern, treatment and type — so clinicians can filter, search and watch in-app, or simply ask a clinical question and get an answer grounded only in the videos, citing the exact moment on YouTube.",
    price: "Free",
    rating: 4.8,
    reviews: 27,
    screenshots: [],
    features: [
      "Curated, tagged library across many channels",
      "Filter by facial & body area, concern, treatment & type",
      "Full-text search over titles and summaries",
      "In-app video player with related-video suggestions",
      "Ask-the-library RAG chat grounded in real videos",
      "Every answer cites the exact second on YouTube",
      "Standalone surface — works independent of the dashboard",
    ],
    useCases: [
      {
        label: "Pre-consult prep",
        description:
          "Find the most relevant technique and safety videos for an upcoming treatment in seconds.",
      },
      {
        label: "Clinical questions",
        description:
          "Ask about technique, devices, dosing or complications and get a grounded, cited answer.",
      },
      {
        label: "Team training",
        description:
          "Hand new clinicians a structured library instead of an unfiltered search feed.",
      },
      {
        label: "Patient education",
        description:
          "Surface patient-safe explainer videos mapped to a specific concern or area.",
      },
    ],
    tagGroups: [
      {
        category: "Experience",
        items: ["Ask", "Navigate", "Learn", "In-app Player"],
      },
      {
        category: "Intelligence Layer",
        items: ["Video Tagging", "Semantic Retrieval", "Timestamp Citations"],
      },
      {
        category: "Business Value",
        items: ["Faster Prep", "Team Enablement", "Patient Education"],
      },
    ],
    updates: [
      {
        title: "Landing & standalone surface",
        date: "2026-06-23",
        description:
          "Added a landing page with Ask / Navigate / Learn entry points and a standalone /tube surface that runs independent of the dashboard.",
      },
    ],
    size: "Web app",
    lastUpdate: "2026-06-23",
    kind: "embed",
    href: "/tube",
  },
];

export function getAgent(slug: string): ExchangeAgent | undefined {
  return AGENTS.find((a) => a.slug === slug);
}

export const CATEGORIES: string[] = Array.from(
  new Set(AGENTS.map((a) => a.category)),
).sort();
