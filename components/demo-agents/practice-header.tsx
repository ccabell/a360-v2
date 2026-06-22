"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, MapPin, Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PracticePayload, PracticeLocation } from "@/app/api/practice/route";

interface ProductLite {
  id: string;
  name: string;
  brand_name: string | null;
  kind: string | null;
}

/**
 * Shared practice header — Orange Twist identity + location selector + a curated
 * strip of the practice's products/services (Global V3) with a "view all"
 * affordance. Reused by every demo agent.
 */
export function PracticeHeader() {
  const [practice, setPractice] = useState<PracticePayload | null>(null);
  const [location, setLocation] = useState<PracticeLocation | null>(null);
  const [products, setProducts] = useState<ProductLite[]>([]);
  const [logoOk, setLogoOk] = useState(true);

  useEffect(() => {
    fetch("/api/practice")
      .then((r) => r.json())
      .then((p: PracticePayload) => {
        setPractice(p);
        setLocation(p.locations.find((l) => l.is_default) ?? p.locations[0] ?? null);
      })
      .catch(() => {});
    fetch("/api/global-library/products")
      .then((r) => r.json())
      .then((rows: ProductLite[]) => setProducts(Array.isArray(rows) ? rows : []))
      .catch(() => {});
  }, []);

  const accent = practice?.accent ?? "#F26A1B";
  const curated = products.slice(0, 6);

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        {/* Identity */}
        <div className="flex items-center gap-4">
          {logoOk ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/practices/orange-twist-logo.png"
              alt={practice?.name ?? "Practice"}
              className="h-11 w-11 rounded-lg object-contain"
              onError={() => setLogoOk(false)}
            />
          ) : (
            <div
              className="h-11 w-11 rounded-lg flex items-center justify-center ring-2"
              style={{ background: `${accent}1a`, color: accent, borderColor: accent }}
            >
              <Sparkles className="h-5 w-5" />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground leading-tight">
                {practice?.name ?? "Orange Twist"}
              </h2>
              <span
                className="text-[10px] font-semibold tracking-wider px-1.5 py-0.5 rounded"
                style={{ background: `${accent}1a`, color: accent }}
              >
                DEMO PRACTICE
              </span>
            </div>
            <p className="text-xs text-muted-foreground tracking-wide mt-0.5">
              {practice?.tagline ?? "BODY | FACE | SKIN"}
            </p>
          </div>
        </div>

        {/* Location selector */}
        {practice && practice.locations.length > 0 && (
          <LocationSelect
            locations={practice.locations}
            value={location}
            onChange={setLocation}
            accent={accent}
          />
        )}
      </div>

      {/* Products / services strip */}
      {curated.length > 0 && (
        <div className="flex items-center gap-2 border-t border-border bg-muted/30 px-6 py-2.5 overflow-x-auto">
          <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap mr-1">
            Products &amp; services
          </span>
          {curated.map((p) => (
            <span
              key={p.id}
              className="text-xs whitespace-nowrap rounded-full border border-border bg-card px-2.5 py-1 text-foreground/80"
            >
              {p.name}
            </span>
          ))}
          <Link
            href="/dashboard/global-library"
            className="ml-auto flex items-center gap-1 text-xs font-medium whitespace-nowrap hover:underline"
            style={{ color: accent }}
          >
            View all {products.length} <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      )}
    </div>
  );
}

function LocationSelect({
  locations,
  value,
  onChange,
  accent,
}: {
  locations: PracticeLocation[];
  value: PracticeLocation | null;
  onChange: (l: PracticeLocation) => void;
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-muted/50 transition-colors"
      >
        <MapPin className="h-4 w-4" style={{ color: accent }} />
        <span className="font-medium text-foreground">{value?.name ?? "Select location"}</span>
        <span className="text-xs text-muted-foreground">
          {value ? `${value.city}, ${value.state}` : ""}
        </span>
        <ChevronDown className="h-4 w-4 text-muted-foreground" />
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-1 w-56 rounded-lg border border-border bg-popover shadow-lg py-1">
          {locations.map((l) => (
            <button
              key={l.id}
              onMouseDown={() => {
                onChange(l);
                setOpen(false);
              }}
              className={cn(
                "w-full text-left px-3 py-2 text-sm hover:bg-muted/60 flex items-center justify-between",
                value?.id === l.id && "bg-muted/40",
              )}
            >
              <span className="font-medium text-foreground">{l.name}</span>
              <span className="text-xs text-muted-foreground">
                {l.city}, {l.state}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
