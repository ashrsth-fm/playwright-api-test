// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('https://qa.flo.io');
});


test.describe('Page Load Assertions', () => {
  test('Check page title', async ({ page }) => {
    await expect(page).toHaveTitle('OTG | Home');
  });

  test('Check URL', async ({ page }) => {
    await expect(page).toHaveURL(/\/\?t=\d+/);
  });
});

test.describe('Images Checks', () => {
  test('Logo Check', async ({ page }) => {
    await expect(page.locator('img[alt="Flo Logo"]')).toHaveAttribute('src', '/_next/static/media/otg_logo.a16cca54.svg');
    await expect(page.locator('img[alt="Flo Logo"]')).toBeVisible;
  });

  // test('Background Image Check', async ({ page }) => {
  //   await page.goto('https://qa.flo.io');

  // });

});

test.describe('Buttons Checks', () => {
  test('Sign In/Up button', async ({ page }) => {
    const button = page.locator('a[class="btn btn-primary btn-landing col fs-24 rounded-1 px-1"]');
    await expect(button).toHaveText('Sign In/Up');
    await expect(button).toHaveAttribute('href', '/accounts/signin-signup?redirectTo=%2Four-locations');
  });

  test('Get started button', async ({ page }) => {
    const button = page.locator('a[class="btn btn-outline-light btn-landing col fs-24 rounded-1 bg-white px-1"]');
    // await expect(button).toHaveText('Get Started');
    await expect(button).toHaveAttribute('href', '/our-locations');
  });

});

