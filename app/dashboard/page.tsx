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
import { MiniBarChart } from "@/components/dashboard/mini-bar-chart";
import {
  Users,
  TrendingUp,
  DollarSign,
  Target,
  ArrowUpRight,
  Plus,
  Syringe,
  Sparkles,
  Droplet,
} from "lucide-react";

/* ---------------------------------------------------------------------------
   Demo data. Replace with live metrics from consultation_intelligence /
   opportunities. De-identified per PHI policy (IDs only, no patient names).
--------------------------------------------------------------------------- */
const consultVolume = [
  { label: "Dec", value: 182 },
  { label: "Jan", value: 240 },
  { label: "Feb", value: 215 },
  { label: "Mar", value: 298 },
  { label: "Apr", value: 264 },
  { label: "May", value: 331 },
];

const goals = [
  { label: "Revenue Target", value: "$420,000", percent: 65, sublabel: "$273,000" },
  { label: "New Patients", value: "850", percent: 32, sublabel: "272" },
  { label: "Plan Adoption", value: "60%", percent: 78, sublabel: "47% live" },
];

const recentConsults = [
  { id: "#1042", treatment: "Botox · Forehead & Glabella", value: "$640", time: "12m ago", icon: Syringe },
  { id: "#1041", treatment: "Dermal Filler · Cheeks", value: "$1,250", time: "38m ago", icon: Droplet },
  { id: "#1039", treatment: "Skin Resurfacing · Full Face", value: "$2,400", time: "1h ago", icon: Sparkles },
  { id: "#1036", treatment: "Botox · Crow's Feet", value: "$420", time: "2h ago", icon: Syringe },
  { id: "#1033", treatment: "Lip Filler · 1ml", value: "$680", time: "3h ago", icon: Droplet },
];

const opportunities = [
  { label: "Filler follow-up", count: 23, value: "$28,750" },
  { label: "Skin program upsell", count: 14, value: "$33,600" },
  { label: "Membership conversion", count: 31, value: "$18,600" },
];

export default function OverviewPage() {
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
          <Badge variant="secondary">Last 30 days</Badge>
          <Button>
            <Plus className="h-4 w-4" />
            New consultation
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Consultations"
          value="331"
          delta="+25.4% vs last month"
          trend="up"
          icon={Users}
        />
        <StatCard
          label="Conversion Rate"
          value="42.8%"
          delta="+3.1 pts"
          trend="up"
          icon={TrendingUp}
        />
        <StatCard
          label="Revenue Opportunities"
          value="$80,950"
          delta="+12.6%"
          trend="up"
          icon={DollarSign}
        />
        <StatCard
          label="Avg. Treatment Value"
          value="$1,068"
          delta="-2.4%"
          trend="down"
          icon={Target}
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: chart + recent consultations (spans 2) */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Volume</CardTitle>
              <CardDescription>Last 6 months of activity</CardDescription>
              <CardAction>
                <Button variant="outline" size="sm">
                  View report
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <MiniBarChart data={consultVolume} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Consultations</CardTitle>
              <CardDescription>De-identified · most recent activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentConsults.map((c) => {
                const Icon = c.icon;
                return (
                  <div
                    key={c.id}
                    className="flex items-center gap-4 rounded-lg px-2 py-2.5 transition-colors hover:bg-muted"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        Consultation {c.id}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {c.treatment}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold tabular-nums text-foreground">
                        {c.value}
                      </p>
                      <p className="text-xs text-muted-foreground">{c.time}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Right: goals + opportunities */}
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
              <CardTitle>Top Opportunities</CardTitle>
              <CardDescription>Extracted revenue, ranked by value</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1">
              {opportunities.map((o) => (
                <div
                  key={o.label}
                  className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-muted"
                >
                  <div>
                    <p className="text-sm font-medium text-foreground">{o.label}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.count} patients
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold tabular-nums text-primary">
                    {o.value}
                    <ArrowUpRight className="h-3.5 w-3.5" />
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
