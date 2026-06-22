import { test, expect, type Page } from "@playwright/test";

// Runs against the live production deployment (stable, public). Override with
// SCRIBE_BASE to point at a local dev server.
const BASE = process.env.SCRIBE_BASE ?? "https://a360-v2-wse.vercel.app";
const SCRIBE = `${BASE}/dashboard/scribe`;

const SOFIA = "3f7bfaf1-b60a-4afd-ae8b-1e82244a2180";
const DANIELLE = "a9094b49-1395-42a9-bb33-f3168d087d19";

const patientSelect = (page: Page) => page.locator('select:has(option:has-text("Danielle Brooks"))');
const styleSelect = (page: Page) => page.locator('select:has(option:has-text("SOAP Note"))');

async function open(page: Page) {
  await page.goto(SCRIBE, { waitUntil: "domcontentloaded" });
  await expect(page.getByRole("heading", { name: "Scribe" })).toBeVisible({ timeout: 20000 });
  // wait for patients to load into the dropdown
  await expect(patientSelect(page)).toBeVisible({ timeout: 20000 });
}

test.describe("Scribe", () => {
  test("loads clean — controls, teal, no orange, no podcast", async ({ page }) => {
    await open(page);

    await expect(page.getByText("Clinical notes from the consultation")).toBeVisible();
    await expect(page.getByRole("button", { name: /Generate note/ })).toBeVisible();
    await expect(page.getByText("Choose a patient and note style")).toBeVisible();

    await expect(page.locator("body")).not.toContainText(/podcast/i);
    await expect(page.locator("body")).not.toContainText(/Products & services/i);

    // Primary button is A360 teal, not the old orange (#F5A623 ≈ rgb(245,166,35))
    const bg = await page
      .getByRole("button", { name: /Generate note/ })
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    const [r, g, b] = bg.match(/\d+/g)!.map(Number);
    const isOrange = r > 200 && g > 120 && g < 200 && b < 90;
    expect(isOrange, `button bg ${bg} should not be orange`).toBe(false);

    await page.screenshot({ path: "e2e/screenshots/scribe-empty.png", fullPage: true });
  });

  test("Danielle Brooks + SOAP generates a real note (previously broken)", async ({ page }) => {
    await open(page);
    await patientSelect(page).selectOption(DANIELLE);
    await styleSelect(page).selectOption("soap");
    await page.getByRole("button", { name: /Generate note/ }).click();

    const subjective = page.locator("tr", { hasText: "Subjective" });
    await expect(subjective).toBeVisible({ timeout: 25000 });
    for (const h of ["Objective", "Assessment", "Plan"]) {
      await expect(page.locator("tr", { hasText: h }).first()).toBeVisible();
    }
    // Subjective is documented — green check, not "Not documented" / "Missing"
    await expect(subjective).not.toContainText("Not documented");
    await expect(subjective).not.toContainText("Missing");
    await expect(subjective.locator("svg.lucide-check")).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/scribe-danielle-soap.png", fullPage: true });
  });

  test("Sofia Reyes + Injectable shows compliance flag + AI suggestion", async ({ page }) => {
    await open(page);
    await patientSelect(page).selectOption(SOFIA);
    await styleSelect(page).selectOption("injectable");
    await page.getByRole("button", { name: /Generate note/ }).click();

    await expect(page.getByText(/required field.*not documented/i)).toBeVisible({ timeout: 25000 });
    await expect(page.locator("tr", { hasText: "Lot Number" })).toContainText("Missing");
    await expect(page.getByText("AI suggestion — verify").first()).toBeVisible();

    await page.screenshot({ path: "e2e/screenshots/scribe-sofia-injectable.png", fullPage: true });
  });

  test("tabs, transcript toggle, intelligence reworded (no podcast)", async ({ page }) => {
    await open(page);
    await patientSelect(page).selectOption(DANIELLE);
    await styleSelect(page).selectOption("soap");
    await page.getByRole("button", { name: /Generate note/ }).click();
    await expect(page.locator("tr", { hasText: "Subjective" })).toBeVisible({ timeout: 25000 });

    // Transcript hidden until clicked
    await expect(page.locator("body")).not.toContainText(/Consultation transcript ·/);
    await page.getByRole("button", { name: /View transcript/ }).click();
    await expect(page.getByText(/Consultation transcript ·/)).toBeVisible();

    // Extracted facts table
    await page.getByRole("button", { name: "Extracted facts" }).click();
    await expect(page.getByRole("columnheader", { name: "Confidence" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Source" })).toBeVisible();

    // Clinical intelligence — present, no podcast
    await page.getByRole("button", { name: "Clinical intelligence" }).click();
    await expect(page.getByText(/clinical knowledge base|clinical intelligence/i).first()).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/podcast/i);

    await page.screenshot({ path: "e2e/screenshots/scribe-facts-intel.png", fullPage: true });
  });
});
