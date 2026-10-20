import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../base/base.page";

export class HeaderComponent extends BasePage {
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.cartLink = page.getByTestId("shopping-cart-link");
  }

  async verifyCartItemCount(expectedCount: number): Promise<this> {
    if (expectedCount === 0) {
      await expect(this.cartBadge).toBeHidden();
    } else {
      await expect(this.cartBadge).toHaveText(String(expectedCount));
    }
    return this;
  }

  async openCart(): Promise<void> {
    await this.safeClick(this.cartLink, "Shopping Cart Icon");
  }
}
