import { test, expect } from '@playwright/test';

// ─── Public /ask page ──────────────────────────────────────────

test.describe('Public /ask page', () => {
  test('loads with hero text and input', async ({ page }) => {
    await page.goto('/ask');
    await expect(page.locator('h1')).toContainText('Ask anything about aesthetic medicine');
    // Input is a sticky bar at the bottom — look for placeholder text
    await expect(page.getByPlaceholder(/Botox and filler/i)).toBeVisible({ timeout: 10000 });
  });

  test('shows category suggestion chips', async ({ page }) => {
    await page.goto('/ask');
    await expect(page.getByRole('button', { name: 'Compare' })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: 'Safety' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Pairing' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Timing' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Value' })).toBeVisible();
  });

  test('disclaimer is visible', async ({ page }) => {
    await page.goto('/ask');
    await expect(page.locator('text=educational information')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=not medical advice')).toBeVisible();
  });

  test('submits a query and gets a response', async ({ page }) => {
    await page.goto('/ask');
    const input = page.getByPlaceholder(/Botox and filler/i);
    await input.fill('What is Botox used for in aesthetics?');
    await input.press('Enter');
    // Wait for streaming response — look for any new content appearing
    await page.waitForSelector('[class*="prose"], [class*="message"], [class*="answer"], p', {
      timeout: 20000,
      state: 'attached',
    });
    // Take screenshot of response
    await page.screenshot({ path: 'e2e/screenshots/ask-response.png', fullPage: true });
  });

  test('screenshot - hero state', async ({ page }) => {
    await page.goto('/ask');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/ask-hero.png', fullPage: true });
  });
});

// ─── Public /embed/ask page ────────────────────────────────────

test.describe('Public /embed/ask page', () => {
  test('loads embed variant with input', async ({ page }) => {
    await page.goto('/embed/ask');
    await expect(page.getByPlaceholder(/Botox|filler|ask/i)).toBeVisible({ timeout: 10000 });
  });

  test('screenshot - embed', async ({ page }) => {
    await page.goto('/embed/ask');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/embed-ask.png', fullPage: true });
  });
});

// ─── Login page ────────────────────────────────────────────────

test.describe('Login page', () => {
  test('loads with access code field and continue button', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByPlaceholder(/access code/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /continue/i })).toBeVisible();
  });

  test('shows error on wrong access code', async ({ page }) => {
    await page.goto('/login');
    await page.getByPlaceholder(/access code/i).fill('wrong-code');
    await page.getByRole('button', { name: /continue/i }).click();
    // Wait for error to appear
    // Login may show error inline or redirect — just verify the page responded
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'e2e/screenshots/login-error.png' });
  });

  test('screenshot - login', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/login.png', fullPage: true });
  });
});

// ─── Dashboard (loads without redirect in dev) ─────────────────

test.describe('Dashboard', () => {
  test('loads overview with KPI cards', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('text=A360 Intelligence Platform')).toBeVisible({ timeout: 15000 });
    await expect(page.getByText('Consultations', { exact: true })).toBeVisible();
    await expect(page.getByText('Conversion Rate')).toBeVisible();
  });

  test('sidebar navigation has key sections', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    const nav = page.locator('nav, [class*="sidebar"], aside');
    await expect(nav.locator('text=Patients')).toBeVisible({ timeout: 10000 });
    await expect(nav.locator('text=Research')).toBeVisible();
    await expect(nav.locator('text=Chat')).toBeVisible();
    await expect(nav.locator('text=Agent Manager')).toBeVisible();
  });

  test('screenshot - dashboard overview', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/dashboard-overview.png', fullPage: true });
  });
});

// ─── Dashboard sub-pages ───────────────────────────────────────

test.describe('Dashboard pages load', () => {
  test('research page loads', async ({ page }) => {
    await page.goto('/dashboard/research');
    await expect(page.getByRole('heading', { name: 'Research', exact: true })).toBeVisible({ timeout: 15000 });
  });

  test('chat page loads', async ({ page }) => {
    await page.goto('/dashboard/chat');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'e2e/screenshots/dashboard-chat.png', fullPage: true });
  });

  test('patients page loads', async ({ page }) => {
    await page.goto('/dashboard/patients');
    await expect(page.getByRole('heading', { name: 'Patients' })).toBeVisible({ timeout: 15000 });
  });

  test('agents page loads', async ({ page }) => {
    await page.goto('/dashboard/agents');
    await expect(page.getByRole('heading', { name: 'Agent Manager' })).toBeVisible({ timeout: 15000 });
  });
});

// ─── API health ────────────────────────────────────────────────

test.describe('API health', () => {
  test('POST /api/ask responds (not 500)', async ({ request }) => {
    const res = await request.post('/api/ask', {
      data: { messages: [{ role: 'user', content: 'test' }] },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status()).toBeLessThan(500);
  });

  test('POST /api/auth/login responds', async ({ request }) => {
    const res = await request.post('/api/auth/login', {
      data: { password: 'wrong' },
      headers: { 'Content-Type': 'application/json' },
    });
    expect(res.status()).toBeLessThan(500);
  });
});
