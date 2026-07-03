import Link from "next/link";
import { Star, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ExchangeAgent } from "@/lib/exchange/agents";

/** Category-keyed cover tint so the grid reads as a cohesive set. */
const CATEGORY_TINT: Record<string, string> = {
  Analytics: "from-sky-700/55",
  Financial: "from-emerald-700/55",
  Training: "from-violet-700/55",
  Imaging: "from-fuchsia-700/55",
  Knowledge: "from-cyan-700/55",
  Documentation: "from-indigo-700/55",
  Planning: "from-amber-700/55",
  Marketing: "from-rose-700/55",
};

export function AgentCard({ agent }: { agent: ExchangeAgent }) {
  const cover = agent.cover ?? agent.screenshots[0];
  const tint = CATEGORY_TINT[agent.category] ?? "from-primary/55";

  return (
    <Link
      href={`/exchange/${agent.slug}`}
      className="group/link block focus-visible:outline-none"
    >
      <Card className="h-full gap-0 overflow-hidden p-0 transition-all duration-200 group-hover/link:-translate-y-1 group-hover/link:shadow-xl group-hover/link:ring-foreground/15 group-focus-visible/link:ring-2 group-focus-visible/link:ring-ring">
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
            <div className="size-full bg-gradient-to-br from-muted to-secondary" />
          )}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-90 mix-blend-multiply",
              tint,
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

          {/* Logo chip */}
          <div className="absolute bottom-3 left-3 flex size-12 items-center justify-center overflow-hidden rounded-xl bg-card/95 shadow-sm ring-1 ring-foreground/10 backdrop-blur">
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
