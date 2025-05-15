import { test, expect } from '@playwright/test';

test.only('Recommended Tools - Second left arrow click during scroll is ignored', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const section = page.locator('h3:has-text("Recommended")').locator('xpath=ancestor::section[1]');
  const nextButton = section.locator('button[aria-label="Next"]');
  const prevButton = section.locator('button[aria-label="Previous"]');

  // önce sağa tıkla sonra iki kez sola
  await nextButton.click();
  await page.waitForTimeout(1500);

  const cardAfterNext = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();

  await prevButton.click();
  await prevButton.click(); // ikinci tık hızlıca

  await expect.poll(async () => {
    const current = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();
    return current?.trim();
  }, {
    timeout: 5000,
  }).not.toBe(cardAfterNext?.trim());
});
