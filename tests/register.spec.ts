import { test, expect } from '@playwright/test';

test('button stays disabled until the form is valid (REQ-AUTH-02)', async ({ page }) => {
  await page.goto('/register');

  const registerBtn = page.getByRole('button', { name: 'Register' });

  await expect(registerBtn).toBeDisabled();

  await page.getByLabel('Email').fill('valid.student@bugbasket.test');
  await expect(registerBtn).toBeDisabled();

  await page.getByLabel('First name').fill('Taras');
  await page.getByLabel('Last name').fill('Shevchenko');
  await expect(registerBtn).toBeDisabled();

  await page.getByLabel('Password', { exact: true }).fill('short');
  await page.getByLabel('Confirm password').fill('short');
  await expect(registerBtn).toBeDisabled();

  await page.getByLabel('Password', { exact: true }).fill('StrongPass123');
  await page.getByLabel('Confirm password').fill('MismatchPass123');
  await expect(registerBtn).toBeDisabled();

  await page.getByLabel('Confirm password').fill('StrongPass123');
  await expect(registerBtn).toBeDisabled();

  const termsCheckbox = page.getByTestId('register-terms-checkbox');
  await termsCheckbox.check();
  await expect(registerBtn).toBeEnabled();

  await termsCheckbox.uncheck();
  await expect(registerBtn).toBeDisabled();

  await termsCheckbox.check();
  await expect(registerBtn).toBeEnabled();
});
