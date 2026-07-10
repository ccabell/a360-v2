"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, ExternalLink } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StringListEditor, ObjectListEditor } from "@/components/admin/field-editors";
import { SingleImageUploader, GalleryUploader } from "@/components/admin/image-uploader";
import { AssetFactoryImportPanel } from "@/components/admin/asset-factory-import";
import { saveAgentAction } from "@/app/admin/exchange/actions";
import type { ExchangeAgent } from "@/lib/exchange/agents";

const BLANK: ExchangeAgent = {
  slug: "",
  name: "",
  publisher: "Aesthetics360",
  developer: "Aesthetics360",
  category: "",
  tagline: "",
  description: "",
  price: "Premium",
  rating: 0,
  reviews: 0,
  screenshots: [],
  features: [],
  useCases: [],
  tagGroups: [],
  updates: [],
  size: "",
  lastUpdate: new Date().toISOString().slice(0, 10),
  kind: "static",
  status: "draft",
  badges: [],
  emrCompatibility: [],
  integrations: [],
  dataFields: { reads: [], writes: [] },
  kpis: [],
  pricingTiers: [],
  agentReviews: [],
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

function NativeSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}

const KNOWN_CATEGORIES = [
  "Analytics",
  "Documentation",
  "Financial",
  "Imaging",
  "Knowledge",
  "Marketing",
  "Planning",
  "Training",
];

