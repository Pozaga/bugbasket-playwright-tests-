import { test, expect } from '@playwright/test';

test('filter by category and sort by price ascending', async ({ page }) => {
  await page.goto('/products');
  await expect(page.getByTestId('catalog-result-count')).toBeVisible();
  await page.getByTestId('filter-category-select').selectOption('books');
  await page.getByTestId('sort-select').selectOption('price_asc');

  await expect(page).toHaveURL(/category=books/);
  await expect(page).toHaveURL(/sort=price_asc/);

  await expect(page.getByTestId('catalog-result-count')).toHaveText('8 products');

  const bookTitles = [
    'Clean Code Handbook',
    'Testing in Practice',
    'Кобзар (ілюстроване видання)',
    'The Art of Bug Hunting',
    'Data & Algorithms Explained',
    'Quiet Mornings: Essays',
    'Modern API Design',
    'Pocket Guide to SQL',
  ];

  const productCards = page.getByTestId('product-card');
  await expect(productCards).toHaveCount(8);

  const cardNames = await page.getByTestId('product-card-name').allTextContents();
  expect(cardNames).toHaveLength(8);
  for (const name of cardNames) {
    expect(bookTitles).toContain(name);
  }

  const priceElements = page.getByTestId('product-card-price');
  const priceTexts = await priceElements.allTextContents();
  const prices = priceTexts.map(text => parseFloat(text.replace(/[^0-9.]/g, '')));

  expect(prices.length).toBeGreaterThan(1);
  for (let i = 1; i < prices.length; i++) {
    expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
  }
});
