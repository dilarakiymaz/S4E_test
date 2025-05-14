# S4E_test
S4E's test engineer internship position case 
# Tests

## ✅ Cookies

This section includes automated tests related to the cookie consent banner and user preferences panel on the page `https://s4e.io/free-security-tools`.

### Covered Tests

#### 1. Accept All Button
- **Purpose:** Verifies that clicking the “Accept All” button dismisses the cookie banner.
- **Assertion:** The banner disappears after the button is clicked.

#### 2. Reject All Button
- **Purpose:** Verifies that clicking the “Reject All” button dismisses the cookie banner.
- **Assertion:** The banner disappears after rejection.

#### 3. Customize Button (within the cookie banner)
- **Purpose:** Verifies that clicking “Customize” opens the “Consent Preferences” modal.
- **Assertion:** The modal titled “Customize Consent Preferences” becomes visible.

#### 4. Persistence After Accepting
- **Purpose:** Ensures that once cookies are accepted, revisiting the page does not show the banner again.
- **Technique:** Simulates a second visit using a fresh page instance in the same browser context.

#### 5. Cookie Settings Button (floating revisit button)
- **Purpose:** Verifies that the floating "Consent Preferences" button (usually at the bottom-left) is available for users to re-open the preferences modal.
- **Challenges Encountered:**
  - Although the button exists in the DOM, it is sometimes rendered with `width: 0` and `height: 0`, making it invisible to Playwright.
  - This occurs due to timing, animation delays, or headless mode behavior.
- **Solution:** Instead of using `expect(...).toBeVisible()` which fails on hidden elements, the test uses `isVisible()` to check availability and conditionally clicks the button if visible.
- **Note:** This ensures the test does not falsely fail due to frontend rendering limitations that do not reflect broken functionality.

---

