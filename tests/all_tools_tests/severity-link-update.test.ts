import { test, expect } from '@playwright/test';

test.only('Severity dropdown updates URL correctly for each option', async ({ page }) => {
  const severities = [
    { label: 'Informational', value: 'info' },
    { label: 'Low', value: 'low' },
    { label: 'Medium', value: 'medium' },
    { label: 'High', value: 'high' },
    { label: 'Critical', value: 'critical' },
  ];

  for (const severity of severities) {
    await page.goto('https://s4e.io/free-security-tools');

    // 1. Severity butonuna tıkla
    const categoryButton = page.locator('button:has-text("Severity")');
    await categoryButton.click();

    // 2. Dropdown içeriği görünsün
    const dropdownContainer = page.locator('div.MuiPopover-paper li').first();
    await expect(dropdownContainer).toBeVisible({ timeout: 10000 });

    // 3. İlgili severity'yi bul
    const option = page.locator('div.MuiPopover-paper li').filter({ hasText: severity.label }).first();
    await expect(option).toBeVisible({ timeout: 5000 });

    // 4. Tıkla ve URL kontrolü yap
    await option.click();
    await expect(page).toHaveURL(new RegExp(`severity=${severity.value}`));
  }
});
