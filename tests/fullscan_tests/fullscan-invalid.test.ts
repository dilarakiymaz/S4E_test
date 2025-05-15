import { test, expect } from '@playwright/test';

test('Invalid scan type shows modal with allowed input formats', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Fill with a value that is not domain/IP/subdomain
  const inputField = page.getByPlaceholder('example.io, app.example.io or 1.1.1.1').first();
  await inputField.fill('not_a_valid_scan_target');

  const scanButton = page.getByRole('button', { name: /start full scan/i }).first();
  await scanButton.click();

  const modalTitle = page.getByRole('heading', {
    name: /scan only one: domain, ipv4, subdomain/i,
  });
  await expect(modalTitle).toBeVisible();
});
