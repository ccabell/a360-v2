import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3100';
const PASSWORD = 'A360';

test.describe('Agent Exchange', () => {
  test('catalog loads with 9 agents', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Enter the Exchange")');
    await page.waitForURL(`${BASE_URL}/exchange`);

    // Check for catalog heading (visible text, may be hidden on mobile)
    await expect(page.locator('h1').first()).toBeVisible({ timeout: 10000 });

    // All 9 agents should have links on the page
    const agents = [
      'kpi',
      'dr-tim-pearce',
      'carecredit',
      'lumira',
      'video-navigator',
      'scribe',
      'notes',
      'tcp',
      'reach',
    ];

    for (const agent of agents) {
      const link = page.locator(`a[href="/exchange/${agent}"]`).first();
      await expect(link).toBeVisible();
    }
  });

  test('sticky filter bar visible on scroll', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Enter the Exchange")');
    await page.waitForURL(`${BASE_URL}/exchange`);

    // Sticky bar should exist
    const stickyBar = page.locator('div.sticky');
    await expect(stickyBar).toBeVisible();

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 500));
    await page.waitForTimeout(300);

    // Still visible after scroll
    await expect(stickyBar).toBeInViewport();
  });

  test('scribe detail page loads with screenshots', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Enter the Exchange")');
    await page.waitForURL(`${BASE_URL}/exchange`);

    await page.goto(`${BASE_URL}/exchange/scribe`);
    await page.waitForLoadState('networkidle');

    // Agent name should be visible in heading
    await expect(page.locator('h1').getByText('Scribe')).toBeVisible({ timeout: 10000 });

    // Screenshots should exist
    const screenshots = page.locator('button.cursor-zoom-in');
    const count = await screenshots.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('tcp detail page has 8 screenshots', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Enter the Exchange")');
    await page.waitForURL(`${BASE_URL}/exchange`);

    await page.goto(`${BASE_URL}/exchange/tcp`);
    await page.waitForLoadState('networkidle');

    // TCP should have 8 screenshots (4 + 4 PDF pages)
    const screenshots = page.locator('button.cursor-zoom-in');
    const count = await screenshots.count();
    expect(count).toBeGreaterThanOrEqual(8);
  });

  test('screenshot lightbox opens and closes', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Enter the Exchange")');
    await page.waitForURL(`${BASE_URL}/exchange`);

    await page.goto(`${BASE_URL}/exchange/lumira`);
    await page.waitForLoadState('networkidle');

    // Click first screenshot
    const screenshots = page.locator('button.cursor-zoom-in');
    await screenshots.first().click();
    await page.waitForTimeout(300);

    // Lightbox should be visible
    const lightbox = page.locator('[role="dialog"]');
    await expect(lightbox).toBeVisible();

    // Close with escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(200);

    await expect(lightbox).not.toBeVisible();
  });

  test('screenshot navigation works', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Enter the Exchange")');
    await page.waitForURL(`${BASE_URL}/exchange`);

    await page.goto(`${BASE_URL}/exchange/tcp`);
    await page.waitForLoadState('networkidle');

    // Open lightbox
    const screenshots = page.locator('button.cursor-zoom-in');
    await screenshots.first().click();
    await page.waitForTimeout(300);

    const lightbox = page.locator('[role="dialog"]');
    const img = lightbox.locator('img');

    // Get initial image
    const initialSrc = await img.getAttribute('src');

    // Navigate with arrow key
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(200);

    // Image should change
    const newSrc = await img.getAttribute('src');
    expect(newSrc).not.toBe(initialSrc);
  });

  test('all 9 agents detail pages load', async ({ page }) => {
    test.setTimeout(120000);
    const agents = [
      'kpi',
      'dr-tim-pearce',
      'carecredit',
      'lumira',
      'video-navigator',
      'scribe',
      'notes',
      'tcp',
      'reach',
    ];

    await page.goto(`${BASE_URL}/login`);
    await page.fill('input[type="password"]', PASSWORD);
    await page.click('button:has-text("Enter the Exchange")');
    await page.waitForURL(`${BASE_URL}/exchange`);

    for (const agent of agents) {
      await page.goto(`${BASE_URL}/exchange/${agent}`);
      await page.waitForLoadState('domcontentloaded');

      // Should not be 404
      expect(page.url()).toContain(`/exchange/${agent}`);

      // Agent name should be visible
      const heading = page.locator('h1, h2').first();
      await expect(heading).toBeVisible({ timeout: 5000 });
    }
  });
});
