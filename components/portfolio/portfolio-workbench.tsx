"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  Info,
  Link2,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AUDIENCES,
  PROTOTYPES,
  type Prototype,
  type PrototypeStatus,
} from "@/lib/portfolio/registry";

const STATUS_STYLES: Record<PrototypeStatus, string> = {
  concept: "bg-muted text-muted-foreground",
  building: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  demoable: "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  shipped: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  retired: "bg-zinc-500/15 text-zinc-500 line-through",
};

const EXPIRY_OPTIONS = [
  { value: "7", label: "7 days" },
  { value: "30", label: "30 days" },
];

export function PortfolioWorkbench() {
  const [preview, setPreview] = React.useState<string>("all");

  const visible = React.useMemo(() => {
    if (preview === "all") return PROTOTYPES;
    const audience = AUDIENCES.find((a) => a.id === preview);
    if (!audience) return PROTOTYPES;
    return PROTOTYPES.filter((p) => audience.prototypeSlugs.includes(p.slug));
  }, [preview]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Prototype Portfolio
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every prototype in the estate — status, surfacing tier, AWS
            promotion distance, and who may see it.
          </p>
        </div>
        <MintShareLink />
      </div>

      {/* Audience preview switcher */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Preview as
        </span>
        {[{ id: "all", label: "All (internal)" }, ...AUDIENCES].map((a) => (
          <button
            key={a.id}
            onClick={() => setPreview(a.id)}
            className={cn(
              "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
              preview === a.id
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {a.label}
          </button>
        ))}
        <span className="ml-auto text-sm text-muted-foreground">
          {visible.length} of {PROTOTYPES.length} prototypes
        </span>
      </div>

      {/* Grid */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {visible.map((p) => (
          <PrototypeCard key={p.slug} prototype={p} />
        ))}
      </div>
    </div>
  );
}

function PrototypeCard({ prototype: p }: { prototype: Prototype }) {
  return (
    <Card className="flex h-full flex-col gap-0 p-5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="truncate font-heading text-[15px] font-semibold leading-tight">
            {p.name}
          </h3>
          <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
            {p.repo}
          </p>
        </div>
        <Badge className={cn("shrink-0 capitalize", STATUS_STYLES[p.status])}>
          {p.status}
        </Badge>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
        {p.oneLiner}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <Badge variant="outline" className="capitalize">
          {p.tier}
        </Badge>
        <Badge variant="secondary">
          {p.promotion === "na" ? "AWS —" : `AWS ${p.promotion}`}
        </Badge>
        {p.audiences.map((a) => (
          <Badge key={a} variant="ghost" className="capitalize">
            {a}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-2 border-t pt-4 [&:not(:first-child)]:mt-4">
        {p.tier === "native" && p.href && (
          <Link
            href={p.href}
            className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
          >
            Open
            <ArrowUpRight className="size-3.5" />
          </Link>
        )}
        {(p.tier === "linkout" || p.tier === "embed") && p.href && (
          <a
            href={p.href}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}
          >
            Open
            <ExternalLink className="size-3.5" />
          </a>
        )}
        <PrototypeDetails prototype={p} />
      </div>
    </Card>
  );
}

function PrototypeDetails({ prototype: p }: { prototype: Prototype }) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "gap-1.5",
        )}
      >
        <Info className="size-3.5" />
        Details
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{p.name}</DialogTitle>
          <DialogDescription>{p.oneLiner}</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <DetailRow label="Status">
            <Badge className={cn("capitalize", STATUS_STYLES[p.status])}>
              {p.status}
            </Badge>
          </DetailRow>
          <DetailRow label="Tier">
            <span className="capitalize">{p.tier}</span>
          </DetailRow>
          <DetailRow label="AWS promotion">
            {p.promotion === "na" ? "Not applicable" : p.promotion}
          </DetailRow>
          <DetailRow label="Repo">
            <a
              href={`https://github.com/${p.repo}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:underline"
            >
              <ExternalLink className="size-3.5" />
              {p.repo}
            </a>
          </DetailRow>
          <DetailRow label="Stack">{p.stack}</DetailRow>
          <DetailRow label="Audiences">
            <span className="capitalize">{p.audiences.join(", ")}</span>
          </DetailRow>
          {p.href && (
            <DetailRow label="Surface">
              <span className="break-all font-mono text-xs">{p.href}</span>
            </DetailRow>
          )}
          {p.notes && (
            <div className="rounded-lg border bg-muted/40 p-3 text-sm text-muted-foreground">
              {p.notes}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="w-32 shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="min-w-0">{children}</span>
    </div>
  );
}

function MintShareLink() {
  const [audience, setAudience] = React.useState<string>("buyer");
  const [days, setDays] = React.useState<string>("7");
  const [url, setUrl] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  async function mint() {
    setLoading(true);
    setError(null);
    setUrl(null);
    setCopied(false);
    try {
      const res = await fetch("/api/portfolio/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ audience, days: Number(days) }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? `Minting failed (${res.status})`);
        return;
      }
      setUrl(data.url);
    } catch {
      setError("Minting failed — is the server reachable?");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2">
        <Select value={audience} onValueChange={(v) => v && setAudience(v)}>
          <SelectTrigger className="w-32" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {AUDIENCES.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={days} onValueChange={(v) => v && setDays(v)}>
          <SelectTrigger className="w-28" size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {EXPIRY_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button size="sm" onClick={mint} disabled={loading} className="gap-1.5">
          <Link2 className="size-3.5" />
          {loading ? "Minting…" : "Mint share link"}
        </Button>
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {url && (
        <div className="flex max-w-xl items-center gap-2 rounded-lg border bg-card px-3 py-1.5">
          <span className="truncate font-mono text-xs text-muted-foreground">
            {url}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={copy}
            className="shrink-0 gap-1"
          >
            {copied ? (
              <Check className="size-3.5 text-emerald-500" />
            ) : (
              <Copy className="size-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
      )}
    </div>
  );
}
