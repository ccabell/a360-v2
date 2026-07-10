import { listAgents } from "@/lib/exchange/agents";
import { getViewerAudience } from "@/lib/portfolio/viewer";
import { ExchangeCatalog } from "@/components/exchange/exchange-catalog";

export const dynamic = "force-dynamic";

/**
 * Server wrapper: audience share-link visitors only get cards mapped (via
 * portfolioSlug) into their audience — enforced here, not just hidden. Beta
 * sessions and ungated dev see the full catalog.
 */
export default async function ExchangePage() {
  const [viewer, allAgents] = await Promise.all([
    getViewerAudience(),
    listAgents(),
  ]);
  const agents =
    viewer.kind === "audience"
      ? allAgents.filter(
          (a) => a.portfolioSlug && viewer.slugs.includes(a.portfolioSlug),
        )
      : allAgents;

  return <ExchangeCatalog agents={agents} />;
}
