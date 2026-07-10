import Link from "next/link";
import { Plus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listAgentsForAdmin } from "@/lib/exchange/admin";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  live: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  draft: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  archived: "bg-muted text-muted-foreground",
};

export default async function AdminExchangeListPage() {
  const agents = await listAgentsForAdmin();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-xl font-semibold tracking-tight">
            Agent Exchange
          </h1>
          <p className="text-sm text-muted-foreground">
            {agents.length} {agents.length === 1 ? "agent" : "agents"}
          </p>
        </div>
        <Link href="/admin/exchange/new">
          <Button className="gap-1.5">
            <Plus className="size-4" />
            New agent
          </Button>
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/40 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-2.5">Name</th>
              <th className="px-4 py-2.5">Category</th>
              <th className="px-4 py-2.5">Status</th>
              <th className="px-4 py-2.5">Updated</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a.slug} className="border-b last:border-0 hover:bg-muted/30">
                <td className="px-4 py-2.5">
                  <Link
                    href={`/admin/exchange/${a.slug}`}
                    className="font-medium hover:text-primary hover:underline"
                  >
                    {a.name || a.slug}
                  </Link>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">{a.category}</td>
                <td className="px-4 py-2.5">
                  <Badge className={STATUS_STYLE[a.status] ?? ""}>{a.status}</Badge>
                </td>
                <td className="px-4 py-2.5 text-muted-foreground">
                  {new Date(a.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {agents.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">
                  No agents yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
