import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ExchangeAgent } from "@/lib/exchange/agents";

/**
 * Category-keyed cover tint so the grid reads as a cohesive set. Cool,
 * restrained hues per the A360 brand palette — subtle differentiation, not
 * saturated color blocks.
 */
const CATEGORY_TINT: Record<string, string> = {
  Analytics: "from-sky-600/40",
  Financial: "from-teal-600/40",
  Training: "from-indigo-600/40",
  Imaging: "from-cyan-600/40",
  Knowledge: "from-sky-500/40",
  Documentation: "from-blue-600/40",
  Planning: "from-slate-600/40",
  Marketing: "from-violet-600/40",
};

export function AgentCard({ agent }: { agent: ExchangeAgent }) {
  const cover = agent.cover ?? agent.screenshots[0];
  const tint = CATEGORY_TINT[agent.category] ?? "from-primary/55";

  return (
    <Link
      href={`/exchange/${agent.slug}`}
      className="group/link block focus-visible:outline-none"
    >
      <Card className="h-full gap-0 overflow-hidden p-0 shadow-none transition-all duration-200 group-hover/link:-translate-y-0.5 group-hover/link:shadow-md group-hover/link:ring-primary/25 group-focus-visible/link:ring-2 group-focus-visible/link:ring-ring">
        {/* Screenshot cover */}
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cover}
              alt={`${agent.name} preview`}
              className="size-full object-cover object-top transition-transform duration-300 group-hover/link:scale-[1.03]"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary via-card to-muted">
              <span className="font-heading text-6xl font-bold text-primary/15">
                {agent.name.charAt(0)}
              </span>
            </div>
          )}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-70 mix-blend-multiply",
              tint,
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Logo chip */}
          <div className="absolute bottom-3 left-3 flex size-12 items-center justify-center overflow-hidden rounded-lg bg-card/95 shadow-sm ring-1 ring-foreground/10 backdrop-blur">
            {agent.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={agent.logo}
                alt={`${agent.name} logo`}
                className="size-full object-contain p-1.5"
              />
            ) : (
              <span className="font-heading text-lg font-bold text-primary">
                {agent.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Price / live pill */}
          <div className="absolute right-3 top-3 flex gap-1.5">
            {agent.kind !== "static" && (
              <Badge className="bg-emerald-500/90 text-white shadow-sm backdrop-blur">
                Live demo
              </Badge>
            )}
            <Badge className="bg-card/90 text-foreground shadow-sm ring-1 ring-foreground/10 backdrop-blur [a]:hover:bg-card/90">
              {agent.price}
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="truncate font-heading text-[15px] font-semibold leading-tight">
                {agent.name}
              </h3>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {agent.publisher}
              </p>
            </div>
            <ArrowUpRight className="size-4 shrink-0 text-muted-foreground/40 transition-colors group-hover/link:text-primary" />
          </div>

          <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">
            {agent.tagline}
          </p>

          <div className="mt-auto flex items-center gap-1.5 border-t pt-3 text-xs text-muted-foreground [&:not(:first-child)]:mt-4">
            <Badge variant="secondary" className="mr-auto">
              {agent.category}
            </Badge>
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">
              {agent.rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground/70">({agent.reviews})</span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
