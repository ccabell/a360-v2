import { opsSupabase } from "@/lib/supabase";
import { getTcpFixture } from "./fixtures";
import type {
  ConsultationContext,
  EducationBlock,
  TcpFixture,
  TcpPlan,
  TcpRecommendation,
  TcpResolveRequest,
  TimelineEntry,
  Tier,
} from "./types";

// ---------------------------------------------------------------------------
// Cached-first resolver. Hand-authored fixtures are the stage-safe default;
// live assemble (from the real consultation extraction) is a best-effort
// fallback for non-fixture patients. Deterministic — no live model call.
// ---------------------------------------------------------------------------

export async function resolveTcp(req: TcpResolveRequest): Promise<TcpPlan> {
  const fixture = getTcpFixture(req.patientId);
  if (fixture) return fixtureToPlan(fixture);
  return liveResolve(req);
}

function fixtureToPlan(fixture: TcpFixture): TcpPlan {
  const { patientId, ...plan } = fixture;
  void patientId; // drop the fixture-only key
  return { source: "cached", ...plan };
}

// --- Live fallback ----------------------------------------------------------

async function liveResolve(req: TcpResolveRequest): Promise<TcpPlan> {
  const { data: patient } = await opsSupabase
    .from("patients")
    .select("first_name, last_name")
    .eq("id", req.patientId)
    .single();

  let consultationId = req.consultationId;
  let consult: { id: string; consult_type: string | null; started_at: string | null } | null = null;
  {
    const { data: consults } = await opsSupabase
      .from("consultations")
      .select("id, consult_type, started_at")
      .eq("patient_id", req.patientId)
      .order("started_at", { ascending: false });
    consult = (consults ?? []).find((c) => (consultationId ? c.id === consultationId : true)) ?? consults?.[0] ?? null;
    consultationId = consult?.id ?? consultationId;
  }

  let parsed1: Record<string, unknown> = {};
  let parsed2: Record<string, unknown> = {};
  if (consultationId) {
    const { data: extraction } = await opsSupabase
      .from("extractions")
      .select("outputs")
      .eq("consultation_id", consultationId)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    const outputs = (extraction?.outputs ?? {}) as Record<string, unknown>;
    parsed1 = pj(outputs, "prompt_1");
    parsed2 = pj(outputs, "prompt_2");
  }

  const context = buildContext(parsed1, parsed2);
  const recommendations = buildRecommendations(parsed1);
  const education = buildEducation(recommendations);
  const timeline = buildTimeline(recommendations);
  const tiers = buildTiers(recommendations);

  return {
    source: "live",
    patientName: patient ? `${patient.first_name} ${patient.last_name}` : "Patient",
    visitType: titleCase(consult?.consult_type ?? "Consultation"),
    visitDate: (consult?.started_at ?? new Date().toISOString()).slice(0, 10),
    provider: "Provider",
    location: "Orange Twist",
    context,
    recommendations,
    education,
    timeline,
    tiers,
  };
}

// --- Extraction parsing (defensive) -----------------------------------------

function pj(outputs: Record<string, unknown>, key: string): Record<string, unknown> {
  const node = outputs?.[key] as Record<string, unknown> | undefined;
  const parsed = node?.parsed_json as Record<string, unknown> | undefined;
  return parsed ?? {};
}

/** Many extraction fields are wrapped as { value, evidence }. Unwrap safely. */
function val<T>(node: unknown, fallback: T): T {
  if (node && typeof node === "object" && "value" in (node as object)) {
    const v = (node as { value: unknown }).value;
    return (v ?? fallback) as T;
  }
  return (node ?? fallback) as T;
}

