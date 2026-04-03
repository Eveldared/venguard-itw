const { test, expect } = require("../../fixtures/fixtures.js");
const hlpPW = require("../../helpers/pw/helpers.js");
const hlpGitHub = require("../../helpers/github/helpers.js");

test("after creating an issue via API, add a comment, and assert via API", async ({
  request,
  page,
  ids,
}) => {
  const body = await hlpPW.getRandomLetters(50);
  // Create Issue
  const issue = await hlpGitHub._getIssueCreated(
    request,
    await hlpGitHub._getIssuePayload()
  );
  ids.set({ issue_number: issue.number });
  // Add comment
  await hlpGitHub._addIssueComment(request, issue.number, body);
  // Retrieve and Assert
  const comments = await hlpGitHub._getIssueComments(request, issue.number);
  expect.soft(comments[0].body).toContain(body);
  // Cleanup
  await hlpGitHub._closeIssue(request, issue.number);
});
