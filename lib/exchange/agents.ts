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
  /**
   * Maps this card to a lib/portfolio/registry.ts prototype. Audience
   * share-link visitors only see cards whose portfolioSlug is in their
   * audience; cards without one are internal/beta-only in audience views.
   */
  portfolioSlug?: string;
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
    portfolioSlug: "lumira",
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
    portfolioSlug: "tube",
  },

  // ---------------------------------------------------------------------------
  // Placeholders — A360 core agents. Copy is on-brand but provisional; add real
  // logos/screenshots to public/exchange and wire kind:"live" when ready.
  // ---------------------------------------------------------------------------
  {
    slug: "scribe",
    name: "Scribe",
    publisher: "Aesthetics360",
    developer: "Aesthetics360",
    category: "Documentation",
    tagline: "Real-time consultation transcription — capture, document, and share seamlessly.",
    description:
      "Scribe integrates into your EMR workflow as a real-time transcription layer. It captures consultation audio, diarizes speaker roles, and produces clean, searchable transcripts that sync directly into your patient records — so providers can stay fully engaged with patients while building an accurate consultation record that feeds downstream documentation, planning, and follow-up work.",
    price: "Premium",
    rating: 4.7,
    reviews: 52,
    screenshots: [
      "/exchange/shots/scribe/1.jpg",
      "/exchange/shots/scribe/2.jpg",
      "/exchange/shots/scribe/3.jpg",
      "/exchange/shots/scribe/4.jpg",
    ],
    features: [
      "Real-time ambient transcription (EMR-integrated)",
      "Automatic speaker diarization (provider / patient)",
      "Aesthetics-clinical vocabulary tuning",
      "HIPAA-compliant consult room audio handling",
      "Searchable transcripts in your EMR",
      "Zero charting friction during consultation",
    ],
    useCases: [
      {
        label: "Stay present during consults",
        description: "Capture full consultation details and decisions hands-free, keeping focus and eye contact with the patient.",
      },
      {
        label: "Feed EMR documentation workflows",
        description: "Transcripts automatically integrate with Notes, TCP, and KPI modules without manual re-entry.",
      },
      {
        label: "Build compliance records",
        description: "Every consultation is captured, timestamped, and stored as an audit trail in your EMR.",
      },
    ],
    tagGroups: [
      { category: "EMR Layer", items: ["Real-time Capture", "Workflow Automation", "Audit Trail"] },
      { category: "Clinical Benefit", items: ["Patient Engagement", "Documentation Speed", "Accuracy Record"] },
    ],
    updates: [
      {
        title: "EMR integration",
        date: "2026-06-23",
        description: "Add as a consultation capture module to your existing EMR workflow.",
      },
    ],
    size: "EMR module",
    lastUpdate: "2026-06-23",
    kind: "static",
    portfolioSlug: "scribe",
  },
  {
    slug: "notes",
    name: "Notes",
    publisher: "Aesthetics360",
    developer: "Aesthetics360",
    category: "Documentation",
    tagline: "Transcripts become clinical documentation — automatically drafted and ready to sign.",
    description:
      "Notes is the documentation layer of your EMR that transforms consultation transcripts into structured clinical notes. It auto-generates SOAP notes, summaries, and procedure recommendations matched to your practice template — all ready for provider review and sign-off in minutes instead of hours, so charting never slows down a busy clinic.",
    price: "Premium",
    rating: 4.6,
    reviews: 48,
    screenshots: [
      "/exchange/shots/notes/1.jpg",
      "/exchange/shots/notes/2.jpg",
      "/exchange/shots/notes/3.jpg",
      "/exchange/shots/notes/4.jpg",
    ],
    features: [
      "Transcript-to-clinical-note generation (EMR-native)",
      "Practice-specific SOAP and template matching",
      "Auto-extracted procedures, findings, and recommendations",
      "Draft-review-sign workflow in EMR",
      "Consistent note structure across all providers",
      "One-click signature and archival",
    ],
    useCases: [
      {
        label: "Speed up charting",
        description: "Generate a complete first-draft note immediately after the consult — ready for review, edit, and sign.",
      },
      {
        label: "Standardize documentation",
        description: "Every note follows your practice template and clinical standards, regardless of which provider.",
      },
      {
        label: "Reduce charting backlog",
        description: "Cut note-writing time by 70%+ and eliminate end-of-day documentation stress.",
      },
    ],
    tagGroups: [
      { category: "EMR Layer", items: ["Auto-generation", "Template Matching", "Workflow Speed"] },
      { category: "Clinical Benefit", items: ["Charting Efficiency", "Consistency", "Compliance Ready"] },
    ],
    updates: [
      {
        title: "EMR documentation module",
        date: "2026-06-23",
        description: "Add as a post-consult documentation layer to your EMR.",
      },
    ],
    size: "EMR module",
    lastUpdate: "2026-06-23",
    kind: "static",
  },
  {
    slug: "tcp",
    name: "TCP — Treatment & Care Plans",
    publisher: "Aesthetics360",
    developer: "Aesthetics360",
    category: "Planning",
    tagline: "Real-time treatment plans in the consultation room — mapped to patient concerns.",
    description:
      "TCP integrates into your EMR consultation workflow to generate multi-tiered treatment and care plan options on the fly. It maps patient-stated concerns to recommended procedures, anatomy-specific considerations, and realistic outcomes — so providers can confidently present tiered options (good / better / best) while the patient is still in the room, drive case acceptance, and automatically log plans into the EMR.",
    price: "Premium",
    rating: 4.5,
    reviews: 37,
    screenshots: [
      "/exchange/shots/tcp/1.jpg",
      "/exchange/shots/tcp/2.jpg",
      "/exchange/shots/tcp/3.jpg",
      "/exchange/shots/tcp/4.jpg",
      "/exchange/shots/tcp/5.jpg",
      "/exchange/shots/tcp/6.jpg",
      "/exchange/shots/tcp/7.jpg",
      "/exchange/shots/tcp/8.jpg",
    ],
    features: [
      "Real-time tiered plan generation (good / better / best)",
      "Patient concern → treatment mapping",
      "Anatomy-specific procedure recommendations",
      "Patient-ready presentation summaries",
      "Pricing integration with practice fee schedules",
      "One-click EMR plan documentation",
    ],
    useCases: [
      {
        label: "Present options in-consult",
        description: "Generate tiered treatment plans while the patient is in the room to increase case acceptance and perceived value.",
      },
      {
        label: "Tie recommendations to concerns",
        description: "Show exactly why each procedure addresses the patient's specific aesthetic goals.",
      },
      {
        label: "Log plans automatically",
        description: "Treatment plans sync directly into the EMR patient record for follow-up and compliance.",
      },
    ],
    tagGroups: [
      { category: "EMR Layer", items: ["Real-time", "Tiered Options", "Anatomy-aware"] },
      { category: "Clinical & Revenue", items: ["Case Acceptance", "Patient Clarity", "Opportunity Capture"] },
    ],
    updates: [
      {
        title: "EMR planning module",
        date: "2026-06-23",
        description: "Add as an in-consult treatment planning layer to your EMR.",
      },
    ],
    size: "EMR module",
    lastUpdate: "2026-06-23",
    kind: "static",
    portfolioSlug: "tcp-demo",
  },
  {
    slug: "reach",
    name: "Reach",
    publisher: "Aesthetics360",
    developer: "Aesthetics360",
    category: "Marketing",
    tagline: "Extract opportunities and automate post-treatment engagement — directly from your EMR.",
    description:
      "Reach is the post-treatment engagement layer that integrates with your EMR to automatically extract revenue opportunities and coordinate timely, compliance-gated follow-up. It identifies primary, secondary, and future opportunities from each treatment, then orchestrates reminders, check-ins, and targeted offers — so opportunities don't slip through the cracks and patients stay engaged without manual work.",
    price: "Premium",
    rating: 4.4,
    reviews: 41,
    screenshots: [
      "/exchange/shots/reach/1.jpg",
      "/exchange/shots/reach/2.jpg",
      "/exchange/shots/reach/3.jpg",
      "/exchange/shots/reach/4.jpg",
    ],
    features: [
      "Auto-extract primary, secondary, and future opportunities from EMR records",
      "Compliance-gated outbound messaging (SMS, email, phone)",
      "Automated post-treatment follow-up scheduling",
      "Timed reminders and recall campaigns",
      "CRM sync and opportunity tracking",
      "Practice-level consent and compliance verification",
    ],
    useCases: [
      {
        label: "Capture revenue in the record",
        description: "Extract identified opportunities directly from consultation notes and treatment plans in your EMR.",
      },
      {
        label: "Automate patient engagement",
        description: "Schedule timely, personalized follow-up (check-ins, reminders, next-step offers) automatically after each treatment.",
      },
      {
        label: "Increase lifetime value",
        description: "Keep patients engaged with preventive care reminders and complementary treatment recommendations, driving higher LTV.",
      },
    ],
    tagGroups: [
      { category: "EMR Layer", items: ["Opportunity Extraction", "Workflow Automation", "Compliance-gated"] },
      { category: "Business Impact", items: ["Patient Retention", "Lifetime Value", "Opportunity Capture"] },
    ],
    updates: [
      {
        title: "EMR engagement module",
        date: "2026-06-23",
        description: "Add as a post-treatment follow-up and opportunity layer to your EMR.",
      },
    ],
    size: "EMR module",
    lastUpdate: "2026-06-23",
    kind: "static",
    portfolioSlug: "reach",
  },
];

export function getAgent(slug: string): ExchangeAgent | undefined {
  return AGENTS.find((a) => a.slug === slug);
}

export const CATEGORIES: string[] = Array.from(
  new Set(AGENTS.map((a) => a.category)),
).sort();
