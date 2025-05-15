import { test, expect } from '@playwright/test';

test('Clicking right arrow in Latest Tools carousel scrolls to next cards', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // İlk kartı al
  const firstCardBefore = await page.locator('a[href^="/tools/"]').first().textContent();

  // Sağ ok
  const rightArrow = page.locator('h2:has-text("Latest Tools")')
    .locator('xpath=following::button[@aria-label="Next"]')
    .first();

  await expect(rightArrow).toBeVisible();
  await expect(rightArrow).toBeEnabled();

  // Sağ oka tıkla ve animasyonu bekle
  await rightArrow.click();
  await page.waitForTimeout(1500); // scroll geçiş süresi

  // Yeni ilk kartı al
  const firstCardAfter = await page.locator('a[href^="/tools/"]').first().textContent();

  // Aynı kart kaldıysa scroll olmamış demektir → bu başarısızlık olur
  expect(firstCardAfter?.trim()).not.toEqual(firstCardBefore?.trim());
});
