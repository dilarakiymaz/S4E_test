import { test, expect } from '@playwright/test';

test('Customize button opens Consent Preferences modal', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const customizeButton = page.getByRole('button', { name: /customize/i });
  await customizeButton.click();

  const modalTitle = page.getByText(/Customize Consent Preferences/i);
  await expect(modalTitle).toBeVisible();
});
