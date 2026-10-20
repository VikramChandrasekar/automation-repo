import * as fs from "fs";
import * as path from "path";
import { logger } from "../utils/logger";

export interface UserStoryInput {
  jiraId: string;
  summary: string;
  acceptanceCriteria: string[];
}

export class ClaudeTestGeneratorAgent {
  static async generateFromStory(story: UserStoryInput): Promise<void> {
    logger.info(`[AI Agent - Claude Skill] Parsing JIRA Story ${story.jiraId}: ${story.summary}`);
    const generatedScenarios = story.acceptanceCriteria.map((ac, index) => ({
      id: `${story.jiraId}-TC0${index + 1}`,
      description: `Verify: ${ac}`,
      priority: index === 0 ? "High (@smoke)" : "Medium (@regression)",
    }));
    const outputPath = path.resolve(process.cwd(), `src/data/generated-${story.jiraId}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(generatedScenarios, null, 2));
    logger.info(`[AI Agent - Claude Skill] Generated ${generatedScenarios.length} test fixtures at ${outputPath}`);
  }
}

if (require.main === module) {
  ClaudeTestGeneratorAgent.generateFromStory({
    jiraId: "ECOM-402",
    summary: "As a customer, I want to sort products by price and complete checkout",
    acceptanceCriteria: [
      "Products can be sorted from Low to High price accurately",
      "Cart badge increments dynamically when items are added",
      "Checkout calculates tax and displays order confirmation",
    ],
  });
}
