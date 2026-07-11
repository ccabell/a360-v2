import { ProjectsWorkbench } from "@/components/portfolio/projects-workbench";
import { listProjects, listTasks } from "@/lib/portfolio/db";
import { deployStatuses } from "@/lib/portfolio/vercel-status";

export const dynamic = "force-dynamic";

/**
 * Projects surface: DB-backed registry with priority lanes / category tree,
 * detail panels (links + dependencies), manage mode, tasks, and copy-launch.
 * Vercel deploy badges overlay when VERCEL_API_TOKEN is configured.
 */
export default async function ProjectsPage() {
  const [projects, tasks] = await Promise.all([listProjects(), listTasks()]);
  const vercelProjects = projects.flatMap((p) => p.links.vercel ?? []);
  const status = await deployStatuses(vercelProjects);

  return (
    <ProjectsWorkbench
      projects={projects}
      tasks={tasks}
      deployStatuses={status.statuses}
    />
  );
}
