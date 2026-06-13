import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border px-8 py-6 bg-background">
          <h1 className="text-3xl font-bold text-foreground">
            A360 Intelligence Platform
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Evidence-based consultation & treatment planning
          </p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-muted/30">{children}</div>
      </div>
    </div>
  );
}
