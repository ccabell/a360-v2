import { CommandNav } from "@/components/portfolio/command-nav";

/**
 * A360 Command Center (plan: A360_Hub/plans/a360-command-center-plan.md).
 * Internal cockpit behind the Exchange storefront — every project, its data
 * sources, and work history under the existing beta password gate.
 */
export default function CommandCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <CommandNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}
