import { test, expect } from '@playwright/test';

test('Scan Report - Start Full Scan shows validation modal if input is empty', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Daha güvenilir: Başlıktan başlayıp yukarıya çıkarak section bul
  const scanSection = page.getByRole('heading', {
    name: /Sample Cyber Security Scan Report/i,
  }).locator('xpath=ancestor::section[1]');

  const scanButton = scanSection.getByRole('button', { name: /start full scan/i });
  await expect(scanButton).toBeVisible();
  await scanButton.click();

  const modalTitle = page.getByRole('heading', {
    name: /scan only one: domain, ipv4, subdomain/i,
  });
  await expect(modalTitle).toBeVisible();
});
