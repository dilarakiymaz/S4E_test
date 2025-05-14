import { test, expect } from '@playwright/test';

test('Plans dropdown becomes visible on hover', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const plans = page.locator('text=Plans').first();
  await plans.hover();

  const dropdownSection = page.locator('span').filter({ hasText: 'Everyone' }).first();
  await expect(dropdownSection).toBeVisible({ timeout: 5000 });
});
