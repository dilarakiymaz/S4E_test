import { test, expect } from '@playwright/test';

test('Clicking "Everyone" tab filters tools correctly', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  await page.getByRole('tab', { name: 'Everyone' }).click();
  await expect(page).toHaveURL(/scan_type=everyone/);
});
