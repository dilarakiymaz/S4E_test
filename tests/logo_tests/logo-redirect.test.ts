import { test, expect } from '@playwright/test';

test('Clicking the S4E logo redirects to homepage', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const logo = page.locator('header').getByRole('link', { name:'S4E Security For Everyone' });
  await logo.click();
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveURL('https://s4e.io/');

});
