import { test, expect } from '@playwright/test';

test('Clicking See The Plans navigates to pricing page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const seePlans = page.locator('a:has-text("See the plans")');
  await expect(seePlans).toBeVisible();
  await seePlans.click();

  await expect(page).toHaveURL(/.*\/pricing/);
});
