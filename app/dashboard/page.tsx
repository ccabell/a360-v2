import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProgressGoal } from "@/components/dashboard/progress-goal";
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  ArrowUpRight,
  Plus,
  Bot,
  FileCheck,
  Activity,
} from "lucide-react";
import { opsSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/* ---------------------------------------------------------------------------
   Quarterly targets — manually set per practice. Eventually these come from
   a practice-settings table, but for now they're set here.
--------------------------------------------------------------------------- */
const goals = [
  { label: "Revenue Target", value: "$420,000", percent: 65, sublabel: "$273,000" },
  { label: "New Patients", value: "850", percent: 32, sublabel: "272" },
  { label: "Plan Adoption", value: "60%", percent: 78, sublabel: "47% live" },
];

const CONSULT_TYPE_LABEL: Record<string, string> = {
  initial_consultation: "Initial Consultation",
  consultation_only: "Consultation",
  treatment_visit: "Treatment Visit",
  follow_up: "Follow-up",
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

async function getStats() {
  try {
    const [patientsRes, consultsRes, extractionsRes, agentOutputsRes, agentsRes, recentRes] =
      await Promise.all([
        opsSupabase
          .from("patients")
          .select("id", { count: "exact", head: true })
          .eq("is_active", true),
        opsSupabase
          .from("consultations")
          .select("id", { count: "exact", head: true }),
        opsSupabase
          .from("extractions")
          .select("id", { count: "exact", head: true })
          .eq("is_verified", true),
        opsSupabase
          .from("agent_outputs")
          .select("id", { count: "exact", head: true }),
        opsSupabase
          .from("agents")
          .select("id", { count: "exact", head: true })
          .eq("status", "active"),
        opsSupabase
          .from("consultations")
          .select("id, consultation_type, status, started_at")
          .order("started_at", { ascending: false })
          .limit(5),
      ]);

    return {
      patients: patientsRes.count ?? 0,
      consultations: consultsRes.count ?? 0,
      extractions: extractionsRes.count ?? 0,
      agentRuns: agentOutputsRes.count ?? 0,
      activeAgents: agentsRes.count ?? 0,
      recentConsultations: (recentRes.data ?? []) as Array<{
        id: string;
        consultation_type: string | null;
        status: string | null;
        started_at: string | null;
      }>,
    };
  } catch {
    return null;
  }
}

export default async function OverviewPage() {
  const stats = await getStats();

  return (
    <div className="p-8 space-y-8">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Overview</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Practice performance and consultation intelligence
          </p>
        </div>
        <div className="flex items-center gap-3">
          {stats ? (
            <Badge variant="secondary">Live data</Badge>
          ) : (
            <Badge variant="outline">Demo data</Badge>
          )}
          <Button>
            <Plus className="h-4 w-4" />
            New consultation
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Patients"
          value={stats ? String(stats.patients) : "20"}
          delta={stats ? "Active in Ops DB" : "Demo"}
          trend="up"
          icon={Users}
        />
        <StatCard
          label="Consultations"
          value={stats ? String(stats.consultations) : "94"}
          delta={stats ? "Total recorded" : "Demo"}
          trend="up"
          icon={Activity}
        />
        <StatCard
          label="Verified Extractions"
          value={stats ? String(stats.extractions) : "0"}
          delta={stats ? "Human-verified" : "Demo"}
          trend="up"
          icon={FileCheck}
        />
        <StatCard
          label="Active Agents"
          value={stats ? String(stats.activeAgents) : "5"}
          delta={stats ? `${stats.agentRuns} total runs` : "Demo"}
          trend="up"
          icon={Bot}
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: recent consultations (spans 2) */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Consultations</CardTitle>
              <CardDescription>
                De-identified · most recent activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {stats && stats.recentConsultations.length > 0 ? (
                stats.recentConsultations.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-4 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        Consultation {c.id.slice(0, 8)}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {CONSULT_TYPE_LABEL[c.consultation_type ?? ""] ??
                          c.consultation_type ??
                          "Consultation"}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={c.status === "completed" ? "secondary" : "outline"}
                        className="text-xs"
                      >
                        {c.status ?? "unknown"}
                      </Badge>
                      {c.started_at && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {timeAgo(c.started_at)}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  {stats ? "No consultations yet" : "Connect Ops Supabase to see live data"}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: goals + agent activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quarterly Targets</CardTitle>
              <CardDescription>Active milestones for Q2</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {goals.map((g) => (
                <ProgressGoal
                  key={g.label}
                  label={g.label}
                  value={g.value}
                  percent={g.percent}
                  sublabel={g.sublabel}
                />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Status</CardTitle>
              <CardDescription>System health</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { label: "Ops Database", status: stats ? "Connected" : "Not connected" },
                { label: "Agent Runtime", status: stats && stats.activeAgents > 0 ? `${stats.activeAgents} active` : "Unknown" },
                { label: "RAG Corpus", status: "550K chunks" },
                { label: "Sentry", status: "Monitoring" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{s.label}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`size-1.5 rounded-full ${
                        s.status.includes("Not") || s.status === "Unknown"
                          ? "bg-amber-500"
                          : "bg-emerald-500"
                      }`}
                    />
                    <span className="font-medium text-foreground">{s.status}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
