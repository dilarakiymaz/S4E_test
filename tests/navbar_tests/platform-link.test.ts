import { test, expect } from '@playwright/test';

test('Platform navbar link redirects to platform page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const platformLink = page.getByRole('link', { name: 'Platform' });
  await platformLink.click();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL('https://s4e.io/platform');
});
