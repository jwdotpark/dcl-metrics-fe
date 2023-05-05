import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    baseUrl: "http://localhost:3000",
    video: false,
    screenshotOnRunFailure: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
})
