import { test, expect } from '@playwright/test';

test('Most Used Tools - Clicking right arrow scrolls to next cards', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const section = page.locator('h3:has-text("Most Used")').locator('xpath=ancestor::section[1]');
  const nextButton = section.locator('button[aria-label="Next"]').first();

  const firstCardBefore = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();
  await nextButton.click();
  await page.waitForTimeout(1500);

  const firstCardAfter = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();
  expect(firstCardBefore?.trim()).not.toEqual(firstCardAfter?.trim());
});
