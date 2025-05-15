import { test, expect } from '@playwright/test';

test('Recommended Tools - Second right arrow click during scroll is ignored', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const section = page.locator('h3:has-text("Recommended")').locator('xpath=ancestor::section[1]');
  const nextButton = section.locator('button[aria-label="Next"]');

  const initialCard = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();

  await nextButton.click();
  await nextButton.click(); // ikinci tık hızlıca

  // Kart değişimini bekle
  await expect.poll(async () => {
    const current = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();
    return current?.trim();
  }, {
    timeout: 5000,
  }).not.toBe(initialCard?.trim());
});
