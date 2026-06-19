import { test, expect } from "@playwright/test";

/**
 * E2E tests for the /ask Evidence experience.
 * Requires the dev server running on localhost:3000 with valid
 * ANTHROPIC_API_KEY and RAG_SEARCH_URL in .env.local.
 */

const QUERY =
  "How does Botox Cosmetic work and what are its FDA-approved indications?";

/** Wait for the answer to fully stream by watching for the "N cited" toggle. */
async function waitForAnswerComplete(page: import("@playwright/test").Page) {
  await expect(page.locator("text=/\\d+ cited/").first()).toBeVisible({
    timeout: 50_000,
  });
}

test.describe("/ask page — static elements", () => {
  test("renders wordmark, hero, suggestion chips, input, and disclaimer", async ({
    page,
  }) => {
    await page.goto("/ask");

    // Wordmark
    await expect(page.locator("text=A360 Evidence").first()).toBeVisible();

    // Hero
    await expect(
      page.locator("text=Ask anything about aesthetic medicine.")
    ).toBeVisible();

    // Suggestion chips (verb groups)
    await expect(page.getByRole("button", { name: "Compare" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Safety" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Pairing" })).toBeVisible();

    // Input bar
    await expect(
      page.getByPlaceholder("e.g. Can Botox and filler")
    ).toBeVisible();

    // Persistent disclaimer
    await expect(
      page.locator("text=not medical advice").first()
    ).toBeVisible();
  });
});

test.describe("/ask page — live query", () => {
  test("streams a cited answer with Key Points, section headings, source bar, Reliable badges, and follow-ups", async ({
    page,
  }) => {
    await page.goto("/ask");

    // Type and submit
    const input = page.getByRole("textbox");
    await input.fill(QUERY);
    await input.press("Enter");

    // Source count bar appears (wait for retrieval)
    const sourceBar = page.locator("text=/\\d+ sources found/");
    await expect(sourceBar).toBeVisible({ timeout: 20_000 });

    // Wait for answer to complete
    await waitForAnswerComplete(page);

    // Key Points card
    const keyPointsHeading = page.locator("text=Key Points").first();
    await expect(keyPointsHeading).toBeVisible();

    // Key Points has bullet items
    const keyPointsCard = page.locator(".rounded-lg.border.border-primary\\/20");
    const bullets = keyPointsCard.locator("li");
    const bulletCount = await bullets.count();
    expect(bulletCount).toBeGreaterThanOrEqual(2);
    expect(bulletCount).toBeLessThanOrEqual(7);

    // Section headings (h3 with left border accent)
    const sectionHeadings = page.locator("h3");
    await expect(sectionHeadings.first()).toBeVisible();
    const headingCount = await sectionHeadings.count();
    expect(headingCount).toBeGreaterThanOrEqual(2);

    // Inline citation badges — "FDA" authority badges in the answer
    const fdaBadges = page.getByRole("button", {
      name: /Food and Drug Administration|FDA/,
    });
    await expect(fdaBadges.first()).toBeVisible();

    // Reference cards section — "N cited" toggle
    const citedToggle = page.locator("text=/\\d+ cited/");
    await expect(citedToggle).toBeVisible();

    // Reliable badge on FDA/manufacturer/PubMed sources
    const reliableBadge = page.locator("text=Reliable").first();
    await expect(reliableBadge).toBeVisible();

    // Category pill (typeTag) on citation cards
    const regulatoryPill = page.locator("text=Regulatory").first();
    await expect(regulatoryPill).toBeVisible();

    // Tier color legend
    await expect(page.locator("text=FDA / Manufacturer")).toBeVisible();
    await expect(page.locator("text=Research / Practice")).toBeVisible();
    await expect(page.locator("text=Industry / Media")).toBeVisible();

    // Follow-up suggestion pills (bg-accent rounded-full buttons after the answer)
    const followUps = page.locator("button.rounded-full.bg-accent");
    const followUpCount = await followUps.count();
    expect(followUpCount).toBeGreaterThanOrEqual(2);
    expect(followUpCount).toBeLessThanOrEqual(3);

    // No raw KEY_POINTS or FOLLOW_UPS markers visible
    const bodyText = await page.locator("body").textContent();
    expect(bodyText).not.toContain("KEY_POINTS:");
    expect(bodyText).not.toContain("FOLLOW_UPS:");
  });
});

test.describe("/ask page — auto-submit via query param", () => {
  test("auto-submits when ?query= is provided and streams an answer", async ({
    page,
  }) => {
    await page.goto(`/ask?query=${encodeURIComponent(QUERY)}`);

    // Hero should NOT show (query is present in searchParams)
    await expect(
      page.locator("text=Ask anything about aesthetic medicine.")
    ).not.toBeVisible();

    // Source bar appears (auto-submitted)
    const sourceBar = page.locator("text=/\\d+ sources found/");
    await expect(sourceBar).toBeVisible({ timeout: 20_000 });

    // Answer completes
    await waitForAnswerComplete(page);

    // Key Points card rendered
    await expect(page.locator("text=Key Points").first()).toBeVisible();
  });
});

test.describe("/ask page — follow-up interaction", () => {
  test("clicking a follow-up pill sends a new query", async ({ page }) => {
    await page.goto("/ask");
    const input = page.getByRole("textbox");
    await input.fill(QUERY);
    await input.press("Enter");

    // Wait for first answer to complete
    await waitForAnswerComplete(page);

    // Wait for follow-up pills — they render after done event
    await expect(
      page.getByPlaceholder("Ask a follow-up question")
    ).toBeVisible({ timeout: 10_000 });

    // Find follow-up pill buttons (they appear after the answer, are rounded-full)
    const followUpBtn = page.getByRole("button", {
      name: /\?$/,
    });
    const count = await followUpBtn.count();
    test.skip(count === 0, "LLM did not produce follow-up suggestions");

    // Capture the text of the first follow-up
    const followUpText = await followUpBtn.first().textContent();

    // Click it
    await followUpBtn.first().click();

    // The follow-up text should appear as a user message somewhere in the chat
    // (it gets added as a new user bubble)
    await expect(
      page.locator(`text=${followUpText}`)
    ).toHaveCount(2, { timeout: 10_000 }); // pill + user bubble

    // A loading spinner or new source bar should appear
    const searchingIndicator = page.locator("text=/searching|sources found/i");
    await expect(searchingIndicator.last()).toBeVisible({ timeout: 20_000 });
  });
});

test.describe("/ask page — View/Hide sources toggle", () => {
  test("toggle hides and shows source pills", async ({ page }) => {
    await page.goto("/ask");
    const input = page.getByRole("textbox");
    await input.fill(QUERY);
    await input.press("Enter");

    // Wait for sources
    await expect(
      page.locator("text=/\\d+ sources found/")
    ).toBeVisible({ timeout: 20_000 });

    // Sources visible by default — "Hide sources" button present
    const hideBtn = page.getByRole("button", { name: "Hide sources" });
    await expect(hideBtn).toBeVisible();

    // Click to hide
    await hideBtn.click();
    await expect(
      page.getByRole("button", { name: "View sources" })
    ).toBeVisible();

    // Click to show again
    await page.getByRole("button", { name: "View sources" }).click();
    await expect(
      page.getByRole("button", { name: "Hide sources" })
    ).toBeVisible();
  });
});
