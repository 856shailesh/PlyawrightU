const { test, expect } = require('@playwright/test');
//const { customtest } = require('../utils/test-base');

const { POmanager } = require('../pageobjects/POmanager');
//Json > string > js object
const testData = JSON.parse(
  JSON.stringify(require('../utils/placeorderTestData.json'))
);

//running via Fixtures
for (const data of testData) {
  test(`@Web Client App login for ${data.productName}`, async ({ page }) => {
    const poManager = new POmanager(page);
    //   const username = 'shytest@gmail.com';
    //   const password = 'Test@123';
    //   const productName = 'ZARA COAT 3';

    const loginPage = poManager.getLoginPage();
    const dashboardPage = poManager.getDashboardPage();
    // const cartPage = poManager.getCartPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();

    //Cart Page
    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductDisplay(data.productName);
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
}
