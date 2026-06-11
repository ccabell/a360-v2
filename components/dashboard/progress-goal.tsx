interface ProgressGoalProps {
  label: string;
  value: string;
  percent: number;
  sublabel?: string;
}

export function ProgressGoal({
  label,
  value,
  percent,
  sublabel,
}: ProgressGoalProps) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <div className="space-y-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="text-2xl font-bold tabular-nums text-foreground">
        {value}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{clamped}% achieved</span>
        {sublabel && <span>{sublabel}</span>}
      </div>
    </div>
  );
}
