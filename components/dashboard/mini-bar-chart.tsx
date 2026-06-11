interface BarDatum {
  label: string;
  value: number;
}

export function MiniBarChart({ data }: { data: BarDatum[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex h-44 items-end gap-3">
      {data.map((d) => (
        <div
          key={d.label}
          className="flex flex-1 flex-col items-center gap-2"
        >
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md bg-primary/80 transition-all duration-300 hover:bg-primary"
              style={{ height: `${(d.value / max) * 100}%` }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="text-xs text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  );
}
