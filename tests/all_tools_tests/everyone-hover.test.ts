import { test, expect } from '@playwright/test';

test('Tooltip on Everyone tab is visible on hover', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const tooltipIcon = page.locator('svg[aria-label*="Scans that can only be utilized for assets without confirmed ownership"]');
  await tooltipIcon.hover();

  await expect(
    page.locator('text=Scans that can only be utilized for assets without confirmed ownership')
  ).toBeVisible();
});
