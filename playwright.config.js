const path = require("path");
const { defineConfig } = require("@playwright/test");

const storageState = process.env.GITHUB_STORAGE_STATE
  ? path.resolve(process.env.GITHUB_STORAGE_STATE)
  : undefined;

module.exports = defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  retries: 0,
  workers: 1,
  use: {
    baseURL: "https://github.com",
    headless: true,
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: "setup",
      testMatch: /setup.js/,
    },
    {
      name: "tests_UI",
      testMatch: /spec.js/,
      grep: /@ui/,
      dependencies: ["setup"],
      storageState,
    },
    {
      name: "tests_API",
      testMatch: /spec.js/,
      grepInvert: /@ui/,
    },
  ],
  reporter: [["list"]],
});
