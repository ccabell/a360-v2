/**
 * Portfolio git-status sync (Command Center: last-commit date + uncommitted flag).
 *
 * The deployed Command Center runs on Vercel and can't read Chris's local repos,
 * so this script — run on the PC — captures each project's local git working
 * state (last commit AND uncommitted/unpushed work, which the GitHub API can't
 * see) and writes it into portfolio_projects.links.git in Ops. The page then
 * just displays the stored snapshot.
 *
 * Usage (from the a360-v2 repo root, so @supabase/supabase-js resolves):
 *   node scripts/sync-portfolio-git.mjs
 */
import { createRequire } from "module";
import { readFileSync, existsSync } from "fs";
import { execFileSync } from "child_process";

const require = createRequire(import.meta.url);
const { createClient } = require("@supabase/supabase-js");

// Load Ops creds from .env.local (never printed).
const env = {};
for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)\s*=\s*(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}
const url = env.OPS_SUPABASE_URL;
const key = env.OPS_SUPABASE_SERVICE_KEY;
if (!url || !key) {
  console.error("Missing OPS_SUPABASE_URL / OPS_SUPABASE_SERVICE_KEY in .env.local");
  process.exit(1);
}
const sb = createClient(url, key);

function git(cwd, args) {
  try {
    return execFileSync("git", ["-C", cwd, ...args], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return null;
  }
}

function snapshot(localPath) {
  if (!localPath || !existsSync(localPath)) return { ok: false, reason: "path missing" };
  if (git(localPath, ["rev-parse", "--is-inside-work-tree"]) !== "true")
    return { ok: false, reason: "not a git repo" };

  const head = git(localPath, ["log", "-1", "--format=%cI%x00%h%x00%s"]) ?? "";
  const [lastCommitAt, lastCommitSha, lastCommitSubject] = head.split("\0");
  const branch = git(localPath, ["rev-parse", "--abbrev-ref", "HEAD"]);
  const porcelain = git(localPath, ["status", "--porcelain"]) ?? "";
  const dirtyCount = porcelain ? porcelain.split(/\r?\n/).filter(Boolean).length : 0;
  const aheadRaw = git(localPath, ["rev-list", "--count", "@{upstream}..HEAD"]);
  const ahead = aheadRaw && /^\d+$/.test(aheadRaw) ? Number(aheadRaw) : 0;

  return {
    ok: true,
    git: {
      lastCommitAt: lastCommitAt || null,
      lastCommitSha: lastCommitSha || null,
      lastCommitSubject: lastCommitSubject || null,
      branch: branch || null,
      dirty: dirtyCount > 0,
      dirtyCount,
      ahead,
      syncedAt: new Date().toISOString(),
    },
  };
}

const { data: projects, error } = await sb
  .from("portfolio_projects")
  .select("slug, links");
if (error) {
  console.error("list portfolio_projects:", error.message);
  process.exit(1);
}

let synced = 0,
  skipped = 0,
  failed = 0;
for (const p of projects) {
  const links = p.links ?? {};
  const localPath = links.localPath;
  const snap = snapshot(localPath);
  if (!snap.ok) {
    skipped++;
    console.log(`skip  ${p.slug.padEnd(28)} (${localPath ? snap.reason : "no localPath"})`);
    continue;
  }
  const { error: upErr } = await sb
    .from("portfolio_projects")
    .update({ links: { ...links, git: snap.git }, updated_at: new Date().toISOString() })
    .eq("slug", p.slug);
  if (upErr) {
    failed++;
    console.error(`FAIL  ${p.slug}: ${upErr.message}`);
    continue;
  }
  synced++;
  const flag = snap.git.dirty ? `±${snap.git.dirtyCount}` : "clean";
  const ahead = snap.git.ahead ? ` ↑${snap.git.ahead}` : "";
  console.log(`ok    ${p.slug.padEnd(28)} ${(snap.git.lastCommitAt || "").slice(0, 10)} ${flag}${ahead} (${snap.git.branch})`);
}

console.log(`\nsynced ${synced}, skipped ${skipped}, failed ${failed}`);
process.exit(failed ? 1 : 0);
