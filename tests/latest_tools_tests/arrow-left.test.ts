import { test, expect } from '@playwright/test';

test('Clicking left arrow in Latest Tools carousel scrolls to previous cards', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // İlk görünen kart
  const firstCardBefore = await page.locator('a[href^="/tools/"]').first().textContent();

  // Sol ok butonu
  const leftArrow = page.locator('h2:has-text("Latest Tools")')
    .locator('xpath=following::button[@aria-label="Previous"]')
    .first();

  await expect(leftArrow).toBeVisible();
  await expect(leftArrow).toBeEnabled();

  // Tıklayıp scroll’un tamamlanmasını bekle
  await leftArrow.click();
  await page.waitForTimeout(1500);

  // Yeni kartı al
  const firstCardAfter = await page.locator('a[href^="/tools/"]').first().textContent();

  // Kart değişmiş olmalı
  expect(firstCardAfter?.trim()).not.toEqual(firstCardBefore?.trim());
});
