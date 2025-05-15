import { test, expect } from '@playwright/test';

test('Searching for a tool by keyword shows filtered results', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Arama çubuğuna anahtar kelime yaz
  await page.getByPlaceholder('Search tools name').fill('http');

  // Sonuçların gelmesini bekle
  const firstResult = page.locator('table a').first();
  await expect(firstResult).toBeVisible();
});
