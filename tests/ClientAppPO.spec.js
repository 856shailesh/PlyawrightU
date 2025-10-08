const { test, expect } = require('@playwright/test');
const { POmanager } = require('../pageobjects/POmanager');
//Json > string > js object
const testData = JSON.parse(
  JSON.stringify(require('../utils/placeorderTestData.json'))
);

test('Page playwright test', async ({ page }) => {
  const poManager = new POmanager(page);
  //   const username = 'shytest@gmail.com';
  //   const password = 'Test@123';
  //   const productName = 'ZARA COAT 3';

  const loginPage = poManager.getLoginPage();
  const dashboardPage = poManager.getDashboardPage();
  // const cartPage = poManager.getCartPage();
  await loginPage.goTo();
  await loginPage.validLogin(testData.username, testData.password);
  await dashboardPage.searchProductAddCart(testData.productName);
  await dashboardPage.navigateToCart();

  //Cart Page
  const cartPage = poManager.getCartPage();
  await cartPage.verifyProductDisplay(testData.productName);
  await cartPage.Checkout();

  //OrderReview Page
  //await page.pause();
  const orderReviewPage = poManager.getOrdersReviewPage();
  await orderReviewPage.searchCountryAndSelect('ind', 'India');
  const orderId = await orderReviewPage.submitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

  //Confirmation Page

  //My Orders page
});
