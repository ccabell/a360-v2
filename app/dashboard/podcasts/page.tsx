import { redirect } from "next/navigation";

/** Dashboard entry point redirects to the standalone Podcast Navigator. */
export default function DashboardPodcastsRedirect() {
  redirect("/podcast");
}
