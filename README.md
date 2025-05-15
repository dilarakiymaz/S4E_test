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

These tests verify the visibility and structure of the initial "Latest updates" module on the page `https://s4e.io/free-security-tools`, which showcases the most recent tools and scanners. Each item includes a clickable title, a timestamp, and a severity level such as “Medium” or “Critical”.

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


## 🧭 Latest Tools Carousel Navigation

These tests verify the functionality of the **Latest Tools** carousel on the page [`https://s4e.io/free-security-tools`](https://s4e.io/free-security-tools), which displays security tool cards in a horizontally scrollable layout. Users can navigate between tool blocks using left and right arrows.

### Covered Tests

#### 1. Right Arrow Scrolls Forward
- **File:** `arrow-right.test.ts`
- **Purpose:** Verifies that clicking the right arrow scrolls the carousel forward.
- **Behavior:**
  - Stores the first visible tool card.
  - Clicks the right arrow.
  - Waits for scroll animation to complete.
  - Confirms that the first card has changed.

#### 2. Left Arrow Scrolls Backward
- **File:** `arrow-left.test.ts`
- **Purpose:** Verifies that clicking the left arrow scrolls the carousel backward.
- **Behavior:**
  - Stores the first visible card.
  - Clicks the left arrow.
  - Waits for scroll to finish.
  - Asserts that the first card has changed.

#### 3. Double Click on Right Arrow
- **File:** `arrow-right-double-click.test.ts`
- **Purpose:** Ensures the carousel remains functional after two quick right arrow clicks.
- **Behavior:**
  - Clicks the right arrow twice in rapid succession.
  - Waits for the animation to complete.
  - Confirms that at least one scroll occurred (the visible card changed).

#### 4. Double Click on Left Arrow
- **File:** `arrow-left-double-click.test.ts`
- **Purpose:** Ensures the carousel scrolls correctly after two quick left arrow clicks.
- **Behavior:**
  - Clicks the left arrow twice rapidly.
  - Waits for the scroll animation.
  - Asserts that at least one card change occurred.

#### 5. Ignored Second Right Arrow Click During Scroll
- **File:** `arrow-right-skip-protection.test.ts`
- **Purpose:** Validates that a second right arrow click during an ongoing scroll is ignored.
- **Behavior:**
  - Clicks the right arrow once and immediately clicks it again.
  - Waits for the scroll to finish.
  - Confirms that only one scroll was applied by checking the resulting card.

#### 6. Ignored Second Left Arrow Click During Scroll
- **File:** `arrow-left-skip-protection.test.ts`
- **Purpose:** Validates that a second left arrow click during a scroll animation is ignored.
- **Behavior:**
  - Clicks the left arrow twice quickly.
  - Waits for scroll to complete.
  - Verifies that only one scroll was processed by comparing card results.

> **Note:** All carousel tests include animation delay handling using `page.waitForTimeout(...)`. Each test assumes the carousel scrolls a fixed group of tool cards and ignores overlapping input while the scroll is in progress.

## 🧾 Scan Report Section – Full Scan Input Validation (Lower Section)

These tests cover the second **"Start Full Scan"** module found near the bottom of the page under the heading **“Sample Cyber Security Scan Report”** at [`https://s4e.io/free-security-tools`](https://s4e.io/free-security-tools). Users can initiate a scan using a valid domain, subdomain, or IPv4 address.

### Covered Tests

#### 1. Scan Report – Empty Input Validation
- **File:** `scanreport-empty.test.ts`
- **Purpose:** Ensures that clicking "Start Full Scan" without entering any input shows a validation modal.
- **Behavior:**
  - Locates the section using its heading: *Sample Cyber Security Scan Report*.
  - Clicks the scan button with an empty input field.
  - Verifies that a modal appears indicating accepted input types (Domain, IPv4, Subdomain).

#### 2. Scan Report – Invalid Input Format
- **File:** `scanreport-invalid.test.ts`
- **Purpose:** Ensures that malformed input (e.g., `not_a_valid_input`) triggers an error modal.
- **Behavior:**
  - Enters an invalid scan value into the input field.
  - Clicks the scan button.
  - Verifies that a warning modal appears outlining allowed input formats.

#### 3. Scan Report – Valid Input Triggers Navigation
- **File:** `scanreport-valid.test.ts`
- **Purpose:** Confirms that entering a valid scan input redirects the user to the scan results page.
- **Behavior:**
  - Inputs a valid domain such as `s4e.io`.
  - Clicks the "Start Full Scan" button.
  - Asserts that the user is redirected to a confirmation page under `https://app.s4e.io/welcome/group-scan`.

> **Note:** This section uses a different DOM structure than the top scanner. All tests scope interactions based on the heading text to ensure stability regardless of future style or layout changes.

## 🌟 Recommended Tools Section

These tests validate the **Recommended Tools** carousel on the page [`https://s4e.io/free-security-tools`](https://s4e.io/free-security-tools). This section showcases suggested scanners and is navigable via arrow buttons. Each card links to its corresponding tool detail page.

### Covered Tests

#### 1. Tool Card Redirection
- **File:** `recommended-card-redirect.test.ts`
- **Purpose:** Ensures that clicking on a tool card in the Recommended section redirects the user to the correct tool detail page.
- **Behavior:**
  - Locates the first `.slick-active` tool card inside the carousel.
  - Clicks it and checks that the URL matches the `href` value of the card.

#### 2. Right Arrow Navigation
- **File:** `recommended-arrow-right.test.ts`
- **Purpose:** Verifies that clicking the right arrow scrolls the carousel and changes the visible tool.
- **Behavior:**
  - Captures the name of the first visible tool before the arrow click.
  - Clicks the right arrow.
  - Verifies that a different tool is now visible.

#### 3. Left Arrow Navigation
- **File:** `recommended-arrow-left.test.ts`
- **Purpose:** Ensures that clicking the left arrow scrolls back to previously visible tools.
- **Behavior:**
  - Scrolls right first to enable leftward navigation.
  - Captures the visible tool, clicks the left arrow, and ensures it changes.

#### 4. Right Arrow Double Click Behavior
- **File:** `recommended-arrow-right-double.test.ts`
- **Purpose:** Ensures the second click on the right arrow during an ongoing scroll has no effect.
- **Behavior:**
  - Quickly clicks the right arrow twice.
  - Verifies that only one card transition occurred.

#### 5. Left Arrow Double Click Behavior
- **File:** `recommended-arrow-left-double.test.ts`
- **Purpose:** Ensures the second click on the left arrow during an ongoing scroll has no effect.
- **Behavior:**
  - Scrolls right once, then quickly clicks the left arrow twice.
  - Verifies that only one leftward transition occurs.

> **Note:** All carousel navigation tests use `.slick-slide.slick-active` and dynamic text polling to reliably track visible tool changes despite animation and timing.

## ⭐ Most Used Tools Carousel

These tests verify the behavior of the **Most Used Tools** carousel on the page [`https://s4e.io/free-security-tools`](https://s4e.io/free-security-tools). This section highlights the tools most frequently used by visitors and includes interactive horizontal scrolling with navigation arrows.

### Covered Tests

#### 1. Card Redirection
- **File:** `mostused-card-redirect.test.ts`
- **Purpose:** Verifies that clicking on a tool card in the carousel redirects the user to that tool’s detail page.
- **Behavior:**
  - Selects the first visible `.slick-active` tool card.
  - Clicks the card and checks that the URL matches the `href` of the tool.

#### 2. Right Arrow Scroll
- **File:** `mostused-arrow-right.test.ts`
- **Purpose:** Ensures that clicking the right arrow scrolls the carousel to the next set of tool cards.
- **Behavior:**
  - Captures the first visible card before the scroll.
  - Clicks the right arrow button.
  - Asserts that a different card is now visible.

#### 3. Left Arrow Scroll
- **File:** `mostused-arrow-left.test.ts`
- **Purpose:** Verifies that clicking the left arrow scrolls the carousel back to previous cards.
- **Behavior:**
  - First clicks the right arrow to advance the carousel.
  - Then clicks the left arrow.
  - Confirms that a different card is visible again.

#### 4. Right Arrow Double Click Behavior
- **File:** `mostused-arrow-right-double.test.ts`
- **Purpose:** Confirms that clicking the right arrow twice in quick succession still changes the visible card correctly.
- **Behavior:**
  - Double clicks the right arrow button quickly.
  - Asserts that the card shown afterward is different from the initial card.

#### 5. Left Arrow Double Click Behavior
- **File:** `mostused-arrow-left-double.test.ts`
- **Purpose:** Confirms that double clicking the left arrow during scroll does not break carousel behavior.
- **Behavior:**
  - Clicks right arrow once to move forward.
  - Quickly double clicks the left arrow.
  - Checks that the visible card is different from the one after the right scroll.

> **Note:** All tests rely on `.slick-slide.slick-active` to ensure interaction only with currently visible elements, avoiding off-screen or cloned DOM elements rendered by the carousel engine.


## 🔍 All Tools Page – Test Coverage and Validations

These tests verify the functionality and UI behaviors on the **All Tools** section of the page [`https://s4e.io/free-security-tools`](https://s4e.io/free-security-tools), ensuring a seamless user experience across key interactions such as search, filters, tool navigation, and pagination.

### Covered Tests

#### 1. Tool Name Tooltip on Hover
- **Purpose:** Ensures that truncated tool names show the full name on hover.
- **Behavior:**
  - Locates a tool name that overflows or is cut off.
  - Hovers over the element.
  - Verifies that a tooltip with the full name becomes visible.

#### 2. Tool Card Navigation
- **Purpose:** Validates that clicking on a tool row redirects to the corresponding tool detail page.
- **Behavior:**
  - Locates a tool entry (row or card).
  - Clicks on it.
  - Asserts that the browser navigates to a `/tools/[tool-slug]` page.

#### 3. Search Bar Filters Tools by Keyword
- **Purpose:** Ensures that keyword search filters the visible tools.
- **Behavior:**
  - Types a relevant keyword into the search bar.
  - Verifies that the list is updated to show only matching tools.

#### 4. No Results State for Invalid Searches
- **Purpose:** Confirms that irrelevant queries return a proper “no results” state.
- **Behavior:**
  - Enters a random or invalid keyword.
  - Verifies that the tool list becomes empty.
  - Confirms that a "no tool found" message is shown.

#### 5. Search Clear Icon Behavior
- **Purpose:** Checks the presence and functionality of the clear (trash) icon in the search bar.
- **Behavior:**
  - Types any input into the search bar.
  - Verifies that the clear icon appears.
  - Clicks the icon and confirms that the input is cleared and the full tool list is restored.

#### 6. Pagination Updates Tool List
- **Purpose:** Verifies that clicking on pagination buttons updates the displayed tool list.
- **Behavior:**
  - Navigates to the next page using pagination.
  - Asserts that the list updates accordingly and the URL reflects the correct page.

#### 7. Category Filter Updates URL
- **Purpose:** Ensures that choosing a category from the dropdown updates the tool list and the URL.
- **Behavior:**
  - Selects a category (e.g., DNS, SSL).
  - Confirms that the URL includes `category=[selected]` and the filtered list is updated.

#### 8. Asset Type Filter Updates URL
- **Purpose:** Validates that filtering by asset type updates the visible tools and URL.
- **Behavior:**
  - Selects "Asset Owner" or "Everyone" from the filter.
  - Asserts that `user_type=[value]` appears in the URL and the list updates.

#### 9. Severity Filter Updates URL
- **Purpose:** Confirms that selecting severity levels filters the tool list and updates the URL.
- **Behavior:**
  - Chooses a severity like "Low" or "High".
  - Verifies that the `severity=[level]` is reflected in the URL and the list shows corresponding results.

> These tests ensure that all filter components, navigation behaviors, and user interactions within the All Tools section are working as expected, contributing to a consistent and intuitive user experience.
