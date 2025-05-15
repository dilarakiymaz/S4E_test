import { test, expect } from '@playwright/test';

test('Second left arrow click during scroll is ignored in Latest Tools carousel', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Sağ oka bas → ileri 1 blok git
  const rightArrow = page.locator('h2:has-text("Latest Tools")')
    .locator('xpath=following::button[@aria-label="Next"]')
    .first();

  await rightArrow.click();
  await page.waitForTimeout(1000);

  // Yeni görünen ilk kartı al → referans
  const cardAfterNext = await page.locator('a[href^="/tools/"]').first().textContent();

  // Sol oka hızlıca 2 kere tıkla (scroll bitmeden)
  const leftArrow = page.locator('h2:has-text("Latest Tools")')
    .locator('xpath=following::button[@aria-label="Previous"]')
    .first();

  await leftArrow.click();
  await leftArrow.click();
  await page.waitForTimeout(1000); // scroll'un bitmesini bekle

  // Şu anda görünen kartı al
  const finalCard = await page.locator('a[href^="/tools/"]').first().textContent();

  // Sadece 1 blok geri gitmiş olmalıyız → yani aynı karta dönülmüş olmalı
  expect(finalCard?.trim()).toEqual(cardAfterNext?.trim());
});
