import axios from "axios";
import { ENV } from "@config/env.config";
import { logger } from "@utils/logger";

export class JiraSyncClient {
  static async publishTestResult(
    storyKey: string,
    testTitle: string,
    status: "PASSED" | "FAILED",
    errorMessage?: string
  ): Promise<void> {
    if (!ENV.jira.enabled) {
      logger.info(`[JIRA Agent Dry-Run] Syncing ${storyKey} | Test: "${testTitle}" | Status: ${status}`);
      return;
    }
    const auth = Buffer.from(`${ENV.jira.email}:${ENV.jira.apiToken}`).toString("base64");
    await axios.post(
      `${ENV.jira.baseUrl}/rest/api/3/issue/${storyKey}/comment`,
      { body: `[Playwright CI Gate] ${testTitle}: ${status} ${errorMessage || ""}` },
      { headers: { Authorization: `Basic ${auth}` } }
    );
  }
}
