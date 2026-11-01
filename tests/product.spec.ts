import { test, expect } from '@playwright/test';

test('out-of-stock product has add-to-cart button disabled on card and product page (REQ-CAT-07)', async ({ page }) => {
  await page.goto('/products');
  const productName = 'Volt Power Bank 20000 mAh';

  const cardAddBtn = page.getByRole('button', { name: `Add ${productName} to cart` });
  await expect(cardAddBtn).toBeVisible();
  await expect(cardAddBtn).toBeDisabled();
  await expect(cardAddBtn).toHaveText('Out of stock');

  const productCard = page.locator('[data-testid="product-card"]', { hasText: productName });
  await expect(productCard.getByTestId('product-card-stock')).toHaveText('Out of stock');

  await page.getByRole('heading', { name: productName }).click();
  await expect(page).toHaveURL(/\/products\//);

  const productAddBtn = page.getByTestId('add-to-cart-btn');
  await expect(productAddBtn).toBeVisible();
  await expect(productAddBtn).toBeDisabled();
  await expect(productAddBtn).toHaveText('Out of stock');

  await expect(page.getByTestId('qty-select')).toBeDisabled();
});
