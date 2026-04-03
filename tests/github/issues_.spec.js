const { test, expect } = require("../../fixtures/fixtures.js");
const hlpGitHub = require("../../helpers/github/helpers.js");

test(
  "after creating an issue via UI, it should be visible in the UI",
  { tag: "@ui" },
  async ({ request, page, ids }) => {
    await page.goto(
      `/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/issues`
    );
  }
);

test("after creating an issue via API, edit it and assert via API", async ({
  request,
  page,
  ids,
}) => {});

test("after creating an issue via API, close it and assert via API", async ({
  request,
  page,
  ids,
}) => {});
