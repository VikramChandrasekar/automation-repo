import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export const ENV = {
  envName: process.env.ENV || "qa",
  baseUrl: process.env.BASE_URL || "https://www.saucedemo.com",
  credentials: {
    standardUser: process.env.STANDARD_USER || "standard_user",
    lockedUser: process.env.LOCKED_USER || "locked_out_user",
    password: process.env.USER_PASSWORD || "secret_sauce",
  },
  jira: {
    enabled: Boolean(process.env.JIRA_API_TOKEN),
    baseUrl: process.env.JIRA_BASE_URL || "https://enterprise-qa.atlassian.net",
    email: process.env.JIRA_USER_EMAIL || "qa-bot@enterprise.com",
    apiToken: process.env.JIRA_API_TOKEN || "",
  },
};
