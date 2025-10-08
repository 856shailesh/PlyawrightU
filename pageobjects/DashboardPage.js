class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator('.card-body');
    this.productstext = page.locator('.card-body b');
    this.cart = page.locator("[routerlink*='cart']");
  }
  async searchProductAddCart(productName) {
    const titles = await this.productstext.allTextContents();
    console.log(titles);
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if ((await this.productstext.nth(i).textContent()) === productName) {
        //add to cart
        await this.products.nth(i).locator('text= Add To Cart').click();
        break;
      }
    }
  }
  async navigateToCart() {
    await this.cart.click();
  }
  async navigateToOrders() {
    await this.page.locator("button[routerlink*='myorders']").click();
  }
}
module.exports = { DashboardPage };
