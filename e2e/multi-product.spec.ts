import { test, expect, Page } from "@playwright/test";

/**
 * Multi-product E2E tests — verify each GL product category produces
 * a rich, structured answer with sources from the correct product.
 *
 * Uses DEMO_BYPASS_TOKEN to skip rate limits during testing.
 */

const BYPASS_TOKEN = process.env.DEMO_BYPASS_TOKEN ?? "e2e-test-bypass-token-local";

/** Inject bypass header on all /api/ask requests so rate limits don't block tests. */
async function injectBypass(page: Page) {
  await page.route("**/api/ask", (route) => {
    const headers = {
      ...route.request().headers(),
      "x-demo-token": BYPASS_TOKEN,
    };
    route.continue({ headers });
  });
}

/** Wait for answer completion by checking for the "N cited" toggle. */
async function waitForAnswer(page: Page) {
  await expect(page.locator("text=/\\d+ cited/").first()).toBeVisible({
    timeout: 50_000,
  });
}

/** Submit a query and wait for sources + answer. */
async function askAndWait(page: Page, query: string) {
  await injectBypass(page);
  await page.goto("/ask");
  const input = page.getByRole("textbox");
  await input.fill(query);
  await input.press("Enter");

  // Wait for source bar
  const sourceBar = page.locator("text=/\\d+ sources found/");
  await expect(sourceBar).toBeVisible({ timeout: 25_000 });

  // Wait for answer to complete
  await waitForAnswer(page);

  return { sourceBar };
}

// Run tests serially to avoid API overload
test.describe.configure({ mode: "serial" });

// ─── Neurotoxins ────────────────────────────────────────────────────────────

test.describe("Neurotoxins", () => {
  test("Botox — produces structured answer with FDA sources", async ({ page }) => {
    await askAndWait(page, "What are the FDA-approved indications for Botox Cosmetic?");

    // Must have FDA sources
    await expect(page.locator("text=Reliable").first()).toBeVisible();
    await expect(page.locator("text=Regulatory").first()).toBeVisible();

    // Key Points card
    await expect(page.locator("text=Key Points").first()).toBeVisible();

    // Section headings
    const headings = page.locator("h3");
    expect(await headings.count()).toBeGreaterThanOrEqual(2);

    // No marker leakage
    const body = await page.locator("body").textContent();
    expect(body).not.toContain("KEY_POINTS:");
  });

  test("Dysport — pulls Dysport-specific sources, not just Botox", async ({ page }) => {
    await askAndWait(page, "Tell me about Dysport for glabellar lines");

    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).toContain("dysport");
    await expect(page.locator("text=/\\d+ cited/")).toBeVisible();
  });

  test("Daxxify — retrieves Daxxify data", async ({ page }) => {
    await askAndWait(page, "What makes Daxxify different from other neurotoxins?");

    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).toContain("daxxify");
    await expect(page.locator("text=/\\d+ cited/")).toBeVisible();
  });
});

// ─── Dermal Fillers ─────────────────────────────────────────────────────────

test.describe("Dermal Fillers", () => {
  test("Juvederm Voluma — FDA + dossier sources about cheek augmentation", async ({ page }) => {
    await askAndWait(page, "What is Juvederm Voluma XC used for?");

    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).toContain("voluma");
    await expect(page.locator("text=Reliable").first()).toBeVisible();
    await expect(page.locator("text=Key Points").first()).toBeVisible();
  });

  test("Restylane Lyft — pulls Restylane-specific sources", async ({ page }) => {
    await askAndWait(page, "What is Restylane Lyft and what areas can it treat?");

    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).toContain("restylane");
    await expect(page.locator("text=/\\d+ cited/")).toBeVisible();
  });

  test("Generic filler query — pulls category-level dossiers", async ({ page }) => {
    await askAndWait(page, "How do dermal fillers work?");

    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).toContain("filler");
    const sourceBar = page.locator("text=/\\d+ sources found/");
    const text = await sourceBar.textContent();
    const count = parseInt(text?.match(/(\d+)/)?.[1] ?? "0");
    expect(count).toBeGreaterThanOrEqual(3);
  });
});

