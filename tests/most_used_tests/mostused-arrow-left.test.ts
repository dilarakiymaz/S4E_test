import { test, expect } from '@playwright/test';

test('Most Used Tools - Clicking left arrow scrolls back to previous cards', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const section = page.locator('h3:has-text("Most Used")').locator('xpath=ancestor::section[1]');

  // Şu anki ilk kartın içeriğini al
  const initialCard = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();

  // Sol oka tıkla
  const leftArrow = section.locator('button[aria-label="Previous"]').first();
  await leftArrow.click();
  await page.waitForTimeout(1000);

  // Tıklamadan sonra görünen ilk kart
  const finalCard = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();

  // Kartın değiştiğini kontrol et
  expect(finalCard?.trim()).not.toEqual(initialCard?.trim());
});
