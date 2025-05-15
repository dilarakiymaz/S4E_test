import { test, expect } from '@playwright/test';

test('Clicking "See all" under Everyone applies correct filter', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Tüm "See all" butonlarını seç
  const seeAllButtons = page.getByRole('button', { name: /see all/i });

  // "Everyone" için olan buton genelde ilk sırada yer alıyor
  await seeAllButtons.nth(0).click();

  // URL'nin filtreli haline geçtiğini doğrula
  await expect(page).toHaveURL(/scan_type=everyone/);
});
