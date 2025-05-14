import { test, expect } from '@playwright/test';

test('Features dropdown becomes visible on hover', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const features = page.locator('text=Features').first();
  await features.hover();

  const dropdownSection = page.locator('text=Free Security Check');
  await expect(dropdownSection).toBeVisible({ timeout: 5000 });
});
