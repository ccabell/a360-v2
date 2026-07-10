"use client";

import * as React from "react";
import { Loader2, Download, PackageOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { slugLooselyMatches } from "@/lib/exchange/slug-match";
import {
  getApprovedManifestAction,
  importFactoryAssetAction,
} from "@/app/admin/exchange/actions";
import type { ApprovedManifest } from "@/lib/exchange/asset-factory";

/**
 * Reads asset_factory's approved-asset export and lets the admin attach a
 * cover/icon to this listing or add screenshots to the gallery. Empty state
 * when no export exists yet — this is expected until Chris runs the review
 * gallery on that side.
 */
export function AssetFactoryImportPanel({
  slug,
  onSetLogo,
  onSetCover,
  onAddScreenshots,
}: {
  slug: string;
  onSetLogo: (url: string) => void;
  onSetCover: (url: string) => void;
  onAddScreenshots: (urls: string[]) => void;
}) {
  const [manifest, setManifest] = React.useState<ApprovedManifest | null | undefined>(undefined);
  const [showAll, setShowAll] = React.useState(false);
  const [importing, setImporting] = React.useState<string | null>(null);
  const [selectedShots, setSelectedShots] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    getApprovedManifestAction().then(setManifest);
  }, []);

  if (manifest === undefined) {
    return (
      <p className="text-sm text-muted-foreground">
        <Loader2 className="mr-1.5 inline size-3.5 animate-spin" />
        Checking asset_factory for approved assets…
      </p>
    );
  }

  if (manifest === null) {
    return (
      <div className="rounded-lg border border-dashed bg-muted/30 p-3 text-sm text-muted-foreground">
        <PackageOpen className="mr-1.5 inline size-4" />
        No approved assets exported from asset_factory yet. Run the review
        gallery there and export decisions to enable this panel.
      </div>
    );
  }

  const matchFn = showAll ? () => true : (s: string) => slugLooselyMatches(slug, s);
  const covers = manifest.covers.filter((c) => matchFn(c.slug));
  const icons = manifest.icons.filter((c) => matchFn(c.slug));
  const shots = manifest.screenshots.filter((s) => matchFn(s.agent));

  async function importOne(
    relativeFile: string,
    folder: "logo" | "cover",
    onDone: (url: string) => void,
  ) {
    setImporting(relativeFile);
    const result = await importFactoryAssetAction(slug, folder, relativeFile);
    setImporting(null);
    if (result.ok) onDone(result.url);
  }

  async function importShots() {
    const files = Array.from(selectedShots);
    if (!files.length) return;
    setImporting("__shots__");
    const urls: string[] = [];
    for (const f of files) {
      const result = await importFactoryAssetAction(slug, "screenshots", f);
      if (result.ok) urls.push(result.url);
    }
    setImporting(null);
    setSelectedShots(new Set());
    if (urls.length) onAddScreenshots(urls);
  }

  const nothingMatched = !covers.length && !icons.length && !shots.length;

  return (
    <div className="space-y-4 rounded-lg border bg-card p-3.5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Import from Asset Factory
        </p>
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="text-xs text-primary hover:underline"
        >
          {showAll ? "Show matches only" : "Show all approved assets"}
        </button>
      </div>

      {nothingMatched && (
        <p className="text-sm text-muted-foreground">
          No approved assets match this slug yet. Try &quot;Show all&quot;.
        </p>
      )}

      {covers.length > 0 && (
        <div>
          <p className="text-[11px] text-muted-foreground">Covers</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {covers.map((c) => (
              <Button
                key={c.file}
                type="button"
                variant="outline"
                size="sm"
                disabled={importing === c.file}
                onClick={() => importOne(c.file, "cover", onSetCover)}
                className="gap-1.5"
              >
                {importing === c.file ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Download className="size-3.5" />
                )}
                {c.slug}
              </Button>
            ))}
          </div>
        </div>
      )}

      {icons.length > 0 && (
        <div>
          <p className="text-[11px] text-muted-foreground">Icons (set as logo)</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {icons.map((c) => (
              <Button
                key={c.file}
                type="button"
                variant="outline"
                size="sm"
                disabled={importing === c.file}
                onClick={() => importOne(c.file, "logo", onSetLogo)}
                className="gap-1.5"
              >
                {importing === c.file ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Download className="size-3.5" />
                )}
                {c.slug}
              </Button>
            ))}
          </div>
        </div>
      )}

      {shots.length > 0 && (
        <div>
          <p className="text-[11px] text-muted-foreground">
            Screenshots (select, then import)
          </p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {shots.map((s) => {
              const checked = selectedShots.has(s.file);
              return (
                <label
                  key={s.file}
                  className="flex cursor-pointer items-center gap-1.5 rounded-lg border px-2 py-1 text-xs"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      const next = new Set(selectedShots);
                      if (e.target.checked) next.add(s.file);
                      else next.delete(s.file);
                      setSelectedShots(next);
                    }}
                    className="accent-primary"
                  />
                  {s.title || s.route}
                </label>
              );
            })}
          </div>
          <Button
            type="button"
            size="sm"
            className="mt-2 gap-1.5"
            disabled={!selectedShots.size || importing === "__shots__"}
            onClick={importShots}
          >
            {importing === "__shots__" ? (
              <Loader2 className="size-3.5 animate-spin" />
            ) : (
              <Download className="size-3.5" />
            )}
            Import {selectedShots.size || ""} screenshot{selectedShots.size === 1 ? "" : "s"}
          </Button>
        </div>
      )}
    </div>
  );
}
