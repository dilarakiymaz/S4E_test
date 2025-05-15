import { test, expect } from '@playwright/test';

test.only('Most Used Tools - Double right arrow click does not overscroll', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const section = page.locator('h3:has-text("Most Used")').locator('xpath=ancestor::section[1]');
  const nextButton = section.locator('button[aria-label="Next"]').first();

  const initialCard = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();
  await nextButton.click();
  await nextButton.click();
  await page.waitForTimeout(1500);

  const currentCard = await section.locator('.slick-slide.slick-active a[href^="/tools/"]').first().textContent();
  expect(currentCard?.trim()).not.toEqual(initialCard?.trim());
});
