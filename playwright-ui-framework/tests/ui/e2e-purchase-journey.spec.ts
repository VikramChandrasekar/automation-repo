import { test } from "@fixtures/app.fixture";
import { DataFactory } from "@data/dataFactory";
import checkoutData from "@data/checkoutData.json";

test.describe("E-Commerce Order Fulfillment Suite @smoke @regression", () => {
  test("Complete multi-item purchase journey with dynamic customer data", async ({
    inventoryPage,
    cartPage,
    checkoutPage,
  }) => {
    test.info().annotations.push({ type: "jira", description: "ECOM-101" });
    const customer = DataFactory.generateCustomerData();
    const [firstItem, secondItem] = checkoutData.targetProducts;

    await inventoryPage
      .open()
      .then((p) => p.blockThirdPartyAnalytics())
      .then((p) => p.addProductToCartByName(firstItem.name))
      .then((p) => p.addProductToCartByName(secondItem.name));

    await inventoryPage.header.verifyCartItemCount(2);
    await inventoryPage.header.openCart();

    await cartPage
      .verifyProductInCart(firstItem.name, firstItem.expectedPrice)
      .then((c) => c.verifyProductInCart(secondItem.name, secondItem.expectedPrice))
      .then((c) => c.proceedToCheckout());

    await checkoutPage
      .fillCustomerDetails(customer)
      .then((co) => co.verifyItemSubtotal(39.98))
      .then((co) => co.completeOrder())
      .then((co) => co.verifyOrderConfirmation());
  });
});
