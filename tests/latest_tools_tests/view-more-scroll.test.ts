import { test, expect } from '@playwright/test';

test('Clicking View More in Latest Tools scrolls to All Tools section', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const viewMoreBtn = page.locator('text=View More').first();
  await viewMoreBtn.click();

  // Expect scroll into view – check by visibility of a known All Tools element
  const allToolsHeader = page.locator('text=All Free Tools').first();
  await expect(allToolsHeader).toBeVisible();
});
