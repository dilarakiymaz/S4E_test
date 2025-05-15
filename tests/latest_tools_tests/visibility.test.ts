import { test, expect } from '@playwright/test';

test('Latest Updates widget should be visible with at least one update entry', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Widget container based on visible heading
  const updatesWidget = page.locator('text=Latest updates').locator('..'); // Get parent of heading
  await expect(updatesWidget).toBeVisible();

  // Cards inside the widget
  const updateTitles = updatesWidget.locator('text=/Scanner$/'); // e.g., CVE-... Scanner
  await expect(updateTitles.first()).toBeVisible();
});
