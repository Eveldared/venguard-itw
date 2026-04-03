const { test } = require("../fixtures/fixtures.js");

const authFile = process.env.GITHUB_STORAGE_STATE;

test("authenticate", async ({ page }) => {
  await page.goto("/login");
  await page
    .getByLabel("Username or email address")
    .fill(process.env.GITHUB_USER);
  await page.getByLabel("Password").fill(process.env.GITHUB_PASSWORD);
  await page.getByRole("button", { name: "Sign in" }).first().click();
  await page.waitForURL("https://github.com/");

  await page.context().storageState({ path: authFile });
});
