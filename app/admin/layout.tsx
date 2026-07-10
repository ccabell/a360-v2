import Link from "next/link";
import { Settings2 } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-background">
      <nav className="border-b bg-card/60 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-4xl items-center gap-2 px-6">
          <Settings2 className="size-4 text-primary" />
          <Link href="/admin/exchange" className="font-heading text-sm font-semibold">
            Exchange Admin
          </Link>
          <Link
            href="/exchange"
            className="ml-auto text-sm text-muted-foreground hover:text-foreground"
          >
            View public site →
          </Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
