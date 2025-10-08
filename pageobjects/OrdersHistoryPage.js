class OrdersHistoryPage {
  constructor(page) {
    this.page = page;
    this.ordersTable = page.locator('tbody');
    this.rows = page.locator('tbody tr');
    this.orderIdDetails = page.locator('.col-text');
  }
  async searchOrderAndSelect(orderId) {
    await this.ordersTable.waitFor();
    const rows = await this.rows;

    for (let i = 0; i < (await rows.count()); ++i) {
      const rowOrderId = await rows.nth(i).locator('th').textContent();
      if (orderId.includes(rowOrderId)) {
        await rows.nth(i).locator('button').first().click();
        break;
      }
    }
  }
  async getOrderId() {
    return await this.orderIdDetails.textContent();
  }
}
module.exports = { OrdersHistoryPage };
