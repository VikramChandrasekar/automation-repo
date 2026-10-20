# Enterprise Java RestAssured + TestNG API Automation Framework

**Author:** Vikram MC — QA Automation Architect / Tech Lead SDET

## Production Architecture & Capabilities
- **ThreadLocal Spec Isolation:** Thread safety during high-concurrency parallel test execution.
- **JSON Schema Contract Validation:** Validates responses against structural schemas via `json-schema-validator`.
- **Dynamic Test Data Generation:** Powered by `JavaFaker` to avoid static data collisions.
- **Config & Client Layer Separation:** Centralized environment management with reusable endpoint clients.
- **CI/CD Quality Gate:** Automated Maven execution pipeline via GitHub Actions.
