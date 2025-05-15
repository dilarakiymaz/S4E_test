import { test, expect } from '@playwright/test';

test('Clicking footer S4E logo redirects to homepage', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const footerLogoLink = page.locator('footer').locator('a:has(img[alt="S4E"])');
  await expect(footerLogoLink).toBeVisible();

  await footerLogoLink.click();
  await expect(page).toHaveURL('https://s4e.io/');
});
