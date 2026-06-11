import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  icon?: React.ElementType;
}

export function StatCard({
  label,
  value,
  delta,
  trend = "neutral",
  icon: Icon,
}: StatCardProps) {
  const trendColor =
    trend === "up"
      ? "text-primary"
      : trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";
  const TrendIcon = trend === "down" ? TrendingDown : TrendingUp;

  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl font-semibold tabular-nums text-foreground">
          {value}
        </CardTitle>
        {Icon && (
          <CardAction>
            <div className="rounded-lg bg-muted p-2 text-muted-foreground">
              <Icon className="h-4 w-4" />
            </div>
          </CardAction>
        )}
      </CardHeader>
      {delta && (
        <CardContent>
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium ${trendColor}`}
          >
            {trend !== "neutral" && <TrendIcon className="h-3 w-3" />}
            {delta}
          </span>
        </CardContent>
      )}
    </Card>
  );
}
