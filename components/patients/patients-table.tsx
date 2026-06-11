"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import type { Paged, Patient } from "@/lib/types";
import { formatDate, age } from "@/lib/format";
import { Search, AlertCircle, ChevronRight } from "lucide-react";

function initials(p: Patient): string {
  return `${p.first_name?.[0] ?? ""}${p.last_name?.[0] ?? ""}`.toUpperCase() || "?";
}

export function PatientsTable() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const handle = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({ limit: "100" });
        if (query.trim()) params.set("q", query.trim());
        const res = await fetch(`/api/patients?${params.toString()}`);
        const json = (await res.json()) as Paged<Patient> & { error?: string };
        if (cancelled) return;
        if (!res.ok || json.error) throw new Error(json.error || `HTTP ${res.status}`);
        setPatients(json.data ?? []);
        setTotal(json.total ?? json.data?.length ?? 0);
      } catch (e) {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : "Failed to load patients");
        setPatients([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, query ? 300 : 0);

    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [query]);

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <span className="shrink-0 text-sm text-muted-foreground">
          {loading ? "Loading…" : `${patients.length} of ${total} patients`}
        </span>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Patient</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Prior visits</TableHead>
              <TableHead>Patient ID</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {error && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6}>
                  <div className="flex items-center gap-2 py-6 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!error && loading && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6}>
                  <div className="flex items-center gap-3 py-6 text-sm text-muted-foreground">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                    Loading patients…
                  </div>
                </TableCell>
              </TableRow>
            )}

            {!error && !loading && patients.length === 0 && (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={6}>
                  <p className="py-8 text-center text-sm text-muted-foreground">
                    No patients found{query ? ` for “${query}”` : ""}.
                  </p>
                </TableCell>
              </TableRow>
            )}

            {!error &&
              !loading &&
              patients.map((p) => (
                <TableRow
                  key={p.id}
                  className="cursor-pointer"
                  onClick={() => router.push(`/dashboard/patients/${p.id}`)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                        {initials(p)}
                      </div>
                      <span className="font-medium text-foreground">
                        {p.first_name} {p.last_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(p.dob)}
                    {age(p.dob) && <span className="ml-1.5 text-xs">({age(p.dob)})</span>}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {p.prior_visits ?? "—"}
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-xs text-muted-foreground">
                      {p.id.slice(0, 8)}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(p.created_at)}
                  </TableCell>
                  <TableCell>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
