import { test, expect } from '@playwright/test';

test('Recommended Tools - Clicking a tool card redirects to tool detail page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Go to Recommended section
  const section = page.locator('h3:has-text("Recommended")').locator('xpath=ancestor::section[1]');

  // Find first visible tool card in the active slick slide
  const activeSlide = section.locator('.slick-slide.slick-active').first();
  const toolCard = activeSlide.locator('a[href^="/tools/"]').first();

  // Get href to validate redirection
  const href = await toolCard.getAttribute('href');
  expect(href).toBeTruthy();

  // Click and assert redirection
  await toolCard.click();
  await expect(page).toHaveURL(new RegExp(href!));
});
