import { test, expect } from '@playwright/test';

test('Clicking Twitter (X) button opens S4E Twitter page in new tab', async ({ page, context }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const twitterButton = page.locator('a[aria-label*="twitter"]');
  await expect(twitterButton).toBeVisible();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    twitterButton.click(),
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL('https://x.com/secforeveryone');
});
