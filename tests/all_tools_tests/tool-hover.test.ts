import { test, expect } from '@playwright/test';

test('Hovering over tool shows full name', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const tool = page.locator('table a').first();
  await tool.hover();

  // Hover ile birlikte tool adının görünür olduğundan emin ol
  await expect(tool).toBeVisible();
});
