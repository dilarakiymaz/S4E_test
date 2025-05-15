import { test, expect } from '@playwright/test';

test('Clicking CSA star image opens CSA registry page in new tab', async ({ page, context }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const csaImage = page.locator('img[alt="csa-star-image"]');
  await expect(csaImage).toBeVisible();

  const [newPage] = await Promise.all([
    context.waitForEvent('page'), // yeni sekmeyi bekle
    csaImage.click(),             // tıklama tetiklenince yeni sekme açılır
  ]);

  await newPage.waitForLoadState();
  await expect(newPage).toHaveURL('https://cloudsecurityalliance.org/star/registry/s4e/services/s4e');
});
