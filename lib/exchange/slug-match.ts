/**
 * Pure, client-safe: no fs import. Separated from asset-factory.ts (which
 * touches the filesystem) so client components can use this without pulling
 * Node built-ins into the browser bundle.
 */

/** Loose match: our slugs are long-form ("beacon-local-visibility"); the
 * factory's covers/icons manifest may use the short form ("beacon"). Treat a
 * match as either exact, or the short form being our slug's leading segment. */
export function slugLooselyMatches(ourSlug: string, factorySlug: string): boolean {
  if (ourSlug === factorySlug) return true;
  const shortForm = ourSlug.split("-")[0];
  return shortForm === factorySlug || ourSlug.startsWith(factorySlug + "-");
}
