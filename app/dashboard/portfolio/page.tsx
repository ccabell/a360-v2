import { PortfolioWorkbench } from "@/components/portfolio/portfolio-workbench";

export const dynamic = "force-dynamic";

/**
 * Prototype Portfolio (internal): every prototype in the registry with status,
 * tier, promotion distance and audiences — plus audience preview and share-
 * link minting. Route access for share-link visitors is enforced in proxy.ts.
 */
export default function PortfolioPage() {
  return <PortfolioWorkbench />;
}
