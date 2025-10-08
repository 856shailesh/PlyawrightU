const { LoginPage } = require('./LoginPage');
const { DashboardPage } = require('./DashboardPage');
const { CartPage } = require('./CartPage');
const { OrdersHistoryPage } = require('./OrdersHistoryPage');
const { OrdersReviewPage } = require('./OrdersReviewPage');

class POmanager {
  constructor(page) {
    this.page = page;
    this.loginpage = new LoginPage(page);
    this.dashboardpage = new DashboardPage(page);
    this.cartpage = new CartPage(page);
    this.ordersHistoryPage = new OrdersHistoryPage(page);
    this.ordersReviewPage = new OrdersReviewPage(page);
  }

  getLoginPage() {
    return this.loginpage;
  }
  getDashboardPage() {
    return this.dashboardpage;
  }
  getCartPage() {
    return this.cartpage;
  }
  getOrdersHistoryPage() {
    return this.ordersHistoryPage;
  }
  getOrdersReviewPage() {
    return this.ordersReviewPage;
  }
}
module.exports = { POmanager };
