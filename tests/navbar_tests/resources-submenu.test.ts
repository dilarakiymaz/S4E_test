import { test, expect } from '@playwright/test';

test('Resources dropdown becomes visible on hover', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const resources = page.locator('text=Resources').first();
  await resources.hover();

  const dropdownSection = page.locator('span').filter({ hasText: 'Free Tools' }).first();
  await expect(dropdownSection).toBeVisible({ timeout: 5000 });
});
