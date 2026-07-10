// One-time seed: migrates the static AGENTS array (lib/exchange/agents.ts) into
// the exchange_agents Supabase table (Global V3). Run once, then the table is
// the source of truth and this script can be deleted.
//
// Usage: node scripts/seed-exchange-agents.mjs
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
config({ path: path.join(__dirname, "..", ".env.local") });

const url = process.env.NEXT_PUBLIC_AGENT_SUPABASE_URL;
const key = process.env.AGENT_SUPABASE_SERVICE_KEY;
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_AGENT_SUPABASE_URL or AGENT_SUPABASE_SERVICE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key);

// Plain-JS mirror of lib/exchange/agents.ts AGENTS (no types, hand-copied for the
// one-time seed — after this runs, lib/exchange/agents.ts becomes a Supabase
// query layer and this literal is no longer the source of truth).
const AGENTS = [
  {
    slug: "kpi", name: "KPI Agent", publisher: "Aesthetics360", developer: "Aesthetics360",
    category: "Analytics",
    tagline: "Performance intelligence to drive clinical efficiency and revenue growth.",
    description: "The KPI Agent monitors consultation behavior and provides actionable insights on sales performance, communication effectiveness, and patient education. It identifies coaching opportunities and tracks improvements across teams to maximize ROI per consult.",
    price: "Premium", rating: 4.5, reviews: 65,
    logo: "/exchange/logos/kpi.png", cover: "/exchange/shots/kpi/3.jpg",
    screenshots: ["/exchange/shots/kpi/1.jpg","/exchange/shots/kpi/2.jpg","/exchange/shots/kpi/3.jpg","/exchange/shots/kpi/4.jpg","/exchange/shots/kpi/5.jpg","/exchange/shots/kpi/6.jpg"],
    features: ["Speech analysis","KPI scoring","Performance benchmarking","Conversion behavior detection"],
    useCases: [
      { label: "Team coaching", description: "Identify individual and group coaching needs through performance insights." },
      { label: "Consult analytics", description: "Analyze consultation metrics to optimize sales and clinical processes." },
      { label: "Sales effectiveness monitoring", description: "Track and evaluate sales performance across staff for continuous improvement." },
      { label: "Patient communication analysis", description: "Assess communication quality during consults to enhance patient engagement." },
    ],
    tagGroups: [
      { category: "Use Cases", items: ["Team Coaching","Consult Analytics","Sales Monitoring","Comm Analysis"] },
      { category: "Intelligence Layer", items: ["Speech Analysis","KPI Scoring","Benchmarking","Conversion Detection"] },
      { category: "Business Value", items: ["Conversion Boost","Performance Standards","Manager Support","Operational Insights"] },
    ],
    updates: [
      { title: "Enhanced KPI dashboard", date: "2024-12-05", description: "Introduced real-time performance dashboards and enhanced conversion tracking metrics." },
      { title: "Initial release", date: "2024-11-01", description: "Launched KPI Agent with core analytics and coaching insights features." },
    ],
    size: "130 MB", lastUpdate: "2024-12-05", kind: "static",
  },
  {
    slug: "dr-tim-pearce", name: "Dr. Tim Pearce Aesthetic Training Agent", publisher: "Dr. Tim Pearce",
    developer: "Aesthetics360 & SkinViva Training Academy", category: "Training",
    tagline: "AI-powered injector education assistant grounded in safety and mastery.",
    description: "An AI-powered injector education assistant grounded in safety and mastery, offering scenario-based coaching, complication management protocols, and anatomy-guided procedural guidance.",
    price: "Premium", rating: 4.8, reviews: 73,
    logo: "/exchange/logos/dr-tim-pearce.png",
    screenshots: ["/exchange/shots/dr-tim-pearce/1.jpg","/exchange/shots/dr-tim-pearce/2.jpg","/exchange/shots/dr-tim-pearce/3.jpg","/exchange/shots/dr-tim-pearce/4.jpg","/exchange/shots/dr-tim-pearce/5.jpg"],
    features: ["NLP-driven training video synthesis","Clinical decision trees for emergency management","Case-based adaptive learning logic","Visual anatomy overlays for procedural planning","Structured eLearning modules for Botox® and fillers","Interactive quizzes, case studies, and video demos","Certification tracking and progress monitoring","Comprehensive resource library of guidelines and articles"],
    useCases: [
      { label: "Complication management training", description: "Simulate adverse event scenarios and practice reversal protocols." },
      { label: "Injection technique refinement", description: "Receive guided feedback on neuromodulator and filler injection methods." },
      { label: "Anatomy-based procedure guidance", description: "Overlay facial anatomy visuals to plan safe injection pathways." },
      { label: "Safety-first clinical decision support", description: "Consult clinical decision trees for aesthetic emergencies in real time." },
    ],
    tagGroups: [
      { category: "Use Cases", items: ["Complication Training","Technique Refinement","Anatomy Guidance","Emergency Support"] },
      { category: "Specialty Focus", items: ["Neuromodulator Safety","Filler Techniques","Reversal Protocols","Anatomy Education"] },
      { category: "Business Value", items: ["Risk Reduction","Provider Confidence","Training Standardization","Safer Outcomes"] },
    ],
    updates: [
      { title: "Expanded complication management library", date: "2024-12-01", description: "Added new case studies and protocols for vascular occlusion and filler-related emergencies." },
      { title: "Initial release", date: "2024-07-15", description: "Launched Dr. Tim Pearce Aesthetic Training Agent with foundational eLearning modules and anatomy-guided coaching." },
    ],
    size: "120 MB", lastUpdate: "2024-12-01", kind: "static",
  },
  {
    slug: "carecredit", name: "CareCredit Patient Financing Agent", publisher: "Aesthetics360 & CareCredit",
    developer: "Aesthetics360 & CareCredit", category: "Financial",
    tagline: "AI-powered financing assistant for patient affordability and case acceptance.",
    description: "An AI-powered financing assistant that helps aesthetic providers present and manage CareCredit patient financing options directly within their consult workflow. It offers real-time prequalification, payment estimates, and tailored plan recommendations to boost acceptance of high-ticket treatments.",
    price: "Premium", rating: 4.2, reviews: 54,
    logo: "/exchange/logos/carecredit.png",
    screenshots: ["/exchange/shots/carecredit/1.jpg","/exchange/shots/carecredit/2.jpg","/exchange/shots/carecredit/3.jpg","/exchange/shots/carecredit/4.jpg"],
    features: ["Prequalification engine with soft credit checks","NLP-powered consult script generator","Dynamic offer matching by treatment type","BNPL behavior modeling for conversion optimization","Step-by-step CareCredit onboarding support","Prequalification workflow templates for forms and follow-ups","Automated financing reminders and tagging","CRM integration for offer display and tracking"],
    useCases: [
      { label: "Real-time financing prequalification", description: "Instant soft-credit checks and eligibility estimates during intake." },
      { label: "Monthly payment calculator integration", description: "Embed dynamic payment estimators into consult presentations." },
      { label: "Financing option presentation", description: "Display deferred interest or fixed-payment offers at point of care." },
      { label: "Case acceptance workflow automation", description: "Trigger follow-up reminders and CRM tags for prequalified leads." },
    ],
    tagGroups: [
      { category: "Use Cases", items: ["Prequalification","Payment Estimates","Option Presentation","Workflow Automation"] },
      { category: "Specialty Focus", items: ["Affordability","High-Ticket Financing","POS/CRM Sync","Deferred Interest"] },
      { category: "Business Value", items: ["Case Acceptance","Objection Reduction","Treatment Speed","Revenue Alignment"] },
    ],
    updates: [
      { title: "Monthly compliance & UX update", date: "2024-12-01", description: "Updated workflows for branding, compliance, and enhanced application UX." },
      { title: "Initial release", date: "2024-06-15", description: "Launched CareCredit Patient Financing Agent with core prequalification and payment estimation features." },
    ],
    size: "84 MB", lastUpdate: "2024-12-01", kind: "static",
  },
  {
    slug: "lumira", name: "Lumira", publisher: "Aesthetics360", developer: "Aesthetics360", category: "Imaging",
    tagline: "Your aesthetic future, visualized.",
    description: "Lumira turns a single selfie into a clinical-grade aesthetic forecast. It renders a side-by-side 30-year age progression — the patient's future with and without a treatment plan — mapped to specific facial areas and explained in plain language, so the value of acting now is impossible to miss.",
    price: "Premium", rating: 4.9, reviews: 38,
    screenshots: ["/exchange/shots/lumira/1.jpg","/exchange/shots/lumira/2.jpg","/exchange/shots/lumira/3.jpg","/exchange/shots/lumira/4.jpg"],
    features: ["Single-photo facial analysis","Clinical-grade skin, structure & potential assessment","30-year age-progression visualization","Side-by-side with / without a treatment plan","Age timeline scrubber (36–65)","Area-by-area treatment map","Plain-language treatment library"],
    useCases: [
      { label: "Consultation visualization", description: "Show patients their projected aging with and without treatment to anchor the conversation." },
      { label: "Preventive planning", description: "Make the case for starting early by visualizing long-term outcomes of acting now vs. waiting." },
      { label: "Treatment education", description: "Explain recommended areas and procedures in plain language tied to the patient's own face." },
      { label: "Case acceptance", description: "Turn an abstract treatment plan into a concrete, personalized future the patient can see." },
    ],
    tagGroups: [
      { category: "Experience", items: ["Selfie Analysis","Age Progression","With/Without","Timeline Scrubber"] },
      { category: "Intelligence Layer", items: ["Facial Assessment","Treatment Mapping","Outcome Modeling"] },
      { category: "Business Value", items: ["Case Acceptance","Preventive Demand","Patient Engagement"] },
    ],
    updates: [
      { title: "Live demo", date: "2026-06-22", description: "Interactive consumer demo published — single-photo analysis with the with/without aging timeline." },
    ],
    size: "Web app", lastUpdate: "2026-06-22", kind: "embed",
    href: "https://agelessdemo.vercel.app/", portfolioSlug: "lumira",
  },
  {
    slug: "video-navigator", name: "Video Navigator", publisher: "Aesthetics360", developer: "Aesthetics360", category: "Knowledge",
    tagline: "Every aesthetics video, intelligently navigated.",
    description: "The Video Navigator turns a sprawling library of real aesthetics videos into curated, searchable intelligence. Every video is summarised and tagged by facial & body area, patient concern, treatment and type — so clinicians can filter, search and watch in-app, or simply ask a clinical question and get an answer grounded only in the videos, citing the exact moment on YouTube.",
    price: "Free", rating: 4.8, reviews: 27, screenshots: [],
    features: ["Curated, tagged library across many channels","Filter by facial & body area, concern, treatment & type","Full-text search over titles and summaries","In-app video player with related-video suggestions","Ask-the-library RAG chat grounded in real videos","Every answer cites the exact second on YouTube","Standalone surface — works independent of the dashboard"],
    useCases: [
      { label: "Pre-consult prep", description: "Find the most relevant technique and safety videos for an upcoming treatment in seconds." },
      { label: "Clinical questions", description: "Ask about technique, devices, dosing or complications and get a grounded, cited answer." },
      { label: "Team training", description: "Hand new clinicians a structured library instead of an unfiltered search feed." },
      { label: "Patient education", description: "Surface patient-safe explainer videos mapped to a specific concern or area." },
    ],
    tagGroups: [
      { category: "Experience", items: ["Ask","Navigate","Learn","In-app Player"] },
      { category: "Intelligence Layer", items: ["Video Tagging","Semantic Retrieval","Timestamp Citations"] },
      { category: "Business Value", items: ["Faster Prep","Team Enablement","Patient Education"] },
    ],
    updates: [
      { title: "Landing & standalone surface", date: "2026-06-23", description: "Added a landing page with Ask / Navigate / Learn entry points and a standalone /tube surface that runs independent of the dashboard." },
    ],
    size: "Web app", lastUpdate: "2026-06-23", kind: "embed", href: "/tube", portfolioSlug: "tube",
  },
  {
    slug: "scribe", name: "Scribe", publisher: "Aesthetics360", developer: "Aesthetics360", category: "Documentation",
    tagline: "Real-time consultation transcription — capture, document, and share seamlessly.",
    description: "Scribe integrates into your EMR workflow as a real-time transcription layer. It captures consultation audio, diarizes speaker roles, and produces clean, searchable transcripts that sync directly into your patient records — so providers can stay fully engaged with patients while building an accurate consultation record that feeds downstream documentation, planning, and follow-up work.",
    price: "Premium", rating: 4.7, reviews: 52,
    screenshots: ["/exchange/shots/scribe/1.jpg","/exchange/shots/scribe/2.jpg","/exchange/shots/scribe/3.jpg","/exchange/shots/scribe/4.jpg"],
    features: ["Real-time ambient transcription (EMR-integrated)","Automatic speaker diarization (provider / patient)","Aesthetics-clinical vocabulary tuning","HIPAA-compliant consult room audio handling","Searchable transcripts in your EMR","Zero charting friction during consultation"],
    useCases: [
      { label: "Stay present during consults", description: "Capture full consultation details and decisions hands-free, keeping focus and eye contact with the patient." },
      { label: "Feed EMR documentation workflows", description: "Transcripts automatically integrate with Notes, TCP, and KPI modules without manual re-entry." },
      { label: "Build compliance records", description: "Every consultation is captured, timestamped, and stored as an audit trail in your EMR." },
    ],
    tagGroups: [
      { category: "EMR Layer", items: ["Real-time Capture","Workflow Automation","Audit Trail"] },
      { category: "Clinical Benefit", items: ["Patient Engagement","Documentation Speed","Accuracy Record"] },
    ],
    updates: [
      { title: "EMR integration", date: "2026-06-23", description: "Add as a consultation capture module to your existing EMR workflow." },
    ],
    size: "EMR module", lastUpdate: "2026-06-23", kind: "static", portfolioSlug: "scribe",
    badges: ["Flagship"], verified: true, verifiedDate: "2026-07-01", installCount: "290+ practices",
    emrCompatibility: ["Boulevard","Aesthetic Record","PatientNow","Symplast"], integrationDepth: "Native",
    integrations: [{ name: "Notes", type: "A360 agent" },{ name: "TCP", type: "A360 agent" },{ name: "KPI", type: "A360 agent" }],
    dataFields: { reads: ["Consultation audio","Patient name","Appointment context"], writes: ["Speaker-labeled transcript","Consultation timestamp","Searchable note index"], retention: "Configurable — 30 / 90 / 365 days; audio can auto-delete" },
    kpis: [{ label: "Avg. review time", value: "38 sec" },{ label: "Provider-hours saved / wk", value: "6.4" },{ label: "Charts with GFE language", value: "100%" }],
    pricingTiers: [
      { name: "Solo", price: "$199", note: "per provider / mo", features: ["Real-time transcription","EMR write-back","Searchable transcripts"] },
      { name: "Group", price: "$699", note: "per location / mo", features: ["Everything in Solo","Multi-provider co-sign queue","MSO rollup dashboard","Priority support"] },
    ],
    agentReviews: [
      { author: "NP owner, medspa", role: "Nashville, TN", rating: 5, quote: "I used to chart at my kitchen table at 9pm. Now I co-sign before the patient reaches the parking lot." },
      { author: "MSO clinical director", role: "9 locations", rating: 5, quote: "The GFE flagging alone survived our compliance audit. The EMR-native write-back is the part nobody else does." },
    ],
  },
  {
    slug: "notes", name: "Notes", publisher: "Aesthetics360", developer: "Aesthetics360", category: "Documentation",
    tagline: "Transcripts become clinical documentation — automatically drafted and ready to sign.",
    description: "Notes is the documentation layer of your EMR that transforms consultation transcripts into structured clinical notes. It auto-generates SOAP notes, summaries, and procedure recommendations matched to your practice template — all ready for provider review and sign-off in minutes instead of hours, so charting never slows down a busy clinic.",
    price: "Premium", rating: 4.6, reviews: 48,
    screenshots: ["/exchange/shots/notes/1.jpg","/exchange/shots/notes/2.jpg","/exchange/shots/notes/3.jpg","/exchange/shots/notes/4.jpg"],
    features: ["Transcript-to-clinical-note generation (EMR-native)","Practice-specific SOAP and template matching","Auto-extracted procedures, findings, and recommendations","Draft-review-sign workflow in EMR","Consistent note structure across all providers","One-click signature and archival"],
    useCases: [
      { label: "Speed up charting", description: "Generate a complete first-draft note immediately after the consult — ready for review, edit, and sign." },
      { label: "Standardize documentation", description: "Every note follows your practice template and clinical standards, regardless of which provider." },
      { label: "Reduce charting backlog", description: "Cut note-writing time by 70%+ and eliminate end-of-day documentation stress." },
    ],
    tagGroups: [
      { category: "EMR Layer", items: ["Auto-generation","Template Matching","Workflow Speed"] },
      { category: "Clinical Benefit", items: ["Charting Efficiency","Consistency","Compliance Ready"] },
    ],
    updates: [
      { title: "EMR documentation module", date: "2026-06-23", description: "Add as a post-consult documentation layer to your EMR." },
    ],
    size: "EMR module", lastUpdate: "2026-06-23", kind: "static",
    verified: true, verifiedDate: "2026-07-01", installCount: "240+ practices",
    emrCompatibility: ["Boulevard","Aesthetic Record","PatientNow","Symplast"], integrationDepth: "Native",
    integrations: [{ name: "Scribe", type: "A360 agent" },{ name: "TCP", type: "A360 agent" }],
    dataFields: { reads: ["Consultation transcript","Practice note template","Provider identity"], writes: ["SOAP note draft","Procedure & findings","Signature + archival record"], retention: "Stored in your EMR under your BAA; never used to train shared models" },
    kpis: [{ label: "Charting time cut", value: "70%+" },{ label: "Note-to-sign", value: "< 5 min" },{ label: "Template consistency", value: "100%" }],
    pricingTiers: [
      { name: "Solo", price: "$149", note: "per provider / mo", features: ["Transcript-to-note generation","Practice template matching","Draft-review-sign workflow"] },
      { name: "Group", price: "$499", note: "per location / mo", features: ["Everything in Solo","Multi-provider standardization","Co-sign queue","Priority support"] },
    ],
    agentReviews: [
      { author: "Medical director, dermatology", role: "Denver, CO", rating: 5, quote: "Our notes finally read the same no matter who saw the patient. End-of-day charting backlog is gone." },
      { author: "Practice manager, medspa", role: "Austin, TX", rating: 4, quote: "First-draft quality is high enough that review is genuinely a review, not a rewrite." },
    ],
  },
  {
    slug: "tcp", name: "TCP — Treatment & Care Plans", publisher: "Aesthetics360", developer: "Aesthetics360", category: "Planning",
    tagline: "Real-time treatment plans in the consultation room — mapped to patient concerns.",
    description: "TCP integrates into your EMR consultation workflow to generate multi-tiered treatment and care plan options on the fly. It maps patient-stated concerns to recommended procedures, anatomy-specific considerations, and realistic outcomes — so providers can confidently present tiered options (good / better / best) while the patient is still in the room, drive case acceptance, and automatically log plans into the EMR.",
    price: "Premium", rating: 4.5, reviews: 37,
    screenshots: ["/exchange/shots/tcp/1.jpg","/exchange/shots/tcp/2.jpg","/exchange/shots/tcp/3.jpg","/exchange/shots/tcp/4.jpg","/exchange/shots/tcp/5.jpg","/exchange/shots/tcp/6.jpg","/exchange/shots/tcp/7.jpg","/exchange/shots/tcp/8.jpg"],
    features: ["Real-time tiered plan generation (good / better / best)","Patient concern → treatment mapping","Anatomy-specific procedure recommendations","Patient-ready presentation summaries","Pricing integration with practice fee schedules","One-click EMR plan documentation"],
    useCases: [
      { label: "Present options in-consult", description: "Generate tiered treatment plans while the patient is in the room to increase case acceptance and perceived value." },
      { label: "Tie recommendations to concerns", description: "Show exactly why each procedure addresses the patient's specific aesthetic goals." },
      { label: "Log plans automatically", description: "Treatment plans sync directly into the EMR patient record for follow-up and compliance." },
    ],
    tagGroups: [
      { category: "EMR Layer", items: ["Real-time","Tiered Options","Anatomy-aware"] },
      { category: "Clinical & Revenue", items: ["Case Acceptance","Patient Clarity","Opportunity Capture"] },
    ],
    updates: [
      { title: "EMR planning module", date: "2026-06-23", description: "Add as an in-consult treatment planning layer to your EMR." },
    ],
    size: "EMR module", lastUpdate: "2026-06-23", kind: "static", portfolioSlug: "tcp-demo",
    badges: ["Flagship"], verified: true, verifiedDate: "2026-07-01", installCount: "180+ practices",
    emrCompatibility: ["Boulevard","Aesthetic Record","PatientNow"], integrationDepth: "Native",
    integrations: [{ name: "Scribe", type: "A360 agent" },{ name: "Reach", type: "A360 agent" },{ name: "Practice fee schedule", type: "Pricing source" }],
    dataFields: { reads: ["Patient concerns","Consultation transcript","Practice fee schedule"], writes: ["Tiered treatment plan","Procedure recommendations","Plan record in EMR"], retention: "Plans persist in the EMR patient record for follow-up and compliance" },
    kpis: [{ label: "Plan built in", value: "In-consult" },{ label: "Tiers presented", value: "Good / Better / Best" },{ label: "Case acceptance lift", value: "+20%" }],
    pricingTiers: [
      { name: "Solo", price: "$249", note: "per provider / mo", features: ["Real-time tiered plans","Concern-to-treatment mapping","EMR plan documentation"] },
      { name: "Group", price: "$849", note: "per location / mo", features: ["Everything in Solo","Fee-schedule integration","MSO plan analytics","Priority support"] },
    ],
    agentReviews: [
      { author: "Owner, medspa", role: "Scottsdale, AZ", rating: 5, quote: "Presenting good/better/best while the patient is still in the room changed our close rate on filler plans." },
      { author: "PA, plastic surgery", role: "Newport Beach, CA", rating: 4, quote: "Tying each recommendation to the concern the patient actually said makes the plan sell itself." },
    ],
  },
  {
    slug: "reach", name: "Reach", publisher: "Aesthetics360", developer: "Aesthetics360", category: "Marketing",
    tagline: "Extract opportunities and automate post-treatment engagement — directly from your EMR.",
    description: "Reach is the post-treatment engagement layer that integrates with your EMR to automatically extract revenue opportunities and coordinate timely, compliance-gated follow-up. It identifies primary, secondary, and future opportunities from each treatment, then orchestrates reminders, check-ins, and targeted offers — so opportunities don't slip through the cracks and patients stay engaged without manual work.",
    price: "Premium", rating: 4.4, reviews: 41,
    screenshots: ["/exchange/shots/reach/1.jpg","/exchange/shots/reach/2.jpg","/exchange/shots/reach/3.jpg","/exchange/shots/reach/4.jpg"],
    features: ["Auto-extract primary, secondary, and future opportunities from EMR records","Compliance-gated outbound messaging (SMS, email, phone)","Automated post-treatment follow-up scheduling","Timed reminders and recall campaigns","CRM sync and opportunity tracking","Practice-level consent and compliance verification"],
    useCases: [
      { label: "Capture revenue in the record", description: "Extract identified opportunities directly from consultation notes and treatment plans in your EMR." },
      { label: "Automate patient engagement", description: "Schedule timely, personalized follow-up (check-ins, reminders, next-step offers) automatically after each treatment." },
      { label: "Increase lifetime value", description: "Keep patients engaged with preventive care reminders and complementary treatment recommendations, driving higher LTV." },
    ],
    tagGroups: [
      { category: "EMR Layer", items: ["Opportunity Extraction","Workflow Automation","Compliance-gated"] },
      { category: "Business Impact", items: ["Patient Retention","Lifetime Value","Opportunity Capture"] },
    ],
    updates: [
      { title: "EMR engagement module", date: "2026-06-23", description: "Add as a post-treatment follow-up and opportunity layer to your EMR." },
    ],
    size: "EMR module", lastUpdate: "2026-06-23", kind: "static", portfolioSlug: "reach",
    badges: ["Staff Pick"], verified: true, verifiedDate: "2026-07-01", installCount: "210+ practices",
    emrCompatibility: ["Boulevard","Aesthetic Record","PatientNow","Zenoti"], integrationDepth: "Native",
    integrations: [{ name: "TCP", type: "A360 agent" },{ name: "Scribe", type: "A360 agent" },{ name: "SMS / Email / Voice", type: "Outbound channels" },{ name: "CRM", type: "Sync" }],
    dataFields: { reads: ["Treatment plans","Consultation notes","Patient consent status"], writes: ["Follow-up schedule","Opportunity records","Engagement history"], retention: "TCPA-compliant opt-in/opt-out enforced; messaging under your BAA" },
    kpis: [{ label: "Opportunities surfaced", value: "Primary / Secondary / Future" },{ label: "Follow-up", value: "Automated" },{ label: "Compliance", value: "Consent-gated" }],
    pricingTiers: [
      { name: "Core", price: "$299", note: "per location / mo", features: ["Opportunity extraction","Compliance-gated SMS + email","Automated follow-up scheduling"] },
      { name: "Plus", price: "$599", note: "per location / mo", features: ["Everything in Core","AI voice follow-up","CRM sync + attribution","Priority support"] },
    ],
    agentReviews: [
      { author: "Consult coordinator, plastic surgery", role: "Houston, TX", rating: 5, quote: "Opportunities that used to live in a note nobody reopened now become scheduled follow-ups automatically." },
      { author: "MSO ops director", role: "6 locations", rating: 4, quote: "The consent gating is what got our compliance officer comfortable turning outbound on." },
    ],
  },
];

