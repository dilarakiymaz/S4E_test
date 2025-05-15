import { test, expect } from '@playwright/test';

test('Tooltip on Asset Owner tab is visible on hover', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Tooltip ikonunu aria-label ile doğrudan seç
  const tooltipIcon = page.locator('[aria-label*="Scans that can only be utilized for assets with confirmed ownership"]');

  // Hover yap
  await tooltipIcon.hover();

  // Tooltip yazısının görünür olduğunu doğrula
  await expect(
    page.locator('text=Scans that can only be utilized for assets with confirmed ownership')
  ).toBeVisible();
});
