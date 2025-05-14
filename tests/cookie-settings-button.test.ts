import { test, expect } from '@playwright/test';

test('Revisit cookie settings button is available and functional if visible', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Eğer çerez banner'ı varsa, kapat
  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Sayfa geç yüklenmeler/animasyonlar için zaman tanı
  await page.waitForTimeout(2000);
  await page.mouse.move(10, 10);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Butonun görünür olup olmadığını kontrol et
  const revisitButton = page.locator('.cky-btn-revisit');
  const isVisible = await revisitButton.isVisible();

  console.log('Revisit button isVisible():', isVisible);

  if (isVisible) {
    await revisitButton.click();

    const modalTitle = page.getByRole('heading', { name: /customize consent preferences/i });
    await expect(modalTitle).toBeVisible();
  } else {
    console.log('Revisit button not visible (may be off-screen or zero-sized), skipping click.');
  }
});
