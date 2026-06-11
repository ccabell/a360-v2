import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="glass border-b border-white/5 px-8 py-6 bg-gradient-to-r from-slate-900/50 to-slate-950/50">
          <h1 className="text-3xl font-bold gradient-text">A360 Shell</h1>
          <p className="text-sm text-gray-400 mt-2">Advanced Multi-Agent Intelligence Platform</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-gradient-to-br from-slate-950 to-slate-900">
          {children}
        </div>
      </div>
    </div>
  );
}
