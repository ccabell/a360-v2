"use client";

import * as React from "react";
import { Upload, X, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { uploadImageAction } from "@/app/admin/exchange/actions";

/** Single-image upload + preview + remove. Used for logo/cover. */
export function SingleImageUploader({
  slug,
  folder,
  value,
  onChange,
  label,
}: {
  slug: string;
  folder: "logo" | "cover";
  value: string | undefined;
  onChange: (url: string | undefined) => void;
  label: string;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!slug) {
      setError("Enter a slug first");
      return;
    }
    setUploading(true);
    setError(null);
    const fd = new FormData();
    fd.set("file", file);
    const result = await uploadImageAction(slug, folder, fd);
    setUploading(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onChange(result.url);
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <div className="mt-2 flex items-center gap-3">
        {value ? (
          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg border bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt={label} className="size-full object-contain" />
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-black/60 text-white"
            >
              <X className="size-2.5" />
            </button>
          </div>
        ) : (
          <div className="flex size-16 shrink-0 items-center justify-center rounded-lg border border-dashed bg-muted/40 text-muted-foreground">
            <Upload className="size-4" />
          </div>
        )}
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? <Loader2 className="size-3.5 animate-spin" /> : "Upload"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

/** Multi-image gallery upload + reorder + remove. Used for screenshots. */
export function GalleryUploader({
  slug,
  values,
  onChange,
}: {
  slug: string;
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList) {
    if (!slug) {
      setError("Enter a slug first");
      return;
    }
    setUploading(true);
    setError(null);
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.set("file", file);
      const result = await uploadImageAction(slug, "screenshots", fd);
      if (!result.ok) {
        setError(result.error);
        continue;
      }
      uploaded.push(result.url);
    }
    setUploading(false);
    if (uploaded.length) onChange([...values, ...uploaded]);
  }

  function move(from: number, to: number) {
    const next = [...values];
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    onChange(next);
  }

  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Screenshots
      </span>
      <div className="mt-2 flex flex-wrap gap-3">
        {values.map((src, i) => (
          <div key={src + i} className="group relative w-40 shrink-0">
            <div className="aspect-[16/10] overflow-hidden rounded-lg border bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`Screenshot ${i + 1}`} className="size-full object-cover" />
            </div>
            <button
              type="button"
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="size-3" />
            </button>
            <div className="mt-1 flex justify-center gap-1">
              <button
                type="button"
                disabled={i === 0}
                onClick={() => move(i, i - 1)}
                className="rounded px-1.5 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30"
              >
                ↑
              </button>
              <button
                type="button"
                disabled={i === values.length - 1}
                onClick={() => move(i, i + 1)}
                className="rounded px-1.5 text-xs text-muted-foreground hover:bg-muted disabled:opacity-30"
              >
                ↓
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="flex aspect-[16/10] w-40 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed bg-muted/40 text-muted-foreground hover:bg-muted/70"
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
          <span className="text-xs">Add images</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
