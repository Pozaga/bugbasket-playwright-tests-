# BugBasket Playwright Tests

Autotests for [BugBasket](https://bugbasket-ref.vercel.app) online shop (Homework 8 — Codegeeks QA Academy).

## Covered Scenarios

1. **Catalog: Filter by category / sort by price** ([tests/catalog.spec.ts](file:///d:/PZ/QA/HW8/bugbasket-playwright-tests-/tests/catalog.spec.ts))
   - Filters products by category (`Books`).
   - Sorts products by price in ascending order (`price_asc`).
   - Asserts that all displayed cards belong to the chosen category and prices are sorted in ascending order.
   - Validates that filters and sorting are preserved in the URL (REQ-CAT-06).

2. **Register: Button stays disabled until the form is valid (REQ-AUTH-02)** ([tests/register.spec.ts](file:///d:/PZ/QA/HW8/bugbasket-playwright-tests-/tests/register.spec.ts))
   - Verifies the Register button is disabled initially.
   - Verifies the button remains disabled with partially filled or invalid fields (e.g. invalid/mismatched passwords, unchecked Terms).
   - Verifies the button becomes enabled only when all required fields and terms are valid.
   - Verifies the button becomes disabled again if any required requirement is unmet (e.g. unchecking Terms).

3. **Product: Out-of-stock product (REQ-CAT-07)** ([tests/product.spec.ts](file:///d:/PZ/QA/HW8/bugbasket-playwright-tests-/tests/product.spec.ts))
   - Verifies that on the catalog card, the "Add Volt Power Bank 20000 mAh to cart" button is disabled and displays "Out of stock".
   - Navigates to the product detail page and verifies that `add-to-cart-btn` is disabled.
   - Verifies that the quantity selector is disabled for out-of-stock products.

## How to Run

1. Install dependencies:
   ```bash
   npm ci
   ```

2. Install Playwright Chromium browser:
   ```bash
   npx playwright install chromium
   ```

3. Run the tests:
   ```bash
   npx playwright test
   ```

4. View test report:
   ```bash
   npx playwright show-report
   ```