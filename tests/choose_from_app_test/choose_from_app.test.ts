import { test, expect } from '@playwright/test';

test('Choose from our app button redirects to sign-in page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Accept cookies if needed
  const accept = page.getByRole('button', { name: /accept all/i });
  if (await accept.isVisible()) await accept.click();

  // Click the "Choose from our app" button
  const appButton = page.getByRole('link', { name: /choose from our app/i });
  await expect(appButton).toBeVisible();
  await appButton.click();

  // Check redirection to sign-in page
  await page.waitForURL('https://app.s4e.io/sign-in', { timeout: 10000 });
  await expect(page).toHaveURL('https://app.s4e.io/sign-in');
});