export function AgentEditForm({
  initial,
  isNew,
}: {
  initial: ExchangeAgent | null;
  isNew: boolean;
}) {
  const router = useRouter();
  const [agent, setAgent] = React.useState<ExchangeAgent>(initial ?? BLANK);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [saved, setSaved] = React.useState(false);

  function set<K extends keyof ExchangeAgent>(key: K, value: ExchangeAgent[K]) {
    setAgent((a) => ({ ...a, [key]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const payload: ExchangeAgent = {
      ...agent,
      lastUpdate: new Date().toISOString().slice(0, 10),
    };
    const result = await saveAgentAction(payload);
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSaved(true);
    if (isNew) router.push(`/admin/exchange/${agent.slug}`);
    else router.refresh();
  }

  const canSave = agent.slug.trim() && agent.name.trim() && agent.category.trim();

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-xl font-semibold tracking-tight">
            {isNew ? "New agent" : agent.name || agent.slug}
          </h1>
          <p className="text-sm text-muted-foreground">
            {isNew ? "Create a new Exchange listing" : `/exchange/${agent.slug}`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && (
            <a
              href={`/exchange/${agent.slug}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              View live <ExternalLink className="size-3.5" />
            </a>
          )}
          <Button onClick={handleSave} disabled={!canSave || saving} className="gap-1.5">
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            {saved ? "Saved" : "Save"}
          </Button>
        </div>
      </div>
      {error && (
        <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/5 p-2.5 text-sm text-destructive">
          {error}
        </p>
      )}

      <Tabs defaultValue="identity" className="mt-6 gap-6">
        <TabsList variant="line">
          <TabsTrigger value="identity">Identity</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="integrations">Integrations &amp; Data</TabsTrigger>
          <TabsTrigger value="pricing">Pricing &amp; Reviews</TabsTrigger>
          <TabsTrigger value="changelog">Changelog</TabsTrigger>
        </TabsList>

        {/* Identity */}
        <TabsContent value="identity" className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug">
              <Input
                value={agent.slug}
                disabled={!isNew}
                placeholder="my-agent"
                onChange={(e) =>
                  set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))
                }
              />
            </Field>
            <Field label="Category">
              <Input
                value={agent.category}
                list="category-options"
                placeholder="Documentation"
                onChange={(e) => set("category", e.target.value)}
              />
              <datalist id="category-options">
                {KNOWN_CATEGORIES.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </Field>
          </div>
          <Field label="Name">
            <Input value={agent.name} onChange={(e) => set("name", e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Publisher">
              <Input value={agent.publisher} onChange={(e) => set("publisher", e.target.value)} />
            </Field>
            <Field label="Developer">
              <Input value={agent.developer} onChange={(e) => set("developer", e.target.value)} />
            </Field>
          </div>
          <Field label="Tagline">
            <Input value={agent.tagline} onChange={(e) => set("tagline", e.target.value)} />
          </Field>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Price">
              <NativeSelect
                value={agent.price}
                onChange={(v) => set("price", v as ExchangeAgent["price"])}
                options={[
                  { value: "Free", label: "Free" },
                  { value: "Premium", label: "Premium" },
                ]}
              />
            </Field>
            <Field label="Status">
              <NativeSelect
                value={agent.status ?? "draft"}
                onChange={(v) => set("status", v as ExchangeAgent["status"])}
                options={[
                  { value: "draft", label: "Draft" },
                  { value: "live", label: "Live" },
                  { value: "archived", label: "Archived" },
                ]}
              />
            </Field>
            <Field label="Install count">
              <Input
                value={agent.installCount ?? ""}
                placeholder="290+ practices"
                onChange={(e) => set("installCount", e.target.value)}
              />
            </Field>
          </div>
          <div className="flex items-center gap-6 rounded-lg border bg-card p-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={agent.verified ?? false}
                onChange={(e) => set("verified", e.target.checked)}
                className="size-4 accent-primary"
              />
              A360 Verified
            </label>
            {agent.verified && (
              <Input
                type="date"
                value={agent.verifiedDate ?? ""}
                onChange={(e) => set("verifiedDate", e.target.value)}
                className="w-40"
              />
            )}
          </div>
          <StringListEditor
            label="Badges"
            values={agent.badges ?? []}
            onChange={(v) => set("badges", v)}
            placeholder="Flagship"
          />
        </TabsContent>

        {/* Media */}
        <TabsContent value="media" className="space-y-5">
          {!agent.slug && (
            <p className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-2.5 text-sm text-amber-700 dark:text-amber-400">
              Enter a slug on the Identity tab before uploading images.
            </p>
          )}
          {agent.slug && (
            <AssetFactoryImportPanel
              slug={agent.slug}
              onSetLogo={(url) => set("logo", url)}
              onSetCover={(url) => set("cover", url)}
              onAddScreenshots={(urls) => set("screenshots", [...agent.screenshots, ...urls])}
            />
          )}
          <div className="grid grid-cols-2 gap-4">
            <SingleImageUploader
              slug={agent.slug}
              folder="logo"
              value={agent.logo}
              onChange={(v) => set("logo", v)}
              label="Logo"
            />
            <SingleImageUploader
              slug={agent.slug}
              folder="cover"
              value={agent.cover}
              onChange={(v) => set("cover", v)}
              label="Cover (defaults to first screenshot)"
            />
          </div>
          <GalleryUploader
            slug={agent.slug}
            values={agent.screenshots}
            onChange={(v) => set("screenshots", v)}
          />
          <Field label="Video URL (YouTube)">
            <Input
              value={agent.videoUrl ?? ""}
              placeholder="https://www.youtube.com/watch?v=..."
              onChange={(e) => set("videoUrl", e.target.value)}
            />
          </Field>
        </TabsContent>

        {/* Content */}
        <TabsContent value="content" className="space-y-5">
          <Field label="Description">
            <Textarea
              className="min-h-28"
              value={agent.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
          <StringListEditor
            label="Features"
            values={agent.features}
            onChange={(v) => set("features", v)}
            placeholder="Real-time transcription"
          />
          <ObjectListEditor
            label="Use cases"
            values={agent.useCases}
            onChange={(v) => set("useCases", v)}
            fields={[
              { key: "label", label: "Label", placeholder: "Stay present during consults" },
              { key: "description", label: "Description", type: "textarea" },
            ]}
            emptyItem={{ label: "", description: "" }}
          />
          <ObjectListEditor
            label="Proof metrics (KPIs)"
            values={agent.kpis ?? []}
            onChange={(v) => set("kpis", v)}
            fields={[
              { key: "label", label: "Label", placeholder: "Avg. review time" },
              { key: "value", label: "Value", placeholder: "38 sec" },
            ]}
            emptyItem={{ label: "", value: "" }}
          />
          <ObjectListEditor
            label="Tag groups (sidebar)"
            values={agent.tagGroups}
            onChange={(v) => set("tagGroups", v)}
            fields={[
              { key: "category", label: "Group name", placeholder: "EMR Layer" },
              { key: "items", label: "Tags", type: "stringlist", placeholder: "One per line" },
            ]}
            emptyItem={{ category: "", items: [] }}
          />
        </TabsContent>

        {/* Integrations & Data */}
        <TabsContent value="integrations" className="space-y-5">
          <Field label="Integration depth">
            <NativeSelect
              value={agent.integrationDepth ?? ""}
              onChange={(v) =>
                set("integrationDepth", (v || undefined) as ExchangeAgent["integrationDepth"])
              }
              options={[
                { value: "", label: "—" },
                { value: "Native", label: "Native" },
                { value: "API", label: "API" },
                { value: "Read-only", label: "Read-only" },
              ]}
            />
          </Field>
          <StringListEditor
            label="Works with (EMR compatibility)"
            values={agent.emrCompatibility ?? []}
            onChange={(v) => set("emrCompatibility", v)}
            placeholder="Boulevard"
          />
          <ObjectListEditor
            label="Connects to"
            values={agent.integrations ?? []}
            onChange={(v) => set("integrations", v)}
            fields={[
              { key: "name", label: "Name", placeholder: "Notes" },
              { key: "type", label: "Type", placeholder: "A360 agent" },
            ]}
            emptyItem={{ name: "", type: "" }}
          />
          <div className="grid grid-cols-2 gap-4">
            <StringListEditor
              label="Reads"
              values={agent.dataFields?.reads ?? []}
              onChange={(v) =>
                set("dataFields", { ...agent.dataFields, reads: v })
              }
              placeholder="Consultation audio"
            />
            <StringListEditor
              label="Writes"
              values={agent.dataFields?.writes ?? []}
              onChange={(v) =>
                set("dataFields", { ...agent.dataFields, writes: v })
              }
              placeholder="Speaker-labeled transcript"
            />
          </div>
          <Field label="Retention note">
            <Textarea
              value={agent.dataFields?.retention ?? ""}
              onChange={(e) =>
                set("dataFields", { ...agent.dataFields, retention: e.target.value })
              }
            />
          </Field>
        </TabsContent>

        {/* Pricing & Reviews */}
        <TabsContent value="pricing" className="space-y-5">
          <ObjectListEditor
            label="Pricing tiers"
            values={agent.pricingTiers ?? []}
            onChange={(v) => set("pricingTiers", v)}
            fields={[
              { key: "name", label: "Tier name", placeholder: "Solo" },
              { key: "price", label: "Price", placeholder: "$199" },
              { key: "note", label: "Note", placeholder: "per provider / mo" },
              { key: "features", label: "Features", type: "stringlist" },
            ]}
            emptyItem={{ name: "", price: "", note: "", features: [] }}
          />
          <ObjectListEditor
            label="Reviews"
            values={agent.agentReviews ?? []}
            onChange={(v) => set("agentReviews", v)}
            fields={[
              { key: "author", label: "Author", placeholder: "NP owner, medspa" },
              { key: "role", label: "Location / role", placeholder: "Nashville, TN" },
              { key: "rating", label: "Rating (1-5)", type: "number" },
              { key: "quote", label: "Quote", type: "textarea" },
            ]}
            emptyItem={{ author: "", role: "", rating: 5, quote: "" }}
          />
        </TabsContent>

        {/* Changelog */}
        <TabsContent value="changelog" className="space-y-5">
          <ObjectListEditor
            label="Updates"
            values={agent.updates}
            onChange={(v) => set("updates", v)}
            fields={[
              { key: "title", label: "Title", placeholder: "EMR integration" },
              { key: "date", label: "Date (YYYY-MM-DD)", placeholder: "2026-07-10" },
              { key: "description", label: "Description", type: "textarea" },
            ]}
            emptyItem={{ title: "", date: "", description: "" }}
          />
        </TabsContent>
      </Tabs>

      <div className={cn("mt-8 flex justify-end border-t pt-5")}>
        <Button onClick={handleSave} disabled={!canSave || saving} size="lg" className="gap-1.5">
          {saving ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
          {saved ? "Saved" : "Save agent"}
        </Button>
      </div>
    </div>
  );
}
