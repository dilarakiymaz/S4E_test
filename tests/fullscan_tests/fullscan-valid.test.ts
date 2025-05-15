import { test, expect } from '@playwright/test';

test('Valid scan input triggers navigation', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Belirli section'ı class üzerinden seçiyoruz
  const scanSection = page.locator('section.MuiBox-root.css-otjhi8');

  const inputField = scanSection.getByPlaceholder('example.io, app.example.io or 1.1.1.1');
  await inputField.fill('s4e.io');

  const scanButton = scanSection.getByRole('button', { name: /start full scan/i });
  await scanButton.click();

  // Yeni sayfaya yönlendiğini kontrol et (URL değişimini kontrol ediyoruz)
  await page.waitForURL(/app\.s4e\.io/);
  await expect(page).not.toHaveURL('https://s4e.io/free-security-tools');
});
