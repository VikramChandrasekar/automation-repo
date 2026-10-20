import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base/base.page";
import { HeaderComponent } from "./components/header.component";

export type SortOption = "az" | "za" | "lohi" | "hilo";

export class InventoryPage extends BasePage {
  readonly header: HeaderComponent;
  private readonly sortDropdown: Locator;
  private readonly inventoryPrices: Locator;
  private readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
    this.sortDropdown = page.getByTestId("product-sort-container");
    this.inventoryPrices = page.getByTestId("inventory-item-price");
    this.inventoryItems = page.getByTestId("inventory-item");
  }

  async open(): Promise<this> {
    await this.navigateTo("/inventory.html");
    return this;
  }

  async addProductToCartByName(productName: string): Promise<this> {
    const productCard = this.inventoryItems.filter({ hasText: productName });
    await this.safeClick(productCard.locator("button"), `Add to Cart [${productName}]`);
    await expect(productCard.locator("button")).toHaveText("Remove");
    return this;
  }

  async sortBy(option: SortOption): Promise<this> {
    await this.sortDropdown.selectOption(option);
    return this;
  }

  async verifyPricesSortedLowToHigh(): Promise<this> {
    const priceTexts = await this.inventoryPrices.allInnerTexts();
    const numericPrices = priceTexts.map((p) => parseFloat(p.replace("$", "")));
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    expect(numericPrices).toEqual(sortedPrices);
    return this;
  }
}
