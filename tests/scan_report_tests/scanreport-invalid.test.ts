import { test, expect } from '@playwright/test';

test('Scan Report - Invalid input shows modal with allowed formats', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const scanSection = page.getByRole('heading', {
    name: /Sample Cyber Security Scan Report/i,
  }).locator('xpath=ancestor::section[1]');

  const inputField = scanSection.getByPlaceholder('example.io, app.example.io or 1.1.1.1');
  await inputField.fill('invalid_input_value');

  const scanButton = scanSection.getByRole('button', { name: /start full scan/i });
  await expect(scanButton).toBeVisible();
  await scanButton.click();

  const modalTitle = page.getByRole('heading', {
    name: /scan only one: domain, ipv4, subdomain/i,
  });
  await expect(modalTitle).toBeVisible();
});
