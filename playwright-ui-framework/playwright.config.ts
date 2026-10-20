import { defineConfig, devices } from "@playwright/test";
import { ENV } from "./src/config/env.config";
import * as path from "path";

export const STORAGE_STATE = path.join(__dirname, "playwright/.auth/user.json");

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : undefined,
  timeout: 30 * 1000,
  expect: { timeout: 7000 },
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["junit", { outputFile: "test-results/junit-report.xml" }],
  ],
  use: {
    baseURL: ENV.baseUrl,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 10000,
    navigationTimeout: 15000,
    testIdAttribute: "data-test",
  },
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/ },
    {
      name: "chromium-authenticated",
      testDir: "./tests/ui",
      testIgnore: /.*negative-auth-edge\.spec\.ts/,
      dependencies: ["setup"],
      use: { ...devices["Desktop Chrome"], storageState: STORAGE_STATE },
    },
    {
      name: "chromium-unauthenticated",
      testMatch: /.*negative-auth-edge\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
