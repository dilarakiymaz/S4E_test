import { test, expect } from '@playwright/test';

test('Most Used Tools - Clicking a tool card redirects to tool detail page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const section = page.locator('h3:has-text("Most Used")').locator('xpath=ancestor::section[1]');
  const activeSlide = section.locator('.slick-slide.slick-active').first();
  const toolCard = activeSlide.locator('a[href^="/tools/"]').first();

  const href = await toolCard.getAttribute('href');
  expect(href).toBeTruthy();

  await toolCard.click();
  await expect(page).toHaveURL(new RegExp(href!));
});
