import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base/base.page";

export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.getByTestId("inventory-item");
    this.checkoutButton = page.getByTestId("checkout");
  }

  async verifyProductInCart(productName: string, expectedPrice: string): Promise<this> {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
    await expect(item.getByTestId("inventory-item-price")).toHaveText(expectedPrice);
    return this;
  }

  async proceedToCheckout(): Promise<void> {
    await this.safeClick(this.checkoutButton, "Proceed to Checkout Button");
  }
}
