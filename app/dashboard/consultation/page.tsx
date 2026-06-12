import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Layers,
  Users,
  Target,
  DollarSign,
  ClipboardList,
  Upload,
} from "lucide-react";

/* ---------------------------------------------------------------------------
   Demo data. Replace with live fields from consultation_intelligence.
   De-identified per PHI policy (IDs only, no patient names).
--------------------------------------------------------------------------- */
const recentAnalyses = [
  { id: "#1042", summary: "Forehead & glabella · 3 opportunities", score: "9.1", time: "14m ago" },
  { id: "#1041", summary: "Cheek volume · 2 opportunities", score: "8.6", time: "41m ago" },
  { id: "#1039", summary: "Full-face resurfacing · 4 opportunities", score: "8.9", time: "1h ago" },
  { id: "#1036", summary: "Crow's feet · 1 opportunity", score: "7.8", time: "2h ago" },
];

export default function ConsultationPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Consultation Intelligence
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Complete post-consultation analysis and KPI dashboard
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">Last 30 days</Badge>
          <Button>
            <Upload className="h-4 w-4" />
            Upload consultation
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Consultations Analyzed"
          value="331"
          delta="+25.4% vs last month"
          trend="up"
          icon={Users}
        />
        <StatCard
          label="Avg. KPI Score"
          value="8.4"
          delta="+0.4 pts"
          trend="up"
          icon={Target}
        />
        <StatCard
          label="Opportunities Found"
          value="142"
          delta="+12.6%"
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          label="Follow-ups Queued"
          value="58"
          delta="No change"
          trend="neutral"
          icon={ClipboardList}
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: recent analyses (spans 2) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
            <CardDescription>
              De-identified · most recent consultation intelligence
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentAnalyses.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-4 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <Layers className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    Consultation {a.id}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {a.summary}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold tabular-nums text-primary">
                    {a.score}
                  </p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right: upload CTA */}
        <Card className="flex flex-col items-center justify-center p-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Layers className="h-6 w-6" />
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">
            Intelligence Dashboard
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Real-time KPI evaluation, recommendations, and evidence-based insights
          </p>
          <Button className="mt-6">Upload Consultation</Button>
        </Card>
      </div>
    </div>
  );
}
