import { Page, Locator } from "@playwright/test";
import { logger } from "@utils/logger";

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(path: string = "/"): Promise<this> {
    logger.info(`Navigating to path: ${path}`);
    await this.page.goto(path, { waitUntil: "domcontentloaded" });
    return this;
  }

  protected async safeClick(locator: Locator, description: string): Promise<void> {
    logger.info(`Clicking element: ${description}`);
    await locator.waitFor({ state: "visible" });
    await locator.click();
  }

  protected async safeFill(locator: Locator, value: string, description: string): Promise<void> {
    logger.info(`Filling element [${description}]`);
    await locator.waitFor({ state: "visible" });
    await locator.clear();
    await locator.fill(value);
  }

  async blockThirdPartyAnalytics(): Promise<this> {
    await this.page.route("**/*{google-analytics,datadog,segment,hotjar}*", (route) => route.abort());
    return this;
  }
}
