import { test, expect } from '@playwright/test';

test('Search - No results shows proper empty state', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const searchInput = page.getByPlaceholder('Search tools name');
  await searchInput.fill('hfuhlkjl');
  await searchInput.press('Enter');

  // “No Data Found” metni görünmeli
  await expect(page.locator('text=No Data Found')).toBeVisible();
});
