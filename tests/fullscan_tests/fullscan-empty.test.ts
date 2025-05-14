import { test, expect } from '@playwright/test';

test('Start Full Scan shows validation modal if input is empty', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const scanButton = page.getByRole('button', { name: /start full scan/i }).first();
  await scanButton.click();

  const modalTitle = page.getByRole('heading', { name: /scan only one: domain, ipv4, subdomain/i });
  await expect(modalTitle).toBeVisible();
});
