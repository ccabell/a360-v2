import { notFound } from "next/navigation";

import { getAgent } from "@/lib/exchange/agents";
import { getViewerAudience } from "@/lib/portfolio/viewer";
import { AgentDetail } from "@/components/exchange/agent-detail";

export const dynamic = "force-dynamic";

/**
 * Server wrapper: detail pages for cards outside the visitor's audience 404
 * (matching the catalog filter), so hidden cards aren't reachable by URL.
 */
export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [agent, viewer] = await Promise.all([getAgent(slug), getViewerAudience()]);
  if (!agent) notFound();

  if (
    viewer.kind === "audience" &&
    !(agent.portfolioSlug && viewer.slugs.includes(agent.portfolioSlug))
  ) {
    notFound();
  }

  return <AgentDetail agent={agent} />;
}
