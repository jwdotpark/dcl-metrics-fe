const nextJest = require("next/jest")

const createJestConfig = nextJest({
  dir: "./",
})

const customJestConfig = {
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.ts",
    "@testing-library/jest-dom/extend-expect",
  ],
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["/utils/"],
}

module.exports = createJestConfig(customJestConfig)