// ─── Energy / Devices ───────────────────────────────────────────────────────

test.describe("Energy Devices", () => {
  test("Morpheus8 — RF microneedling sources", async ({ page }) => {
    await askAndWait(page, "How does Morpheus8 work for skin tightening?");

    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).toContain("morpheus");
    await expect(page.locator("text=/\\d+ cited/")).toBeVisible();
  });

  test("CoolSculpting — body contouring sources", async ({ page }) => {
    await askAndWait(page, "How does CoolSculpting Elite work?");

    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).toContain("coolsculpting");
    await expect(page.locator("text=/\\d+ cited/")).toBeVisible();
  });
});

// ─── Biostimulators ─────────────────────────────────────────────────────────

test.describe("Biostimulators", () => {
  test("Sculptra — biostimulator sources with collagen mechanism", async ({ page }) => {
    await askAndWait(page, "How does Sculptra stimulate collagen?");

    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).toContain("sculptra");
    expect(body?.toLowerCase()).toMatch(/collagen|plla|poly-l-lactic/);
    await expect(page.locator("text=/\\d+ cited/")).toBeVisible();
  });

  test("Kybella — fat reduction sources", async ({ page }) => {
    await askAndWait(page, "What is Kybella used for?");

    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).toContain("kybella");
    await expect(page.locator("text=/\\d+ cited/")).toBeVisible();
  });
});

// ─── Cross-product queries ────────────────────────────────────────────────

test.describe("Cross-product queries", () => {
  test("Neurotoxin comparison — pulls multiple neurotoxin products", async ({ page }) => {
    await askAndWait(page, "Compare Botox vs Dysport vs Xeomin");

    const body = await page.locator("body").textContent();
    const lower = body?.toLowerCase() ?? "";
    expect(lower).toContain("botox");
    expect(lower).toMatch(/dysport|xeomin/);

    const sourceBar = page.locator("text=/\\d+ sources found/");
    const text = await sourceBar.textContent();
    const count = parseInt(text?.match(/(\d+)/)?.[1] ?? "0");
    expect(count).toBeGreaterThanOrEqual(8);
  });
});

// ─── Out-of-scope handling ──────────────────────────────────────────────────

test.describe("Out-of-scope", () => {
  test("non-aesthetic query shows decline with nearest topics", async ({ page }) => {
    await injectBypass(page);
    await page.goto("/ask");
    const input = page.getByRole("textbox");
    await input.fill("What is the weather today?");
    await input.press("Enter");

    // Should show out-of-scope message
    await expect(
      page.locator("text=/outside the A360|out of scope/i").first()
    ).toBeVisible({ timeout: 15_000 });
  });
});

// ─── Answer quality checks ──────────────────────────────────────────────────

test.describe("Answer quality", () => {
  test("answer includes follow-up pills", async ({ page }) => {
    await askAndWait(page, "What are the contraindications for Botox Cosmetic?");

    // Look for follow-up suggestion chips/pills
    const followUps = page.locator("[data-testid='follow-up'], button:has-text('?')");
    const count = await followUps.count();
    if (count === 0) {
      // Fallback: check for any rounded pill-style buttons after the answer
      const pills = page.locator(".rounded-full");
      expect(await pills.count()).toBeGreaterThanOrEqual(1);
    }
  });

  test("disclaimer is always visible", async ({ page }) => {
    await askAndWait(page, "Tell me about Sculptra");

    await expect(
      page.locator("text=not medical advice").first()
    ).toBeVisible();
  });

  test("answer does not leak raw markers", async ({ page }) => {
    await askAndWait(page, "What is Skinvive by Juvederm?");

    const body = await page.locator("body").textContent();
    // No raw [src_N] markers
    const unresolvedMarkers = body?.match(/\[src_\d+\]/g) ?? [];
    expect(unresolvedMarkers.length).toBe(0);
    // No KEY_POINTS/FOLLOW_UPS markers
    expect(body).not.toContain("KEY_POINTS:");
    expect(body).not.toContain("FOLLOW_UPS:");
  });
});
