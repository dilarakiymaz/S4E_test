import { test, expect } from '@playwright/test';

test('Recommended Tools - Clicking right arrow scrolls to next cards', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const section = page.locator('h3:has-text("Recommended")').locator('xpath=ancestor::section[1]');
  const nextButton = section.locator('button[aria-label="Next"]');

  const firstCardBefore = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();

  await nextButton.click();

  // Aktif kartın değişmesini bekle (max 5s)
  await expect.poll(async () => {
    const after = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();
    return after?.trim();
  }, {
    timeout: 5000,
    message: 'Card did not change after clicking right arrow',
  }).not.toBe(firstCardBefore?.trim());
});
