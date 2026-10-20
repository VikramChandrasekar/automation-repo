import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base/base.page";
import { CustomerCheckoutData } from "@data/dataFactory";

export class CheckoutPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly continueButton: Locator;
  private readonly finishButton: Locator;
  private readonly completeHeader: Locator;
  private readonly subtotalLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.getByTestId("firstName");
    this.lastNameInput = page.getByTestId("lastName");
    this.postalCodeInput = page.getByTestId("postalCode");
    this.continueButton = page.getByTestId("continue");
    this.finishButton = page.getByTestId("finish");
    this.completeHeader = page.getByTestId("complete-header");
    this.subtotalLabel = page.getByTestId("subtotal-label");
  }

  async fillCustomerDetails(customer: CustomerCheckoutData): Promise<this> {
    await this.safeFill(this.firstNameInput, customer.firstName, "First Name");
    await this.safeFill(this.lastNameInput, customer.lastName, "Last Name");
    await this.safeFill(this.postalCodeInput, customer.postalCode, "Postal Code");
    await this.safeClick(this.continueButton, "Continue Checkout");
    return this;
  }

  async verifyItemSubtotal(expectedSubtotal: number): Promise<this> {
    await expect(this.subtotalLabel).toContainText(`$${expectedSubtotal.toFixed(2)}`);
    return this;
  }

  async completeOrder(): Promise<this> {
    await this.safeClick(this.finishButton, "Finish Order Button");
    return this;
  }

  async verifyOrderConfirmation(expectedMessage: string = "Thank you for your order!"): Promise<this> {
    await expect(this.completeHeader).toHaveText(expectedMessage);
    return this;
  }
}
