import { defineConfig } from "cypress"

export default defineConfig({
  experimental: {
    experimentalMemoryManagement: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      if (config.isTextTerminal) {
        return {
          excludeSpecPattern: ["cypress/e2e/all.spec.cy.js"],
        }
      }
    },
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 720,
    baseUrl: "http://localhost:3000",
    numTestsKeptInMemory: 0,
    video: false,
    screenshotOnRunFailure: false,
    excludeSpecPattern: ["/cypress/e2e/all.spec.cy.js"],
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
