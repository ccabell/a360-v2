import { notFound } from "next/navigation";

import { getAgentForAdmin } from "@/lib/exchange/admin";
import { AgentEditForm } from "@/components/admin/agent-edit-form";

export const dynamic = "force-dynamic";

export default async function AdminEditAgentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const agent = await getAgentForAdmin(slug);
  if (!agent) notFound();

  return <AgentEditForm initial={agent} isNew={false} />;
}
