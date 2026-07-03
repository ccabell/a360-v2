import { redirect } from "next/navigation";

/**
 * Standalone app alias — redirects to the main Podcast Navigator.
 * Available at /apps/podcasts (public, no auth required).
 */
export default function StandalonePodcastsRedirect() {
  redirect("/podcast");
}
