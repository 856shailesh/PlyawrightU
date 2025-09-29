const { test, expect, request } = require('@playwright/test');
const LoginPayLoad = {
  userEmail: 'shytest@gmail.com',
  userPassword: 'Test@123',
};
let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    'https://rahulshettyacademy.com/api/ecom/auth/login',
    {
      data: LoginPayLoad,
    }
  );
  expect((await loginResponse).ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  token = loginResponseJson.token;
  console.log('token is ', token);
});

test.beforeEach(() => {});

test('Client App login', async ({ page }) => {
  console.log('Actual Test');
  await page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, token);

  //new page
  await page.goto('https://rahulshettyacademy.com/client');
  const products = page.locator('.card-body');
  await page.waitForLoadState('networkidle');
  await page.locator('.card-body b').first().waitFor(); // need to wait for element to load even after page loading
  const count = await products.count();
  console.log('Count is ', count);
});
