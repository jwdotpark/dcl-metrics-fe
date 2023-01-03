import { defineConfig } from "cypress"

export default defineConfig({
  projectId: "z97c3f",
  e2e: {
    excludeSpecPattern: [
      "cypress/e2e/1-getting-started/*",
      "cypress/e2e/2-advanced-examples/*",
    ],
    setupNodeEvents(on, config) {},
  },
  video: false,
  screenshotOnRunFailure: false,
})
