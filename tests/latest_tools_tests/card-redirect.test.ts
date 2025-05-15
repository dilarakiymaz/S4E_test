import { test, expect } from '@playwright/test';

test('Clicking a Latest Tools card redirects to the correct tool page', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  // Find the first full card (entire clickable area is an <a> tag)
  const toolCard = page.locator('a[href^="/tools/"]').first();

  // Extract href from the card
  const href = await toolCard.getAttribute('href');
  expect(href).toBeTruthy();

  // Click the whole card
  await toolCard.click();

  // Wait for the URL to match expected link
  await expect(page).toHaveURL(new RegExp(href!));
});
