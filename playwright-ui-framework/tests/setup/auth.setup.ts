import { test as setup, expect } from "@playwright/test";
import { ENV } from "@config/env.config";
import { LoginPage } from "@pages/login.page";
import { STORAGE_STATE } from "../../playwright.config";

setup("Authenticate once and persist session state", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.loginAs(ENV.credentials.standardUser, ENV.credentials.password);
  await expect(page).toHaveURL(/.*inventory\.html/);
  await page.context().storageState({ path: STORAGE_STATE });
});