function buildContext(p1: Record<string, unknown>, p2: Record<string, unknown>): ConsultationContext {
  const goalsNode = p1.patient_goals as Record<string, unknown> | undefined;
  const goals = arr<string>(val(goalsNode?.goals, [])).filter(Boolean);
  const primaryConcern = String(val(goalsNode?.primary_concern, "") || "Aesthetic refresh");
  const secondary = arr<string>(val(goalsNode?.secondary_concerns, []));

  const areasNode = p1.areas as Record<string, unknown> | undefined;
  const concernAreas = arr<string>(val(areasNode?.concern_areas, []));
  const treatmentAreas = arr<string>(val(areasNode?.treatment_areas, []));

  const concerns = [...new Set([...secondary, ...concernAreas])]
    .filter(Boolean)
    .map((label) => ({ label }));

  const tags = arr<string>(p2.signal_tags).map((key) => ({
    key,
    label: titleCase(String(key)),
    tone: /objection|hesitation|price|concern|risk/i.test(String(key))
      ? ("caution" as const)
      : /interest|positive|scheduling|ready|agreed/i.test(String(key))
        ? ("positive" as const)
        : ("neutral" as const),
  }));

  const objections = arr<Record<string, unknown>>(p2.objections)
    .map((o) => String(val(o?.objection ?? o, "")))
    .filter(Boolean);

  const outcomeNode = p2.outcome as Record<string, unknown> | undefined;
  const status = String(val(outcomeNode?.status, "in_progress"));
  const summary = String(val(outcomeNode?.summary, ""));

  return {
    goals: goals.length ? goals : [primaryConcern],
    primaryConcern,
    concerns,
    treatmentAreas,
    signalTags: tags,
    objections,
    conversion: { status, label: titleCase(status), summary },
  };
}

function buildRecommendations(p1: Record<string, unknown>): TcpRecommendation[] {
  const offerings = arr<Record<string, unknown>>(p1.offerings);
  return offerings
    .map((o, i): TcpRecommendation | null => {
      const name = String(o.catalog_match || o.name || "").trim();
      if (!name) return null;
      const disposition = String(o.disposition ?? "");
      const agreed = /performed|agreed/.test(disposition);
      return {
        id: `live-rec-${i}`,
        name,
        kind: String(o.type ?? "treatment"),
        area: String(o.area ?? "—"),
        concern: String(o.area ?? "Discussed in consult"),
        fit: agreed ? "ideal" : "strong",
        fdaIndicated: false,
        rationale: `Discussed in the consultation (${disposition || "noted"}). Live plan — confirm details against the Global Library.`,
        source: agreed ? "agreed" : "discussed",
        defaultAccepted: agreed,
      };
    })
    .filter((r): r is TcpRecommendation => r !== null);
}

function buildEducation(recs: TcpRecommendation[]): EducationBlock[] {
  return recs.map((r) => ({
    id: `live-edu-${r.id}`,
    recommendationId: r.id,
    forName: r.name,
    title: `About ${r.name}`,
    category: "expectations" as const,
    body: `${r.name} was discussed for ${r.area}. Attach the practice's standard expectations and aftercare for this treatment.`,
    defaultSelected: r.defaultAccepted,
  }));
}

function buildTimeline(recs: TcpRecommendation[]): TimelineEntry[] {
  const order = recs.filter((r) => r.defaultAccepted).length ? recs.filter((r) => r.defaultAccepted) : recs;
  return order.map((r, i) => ({
    id: `live-tl-${r.id}`,
    recommendationId: r.id,
    whenLabel: i === 0 ? "Today — Visit 1" : `Visit ${i + 1}`,
    offsetWeeks: i * 4,
    title: `${r.name} (${r.area})`,
    detail: "",
    timingWhy: "Sequence and spacing are illustrative — confirm against product timing in the Global Library.",
    timingSource: "illustrative" as const,
  }));
}

function buildTiers(recs: TcpRecommendation[]): Tier[] {
  const ids = recs.map((r) => r.id);
  const note = "illustrative" as const;
  return [
    {
      key: "good",
      label: "Targeted",
      recommendationIds: ids.slice(0, 1),
      narrative: "Address the primary concern.",
      timelineFit: "Single visit.",
      price: { min: 0, max: 0, display: "Set in practice pricing", note },
    },
    {
      key: "better",
      label: "Balanced",
      recommendationIds: ids.slice(0, 2),
      narrative: "Primary plus the highest-synergy add.",
      timelineFit: "Staged across visits.",
      price: { min: 0, max: 0, display: "Set in practice pricing", note },
    },
    {
      key: "best",
      label: "Comprehensive",
      recommendationIds: ids,
      narrative: "The full discussed plan.",
      timelineFit: "Sequenced across visits.",
      price: { min: 0, max: 0, display: "Set in practice pricing", note },
    },
  ];
}

// --- helpers ----------------------------------------------------------------

function arr<T>(node: unknown): T[] {
  return Array.isArray(node) ? (node as T[]) : [];
}

function titleCase(s: string): string {
  return String(s).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
