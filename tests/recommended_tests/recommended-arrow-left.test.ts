import { test, expect } from '@playwright/test';

test('Recommended Tools - Clicking left arrow scrolls to previous cards', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const section = page.locator('h3:has-text("Recommended")').locator('xpath=ancestor::section[1]');
  const nextButton = section.locator('button[aria-label="Next"]');
  const prevButton = section.locator('button[aria-label="Previous"]');

  // Sağa bir kez tıkla, sonra sola döneceğiz
  await nextButton.click();
  await page.waitForTimeout(1500); // animasyon bitsin

  const firstCardBefore = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();

  await prevButton.click();

  await expect.poll(async () => {
    const after = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();
    return after?.trim();
  }, {
    timeout: 5000,
    message: 'Card did not change after clicking left arrow',
  }).not.toBe(firstCardBefore?.trim());
});
