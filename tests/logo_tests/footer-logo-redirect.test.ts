import { test, expect } from '@playwright/test';

test('Footer S4E logo redirects to homepage', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const footerLogo = page.locator('footer').getByRole('link', {
    name: 'S4E Security For Everyone',
  });

  await footerLogo.click();
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveURL('https://s4e.io/');
});
