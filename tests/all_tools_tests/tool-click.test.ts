import { test, expect } from '@playwright/test';

test('Clicking a tool opens its detail page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const tool = page.locator('table a[href^="/tools/"]').first();
  const href = await tool.getAttribute('href');

  await tool.click();
  await expect(page).toHaveURL(new RegExp(href!));
});
