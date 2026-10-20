import { test } from "@fixtures/app.fixture";

test.describe("Product Catalog Sorting & Filtering @regression", () => {
  test("Verify price sorting from Low to High orders catalog items accurately", async ({
    inventoryPage,
  }) => {
    test.info().annotations.push({ type: "jira", description: "ECOM-102" });
    await inventoryPage
      .open()
      .then((p) => p.sortBy("lohi"))
      .then((p) => p.verifyPricesSortedLowToHigh());
  });
});