function toRow(a) {
  return {
    slug: a.slug,
    name: a.name,
    publisher: a.publisher,
    developer: a.developer,
    category: a.category,
    tagline: a.tagline,
    description: a.description,
    price: a.price,
    rating: a.rating,
    reviews_count: a.reviews,
    logo: a.logo ?? null,
    cover: a.cover ?? null,
    screenshots: a.screenshots ?? [],
    features: a.features ?? [],
    use_cases: a.useCases ?? [],
    tag_groups: a.tagGroups ?? [],
    updates: a.updates ?? [],
    size: a.size,
    last_update: a.lastUpdate,
    kind: a.kind,
    href: a.href ?? null,
    portfolio_slug: a.portfolioSlug ?? null,
    badges: a.badges ?? [],
    verified: a.verified ?? false,
    verified_date: a.verifiedDate ?? null,
    emr_compatibility: a.emrCompatibility ?? [],
    integration_depth: a.integrationDepth ?? null,
    install_count: a.installCount ?? null,
    integrations: a.integrations ?? [],
    data_fields: a.dataFields ?? {},
    kpis: a.kpis ?? [],
    pricing_tiers: a.pricingTiers ?? [],
    agent_reviews: a.agentReviews ?? [],
    video_url: a.videoUrl ?? null,
    status: "live",
  };
}

const rows = AGENTS.map(toRow);
const { data, error } = await supabase
  .from("exchange_agents")
  .upsert(rows, { onConflict: "slug" })
  .select("slug");

if (error) {
  console.error("Seed failed:", error);
  process.exit(1);
}
console.log(`Seeded ${data.length} agents:`, data.map((r) => r.slug).join(", "));
