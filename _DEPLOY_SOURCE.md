# DEPLOY SOURCE — a360-v2-wse

This directory is the canonical deploy source for the **a360-v2-wse** Vercel project.

| Field | Value |
|---|---|
| App | a360-v2-wse (WSE demo suite + Video/Podcast Navigator) |
| Vercel project | `a360-v2-wse` |
| Project ID | `prj_KXW7C1STkHbNTag6v0WEA1Ey8G3A` |
| Org ID | `team_hOeESw8UbVnqMawOzR5NfoFF` |
| Canonical URL | https://a360-v2-wse.vercel.app |
| Deploy method | **Vercel CLI** (`vercel deploy --prod --yes`) — NOT git-push. "pushed" ≠ "deployed". |
| Git | worktree of `Aesthetics-360/a360-v2`; ship from `main` (feature branches merge to `main` first) |

## Before deploying (deploy-safety checklist)

1. You are in `C:\Projects\a360-v2-wse` and this file exists. ✔ (that's the point of this file)
2. `.vercel/project.json` `projectId` == `prj_KXW7C1STkHbNTag6v0WEA1Ey8G3A`.
3. `git status` clean; on the intended branch; latest code committed + pushed.
4. Deploy with the linked project only — **never** `vercel --name X` (it relinks the project to the current dir and can overwrite a live app).

Registry: `A360_Hub\INFRASTRUCTURE.md` → Deployable app registry.
