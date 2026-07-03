/**
 * Bare layout for standalone apps.
 * No sidebar, no dashboard header — each app provides its own chrome.
 * Apps are fully isolated from /dashboard/* and can be shared as standalone URLs.
 */
export default function AppsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
