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
}) => {
  // Create Issue
  const issue = await hlpGitHub._getIssueCreated(
    request,
    await hlpGitHub._getIssuePayload()
  );
  ids.set({ issue_number: issue.number });
  // Update Issue
  const updateData = await hlpGitHub._getIssuePayload();
  const updatedIssue = await hlpGitHub._updateIssue(
    request,
    issue.number,
    updateData
  );
  // Retrieve and Assert
  const actualData = await hlpGitHub._getIssueData(
    request,
    updatedIssue.number
  );

  expect.soft(actualData.title).toBe(updateData.title);
  expect.soft(actualData.body).toBe(updateData.body);
  // Cleanup
  await hlpGitHub._closeIssue(request, updatedIssue.number);
});

test("after creating an issue via API, close it and assert via API", async ({
  request,
  page,
  ids,
}) => {
  // Create Issue
  const issue = await hlpGitHub._getIssueCreated(
    request,
    await hlpGitHub._getIssuePayload()
  );
  ids.set({ issue_number: issue.number });
  // Closing
  await hlpGitHub._closeIssue(request, issue.number);
  // Retrieve and Assert
  const closedIssue = await hlpGitHub._getIssueData(request, issue.number);

  expect(closedIssue.state).toBe("closed");
});
