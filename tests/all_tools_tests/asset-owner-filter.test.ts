import { test, expect } from '@playwright/test';

test('Asset Owner tab filters tools correctly', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');
  await page.getByRole('tab', { name: 'Asset Owner' }).click();
  await expect(page).toHaveURL(/scan_type=asset_owner/);
});
