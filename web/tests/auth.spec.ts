import { test, expect } from '@playwright/test';

test('Google sign in flow', async ({ page }) => {
  // Navigate to the home page
  await page.goto('/');

  // Take a screenshot of the home page
  await page.screenshot({ path: 'tests/screenshots/home-page.png' });

  // Check if the login button is present
  const loginButton = page.locator('button:has-text("Login with Google")');
  await expect(loginButton).toBeVisible();

  // Click the login button
  await loginButton.click();

  // Wait for navigation to Google
  await page.waitForURL(/accounts\.google\.com/);

  // Take a screenshot of the Google login page
  await page.screenshot({ path: 'tests/screenshots/google-login.png' });

  // Note: We can't complete the login without credentials, but we can verify the redirect
  expect(page.url()).toContain('accounts.google.com');
});