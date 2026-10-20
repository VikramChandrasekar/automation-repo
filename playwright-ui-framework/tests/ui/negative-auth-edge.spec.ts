import { test } from "@fixtures/app.fixture";
import { ENV } from "@config/env.config";

test.describe("Authentication Security & Negative Boundary Suite @regression", () => {
  test("Locked out user receives explicit security banner and cannot access inventory", async ({
    loginPage,
  }) => {
    test.info().annotations.push({ type: "jira", description: "ECOM-103" });
    await loginPage
      .open()
      .then((lp) => lp.loginAs(ENV.credentials.lockedUser, ENV.credentials.password))
      .then((lp) => lp.verifyErrorMessageContains("Epic sadface: Sorry, this user has been locked out."));
  });
});
