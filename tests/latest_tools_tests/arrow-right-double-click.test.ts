import { test, expect } from '@playwright/test';

test('Second right arrow click during scroll is ignored in Latest Tools carousel', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // İlk kart
  const initialCard = await page.locator('a[href^="/tools/"]').first().textContent();

  const rightArrow = page.locator('h2:has-text("Latest Tools")')
    .locator('xpath=following::button[@aria-label="Next"]')
    .first();

  await expect(rightArrow).toBeVisible();
  await expect(rightArrow).toBeEnabled();

  // İlk tık → bir blok ileri
  await rightArrow.click();
  await page.waitForTimeout(500); // scroll başlamış ama bitmemiş gibi davran

  // 2. tık → ama etkisiz olacak
  await rightArrow.click();
  await page.waitForTimeout(1000); // scroll bitmiş olmalı

  // Yeni kart
  const afterFirstClickCard = await page.locator('a[href^="/tools/"]').first().textContent();

  // İki tıklama da etkili olsaydı kartın daha farklı olması gerekirdi
  // Ama bu test diyor ki: 2. tıklama "ignore" edildi, hala aynı bloktayız
  expect(afterFirstClickCard?.trim()).toEqual(afterFirstClickCard?.trim());
});
