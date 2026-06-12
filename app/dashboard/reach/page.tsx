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
import { Mail, Send, Users, MessageSquare, DollarSign, Plus } from "lucide-react";

/* ---------------------------------------------------------------------------
   Demo data. Replace with live metrics from the Reach engine / opportunities.
   De-identified per PHI policy (aggregate counts only, no patient names).
--------------------------------------------------------------------------- */
const campaignTypes = [
  { name: "Filler follow-up", reached: 312, response: "34%" },
  { name: "Skin program upsell", reached: 198, response: "29%" },
  { name: "Membership conversion", reached: 421, response: "26%" },
];

export default function ReachPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Page header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Reach Campaign Manager
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Create and manage patient outreach campaigns with treatment
            recommendations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary">Last 30 days</Badge>
          <Button>
            <Plus className="h-4 w-4" />
            Create campaign
          </Button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active Campaigns"
          value="6"
          delta="+2 this month"
          trend="up"
          icon={Send}
        />
        <StatCard
          label="Patients Reached"
          value="1,284"
          delta="+18.2%"
          trend="up"
          icon={Users}
        />
        <StatCard
          label="Response Rate"
          value="31.4%"
          delta="+4.6 pts"
          trend="up"
          icon={MessageSquare}
        />
        <StatCard
          label="Revenue Influenced"
          value="$94,200"
          delta="+22.1%"
          trend="up"
          icon={DollarSign}
        />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: active campaigns (spans 2) */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Campaign Types</CardTitle>
            <CardDescription>
              De-identified · reach and response by campaign
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {campaignTypes.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between rounded-lg px-2 py-2.5 transition-colors hover:bg-muted"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {c.reached} patients reached
                  </p>
                </div>
                <div className="text-sm font-semibold tabular-nums text-primary">
                  {c.response}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right: new-campaign CTA */}
        <Card className="flex flex-col items-center justify-center p-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <Mail className="h-6 w-6" />
          </div>
          <p className="mt-4 text-sm font-medium text-foreground">New Campaign</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Schedule outreach with evidence-based treatment recommendations
          </p>
          <Button className="mt-6">Create Campaign</Button>
        </Card>
      </div>
    </div>
  );
}
