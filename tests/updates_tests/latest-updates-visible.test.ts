import { test, expect } from '@playwright/test';

test('Latest updates section is visible and update cards are clickable', async ({ page }) => {
  await page.goto('https://s4e.io/free-security-tools');

  const acceptButton = page.getByRole('button', { name: /accept all/i });
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  // Check the "Latest updates" section heading is visible
  const updatesHeading = page.getByRole('heading', { name: /Latest updates/i });
  await expect(updatesHeading).toBeVisible();

  // Find the first update card (based on role or structure)
  const firstUpdateCard = page.locator('section >> role=link').first(); // assuming updates are links
  await expect(firstUpdateCard).toBeVisible();

  // Optionally, store current URL and click the item
  const previousURL = page.url();
  await firstUpdateCard.click();

  // Check if navigation occurred or content changed (fallback logic)
  await expect(page).not.toHaveURL(previousURL); // if clicking triggers navigation
});
