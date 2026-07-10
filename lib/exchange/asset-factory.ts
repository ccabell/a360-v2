/**
 * Reads the approved-asset export from the (separate, local-only) asset_factory
 * project. Server-only (uses fs) — never import into a client component.
 *
 * Per the factory's own handoff contract: APPROVED_MANIFEST.json is the ONLY
 * source read here. Never reach into _covers/ or _mock_screens/ directly —
 * those include everything Chris rejected in the review gallery.
 *
 * This only works when the Next.js server and the asset_factory checkout are
 * on the same machine (local dev) — the import action reads files off disk.
 */
import { readFile } from "fs/promises";
import path from "path";

const FACTORY_ROOT = "C:/projects/asset_factory/assets/_handoff/exchange";
const MANIFEST_PATH = path.join(FACTORY_ROOT, "APPROVED_MANIFEST.json");

export interface ApprovedManifest {
  generated: string;
  covers: { slug: string; file: string }[];
  icons: { slug: string; file: string }[];
  screenshots: { agent: string; route: string; title?: string; caption?: string; file: string }[];
}

/** Returns null if the factory hasn't exported an approval manifest yet. */
export async function readApprovedManifest(): Promise<ApprovedManifest | null> {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf-8");
    return JSON.parse(raw) as ApprovedManifest;
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw err;
  }
}

/**
 * Resolves a manifest-relative file path to an absolute one, ONLY if it
 * exactly matches a `file` value already present in the manifest — the
 * caller must pass an entry read from readApprovedManifest(), never an
 * arbitrary client-supplied path.
 */
export function resolveFactoryAsset(relativeFile: string): string {
  return path.join(FACTORY_ROOT, relativeFile);
}
