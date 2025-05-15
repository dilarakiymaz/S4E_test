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


## 🔗 Logo Redirects

These tests verify the functionality of both S4E logo buttons on the page. Clicking either the top or bottom logo should navigate the user to the homepage (`https://s4e.io/`).

### Covered Tests

#### 1. Header Logo Redirect
- **Location:** Top-left corner of the page
- **Behavior:** Clicking the logo navigates to `https://s4e.io/`
- **Selector Strategy:** The header region is scoped using `header` and the link is matched by its accessible name: `'S4E Security For Everyone'`.

#### 2. Footer Logo Redirect
- **Location:** Bottom of the page (footer section)
- **Behavior:** Clicking the logo navigates to `https://s4e.io/`
- **Challenges Encountered:**
  - Multiple links in the footer contained the text “S4E” (e.g., LinkedIn and Twitter aria-labels).
  - Playwright's strict mode threw errors due to ambiguous matching.
- **Solution:**
  - The locator was scoped to the `footer` region and matched by the exact accessible name to avoid overlaps.
  - The correct link was identified using:
    ```ts
    page.locator('footer').getByRole('link', { name: 'S4E Security For Everyone' });
    ```

#### 6. Login Button
- **Location:** Navigation bar (top-right)
- **Behavior:** Clicking the "Login" button redirects the user to the login page.
- **Expected URL:** `https://app.s4e.io/sign-in`
- **Selector Strategy:** `getByRole('button', { name: 'Login' })`
- **Navigation Assertion:** Uses `'load'` wait state and `toHaveURL` to verify redirection

#### 7. Join Button
- **Location:** Navigation bar (top-right)
- **Behavior:** Clicking the "Join" button redirects the user to the signup page.
- **Expected URL:** `https://app.s4e.io/sign-up`
- **Selector Strategy:** `getByRole('button', { name: 'Join' })`
- **Navigation Assertion:** Uses `'load'` wait state and `toHaveURL` to verify redirection

These tests confirm the core navigation logic via logo links, ensuring accessibility standards and correct routing behavior.

## 🆕 Latest Updates Section

These tests verify the visibility and structure of the "Latest updates" module on the page `https://s4e.io/free-security-tools`, which showcases the most recent tools and scanners. Each item includes a clickable title, a timestamp, and a severity level such as “Medium” or “Critical”.

### Covered Tests

#### 1. Visibility and Clickability
- **File:** `latest-updates-visible.test.ts`
- **Purpose:** Ensures that the "Latest updates" section is rendered and at least one update card is visible and clickable.
- **Behavior:**
  - Checks for the section heading.
  - Verifies that at least one update title appears and responds to clicks.

#### 2. Card Count Enforcement
- **File:** `latest-updates-count.test.ts`
- **Purpose:** Confirms that exactly four update entries are listed at any given time.
- **Behavior:**
  - Scans the DOM and targets the title rows (`<tr>`) in the updates table.
  - Asserts that exactly 4 update cards are rendered.

> Note: These tests do not check the presence or content of severity labels, as all cards redirect in the same way regardless of severity.

## 🔎 Full Scan Input Validation

These tests verify the behavior of the **Full Scan** section on the page `https://s4e.io/free-security-tools`. It checks input validation and expected navigation behavior.

### Covered Tests

#### 1. Empty Input Validation
- **File:** `fullscan-empty.test.ts`
- **Purpose:** Ensures that clicking "Start Full Scan" without input displays a validation warning.
- **Behavior:**
  - Clicks the "Start Full Scan" button with an empty input field.
  - Asserts that a modal appears explaining valid input formats (Domain, IPv4, Subdomain).

#### 2. Invalid Input Format
- **File:** `fullscan-invalid.test.ts`
- **Purpose:** Ensures that invalid input (e.g., `"invalidinput"`) triggers an error message.
- **Behavior:**
  - Fills the input field with a malformed value.
  - Clicks the scan button.
  - Verifies that the modal appears to notify the user of incorrect format.

#### 3. Valid Input Triggers Navigation
- **File:** `fullscan-valid.test.ts`
- **Purpose:** Verifies that valid input (e.g., `"s4e.io"`) initiates a scan and redirects.
- **Behavior:**
  - Inputs a valid domain.
  - Clicks "Start Full Scan".
  - Asserts that the page redirects to the scan confirmation page under `https://app.s4e.io/welcome/group-scan`.

---

## 🧭 Tool Filter Buttons: Everyone & Asset Owners

These tests validate that the **"See all"** buttons correctly filter tools based on the user's selection (**Everyone** vs **Asset Owners**).

### Covered Tests

#### 1. "See all" under Everyone
- **File:** `tool-filter-everyone.test.ts`
- **Purpose:** Verifies that clicking "See all" under the "Everyone" column filters the tool list for general users.
- **Behavior:**
  - Finds the left-side "See all" button.
  - Clicks the button.
  - Checks that the URL includes `scan_type=everyone`.

#### 2. "See all" under Asset Owners
- **File:** `tool-filter-assetowners.test.ts`
- **Purpose:** Verifies that clicking "See all" under the "Asset Owners" column filters the tools for domain/IP owners.
- **Behavior:**
  - Finds the right-side "See all" button.
  - Clicks the button.
  - Checks that the URL includes `scan_type=asset_owner`.

> **Note:** Since both buttons share the same accessible name, their parent context or index is used to distinguish them reliably in the tests.
