import { test, expect } from '@playwright/test';

test('Recommended Tools - Double clicking left arrow still scrolls correctly', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const section = page.locator('h3:has-text("Recommended")').locator('xpath=ancestor::section[1]');

  // Önce sağa tıklayarak biraz ilerleyelim (sola dönebilmek için)
  const rightArrow = section.locator('button[aria-label="Next"]').first();
  await rightArrow.click();
  await page.waitForTimeout(1500); // animasyonun bitmesini bekle

  const cardAfterRight = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();

  // Şimdi sola iki kez tıkla
  const leftArrow = section.locator('button[aria-label="Previous"]').first();
  await leftArrow.click();
  await leftArrow.click();
  await page.waitForTimeout(1500); // animasyonun bitmesini bekle

  // Son görünen kart
  const finalCard = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();

  // Kart değişmiş olmalı (geri gitmiş olmalıyız)
  expect(finalCard?.trim()).not.toEqual(cardAfterRight?.trim());
});
