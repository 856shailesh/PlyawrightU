const { test, expect, request } = require('@playwright/test');
const { APIutils } = require('./utils/APIutils');
const loginPayLoad = {
  userEmail: 'shytest@gmail.com',
  userPassword: 'Test@123',
};
const orderPayLoad = {
  orders: [{ country: 'Cuba', productOrderedId: '68a961719320a140fe1ca57c' }],
};

let response;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIutils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

//Create Order is success
test('Place the order', async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem('token', value);
  }, response.token);
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('button[routerlink*="myorders"]').click();
  await page.locator('tbody').waitFor();
  const rows = page.locator('tbody tr');
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderID = await rows.nth(i).locator('th').textContent();
    if (response.orderID.includes(rowOrderID)) {
      await rows.nth(i).locator('button').first().click();
      break;
    }
  }
  const orderIDDetails = await page.locator('.col-text').textContent();
  page.pause();
  expect(response.orderID.includes(orderIDDetails)).toBeTruthy();
});
