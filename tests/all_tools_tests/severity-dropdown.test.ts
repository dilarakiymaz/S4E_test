import { test, expect } from '@playwright/test';

test('Clicking Category filter shows dropdown', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Kategori butonuna tıkla
  const categoryButton = page.locator('button:has-text("Severity")');
  await categoryButton.click();

  // Dropdown içeriğinin görünmesini bekle
  const dropdownContainer = page.locator('div.MuiPopover-paper li').first();
  await expect(dropdownContainer).toBeVisible({ timeout: 10000 });
});