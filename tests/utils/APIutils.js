const { get } = require('http');

class APIutils {
  constructor(apiContext, loginPayLoad) {
    this.apiContext = apiContext;
    this.loginPayLoad = loginPayLoad;
  }
  async getToken() {
    const loginResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/auth/login',
      {
        data: this.loginPayLoad,
      }
    );
    //expect((await loginResponse).ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    console.log('login response is ', loginResponseJson);
    const token = loginResponseJson.token;
    console.log('token is ', token);
    return token;
  }
  async createOrder(orderPayLoad) {
    let response = {};
    response.token = await this.getToken();
    const orderResponse = await this.apiContext.post(
      'https://rahulshettyacademy.com/api/ecom/order/create-order',
      {
        data: orderPayLoad,
        headers: {
          Authorization: response.token,
          'Content-Type': 'application/json',
        },
      }
    );
    const orderResponseJson = await orderResponse.json();
    console.log('order respnse is ', orderResponseJson);
    const orderID = orderResponseJson.orders[0];
    console.log('order id is ', orderID);
    response.orderID = orderID;
    return response;
  }
}

module.exports = { APIutils };
