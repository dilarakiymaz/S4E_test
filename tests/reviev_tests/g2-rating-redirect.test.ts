import { test, expect } from '@playwright/test';

test('Clicking G2 stars image opens G2 review page in new tab', async ({ page, context }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const g2Image = page.locator('img[alt="g2-star-image"]');
  await expect(g2Image).toBeVisible();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    g2Image.click(),
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL('https://www.g2.com/sellers/security-for-everyone');
});
