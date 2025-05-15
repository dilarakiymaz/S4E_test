import { test, expect } from '@playwright/test';

test('Clicking "See all" under Asset Owners applies correct filter', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const seeAllButtons = page.getByRole('button', { name: /see all/i });

  // "Asset Owners" butonu ikinci sırada
  await seeAllButtons.nth(1).click();

  await expect(page).toHaveURL(/scan_type=asset_owner/);
});

