import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-slate-200 px-8 py-6 bg-white">
          <h1 className="text-3xl font-bold text-slate-900">A360 Intelligence Platform</h1>
          <p className="text-sm text-slate-600 mt-2">Evidence-based consultation & treatment planning</p>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto bg-slate-50">
          {children}
        </div>
      </div>
    </div>
  );
}
