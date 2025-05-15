import { test, expect } from '@playwright/test';

test.only('Scan Report - Valid input triggers navigation', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  const scanSection = page.getByRole('heading', {
    name: /Sample Cyber Security Scan Report/i,
  }).locator('xpath=ancestor::section[1]');

  const inputField = scanSection.getByPlaceholder('example.io, app.example.io or 1.1.1.1');
  await inputField.fill('s4e.io');

  const scanButton = scanSection.getByRole('button', { name: /start full scan/i });
  await expect(scanButton).toBeVisible();
  await scanButton.click();

  // Beklenen URL'ye yönlendirildi mi?
  await page.waitForURL('**/app.s4e.io/**');
  await expect(page).not.toHaveURL('https://s4e.io/free-security-tools');
});
