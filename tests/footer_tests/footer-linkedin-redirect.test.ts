import { test, expect } from '@playwright/test';

test('Clicking LinkedIn button opens S4E LinkedIn in new tab', async ({ page, context }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const linkedinButton = page.locator('a[aria-label*="linkedin"]');
  await expect(linkedinButton).toBeVisible();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    linkedinButton.click(),
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL('https://www.linkedin.com/company/s4e-io');
});
