import { test, expect } from "@playwright/test";

test.describe("Agent Tester Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard/agent-tester");
    await page.waitForLoadState("networkidle");
  });

  test("loads with config bar and empty state", async ({ page }) => {
    // Config bar elements
    await expect(page.locator("#agent-select")).toBeVisible();
    await expect(page.locator("#patient-select")).toBeVisible();
    await expect(page.locator("#user-message")).toBeVisible();
    await expect(page.getByRole("button", { name: /run/i })).toBeVisible();

    // Empty state text (use role to avoid matching sidebar nav)
    await expect(
      page.getByRole("paragraph").filter({ hasText: "Agent Tester" }),
    ).toBeVisible();

    // Agent dropdown is populated
    const agentOptions = page.locator("#agent-select option");
    await expect(agentOptions).not.toHaveCount(1); // more than just "Select agent..."
  });

  test("agent dropdown has active agents", async ({ page }) => {
    const options = await page.locator("#agent-select option").allTextContents();
    expect(options.length).toBeGreaterThan(1);
    expect(options.some((o) => o.includes("Consultation Analyst"))).toBe(true);
  });

  test("patient dropdown is populated", async ({ page }) => {
    const options = await page
      .locator("#patient-select option")
      .allTextContents();
    expect(options.length).toBeGreaterThan(1);
  });

  test("run button is disabled without agent and message", async ({ page }) => {
    const runBtn = page.getByRole("button", { name: /run/i });
    await expect(runBtn).toBeDisabled();
  });

  test("run button enables when agent and message are set", async ({
    page,
  }) => {
    // Select first real agent
    const agentSelect = page.locator("#agent-select");
    const options = await agentSelect.locator("option").allTextContents();
    const firstAgent = options.find((o) => o !== "Select agent...");
    if (firstAgent) {
      await agentSelect.selectOption({ label: firstAgent });
    }

    // Type a message
    await page.fill("#user-message", "Test message");

    const runBtn = page.getByRole("button", { name: /run/i });
    await expect(runBtn).toBeEnabled();
  });

  test("page does not scroll at window level", async ({ page }) => {
    // The page should not be scrollable at the window/body level
    // (scrolling happens inside panes, not the page itself)
    await page.evaluate(() => window.scrollTo(0, 9999));
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  test("running an agent shows split pane with output and activity", async ({
    page,
  }) => {
    // Select Consultation Analyst
    await page
      .locator("#agent-select")
      .selectOption({ label: "Consultation Analyst" });
    await page.fill("#user-message", "Hello, what can you do?");

    // Click run
    await page.getByRole("button", { name: /run/i }).click();

    // Should show activity panel header
    await expect(page.getByText("Activity")).toBeVisible({ timeout: 5000 });

    // Wait for output to start streaming
    await expect(page.locator(".prose")).toBeVisible({ timeout: 15000 });

    // Wait for completion
    await expect(page.getByText("completed")).toBeVisible({ timeout: 60000 });

    // Verify page doesn't scroll at window level after run
    await page.evaluate(() => window.scrollTo(0, 9999));
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBe(0);
  });

  test("output pane scrolls independently, not the page", async ({
    page,
  }) => {
    test.setTimeout(120000);
    // Select agent with patient to trigger lots of tool calls + output
    await page
      .locator("#agent-select")
      .selectOption({ label: "Consultation Analyst" });
    await page
      .locator("#patient-select")
      .selectOption({ index: 1 }); // first real patient
    await page.fill("#user-message", "Analyze this consultation");
    await page.getByRole("button", { name: /run/i }).click();

    // Wait for completion
    await expect(page.getByText("completed")).toBeVisible({ timeout: 90000 });

    // Page-level scroll should be 0 (no overflow)
    const pageScroll = await page.evaluate(() => window.scrollY);
    expect(pageScroll).toBe(0);

    // The body should not be scrollable
    await page.evaluate(() => window.scrollTo(0, 9999));
    const windowScroll = await page.evaluate(() => window.scrollY);
    expect(windowScroll).toBe(0);
  });
});
