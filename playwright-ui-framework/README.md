# Enterprise Playwright (TypeScript) UI & AI-Augmented Automation Framework

**Author:** Vikram MC - QA Automation Architect / Tech Lead SDET

## Architectural Highlights
- **Fluent Page Object Model (POM) & Component Pattern:** Clean separation of locators, page workflows, and assertions using Playwright custom fixtures.
- **Session State Persistence (storageState):** Authenticates once per worker setup and injects session state across tests, cutting regression execution time by up to 75%.
- **AI-Augmented QA Workflows:** Includes ClaudeTestGeneratorAgent to convert user stories into structured test fixtures and JiraSyncClient hooks to automatically post test execution statuses to JIRA tickets.
- **CI/CD Pre-Merge Quality Gates:** Sharded parallel execution in GitHub Actions with Docker support.
