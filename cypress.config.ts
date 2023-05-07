import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    chromeWebSecurity: false,
    viewportHeight: 1920,
    viewportWidth: 1080,
    baseUrl: "http://localhost:3000",
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
