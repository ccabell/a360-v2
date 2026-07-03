import { Home, Search } from "lucide-react";

export default function DashboardNotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
          <Search className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="mt-4 text-lg font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          This dashboard page doesn&apos;t exist. It may have been moved or
          removed.
        </p>
        <div className="mt-6">
          <a
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/80 transition-colors"
          >
            <Home className="mr-1.5 h-4 w-4" />
            Back to dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
