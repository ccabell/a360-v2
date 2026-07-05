import { AGENTS } from "@/lib/exchange/agents";
import { getViewerAudience } from "@/lib/portfolio/viewer";
import { ExchangeCatalog } from "@/components/exchange/exchange-catalog";

export const dynamic = "force-dynamic";

/**
 * Server wrapper: audience share-link visitors only get cards mapped (via
 * portfolioSlug) into their audience — enforced here, not just hidden. Beta
 * sessions and ungated dev see the full catalog.
 */
export default async function ExchangePage() {
  const viewer = await getViewerAudience();
  const agents =
    viewer.kind === "audience"
      ? AGENTS.filter(
          (a) => a.portfolioSlug && viewer.slugs.includes(a.portfolioSlug),
        )
      : AGENTS;

  return <ExchangeCatalog agents={agents} />;
}
