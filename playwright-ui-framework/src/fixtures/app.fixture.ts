import { test as base, expect } from "@playwright/test";
import { LoginPage } from "@pages/login.page";
import { InventoryPage } from "@pages/inventory.page";
import { CartPage } from "@pages/cart.page";
import { CheckoutPage } from "@pages/checkout.page";
import { JiraSyncClient } from "@ai/jiraSyncClient";

type EnterpriseFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<EnterpriseFixtures>({
  loginPage: async ({ page }, use) => await use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => await use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => await use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => await use(new CheckoutPage(page)),
});

test.afterEach(async ({}, testInfo) => {
  const jiraTag = testInfo.annotations.find((a) => a.type === "jira")?.description || "ECOM-GEN";
  const status = testInfo.status === "passed" ? "PASSED" : "FAILED";
  await JiraSyncClient.publishTestResult(jiraTag, testInfo.title, status, testInfo.error?.message);
});

export { expect };
