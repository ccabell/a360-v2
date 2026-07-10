"use server";

import { readFile } from "fs/promises";
import { revalidatePath } from "next/cache";
import { saveAgent, uploadAgentMedia } from "@/lib/exchange/admin";
import {
  readApprovedManifest,
  resolveFactoryAsset,
  type ApprovedManifest,
} from "@/lib/exchange/asset-factory";
import { getAgentSupabase } from "@/lib/supabase";
import type { ExchangeAgent } from "@/lib/exchange/agents";

/**
 * Server actions for the Exchange admin UI. Auth is already enforced by
 * proxy.ts (ADMIN_SESSION_COOKIE) for every /admin/* request, including the
 * RSC action POSTs these are invoked through — no separate check needed here.
 */

export async function saveAgentAction(
  agent: ExchangeAgent,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const result = await saveAgent(agent);
  if (result.ok) {
    revalidatePath("/exchange");
    revalidatePath(`/exchange/${agent.slug}`);
    revalidatePath("/admin/exchange");
  }
  return result;
}

export async function uploadImageAction(
  slug: string,
  folder: "screenshots" | "logo" | "cover",
  formData: FormData,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "No file provided" };
  }
  return uploadAgentMedia(slug, folder, file);
}

/** Reads the asset_factory approval export. Returns null if not exported yet. */
export async function getApprovedManifestAction(): Promise<ApprovedManifest | null> {
  return readApprovedManifest();
}

/**
 * Imports one approved asset from the local asset_factory checkout into the
 * exchange-media Storage bucket. `relativeFile` must be a `file` value taken
 * verbatim from a manifest entry returned by getApprovedManifestAction — never
 * an arbitrary client-supplied path.
 */
export async function importFactoryAssetAction(
  slug: string,
  folder: "screenshots" | "logo" | "cover",
  relativeFile: string,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  const manifest = await readApprovedManifest();
  const known =
    manifest &&
    [...manifest.covers, ...manifest.icons, ...manifest.screenshots].some(
      (e) => e.file === relativeFile,
    );
  if (!known) {
    return { ok: false, error: "That asset isn't in the current approved manifest" };
  }

  const absolutePath = resolveFactoryAsset(relativeFile);
  let bytes: Buffer;
  try {
    bytes = await readFile(absolutePath);
  } catch {
    return { ok: false, error: `Could not read ${absolutePath}` };
  }

  const ext = relativeFile.split(".").pop() || "png";
  const contentType = ext === "svg" ? "image/svg+xml" : `image/${ext === "jpg" ? "jpeg" : ext}`;
  const storagePath = `${slug}/${folder}/${Date.now()}.${ext}`;
  const { error } = await getAgentSupabase()
    .storage.from("exchange-media")
    .upload(storagePath, bytes, { contentType, upsert: false });
  if (error) return { ok: false, error: error.message };

  const { data } = getAgentSupabase().storage.from("exchange-media").getPublicUrl(storagePath);
  return { ok: true, url: data.publicUrl };
}
