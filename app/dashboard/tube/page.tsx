import { redirect } from "next/navigation";

/**
 * The Video Navigator now lives at the standalone /tube surface (landing page
 * with Ask / Navigate / Learn, in-app player). Keep this old dashboard route
 * working by sending visitors there.
 */
export default function DashboardTubeRedirect() {
  redirect("/tube");
}
