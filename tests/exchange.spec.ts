import { test, expect, type Page } from '@playwright/test';

const BASE_URL = 'http://localhost:3100';
const PASSWORD = 'A360';

// Helper to login
async function login(page: Page) {
  await page.goto(`${BASE_URL}/login`);
  await page.fill('input[type="password"]', PASSWORD);
  await page.click('button:has-text("Enter the Exchange")');
  await page.waitForURL(`${BASE_URL}/exchange`);
}

test.describe('Agent Exchange', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.describe('Catalog Page', () => {
    test('should load catalog with 9 agents', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange`);
      await page.waitForLoadState('networkidle');

      // Check all 9 agent cards are present
      const agentLinks = page.locator('a[href^="/exchange/"]').filter({
        hasNot: page.locator('svg'), // exclude nav items
      });

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

    test('should display sticky filter bar on scroll', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange`);
      await page.waitForLoadState('networkidle');

      // Check sticky bar exists
      const stickyBar = page.locator('div.sticky.top-14');
      await expect(stickyBar).toBeVisible();

      // Scroll down
      await page.evaluate(() => window.scrollBy(0, 500));
      await page.waitForTimeout(300);

      // Sticky bar should still be visible
      await expect(stickyBar).toBeInViewport();
    });

    test('should filter agents by category', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange`);
      await page.waitForLoadState('networkidle');

      // Click "Documentation" category
      await page.click('button:has-text("Documentation")');
      await page.waitForTimeout(300);

      // Should show Scribe and Notes
      await expect(page.locator('a[href="/exchange/scribe"]').first()).toBeVisible();
      await expect(page.locator('a[href="/exchange/notes"]').first()).toBeVisible();

      // Should NOT show KPI (Analytics)
      await expect(page.locator('a[href="/exchange/kpi"]').first()).not.toBeVisible();
    });

    test('should search agents by name', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange`);
      await page.waitForLoadState('networkidle');

      // Type in search (both hero and sticky bar search)
      const searchInputs = page.locator('input[placeholder*="Search"]');
      await searchInputs.first().fill('scribe');
      await page.waitForTimeout(300);

      // Should show Scribe
      await expect(page.locator('a[href="/exchange/scribe"]').first()).toBeVisible();

      // Should NOT show others
      await expect(page.locator('a[href="/exchange/kpi"]').first()).not.toBeVisible();
    });

    test('should show agent count', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange`);
      await page.waitForLoadState('networkidle');

      // Check "9 agents" text (or similar)
      const countText = page.locator('text=/\\d+ agents?/');
      await expect(countText).toBeVisible();
    });
  });

  test.describe('Detail Pages', () => {
    test('should load agent detail page with screenshots', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange/scribe`);
      await page.waitForLoadState('networkidle');

      // Check agent name
      await expect(page.locator('text=Scribe')).toBeVisible();

      // Check launch button or request button
      const cta = page.locator('button:has-text("Launch live demo"), button:has-text("Request access")').first();
      await expect(cta).toBeVisible();

      // Check screenshots are loaded
      const screenshots = page.locator('button.cursor-zoom-in');
      const count = await screenshots.count();
      expect(count).toBeGreaterThanOrEqual(4);
    });

    test('should display tabs (Overview, Use Cases, Updates)', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange/tcp`);
      await page.waitForLoadState('networkidle');

      // Check tabs exist
      await expect(page.locator('button:has-text("Overview")')).toBeVisible();
      await expect(page.locator('button:has-text("Use Cases")')).toBeVisible();
      await expect(page.locator('button:has-text("Updates")')).toBeVisible();
    });

    test('should switch between tabs', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange/tcp`);
      await page.waitForLoadState('networkidle');

      // Click "Use Cases" tab
      await page.click('button:has-text("Use Cases")');
      await page.waitForTimeout(200);

      // Should show use cases content
      const useCaseText = page.locator('text=/In-consult|case acceptance|treatment mapping/i').first();
      await expect(useCaseText).toBeVisible();
    });
  });

  test.describe('Screenshot Gallery', () => {
    test('should open lightbox on screenshot click', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange/lumira`);
      await page.waitForLoadState('networkidle');

      // Click first screenshot
      const screenshots = page.locator('button.cursor-zoom-in');
      await screenshots.first().click();
      await page.waitForTimeout(300);

      // Lightbox should be visible
      const lightbox = page.locator('[role="dialog"]');
      await expect(lightbox).toBeVisible();

      // Image should be in lightbox
      const img = lightbox.locator('img');
      await expect(img).toBeVisible();
    });

    test('should navigate with prev/next buttons', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange/tcp`);
      await page.waitForLoadState('networkidle');

      // Open lightbox
      const screenshots = page.locator('button.cursor-zoom-in');
      await screenshots.first().click();
      await page.waitForTimeout(300);

      // Get initial image src
      const lightbox = page.locator('[role="dialog"]');
      const img = lightbox.locator('img');
      const initialSrc = await img.getAttribute('src');

      // Click next button
      const nextBtn = lightbox.locator('button[aria-label="Next screenshot"]');
      await nextBtn.click();
      await page.waitForTimeout(200);

      // Image should change
      const newSrc = await img.getAttribute('src');
      expect(newSrc).not.toBe(initialSrc);
    });

    test('should navigate with arrow keys', async ({ page }) => {
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

      // Press right arrow
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(200);

      // Image should change
      const newSrc = await img.getAttribute('src');
      expect(newSrc).not.toBe(initialSrc);

      // Press left arrow to go back
      await page.keyboard.press('ArrowLeft');
      await page.waitForTimeout(200);

      // Should be back to initial
      const backSrc = await img.getAttribute('src');
      expect(backSrc).toBe(initialSrc);
    });

    test('should close lightbox with Escape key', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange/lumira`);
      await page.waitForLoadState('networkidle');

      // Open lightbox
      const screenshots = page.locator('button.cursor-zoom-in');
      await screenshots.first().click();
      await page.waitForTimeout(300);

      // Verify open
      const lightbox = page.locator('[role="dialog"]');
      await expect(lightbox).toBeVisible();

      // Press Escape
      await page.keyboard.press('Escape');
      await page.waitForTimeout(200);

      // Should be closed
      await expect(lightbox).not.toBeVisible();
    });

    test('should close lightbox on backdrop click', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange/lumira`);
      await page.waitForLoadState('networkidle');

      // Open lightbox
      const screenshots = page.locator('button.cursor-zoom-in');
      await screenshots.first().click();
      await page.waitForTimeout(300);

      const lightbox = page.locator('[role="dialog"]');
      await expect(lightbox).toBeVisible();

      // Click on backdrop (outside the image)
      await page.click('[role="dialog"]', { position: { x: 0, y: 0 } });
      await page.waitForTimeout(200);

      // Should be closed
      await expect(lightbox).not.toBeVisible();
    });

    test('should display image counter', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange/tcp`);
      await page.waitForLoadState('networkidle');

      // Open lightbox
      const screenshots = page.locator('button.cursor-zoom-in');
      await screenshots.first().click();
      await page.waitForTimeout(300);

      // Check counter (e.g., "1 / 8")
      const counter = page.locator('[role="dialog"]').locator('text=/\\d+ \\/ \\d+/');
      await expect(counter).toBeVisible();
    });

    test('should wrap around on last/first image', async ({ page }) => {
      await page.goto(`${BASE_URL}/exchange/tcp`);
      await page.waitForLoadState('networkidle');

      // Open lightbox
      const screenshots = page.locator('button.cursor-zoom-in');
      await screenshots.first().click();
      await page.waitForTimeout(300);

      const lightbox = page.locator('[role="dialog"]');
      const img = lightbox.locator('img');

      // Go to last image by pressing right multiple times
      for (let i = 0; i < 10; i++) {
        await page.keyboard.press('ArrowRight');
        await page.waitForTimeout(100);
      }

      const lastSrc = await img.getAttribute('src');

      // Press right again (should wrap to first)
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(200);

      const wrappedSrc = await img.getAttribute('src');

      // Should be different (wrapping behavior)
      expect(wrappedSrc).not.toBe(lastSrc);
    });
  });

  test.describe('Auth & Access', () => {
    test('should redirect unauthenticated users to login', async ({ page }) => {
      // Don't login, go directly to exchange
      await page.context().clearCookies();
      await page.goto(`${BASE_URL}/exchange`);

      // Should redirect to login
      await page.waitForURL('**/login**');
      await expect(page.locator('text=Welcome')).toBeVisible();
    });

    test('should allow login with correct password', async ({ page }) => {
      // Already tested in beforeEach, but be explicit
      await page.goto(`${BASE_URL}/login`);
      await page.fill('input[type="password"]', PASSWORD);
      await page.click('button:has-text("Enter the Exchange")');

      // Should redirect to exchange
      await page.waitForURL(`${BASE_URL}/exchange`);
      await expect(page.locator('text=Agent Exchange')).toBeVisible();
    });

    test('should show error on wrong password', async ({ page }) => {
      await page.goto(`${BASE_URL}/login`);
      await page.fill('input[type="password"]', 'wrongpassword');
      await page.click('button:has-text("Continue")');
      await page.waitForTimeout(500);

      // Should show error message
      await expect(page.locator('text=/incorrect|invalid/i')).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should be mobile-friendly', async ({ page }) => {
      // Test on mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await login(page);
      await page.goto(`${BASE_URL}/exchange`);
      await page.waitForLoadState('networkidle');

      // Catalog should still load
      await expect(page.locator('text=Agent Exchange')).toBeVisible();

      // Agent cards should be visible
      const agentLinks = page.locator('a[href^="/exchange/"]');
      await expect(agentLinks.first()).toBeVisible();
    });

    test('should show sticky nav on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await login(page);
      await page.goto(`${BASE_URL}/exchange`);
      await page.waitForLoadState('networkidle');

      // Sticky bar should exist
      const stickyBar = page.locator('div.sticky');
      await expect(stickyBar).toBeVisible();

      // Search should be visible
      const search = stickyBar.locator('input[placeholder*="Search"]');
      await expect(search).toBeVisible();
    });
  });

  test.describe('All Agents Reachable', () => {
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
      test(`should load ${agent} detail page`, async ({ page }) => {
        await page.goto(`${BASE_URL}/exchange/${agent}`);
        await page.waitForLoadState('networkidle');

        // Page should load (no 404)
        expect(page.url()).toContain(`/exchange/${agent}`);

        // Agent name should be visible
        const heading = page.locator('h1, h2').first();
        await expect(heading).toBeVisible();
      });
    }
  });
});
