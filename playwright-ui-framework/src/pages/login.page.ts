import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base/base.page";

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorBanner: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByTestId("username");
    this.passwordInput = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
    this.errorBanner = page.getByTestId("error");
  }

  async open(): Promise<this> {
    await this.navigateTo("/");
    return this;
  }

  async loginAs(username: string, password: string): Promise<this> {
    await this.safeFill(this.usernameInput, username, "Username Input");
    await this.safeFill(this.passwordInput, password, "Password Input");
    await this.safeClick(this.loginButton, "Login Submit Button");
    return this;
  }

  async verifyErrorMessageContains(expectedText: string): Promise<this> {
    await expect(this.errorBanner).toBeVisible();
    await expect(this.errorBanner).toContainText(expectedText);
    return this;
  }
}
